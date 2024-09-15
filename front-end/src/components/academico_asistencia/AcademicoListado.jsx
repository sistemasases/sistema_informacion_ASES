import { useState } from "react";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import DownloadCSV from "./DownloadCSV";

const AcademicoListado = () => {
  const [dates, setDates] = useState({ initialDate: null, finalDate: null });
    const columns = [
        {
          name: "Nombre del estudiante",
          selector: (row) => row.nombre,
          sortable: true,
        },
        {
          name: "Monitoría",
          selector: (row) => row.monitoria,
          sortable: true,
        },
        {
            name: "Nombre del monitor",
            selector: (row) => row.monitor_nombre,
            sortable: true,
        },
        {
            name: "Fecha",
            selector: (row) => row.fecha,
            sortable: true,
        },
        {
          name: "Asistió?",
            cell: (row) => (
                <>
                <input type="checkbox" checked={row.bool_asistio} disabled />
                </>
            ),
        },
      ];
    const headers = [{label: "Nombre del estudiante", key:"nombre"}, 
                      {label: "Monitoría", key:"monitoria"}, 
                      {label: "Nombre del monitor", key:"monitor_nombre"}, 
                      {label: "Fecha", key:"fecha"}, 
                      {label: "Asistió?", key:"bool_asistio"}];
    const data = [
        {
            nombre: 'Juan',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro',
            fecha: '2021-09-15',
            bool_asistio: true
        },
        {
            nombre: 'Juan',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro',
            fecha: '2023-09-15',
            bool_asistio: false
        },
        {
            nombre: 'Juan',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro',
            fecha: '2022-09-30',
            bool_asistio: true
        },
    ]
    const [records, setRecords] = useState(data);

    const handleDateChange = (e) => setDates({ ...dates, [e.target.name]: e.target.value });
    
    const searchRange = () => {
        if (!(dates.initialDate && dates.finalDate)) {
          // Mostrar mensaje: debe seleccionar ambas fechas
          swal("Debe seleccionar ambas fechas");
          return;
        }
        else if (dates.initialDate > dates.finalDate) {
          // Mostrar mensaje: la fecha inicial debe ser menor a la fecha final
          swal("La fecha inicial debe ser menor a la fecha final");
          return;
        }
        // Filtrar registros por rango de fechas
        const filteredRecords = data.filter((record) => {
            return record.fecha >= dates.initialDate && record.fecha <= dates.finalDate;
          });
        setRecords(filteredRecords); 
    };

    const resturarTable = () => {
        setRecords(data);
        //setDates({ initialDate: null, finalDate: null });
    }
    return(<>
        <div className="container_tabla">
          <input
              name="initialDate"
              className="input_lenght"
              type="date"
              placeholder="Fecha inicio"
              onChange={handleDateChange}
          />
          <input
              name="finalDate"
              className="input_lenght"
              type="date"
              placeholder="Fecha fin"
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