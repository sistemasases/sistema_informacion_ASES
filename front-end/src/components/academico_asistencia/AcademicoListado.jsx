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
import { FaBroom, FaSearch, FaFilter } from "react-icons/fa";

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
    <div
      className="w-100 "
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Título con altura uniforme */}
      <div
        style={{
          height: "30px",
          minHeight: "30px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 2px 2px 2px",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "14px",
            color: "#212529",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </span>
      </div>

      {/* Buscador con tamaño uniforme */}
      <div className="position-relative">
        <FaSearch
          size={10}
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#adb5bd",
            pointerEvents: "none",
          }}
        />

        <input
          type="text"
          placeholder="Buscar..."
          value={columnFilters[fieldKey] || ""}
          onChange={(e) =>
            setColumnFilters((prev) => ({
              ...prev,
              [fieldKey]: e.target.value,
            }))
          }
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            height: "28px",
            boxSizing: "border-box",
            padding: "2px 6px 2px 24px",
            fontSize: "11px",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            outline: "none",
            backgroundColor: "#ffffff",
            color: "#495057",
          }}
        />
      </div>
    </div>
  );

  // Columnas de la tabla
  const columns = [
    {
      name: renderHeaderWithFilter("Codigo del estudiante", "codigo"),
      selector: (row) => row.estudiante_data.cod_univalle,
      sortable: true,
    },
    {
      name: renderHeaderWithFilter("Programa", "programa"),
      selector: (row) => row?.estudiante_data?.programas[0]?.cod_univalle,
      sortable: true,
    },
    {
      name: renderHeaderWithFilter("Sede", "sede"),
      selector: (row) => row?.estudiante_data?.programas[0]?.sede,
      sortable: true,
    },
    {
      name: renderHeaderWithFilter("Nombre del estudiante", "nombre_estudiante"),
      selector: (row) =>
        `${row.estudiante_data.nombre} ${row.estudiante_data.apellido}`,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: renderHeaderWithFilter("Monitoría", "monitoria"),
      selector: (row) => row.monitoria_data.materia,
      sortable: true,
    },
    {
      name: renderHeaderWithFilter("Sede Monitoría", "sede_monitoria"),
      selector: (row) => row.monitoria_data.nombre_sede,
      sortable: true,
    },
    {
      name: renderHeaderWithFilter("Nombre del monitor", "nombre_monitor"),
      selector: (row) =>
        `${row.monitoria_data.nombre_monitor} ${row.monitoria_data.apellido_monitor}`,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: renderHeaderWithFilter("Pertenece a ASES", "pertenece_ases"),
      selector: (row) =>
        row.estudiante_data.estudiante_elegible ? "Si" : "No",
      sortable: true,
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
    headRow: {
      style: {
        backgroundColor: "#fcfcfd",
        borderBottom: "1px solid #e9ecef",
        minHeight: "75px",
        alignItems: "stretch",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        paddingTop: "6px",
        paddingBottom: "6px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "12.5px",
      },
    },
  };

  return (
    <>
      <div className="container_tabla">
        {/* Contenedor en fila para los filtros y botones */}
        <div className="d-flex align-items-end gap-3 my-3 flex-wrap">
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

        <DataTable
          columns={columns}
          data={filteredRecords}
          pagination
          paginationPerPage={8}
          fixedHeader
          customStyles={customStyles}
          persistTableHead
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
