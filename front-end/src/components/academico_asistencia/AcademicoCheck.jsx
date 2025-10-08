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

const AcademicoCheck = () => {

    // Variables de estado
    const { user } = useAuthStore();
    const [selectedDate, setSelectedDate] = useState(currentDate());
    const [selectedRangoDate, setSelectedRangoDate] = useState();
    const [estudent, setEstudent] = useState();
    const [records, setRecords] = useState([]);	
    const [data, setData] = useState([]);	
    const [localChanges, setLocalChanges] = useState({});
    const [loading, setLoading] = useState(false);
    const semestreActual = desencriptarInt(sessionStorage.getItem("id_semestre_actual"));


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
            console.log("resultado:",res)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);  
        }
    }

    


    // Columnas de la tabla
    const columns = [
        {
            name: "Seleccionar",
            cell: (row) => (
                <input
                    type="checkbox"
                    checked={localChanges[row.id]?.check_asistencia ?? row.check_asistencia}
                    onChange={() => handleCheckboxChange(row)}
                />
            ),
        },
        {
            name: "Codigo del estudiante",
            selector: (row) => row.estudiante_data.cod_univalle,
            sortable: true,
        },
        {
            name: "Nombre del estudiante",
            selector: (row) => `${row.estudiante_data.nombre} ${row.estudiante_data.apellido}`,
            sortable: true,
        },
        {
            name: "Monitoría",
            selector: (row) => row.monitoria_data.materia,
            sortable: true,
        },
        {
            name: "Nombre del monitor",
            selector: (row) => `${row.monitoria_data.nombre_monitor} ${row.monitoria_data.apellido_monitor}`,
            sortable: true,
        },
        {
            name: "Fecha",
            selector: (row) => `${row.fecha}`,
            sortable: true,
        }
      ];

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
            return  fullname.includes(searchTerm) || codigo.includes(searchTerm);
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
    
    return(<>
        <div className="container_tabla mx-auto w-60 text-center">
            <input
                value={estudent}
                type="text"
                placeholder="Buscar estudiante por codigo o por nombre completo"
                onChange={handleSearch}
            />
            <label className="date-label">
                Desde:
                <input 
                    type="date" 
                    value={selectedDate || ''} 
                    onChange={(e) => {
                        setSelectedDate(e.target.value)
                        if (!e.target.value ){
                            setSelectedRangoDate('');
                        }
                    }} 
                />
            </label>

            <label className="date-label">
                Hasta:
                <input 
                    type="date" 
                    value={selectedRangoDate || ''} 
                    onChange={(e) => setSelectedRangoDate(e.target.value)} 
                    disabled={!selectedDate}
                />
                
            </label>

            <button 
                className = "btn btn-primary"
                onClick={getDataByButton}
                disabled={loading}  
            >
                {loading ? "Buscando..." : "Buscar"}
                {loading && (
                    <div 
                        className="spinner-border spinner-border-sm text-danger" 
                        role="status"
                        style={{ color: "#dc143c" }} 
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                )}
            </button>
            <DataTable
                columns={columns}
                data={records}
                pagination
                paginationPerPage={8}
                fixedHeader
            />
            
        </div>
        {records && records.length > 0 && (
        <div className="button-group">
            <button onClick={saveData} className="btn btn-success">
                Guardar
            </button>
            
            <DownloadCSV
                data={data}
                headers={headers}
                filename={"asistencia-check.csv"}
            /> 

            <button
            className="btn btn-success"
            onClick={() => imprimir_excel(data)}
            >
                Descargar Excel
            </button>
        </div>
        )}
    </>)
}

export default AcademicoCheck;