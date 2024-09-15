import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../../Scss/academico/tablas.css";

const AcademicoCheck = () => {

    useEffect(() => {
        currentDate();
    }, []); // Se ejecuta una vez al cargar el componente

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
      ];

    const data = [
        {
            nombre: 'Juan Carlos Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes'
        },
        {
            nombre: 'Juan Carlos Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes'
        },
        {
            nombre: 'Ramirito Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes'
        },
    ]

    const [records, setRecords] = useState(data);

    const handleSearch = (e) => {
        const filteredRecords = data.filter((record) => {
          return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setRecords(filteredRecords);
      };
      const [today, setToday] = useState('');

    const currentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses de 1 a 12
        const day = String(currentDate.getDate()).padStart(2, '0'); // Día del mes
        const formattedDate = `${year}-${month}-${day}`;
        setToday(formattedDate);
    }
    const saveData = () => {};
    return(<>
        <div className="container_tabla mx-auto w-80 text-center">
            <input
                type="text"
                placeholder="Buscar estudiante"
                onChange={handleSearch}
            />
            <input 
                type="date" 
                value={today} 
                onChange={(e) => setToday(e.target.value)} 
                disabled
            />
            <DataTable
                columns={columns}
                data={records}
                pagination
                paginationPerPage={8}
                fixedHeader
                selectableRows
                onSelectedRowsChange={data => console.log(data)}
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