/**
 * @file AcademicoListado.jsx
 * @version 1.0.0
 * @description Este componente se encarga de renderizar una tabla con la lista de
 *              estudiantes que asistieron a las monitorías.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 14 de septiembre del 2024
 */

import { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import DownloadCSV from "./DownloadCSV";
import { postData } from "../../service/academico_attendance_requests";
import { currentDate } from "../../utils/basic_functions";

const AcademicoListado = () => {
  // Variables de estado
  const [dates, setDates] = useState({
    initialDate: "2024-09-01",
    finalDate: currentDate(),
  });
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);

  // Se ejecuta al cargar el componente para mostrar a los estudiantes
  // que asistieron desde 2024-09-01 hasta la fecha actual
  useEffect(() => {
    // Función para obtener los estudiantes inscritos en la monitoría
    const getAttendance = async () => {
      // Obtener los registros de asistencia en el rango de fechas seleccionado
      const res = await postData("fecha_asistencia/", {
        fecha_ini: dates.initialDate,
        fecha_final: dates.finalDate,
      });
      if (res) {
        // Guardar los registros originales en data
        setData(res);
        setRecords(res);
      }
      // console.log(res);
    };
    // Llamar a la función para obtener los estudiantes
    getAttendance();
  }, []);

  // Columnas de la tabla
  const columns = [
    {
      name: "Codigo del estudiante",
      selector: (row) => row.estudiante_data.cod_univalle,
      sortable: true,
    },
    {
      name: "Programa",
      selector: (row) => row?.estudiante_data?.programas[0]?.cod_univalle,
      sortable: true,
    },
    {
      name: "Sede",
      selector: (row) => row?.estudiante_data?.programas[0]?.sede,
      sortable: true,
    },
    {
      name: "Nombre del estudiante",
      selector: (row) =>
        `${row.estudiante_data.nombre} ${row.estudiante_data.apellido}`,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Monitoría",
      selector: (row) => row.monitoria_data.materia,
      sortable: true,
    },
    {
      name: "Sede Monitoría",
      selector: (row) => row.monitoria_data.nombre_sede,
      sortable: true,
    },
    {
      name: "Nombre del monitor",
      selector: (row) =>
        `${row.monitoria_data.nombre_monitor} ${row.monitoria_data.apellido_monitor}`,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Pertenece a ASES",
      selector: (row) =>
        row.estudiante_data.estudiante_elegible ? "Si" : "No",
      sortable: true,
    },
  ];

  const download_data = records.map((record) => ({
    ...record,
    es_ases: record.estudiante_data.estudiante_elegible ? "Si" : "No",
  }));

  const headers = [
    { label: "Codigo del estudiante", key: "estudiante_data.cod_univalle" },
    { label: "Programa", key: "estudiante_data.programas[0].cod_univalle" },
    { label: "Sede", key: "estudiante_data.programas[0].sede" },
    { label: "Nombre del estudiante", key: "estudiante_data.nombre" },
    { label: "Apellido del estudiante", key: "estudiante_data.apellido" },
    { label: "Monitoría", key: "monitoria_data.materia" },
    { label: "Sede Monitoría", key: "monitoria_data.nombre_sede" },
    { label: "Nombres del monitor", key: "monitoria_data.nombre_monitor" },
    { label: "Apellidos del monitor", key: "monitoria_data.apellido_monitor" },
    { label: "Pertenece a ASES", key: "es_ases" },
    { label: "Fecha", key: "fecha" },
  ];

  const handleDateChange = (e) =>
    setDates({ ...dates, [e.target.name]: e.target.value });

  // Función para buscar los registros de asistencia en un rango de fechas
  const searchRange = async () => {
    // Validar que ambas fechas estén seleccionadas
    if (!(dates.initialDate && dates.finalDate)) {
      // Mostrar mensaje: debe seleccionar ambas fechas
      swal("Debe seleccionar ambas fechas");
      return;
    }
    // Validar que la fecha inicial sea menor a la fecha final
    else if (dates.initialDate > dates.finalDate) {
      // Mostrar mensaje: la fecha inicial debe ser menor a la fecha final
      swal("La fecha inicial debe ser menor a la fecha final");
      return;
    }
    const dates_range = {
      fecha_ini: dates.initialDate,
      fecha_final: dates.finalDate,
    };
    // Obtener los registros de asistencia en el rango de fechas seleccionado
    const filteredRecords = await postData("fecha_asistencia/", dates_range);
    // Actualizar los registros a mostrar en la tabla
    setRecords(filteredRecords);
  };

  const resturarTable = () => {
    setRecords(data);
    setDates({ initialDate: "2024-09-01", finalDate: currentDate() });
  };
  return (
    <>
      <div className="container_tabla">
        <input
          name="initialDate"
          className="input_lenght"
          type="date"
          placeholder="Fecha inicio"
          value={dates.initialDate}
          onChange={handleDateChange}
        />
        <input
          name="finalDate"
          className="input_lenght"
          type="date"
          placeholder="Fecha fin"
          value={dates.finalDate}
          onChange={handleDateChange}
        />
        <button onClick={searchRange} className="btn btn-primary mx-3">
          Buscar
        </button>
        <button onClick={resturarTable} className="btn btn-secondary">
          Restaurar
        </button>
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationPerPage={8}
          fixedHeader
        />
        <div>
          <DownloadCSV
            data={download_data}
            headers={headers}
            filename={"asistencia.csv"}
          />
        </div>
      </div>
    </>
  );
};

export default AcademicoListado;
