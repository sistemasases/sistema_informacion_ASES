/**
 * @file tabla_sin_seguimientos.jsx
 * @version 1.0.0
 * @description Tabla de estudiantes sin seguimientos.
 * @author Componente Sistemas Ases
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, { selectFilter } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useEffect } from "react";
import axios from "axios";
import writeXlsxFile from "write-excel-file";
import { CSVLink } from "react-csv";
import {
  desencriptar,
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

/**
 * Componente funcional que representa la tabla de estudiantes sin seguimientos.
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} Tabla de estudiantes sin seguimientos.
 */
const Tabla_sin_Seguimientos = (props) => {
  // Configuración de la autorización.
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  // Estado local del componente.
  const [state, set_state] = useState({
    id_semestre: desencriptarInt(sessionStorage.getItem("id_semestre_actual")),
    id_usuario: desencriptarInt(sessionStorage.getItem("id_usuario")),
    console: console.log(
      "id semestre actual: " +
        desencriptarInt(sessionStorage.getItem("id_semestre_actual"))
    ),
    la_info_de_la_tabla: [],
  });

  // Efecto secundario para cargar datos.
  useEffect(() => {
    const paramsget = {
      id_sede: desencriptarInt(sessionStorage.getItem("sede_id")),
      rol: desencriptar(sessionStorage.getItem("rol")),
    };
    axios({
      // Endpoint para obtener datos de estudiantes sin seguimientos
      url:
        `${process.env.REACT_APP_API_URL}/usuario_rol/info_estudiantes_sin_seguimientos/` +
        state.id_usuario +
        "/",
      params: paramsget,
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          la_info_de_la_tabla: respuesta.data,
        });
        setRecords(respuesta.data);
      })
      .catch((err) => {
        console.log("no llega :" + err);
      });
  }, [state.id_semestre]);

  // Definición de las columnas de la tabla.
  const columnas2 = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Cedula</h4>
          <input onChange={handleFilter_cedula} />
        </Row>
      ),
      selector: (row) => row.cedula,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Nombres</h4>
          <input onChange={handleFilter_nombre} />
        </Row>
      ),
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Apellidos</h4>
          <input onChange={handleFilter_apellido} />
        </Row>
      ),
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: (
        <div>
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Cantidad de fichas</h4>
          </Row>
        </div>
      ),
      selector: (row) => row.cantidad_de_fichas,
      sortable: true,
    },
    {
      name: (
        <div>
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Cantidad de inasistencias</h4>
          </Row>
        </div>
      ),
      selector: (row) => row.cantidad_de_inasistencias,
      sortable: true,
    },
    {
      name: (
        <div>
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Total de fichas</h4>
          </Row>
        </div>
      ),
      selector: (row) => row.total_fichas,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Monitor</h4>
          <input onChange={handleFilter_monitor} />
        </Row>
      ),
      selector: (row) => row.monitor,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Practicante</h4>
          <input onChange={handleFilter_practicante} />
        </Row>
      ),
      selector: (row) => row.practicante,
      sortable: true,
    },
    {
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Profesional</h4>
          <input onChange={handleFilter_profesional} />
        </Row>
      ),
      selector: (row) => row.profesional,
      sortable: true,
    },
  ];
  // Contenido del csv
  var schema = [
    {
      column: "ID",
      type: Number,
      value: (row) => row.id,
    },
    {
      column: "Cedula",
      type: Number,
      value: (row) => row.cedula,
    },
    {
      column: "Nombres",
      type: String,
      value: (row) => row.nombres,
    },
    {
      column: "Apellidos",
      type: String,
      value: (row) => row.apellidos,
    },
    {
      column: "Cantidad de fichas",
      type: Number,
      value: (row) => row.cantidad_de_fichas,
    },
    {
      column: "Cantidad de inasistencias",
      type: Number,
      value: (row) => row.cantidad_de_inasistencias,
    },
    {
      column: "Total de fichas",
      type: Number,
      value: (row) => row.total_fichas,
    },
    {
      column: "Monitor",
      type: String,
      value: (row) => row.monitor,
    },
    {
      column: "Practicante",
      type: String,
      value: (row) => row.practicante,
    },
    {
      column: "Profesional",
      type: String,
      value: (row) => row.profesional,
    },
  ];

  // CSV Headers
  var csv_headers = [
    { label: "ID", key: "id" },
    { label: "Cedula", key: "cedula" },
    { label: "Nombres", key: "nombres" },
    { label: "Apellidos", key: "apellidos" },
    { label: "Cantidad de fichas", key: "cantidad_de_fichas" },
    { label: "Cantidad de inasistencias", key: "cantidad_de_inasistencias" },
    { label: "Total de fichas", key: "total_fichas" },
    { label: "Monitor", key: "monitor" },
    { label: "Practicante", key: "practicante" },
    { label: "Profesional", key: "profesional" },
  ];

  // Schema para el excel
  const imprimir_excel = (data) => {
    let new_data_excel = [];
    for (let i = 0; i < data.length; i++) {
      let new_data = [];
      new_data.push({
        id: data[i].id,
        cedula: data[i].cedula,
        nombres: data[i].nombres,
        apellidos: data[i].apellidos,
        cantidad_de_fichas: data[i].cantidad_de_fichas,
        cantidad_de_inasistencias: data[i].cantidad_de_inasistencias,
        total_fichas: data[i].total_fichas,
        monitor: data[i].monitor,
        practicante: data[i].practicante,
        profesional: data[i].profesional,
      });
      new_data_excel.push(new_data);
    }
    writeXlsxFile(data, {
      schema,
      fileName: "Conteo de Seguimientos.xlsx",
    });
  };

  // Opciones de paginación.
  const paginacionOpciones = {
    rowsPerPageText: "Row per page:",
    rangeSeparratorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemtEXT: "TODO",
  };

  // Estados locales de la tabla.
  const [records, setRecords] = useState(state.la_info_de_la_tabla);
  const [noResults, setNoResults] = useState(false);

  /**
   * Filtra la tabla por el número de cédula ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_cedula(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.cedula.toString().includes(event.target.value)
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Filtra la tabla por el nombre ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_nombre(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.nombres.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Filtra la tabla por el apellido ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_apellido(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.apellidos.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Filtra la tabla por el monitor ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_monitor(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.monitor.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Filtra la tabla por el practicante ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_practicante(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.practicante.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Filtra la tabla por el profesional ingresado.
   * @param {Event} event - Evento de cambio en el input.
   */
  function handleFilter_profesional(event) {
    const newData = state.la_info_de_la_tabla.filter((row) =>
      row.profesional.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const updatedData =
      newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  /**
   * Cambia el semestre seleccionado.
   * @param {string} name - Nombre del semestre seleccionado.
   */
  function semestre_seleccion(name) {
    set_state({
      ...state,
      id_semestre: name,
    });
  }

  // Renderiza la tabla de estudiantes sin seguimientos.
  return (
    <Container>
      <Row>
        <Cabecera childClicked={(name) => semestre_seleccion(name)} />
      </Row>
      {noResults && (
        <div className="alert alert-warning" role="alert">
          No se encontraron resultados.
        </div>
      )}
      <CSVLink headers={csv_headers} data={records} filename="Conteo de Seguimientos.csv">
        <Button style={{ margin: 5 }}> Imprimir CSV</Button>
      </CSVLink>

      <Button
        style={{ margin: 5 }}
        name="imprimir_excel"
        onClick={() => imprimir_excel(records)}
      >
        Imprimir Excel
      </Button>
      {records.length > 0 ? (
        <Row>
          <DataTableExtensions
            columns={columnas2}
            data={records}
            filter={true}
            filterPlaceHolder={2}
            filterDigit={1}
            exportHeaders={false}
            export={false}
            print={false}
          >
            <DataTable
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
              paginationComponentOptions={paginacionOpciones}
              striped
            />
          </DataTableExtensions>
        </Row>
      ) : (
        <div className="alert alert-warning" role="alert">
          Cargando...
        </div>
      )}
    </Container>
  );
};

export default Tabla_sin_Seguimientos;
