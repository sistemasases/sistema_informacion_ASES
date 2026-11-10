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
import writeXlsxFile from "write-excel-file"
import { postData } from "../../service/academico_attendance_requests";
import { currentDate } from "../../utils/basic_functions";
import { FaBroom, FaSearch, FaFilter, FaFileExcel, FaFileCsv } from "react-icons/fa";
import "../../Scss/academico/listado_asistencia.css";
const AcademicoListado = () => {
  // Variables de estado
  const [dates, setDates] = useState({
    initialDate: currentDate(), //Mostrar fecha actual por defecto
    finalDate: currentDate(),
  });
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  //Estado para guardar los filtros aplicados
  const [columnFilters, setColumnFilters] = useState({
    codigo: "",
    programa: "",
    sede: "",
    nombre_estudiante: "",
    monitoria: "",
    sede_monitoria: "",
    nombre_monitor: "",
    pertenece_ases: "",
  });

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


  const renderHeaderWithFilter = (title, fieldKey) => (
    <div className="th-filter">
      <div className="th-filter__title">
        <span title={title}>{title}</span>
        <FaFilter size={10} className="th-filter__icon" />
      </div>

      <div
        className="th-filter__field"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FaSearch size={10} className="th-filter__search-icon" />
        <input
          type="text"
          className="th-filter__input"
          placeholder="Buscar..."
          value={columnFilters[fieldKey] || ""}
          onChange={(e) =>
            setColumnFilters((prev) => ({ ...prev, [fieldKey]: e.target.value }))
          }
        />
      </div>
    </div>
  );

  // Columnas de la tabla
  const columns = [
    {
      name: renderHeaderWithFilter("Fecha de la monitoria", "fecha"),
      selector: (row) => row.fecha
    },
    {
      name: renderHeaderWithFilter("Codigo del estudiante", "codigo"),
      selector: (row) => row.estudiante_data.cod_univalle,
      //sortable: true,

    },
    {
      name: renderHeaderWithFilter("Programa del estudiante", "programa"),
      selector: (row) => row?.estudiante_data?.programas[0]?.cod_univalle,
      //sortable: true,

    },
    {
      name: renderHeaderWithFilter("Sede del estudiante", "sede"),
      selector: (row) => row?.estudiante_data?.programas[0]?.sede,
      //sortable: true,

    },
    {
      name: renderHeaderWithFilter("Nombre del estudiante", "nombre_estudiante"),
      selector: (row) =>
        `${row.estudiante_data.nombre} ${row.estudiante_data.apellido}`,
      //sortable: true,

    },
    {
      name: renderHeaderWithFilter("Nombre de monitoría", "monitoria"),
      selector: (row) => row.monitoria_data.materia,
      //sortable: true,
    },
    {
      name: renderHeaderWithFilter("Sede de monitoría", "sede_monitoria"),
      selector: (row) => row.monitoria_data.nombre_sede,
      //sortable: true,
    },
    {
      name: renderHeaderWithFilter("Nombre del monitor", "nombre_monitor"),
      selector: (row) =>
        `${row.monitoria_data.nombre_monitor} ${row.monitoria_data.apellido_monitor}`,
      //sortable: true,
    },
    {
      name: renderHeaderWithFilter("Pertenece a ASES", "pertenece_ases"),
      selector: (row) =>
        row.estudiante_data.estudiante_elegible ? "Si" : "No",
      //sortable: true,
    },
  ];

  const filteredRecords = (Array.isArray(records) ? records : []).filter((row) => {
    const codigo = (row?.estudiante_data?.cod_univalle || "").toString().toLowerCase();
    const programa = (row?.estudiante_data?.programas?.[0]?.cod_univalle || "").toString().toLowerCase();
    const sede = (row?.estudiante_data?.programas?.[0]?.sede || "").toString().toLowerCase();
    const nombreEstudiante = `${row?.estudiante_data?.nombre || ""} ${row?.estudiante_data?.apellido || ""}`.toLowerCase();
    const monitoria = (row?.monitoria_data?.materia || "").toString().toLowerCase();
    const sedeMonitoria = (row?.monitoria_data?.nombre_sede || "").toString().toLowerCase();
    const nombreMonitor = `${row?.monitoria_data?.nombre_monitor || ""} ${row?.monitoria_data?.apellido_monitor || ""}`.toLowerCase();
    const perteneceAses = (row?.estudiante_data?.estudiante_elegible ? "si" : "no").toLowerCase();

    return (
      codigo.includes(columnFilters.codigo.toLowerCase().trim()) &&
      programa.includes(columnFilters.programa.toLowerCase().trim()) &&
      sede.includes(columnFilters.sede.toLowerCase().trim()) &&
      nombreEstudiante.includes(columnFilters.nombre_estudiante.toLowerCase().trim()) &&
      monitoria.includes(columnFilters.monitoria.toLowerCase().trim()) &&
      sedeMonitoria.includes(columnFilters.sede_monitoria.toLowerCase().trim()) &&
      nombreMonitor.includes(columnFilters.nombre_monitor.toLowerCase().trim()) &&
      perteneceAses.includes(columnFilters.pertenece_ases.toLowerCase().trim())
    );
  });

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

  // Esquema de columnas para el archivo Excel
  const schema_asistencia = [
    {
      column: "Código del Estudiante",
      type: String,
      value: (row) =>
        row?.estudiante_data?.cod_univalle != null
          ? String(row.estudiante_data.cod_univalle)
          : "",
    },
    {
      column: "Programa",
      type: String,
      value: (row) =>
        row?.estudiante_data?.programas?.[0]?.cod_univalle != null
          ? String(row.estudiante_data.programas[0].cod_univalle)
          : "",
    },
    {
      column: "Sede",
      type: String,
      value: (row) =>
        row?.estudiante_data?.programas?.[0]?.sede != null
          ? String(row.estudiante_data.programas[0].sede)
          : "",
    },
    {
      column: "Nombre del Estudiante",
      type: String,
      value: (row) =>
        `${row?.estudiante_data?.nombre || ""} ${row?.estudiante_data?.apellido || ""}`.trim(),
    },
    {
      column: "Monitoría",
      type: String,
      value: (row) =>
        row?.monitoria_data?.materia != null
          ? String(row.monitoria_data.materia)
          : "",
    },
    {
      column: "Sede Monitoría",
      type: String,
      value: (row) =>
        row?.monitoria_data?.nombre_sede != null
          ? String(row.monitoria_data.nombre_sede)
          : "",
    },
    {
      column: "Nombre del Monitor",
      type: String,
      value: (row) =>
        `${row?.monitoria_data?.nombre_monitor || ""} ${row?.monitoria_data?.apellido_monitor || ""}`.trim(),
    },
    {
      column: "Pertenece a ASES",
      type: String,
      value: (row) => (row?.estudiante_data?.estudiante_elegible ? "Sí" : "No"),
    },
    {
      column: "Fecha",
      type: String,
      value: (row) => (row?.fecha != null ? String(row.fecha) : ""),
    },
  ];

  const descargarExcel = async () => {
    if (!filteredRecords || filteredRecords.length === 0) {
      swal("Atención", "No hay datos en la tabla para descargar", "warning");
      return;
    }

    try {
      const nombreArchivo =
        dates.initialDate && dates.finalDate
          ? `Listado_Asistencia_${dates.initialDate}_a_${dates.finalDate}.xlsx`
          : "Listado_Asistencia.xlsx";

      await writeXlsxFile(filteredRecords, {
        schema: schema_asistencia,
        fileName: nombreArchivo,
      });
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      swal("Error", "Ocurrió un error al generar el archivo Excel", "error");
    }
  };


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
    try {
      const res = await postData("fecha_asistencia/", dates_range);

      // Limpia los filtros de las columnas
      setColumnFilters({
        codigo: "",
        programa: "",
        sede: "",
        nombre_estudiante: "",
        monitoria: "",
        sede_monitoria: "",
        nombre_monitor: "",
        pertenece_ases: "",
      });
      // Valida si la respuesta es una lista válida
      if (Array.isArray(res)) {
        setRecords(res);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error(error);
      setRecords([]);
    }
  };

  const resturarTable = () => {
    setRecords([]);
    setDates({ initialDate: currentDate(), finalDate: currentDate() });
    setColumnFilters({
      codigo: "",
      programa: "",
      sede: "",
      nombre_estudiante: "",
      monitoria: "",
      sede_monitoria: "",
      nombre_monitor: "",
      pertenece_ases: "",
    });
  };


  const customStyles = {
    table: { style: { backgroundColor: "transparent" } },
    headRow: {
      style: {
        backgroundColor: "#f8f9fb",
        borderBottom: "1px solid #e9ecef",
      },
    },
    headCells: {
      style: {
        borderRight: "1px solid #eef0f3",
        "&:last-of-type": { borderRight: "none" },
      },
    },
    rows: {
      style: {
        minHeight: "38px",
        fontSize: "13px",
        color: "#444b52",
        backgroundColor: "#ffffff",
      },
      stripedStyle: {
        backgroundColor: "#f6f7f9",
        color: "#444b52",
      },
    },
    cells: {
      style: {
        padding: "0 10px",
        fontSize: "13px",
        borderRight: "1px solid #eef0f3",
        "&:last-of-type": { borderRight: "none" },
      },
    },
  };

  return (
    <>
      <div className="container_tabla">
        <div className="mt-1 fw-semibold">
          <h2>Listado de asistencia</h2>
        </div>
        <div className="fechas-container d-flex align-items-end gap-3 my-3 flex-wrap">
          {/* Grupo Fecha inicio */}
          <div className="d-flex flex-column">
            <label htmlFor="initialDate" className="form-label mb-1 ">
              Fecha inicio
            </label>
            <input
              id="initialDate"
              name="initialDate"
              className="form-control m-0"
              style={{ width: "190px" }}
              type="date"
              value={dates.initialDate}
              onChange={handleDateChange}
            />
          </div>

          {/* Grupo Fecha fin */}
          <div className="d-flex flex-column">
            <label htmlFor="finalDate" className="form-label mb-1 ">
              Fecha fin
            </label>
            <input
              id="finalDate"
              name="finalDate"
              className="form-control m-0"
              style={{ width: "190px" }}
              type="date"
              value={dates.finalDate}
              onChange={handleDateChange}
            />
          </div>

          {/* Botones */}
          <button onClick={searchRange} className="btn btn-primary">
            <FaSearch style={{ marginRight: "5px" }} />
            Buscar
          </button>
          <button onClick={resturarTable} className="btn btn-secondary">
            <FaBroom style={{ marginRight: "5px" }} />
            Limpiar búsqueda
          </button>
        </div>


        <div className="card-box tabla-card">
          <div className="tabla-container">
            <DataTable
              columns={columns}
              data={filteredRecords}
              pagination
              paginationPerPage={8}
              fixedHeader
              striped
              customStyles={customStyles}
              persistTableHead
            />
            <div className="d-flex justify-content-center align-items-center gap-2 my-3">
              <button onClick={descargarExcel} className="btn btn-success mb-3">
                {/* <FaFileExcel style={{ marginRight: "5px" }} /> */}
                Descargar Excel
              </button>
              <DownloadCSV
                data={download_data}
                headers={headers}
                filename={"asistencia.csv"}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AcademicoListado;
