import React, {useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Select from 'react-select'  ;


const Tabla_sin_Seguimientos = () =>{

  const data = useMemo(()=> MOCK_DATA, []);


  const columnas2 = [
    {
      name:'ID',
      selector:'id',
      sortable: true,
    },

    

    {
      name:
      <Row className="center_tabla_sin_seguimientos">
      <h4 className="texto_mas_pequeño">Cedula</h4>
      <input onChange={handleFilter_cedula}/>
      </Row>,
      selector:'phone',
      sortable:true,
    },



    {
      name:
      <Row className="center_tabla_sin_seguimientos">
        <h4 className="texto_mas_pequeño">Nombres</h4>
        <input onChange={handleFilter_nombre}/>
      </Row>,
      selector:'first_name',
      sortable:true,
    },



    {
      name:
      <Row className="center_tabla_sin_seguimientos">
      <h4 className="texto_mas_pequeño">Apellidos</h4>
      <input onChange={handleFilter_apellido}/></Row>,
      selector:'last_name',
      sortable:true,
    },



    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Cantidad de fichas</h4>
        </Row>
</div>),
      selector:'phone',
      sortable:true
    },



    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Cantidad de inasistencias</h4>
        </Row>
</div>),
      selector:'age',
      sortable:true,
    },



    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Total de fichas</h4>
        </Row>
</div>),
      selector:'age',
      sortable:true,
    },



    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Monitor</h4>
            <input onChange={handleFilter_monitor}/>
            </Row>,
      selector:'last_name',
      sortable: true
    },



    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Practicante</h4>
            <input onChange={handleFilter_practicante}/>
          </Row>,
      selector:'first_name',
      sortable:true,
    },
    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Profecional</h4>
            <input onChange={handleFilter_profecional}/>
          </Row>,
      selector:'last_name',
      sortable:true,
    },

  ]
    



  const paginacionOpciones={
    rowsPerPageText:'textooooo',
    rangeSeparratorText:'de',
    selectAllRowsItem:true,
    selectAllRowsItemtEXT:'TODO',

  }


  const [records, setRecords] = useState(MOCK_DATA);




  function handleFilter_cedula(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.phone.includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }


  function handleFilter_nombre(event) {
    const newData = MOCK_DATA.filter(row => {
      return row.first_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }
  
  function handleFilter_apellido(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.last_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  function handleFilter_monitor(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.last_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  function handleFilter_practicante(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.first_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  function handleFilter_profecional(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.last_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }











    return (
        
        <Container >
          <Row>
            <Cabecera/>
          </Row>
          <Row>
            <DataTableExtensions
            columns={columnas2}
            data={records}
            filter={true}
            filterPlaceHolder={2}
            filterDigit={'1'}
            exportHeaders={true}
            >
              
            <DataTable
            pagination 
            paginationRowsPerPageOptions={[10,20,30,40,50,100]}
            paginationComponentOptions={paginacionOpciones}            
            />
            </DataTableExtensions>
            
          </Row>

        </Container>
    )
}

export default Tabla_sin_Seguimientos 