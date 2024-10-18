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
  const [dates, setDates] = useState({ initialDate: null, finalDate: null });
  const [today, setToday] = useState('');
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);

  // Se ejecuta al cargar el componente para obtener la fecha actual
  useEffect(() => {
    setToday(currentDate());
  }, []);

    // Se ejecuta al cargar el componente para obtener la fecha actual 
    // y mostrar los estudiantes que asistieron desde 2024-09-01 hasta la fecha actual
    useEffect(() => {
      // Si no hay fecha, no se hace nada
      if  (today === '') {
          return;
      }
      setDates({ initialDate: "2024-09-01", finalDate: today });
      // Función para obtener los estudiantes inscritos en la monitoría
      const getAttendance = async () => {
          // Obtener los registros de asistencia en el rango de fechas seleccionado
          const res = await postData("fecha_asistencia/", {fecha_ini:"2024-09-01", fecha_final:today});
          if (res) {
              // Guardar los registros originales en data
              setData(res);
          }
      };
      // Llamar a la función para obtener los estudiantes
      getAttendance();
  }, [today]); 
  
  // Se ejecuta al cambiar la lista de estudiantes a revisar, para actualizar la tabla.
  useEffect(() => {
      setRecords(data);
  }, [data]);

    // Columnas de la tabla
    const columns = [
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

    const headers = [ {label: "Nombre del estudiante", key:"estudiante_data.nombre"}, 
                      {label: "Apellido del estudiante", key:"estudiante_data.apellido"}, 
                      {label: "Monitoría", key:"monitoria_data.materia"}, 
                      {label: "Nombres del monitor", key:"monitoria_data.nombre_monitor"}, 
                      {label: "Apellidos del monitor", key:"monitoria_data.apellido_monitor"}, 
                      {label: "Fecha", key:"fecha"}];

    const handleDateChange = (e) => setDates({ ...dates, [e.target.name]: e.target.value });
    
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
        const dates_range = { "fecha_ini": dates.initialDate, "fecha_final": dates.finalDate };
        // Obtener los registros de asistencia en el rango de fechas seleccionado
        const filteredRecords = await postData("fecha_asistencia/", dates_range);   
        // Actualizar los registros a mostrar en la tabla
        setRecords(filteredRecords); 
    };

    const resturarTable = () => {
        setRecords(data);
        setDates({ initialDate: "2024-09-01", finalDate: today });
    }
    return(<>
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
          <button onClick={searchRange} className="btn btn-primary mx-3">Buscar</button>
          <button onClick={resturarTable} className="btn btn-secondary">Restaurar</button>
          <DataTable
              columns={columns}
              data={records}
              pagination
              paginationPerPage={8}
              fixedHeader
          />
          <div>
            <DownloadCSV data={records} headers={headers} filename={"asistencia.csv"} />
          </div>
        </div>
    </>)
}

export default AcademicoListado;