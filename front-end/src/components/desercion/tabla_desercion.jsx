import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row } from 'react-bootstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';
import MOCK_DATA from './MOCK_DATA.json';
import Cabecera from './cabecera.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Tabla_desercion = () => {
  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
  };
  const [state, set_state] = useState({
    periodo: '',
    usuario: '',
    data_user: [],
    data_periodo: [],
    data_rol: [],
    id_cohorte: 3,
    data_cohorte: [],
  });

  const [records, setRecords] = useState([]);

  function cohorte_seleccion(name) {
    set_state({
      ...state,
      id_cohorte: name,
    });
  }

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/usuario_rol/cohorte_estudiante_info/${state.id_cohorte}/`,
      method: 'GET',
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_cohorte: respuesta.data,
        });
        setRecords(respuesta.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [state.id_cohorte]);

  const columns = useMemo(() => {
    const existingColumnNames = [];

    const generatedColumns = generatePeriodColumns().filter((column) => {
      if (existingColumnNames.includes(column.name)) {
        return false;
      }
      existingColumnNames.push(column.name);
      return true;
    });

    return [
      {
        name: 'Documento',
        selector: 'info_estudiante',
        cell: (row) => `${row.info_estudiante.num_doc}`,
        sortable: true,
      },
      {
        name: 'Estudiante',
        selector: 'info_estudiante',
        cell: (row) => `${row.info_estudiante.nombre} ${row.info_estudiante.apellido}`,
        sortable: true,
      },
      ...generatedColumns,
      {
        name: 'Cantidad de Programas Distintos',
        cell: (row) => getDistinctProgramsCount(row),
      },
    ];
  }, [records]);

  function generatePeriodColumns() {
    const periods = getDistinctPeriods();

    periods.sort((a, b) => a.id_Semestre - b.id_Semestre); // Ordenar los periodos en orden ascendente

    return periods.map((period) => ({
      name: `Semestre ${period.id_Semestre}`,
      selector: `periodos.find((p) => p.id_Semestre === ${period.id_Semestre})`,
      cell: (row) => renderPeriodCell(row, period.id_Semestre),
    }));
  }

  function getDistinctPeriods() {
    const periods = new Set();

    records.forEach((item) => {
      item.periodos.forEach((period) => {
        periods.add(period);
      });
    });

    return Array.from(periods);
  }

  function getDistinctProgramsCount(row) {
    const programs = new Set();

    row.periodos.forEach((period) => {
      programs.add(period.nombre_programa);
    });

    return Array.from(programs).length;
  }

  function renderPeriodCell(row, idSemestre) {
    const periods = row.periodos.filter((p) => p.id_Semestre === idSemestre);

    if (periods.length > 0) {
      return periods.map((period) => {
        const cellStyle = {
          backgroundColor:
            period.id_estado === 1 ? 'orange' : period.id_estado === 4 ? 'lightblue' : 'lightgray',
        };

        return (
          <div key={period.id} style={cellStyle}>
            <div>Progama: {period.nombre_programa}</div>
            <div>{renderEstadoLabel(period.id_estado)}</div>
          </div>
        );
      });
    }

    return null;
  }

  function renderEstadoLabel(estado) {
    switch (estado) {
      case 1:
        return 'Inactivo';
      case 2:
        return 'Activo';
      case 4:
        return 'Egresado';
      default:
        return '';
    }
  }

  // Conteo total por cada columna de semestre
  const semestreCount = useMemo(() => {
    const semestreCounts = {};

    getDistinctPeriods().forEach((period) => {
      semestreCounts[period.id_Semestre] = {
        total: 0,
        inactivo: 0,
        activo: 0,
        egresado: 0,
      };
    });

    records.forEach((item) => {
      item.periodos.forEach((period) => {
        semestreCounts[period.id_Semestre].total++;
        if (period.id_estado === 1) {
          semestreCounts[period.id_Semestre].inactivo++;
        } else if (period.id_estado === 2) {
          semestreCounts[period.id_Semestre].activo++;
        } else if (period.id_estado === 4) {
          semestreCounts[period.id_Semestre].egresado++;
        }
      });
    });

    return semestreCounts;
  }, [records]);

  return (
    <Container>
      <Row>
        <Cabecera childClicked={(name) => cohorte_seleccion(name)} />
      </Row>
      <Row>
        {records.length > 0 ? (
          <DataTableExtensions
            columns={columns}
            data={records}
            filter={true}
            exportHeaders={true}
          >
            <DataTable
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
              striped
            />
          </DataTableExtensions>
        ) : (
          <div className="alert alert-warning" role="alert">
            Cargando...
          </div>
        )}
      </Row>
      <Row>
        <h5>Totales por columna:</h5>
        <table>
          <thead>
            <tr>
              <th>Semestre</th>
              {Object.keys(semestreCount).map((semestre) => (
                <th key={semestre}>Semestre {semestre}</th>
              ))}
              <th>Total Programas Distintos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total</td>
              {Object.keys(semestreCount).map((semestre) => (
                <td key={semestre}>{semestreCount[semestre].total}</td>
              ))}
              <td></td>
            </tr>
            <tr>
              <td>Estudiantes Inactivos</td>
              {Object.keys(semestreCount).map((semestre) => (
                <td key={semestre}>{semestreCount[semestre].inactivo}</td>
              ))}
              <td></td>
            </tr>
            <tr>
              <td>Estudiantes Activos</td>
              {Object.keys(semestreCount).map((semestre) => (
                <td key={semestre}>{semestreCount[semestre].activo}</td>
              ))}
              <td></td>
            </tr>
            <tr>
              <td>Estudiantes Egresados</td>
              {Object.keys(semestreCount).map((semestre) => (
                <td key={semestre}>{semestreCount[semestre].egresado}</td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </table>
      </Row>
    </Container>
  );
};

export default Tabla_desercion;
