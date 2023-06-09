import React, {useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Select from 'react-select'  ;

const Tabla_desercion = () =>{

  const data = useMemo(()=> MOCK_DATA, []);



  const columns = [
    { name: 'ID Estudiante', selector: 'id_estudiante', sortable: true },
    { name: 'Tiempo Creación', selector: 'tiempo_creacion', sortable: true },
    { name: 'Periodos', selector: 'periodos', cell: (row) => JSON.stringify(row.periodos) },
  ];
    

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

  function handleFilter_codigo(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.id.includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  function handleFilter_practicante(event) {

    const newData = MOCK_DATA.filter(row => {
      return row.first_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  function handleFilter_profesional(event) {

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
            columns={columns}
            data={records}
            filter={true}
            exportHeaders={true}
            >
              
            <DataTable
            columns={columns}
            data={MOCK_DATA}
            pagination 
            paginationRowsPerPageOptions={[10,20,30,40,50,100]}
            paginationComponentOptions={paginacionOpciones}            
            />
            </DataTableExtensions>
          </Row>
          
        </Container>
    )
}

export default Tabla_desercion 