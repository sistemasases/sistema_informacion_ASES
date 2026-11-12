/**
 * @file AcademicoCheck.jsx
 * @version 1.0.0
 * @description Este componente se encarga de renderizar la tabla de asistencia de 
 *              los estudiantes a las monitorías para poner check a los estudiantes 
 *              que asistieron.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 14 de septiembre del 2024
*/

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../../Scss/academico/tablas.css";
import { postData } from "../../service/academico_attendance_requests";
import { useAuthStore } from "../ficha_estudiante_dicapacidad/store/auth";
import Swal from "sweetalert2";
import { currentDate } from "../../utils/basic_functions";
import DownloadCSV from "./DownloadCSV";
import writeXlsxFile from "write-excel-file";
import {
    decryptTokenFromSessionStorage,
    desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import "../../Scss/academico/academico_check.css"
import { CSVLink } from "react-csv";
// Iconos
import { FiSearch, FiSave, FiFilter } from "react-icons/fi";
import {
    BsArrowCounterclockwise,
    BsFileEarmarkCheck,
    BsFileEarmarkSpreadsheet,
    BsFiletypeCsv
} from "react-icons/bs";

const AcademicoCheck = () => {

    // Variables de estado
    const { user } = useAuthStore();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedRangoDate, setSelectedRangoDate] = useState();
    const [estudent, setEstudent] = useState();
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [localChanges, setLocalChanges] = useState({});
    const [loading, setLoading] = useState(false);
    const semestreActual = desencriptarInt(sessionStorage.getItem("id_semestre_actual"));
    const [initialData, setInitialData] = useState([]);
    //const [selectedRows, setSelectedRows] = useState([]);

    // Formateador de fecha a DD/MM/YYYY
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const parts = String(dateStr).split("-");
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    };


    // Se ejecuta al cambiar la fecha actual, para obtener los estudiantes 
    // inscritos en la monitoría en un día específico
    useEffect(() => {
        // Función para obtener los estudiantes inscritos en la monitoría
        const getStudent = async () => {
            const data = {
                rol: user.rol,
                fecha: selectedDate || null,
                fechaHasta: selectedRangoDate || null,
                estudiante: estudent || null,
                id_user: user.id_usuario,
                semestre: semestreActual
            };
            const res = await postData("lista_asistencia/", data);
            if (res) {
                setData(res);
                setRecords(res);
                setInitialData(res); //guardar copia de respaldo
            }
        };
        // Llamar a la función para obtener los estudiantes
        getStudent();
    }, []);


    // funcion para traer los datos con el boton "buscar"
    async function getDataByButton() {
        setLoading(true);
        try {
            const data = {
                rol: user.rol,
                fecha: selectedDate || null,
                fechaHasta: selectedRangoDate || null,
                estudiante: estudent || null,
                id_user: user.id_usuario,
                semestre: semestreActual
            };
            const res = await postData("lista_asistencia/", data);
            if (res) {
                setData(res);
                setRecords(res);
            }
            console.log("resultado:", res)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Limpiar todos los filtros y restaurar tabla
    const handleClearFilters = () => {
        setEstudent("");
        setSelectedDate("");
        setSelectedRangoDate("");
        setRecords(initialData);
        setData(initialData);
    };

    // Manejo de selección de filas
    // const handleSelectedRowsChange = ({ selectedRows }) => {
    //     setSelectedRows(selectedRows);
    // };

    // 1. Contador dinámico de seleccionados basado en localChanges
    const selectedCount = records.filter(
        (row) => localChanges[row.id]?.check_asistencia ?? row.check_asistencia
    ).length;

    // 2. Comprobar si todos los registros visibles están seleccionados
    const isAllSelected = records.length > 0 && selectedCount === records.length;

    // 3. Función para marcar o desmarcar todos desde el checkbox de la cabecera
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setLocalChanges((prev) => {
            const next = { ...prev };
            records.forEach((row) => {
                next[row.id] = {
                    ...row,
                    check_asistencia: isChecked,
                };
            });
            return next;
        });
    };

    // Columnas de la tabla
    const columns = [
        {
            name: (
                <input
                    type="checkbox"
                    className="asistencia-checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    title="Seleccionar todos"
                />
            ),
            width: "60px",
            center: true,
            cell: (row) => {
                const isChecked = localChanges[row.id]?.check_asistencia ?? row.check_asistencia;
                return (
                    <input
                        type="checkbox"
                        className="asistencia-checkbox"
                        checked={!!isChecked}
                        onChange={() => handleCheckboxChange(row)}
                    />
                );
            },
        },
        {
            name: (
                <div className="d-flex align-items-center gap-1">
                    <span>Fecha de la monitoria</span>
                    <FiFilter className="asistencia-filter-funnel" />
                </div>
            ),
            selector: (row) => formatDate(row.fecha),
            sortable: true,
            width: "190px",
        },
        {
            name: (
                <div className="d-flex align-items-center gap-1">
                    <span>Codigo del estudiante</span>
                    <FiFilter className="asistencia-filter-funnel" />
                </div>
            ),
            selector: (row) => row.estudiante_data?.cod_univalle,
            sortable: true,
            width: "200px",
        },
        {
            name: (
                <div className="d-flex align-items-center gap-1">
                    <span>Nombre del estudiante</span>
                    <FiFilter className="asistencia-filter-funnel" />
                </div>
            ),
            selector: (row) => `${row.estudiante_data?.nombre || ""} ${row.estudiante_data?.apellido || ""}`.toUpperCase(),
            sortable: true,
            //grow: 1.5,
        },
        {
            name: (
                <div className="d-flex align-items-center gap-1">
                    <span>Monitoria</span>
                    <FiFilter className="asistencia-filter-funnel" />
                </div>
            ),
            selector: (row) => (row.monitoria_data?.materia || "").toUpperCase(),
            sortable: true,
            //grow: 1.2,
        },
        {
            name: (
                <div className="d-flex align-items-center gap-1">
                    <span>Nombre del monitor</span>
                    <FiFilter className="asistencia-filter-funnel" />
                </div>
            ),
            selector: (row) => `${row.monitoria_data?.nombre_monitor || ""} ${row.monitoria_data?.apellido_monitor || ""}`.toUpperCase(),
            sortable: true,
            //grow: 1.3,
        },

    ];

    // Estilos personalizados para react-data-table-component
    const customTableStyles = {
        table: {
            style: {
                backgroundColor: "#ffffff",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#ffffff",
                borderBottomColor: "#e2e8f0",
                minHeight: "52px",
            },
        },
        headCells: {
            style: {
                fontSize: "0.86rem",
                fontWeight: "700",
                color: "#1e293b",
                paddingLeft: "16px",
                paddingRight: "16px",
            },
        },
        rows: {
            style: {
                fontSize: "0.85rem",
                color: "#334155",
                minHeight: "48px",
                "&:hover": {
                    backgroundColor: "#f8fafc",
                },
            },
        },
    };

    // Esquemas para generar el archivo Excel
    var schema_asistencia = [
        {
            column: "Código del Estudiante",
            type: String,
            value: (row) => row.estudiante_data.cod_univalle,
        },
        {
            column: "Nombre del Estudiante",
            type: String,
            value: (row) => `${row.estudiante_data.nombre} ${row.estudiante_data.apellido}`,
        },
        {
            column: "Monitoría",
            type: String,
            value: (row) => row.monitoria_data.materia,
        },
        {
            column: "Nombre del Monitor",
            type: String,
            value: (row) => `${row.monitoria_data.nombre_monitor} ${row.monitoria_data.apellido_monitor}`,
        },
        {
            column: "Fecha",
            type: String,
            value: (row) => row.fecha,
        },
        {
            column: "Asistencia",
            type: String,
            value: (row) => row.check_asistencia ? "Sí" : "No",
        },
    ];


    // funcion para generar el archivo Excel recive lo que este en data actualmente 
    const imprimir_excel = (data) => {
        try {
            writeXlsxFile(data, {
                schema: schema_asistencia,
                fileName: "Reporte Asistencia Academico - Estudiantes.xlsx",
            });
        } catch (error) {
            console.error("Error al generar el archivo Excel:", error);
        }
    };


    const headers = [
        { label: "Codigo del estudiante", key: "estudiante_data.cod_univalle" },
        { label: "Nombre del estudiante", key: "estudiante_data.nombre" },
        { label: "Apellido del estudiante", key: "estudiante_data.apellido" },
        { label: "Monitoría", key: "monitoria_data.materia" },
        { label: "Nombre del monitor", key: "monitoria_data.nombre_monitor" },
        { label: "Apellido del monitor", key: "monitoria_data.apellido_monitor" },
        { label: "Fecha", key: "fecha" },
        { label: "Asistió", key: "check_asistencia" }
    ];

    // Función para manejar los cambios en los checkboxes, cambia los estados del checkbox 
    // en una variable que contiene una copia de los estudiantes.  
    const handleCheckboxChange = (row) => {
        // Guardar los cambios en un estado temporal local
        setLocalChanges(prevChanges => ({
            ...prevChanges,
            [row.id]: {
                ...row,
                check_asistencia: !localChanges[row.id]?.check_asistencia ?? row.check_asistencia,
            }
        }));
    };

    // Función para buscar estudiantes por nombre o código
    // Esta funcion se ejecuta sobre el conjunto de datos que se trae por fechas
    const handleSearch = (e) => {
        setEstudent(e.target.value);
        const searchTerm = e.target.value.toLowerCase();
        // Si el campo de búsqueda está vacío, restauramos los datos originales
        if (!searchTerm) {
            setRecords(data);
            return;
        }
        // Filtrar los registros por nombre o código
        const filteredRecords = data.filter((one_data) => {
            const fullname = `${one_data.estudiante_data.nombre} ${one_data.estudiante_data.apellido}`.toLowerCase();
            const codigo = one_data.estudiante_data.cod_univalle.toLowerCase();
            return fullname.includes(searchTerm) || codigo.includes(searchTerm);
        });
        setRecords(filteredRecords);
    };

    // Función para guardar los cambios en la base de datos
    const saveData = async () => {
        // Fusionar los cambios locales con los registros originales
        const updatedRecords = records.map(record =>
            localChanges[record.id] ? { ...record, ...localChanges[record.id] } : record
        );

        // Mostrar un mensaje de confirmación antes de guardar los datos
        const isConfirm = await Swal.fire({
            title: "Mensaje de confirmación",
            text: "¿Seguro(a) desea guardar los datos de asistencia?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Sí',
            cancelButtonText: "No"
        });

        if (!isConfirm.isConfirmed) {
            return; // Si el usuario cancela, se sale de la función
        }

        try {
            // Envío de los registros actualizados
            const res = await postData("check_asistencia/", updatedRecords);
            if (res) {
                Swal.fire({
                    title: "Éxito",
                    text: "Los datos fueron guardados correctamente.",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // Manejo de errores de red o respuesta no esperada
            console.error('Error al guardar los datos:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al guardar los datos. Inténtalo nuevamente.",
                icon: "error",
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="asistencia-container">
            {/* 1. Header con indicador rojo */}
            <div className="asistencia-header-title">
                <span className="asistencia-indicator"></span>
                <h2>Control de asistencia</h2>
            </div>
            <p className="asistencia-header-subtitle">
                Consulta, selecciona y registra la asistencia de los estudiantes a las monitorias académicas.
            </p>
            {/* 2. Barra de Filtros */}
            <div className="asistencia-filters-bar">
                <div className="asistencia-search-wrapper">
                    <div className="asistencia-input-icon-group">
                        <FiSearch className="asistencia-search-icon" />
                        <input
                            type="text"
                            className="asistencia-search-input"
                            placeholder="Buscar por código o nombre completo..."
                            value={estudent}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="asistencia-date-group">
                    <label className="asistencia-date-label">Fecha de la monitoría desde</label>
                    <input
                        type="date"
                        className="asistencia-date-input"
                        value={selectedDate || ""}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            if (!e.target.value) setSelectedRangoDate("");
                        }}
                    />
                </div>
                <div className="asistencia-date-group">
                    <label className="asistencia-date-label">Fecha de la monitoría hasta</label>
                    <input
                        type="date"
                        className="asistencia-date-input"
                        value={selectedRangoDate || ""}
                        onChange={(e) => setSelectedRangoDate(e.target.value)}
                        disabled={!selectedDate}
                    />
                </div>
                <button
                    className="asistencia-btn-buscar"
                    onClick={getDataByButton}
                    disabled={loading}
                    type="button"
                >
                    <FiSearch />
                    <span>{loading ? "Buscando..." : "Buscar"}</span>
                </button>
                <button
                    className="asistencia-btn-limpiar"
                    onClick={handleClearFilters}
                    type="button"
                >
                    <BsArrowCounterclockwise />
                    <span>Limpiar filtros</span>
                </button>
            </div>
            {/* 3. Tabla DataTable en Tarjeta */}
            <div className="asistencia-table-card">
                <DataTable
                    columns={columns}
                    data={records}
                    //selectableRows
                    //onSelectedRowsChange={handleSelectedRowsChange}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    customStyles={customTableStyles}
                    noDataComponent={<div className="p-4 text-muted">No hay registros de asistencia para mostrar.</div>}
                />
            </div>
            {/* 4. Barra inferior de acciones */}
            {records && records.length > 0 && (

                <div className="asistencia-bottom-card">
                    <div className="asistencia-actions-left">
                        <div className="asistencia-actions-title">
                            <BsFileEarmarkCheck className="asistencia-doc-icon" />
                            <span>Acciones de asistencia</span>
                        </div>
                        <span className="asistencia-badge-selected">
                            {selectedCount} seleccionados
                        </span>
                        <button
                            onClick={saveData}
                            className="asistencia-btn-guardar"
                            type="button"
                        >
                            <FiSave />
                            <span>Guardar asistencia</span>
                        </button>
                    </div>
                    <div className="asistencia-actions-right">
                        <div className="asistencia-divider-vertical d-none d-md-block"></div>
                        <button
                            className="asistencia-btn-outline-green"
                            onClick={() => imprimir_excel(records)}
                            type="button"
                        >
                            <BsFileEarmarkSpreadsheet />
                            <span>Descargar Excel</span>
                        </button>
                        <CSVLink
                            data={data}
                            headers={headers}
                            filename={"asistencia-check.csv"}
                            className="asistencia-btn-outline-green"
                        >
                            <BsFiletypeCsv />
                            <span>Descargar CSV</span>
                        </CSVLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AcademicoCheck;