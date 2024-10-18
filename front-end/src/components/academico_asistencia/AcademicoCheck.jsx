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
import swal from "sweetalert";
import { currentDate } from "../../utils/basic_functions";

const AcademicoCheck = () => {

    // Variables de estado
    const { user } = useAuthStore();
    const [today, setToday] = useState('');
    const [records, setRecords] = useState([]);	
    const [data, setData] = useState([]);	
    const [localChanges, setLocalChanges] = useState({});

    // Se ejecuta al cargar el componente para obtener la fecha actual
    useEffect(() => {
        setToday(currentDate());
    }, []);

    // Se ejecuta al cambiar la fecha actual, para obtener los estudiantes 
    // inscritos en la monitoría en un día específico
    useEffect(() => {
        // Si no hay fecha, no se hace nada
        if  (today === '') {
            return;
        }
        // Función para obtener los estudiantes inscritos en la monitoría
        const getStudent = async () => {
            const data = {
                rol: user.rol,
                fecha: today,
                id_user: user.id_usuario
            };
            const res = await postData("lista_asistencia/", data);
            if (res) {
                // Guardar los registros originales en data
                setData(res);
            }
            console.log(records);
        };
        // Llamar a la función para obtener los estudiantes
        getStudent();
    }, [today]); 
    
    // Se ejecuta al cambiar la lista de estudiantes a revisar, para actualizar la tabla.
    useEffect(() => {
        setRecords(data);
    }, [data]);
     
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
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Si el campo de búsqueda está vacío, restauramos los datos originales
        if (!searchTerm) {
            setRecords(data); 
            return;
        }
        const filteredRecords = records.filter((record) => {
            const fullname = `${record.estudiante_data.nombre} ${record.estudiante_data.apellido}`.toLowerCase();
            const codigo = record.estudiante_data.cod_univalle.toLowerCase(); 
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

        // Envío de los registros actualizados
        const res = await postData("check_asistencia/", updatedRecords); 
        // Si la respuesta es exitosa, se muestra un mensaje de éxito
        if (res) {
            swal({
                title: "Éxito",
                text: "Los datos fueron guardados correctamente.",
                icon: "success",
                buttons: false, 
                timer: 3000, 
            });
        }
        // Si la respuesta no es exitosa, se muestra un mensaje de error 
        else {
            swal({
                title: "Error",
                text: "Hubo un problema al guardar los datos. Inténtalo nuevamente.",
                icon: "error",
                buttons: false, 
                timer: 3000, 
            });
        }
    };

    return(<>
        <div className="container_tabla mx-auto w-80 text-center">
            <input
                type="text"
                placeholder="Buscar estudiante por codigo o por nombre completo"
                onChange={handleSearch}
            />
            <input 
                type="date" 
                value={today} 
                onChange={(e) => setToday(e.target.value)} 
            />
            <DataTable
                columns={columns}
                data={records}
                pagination
                paginationPerPage={8}
                fixedHeader
            />
            {records && records.length > 0 && (
                <button onClick={saveData} className="btn btn-success mb-3">
                    Guardar
                </button>
            )}
        </div>
    </>)
}

export default AcademicoCheck;