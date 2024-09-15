import { useState } from "react";
import DataTable from "react-data-table-component";
import "../../Scss/academico/tablas.css";

const AcademicoCheck = () => {
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
          name: "Asistió?",
            cell: (row) => (
                <>
                <input type="checkbox" checked={false} />
                </>
            ),
        },
      ];

    const data = [
        {
            nombre: 'Juan Carlos Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes',
            bool_asistio: true
        },
        {
            nombre: 'Juan Carlos Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes',
            bool_asistio: false
        },
        {
            nombre: 'Ramirito Aldama de la Cruz',
            monitoria: 'Matemáticas',
            monitor_nombre: 'Pedro Fernando Sanroman del Montes',
            bool_asistio: true
        },
    ]

    const [records, setRecords] = useState(data);

    const handleSearch = (e) => {
        const filteredRecords = data.filter((record) => {
          return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setRecords(filteredRecords);
      };
    const saveData = () => {};
    return(<>
        <div className="container_tabla mx-auto w-80 text-center">
            <input
                type="text"
                placeholder="Buscar estudiante"
                onChange={handleSearch}
            />
            <DataTable
                columns={columns}
                data={records}
                pagination
                paginationPerPage={8}
                fixedHeader
            />
            <button onClick={saveData} className="btn btn-success">Guardar</button>
        </div>
    </>)
}

export default AcademicoCheck;