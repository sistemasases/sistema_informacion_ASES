import React, {useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import  {useEffect} from 'react';
import axios from 'axios';
import MOCK_DATA from './MOCK_DATA.json';


const Tabla_sin_Seguimientos = () =>{

  const data_tabla = []
  const [state,set_state] = useState({
    semestre_Seleccionado : '',
  })

  // useEffect(async()=>{
    

  //   try {
  //     const respuesta = await axios.get("http://localhost:8000/usuario_rol/info_estudiantes_sin_seguimientos/");
  //     data_tabla = respuesta.data
  //     console.log("estos son los primeros datos :"+respuesta.data)
  //   }catch (err) {
  //     console.log("no llega :"+data_tabla)
  //   }
    
    
  // },[]);

  const  mostrar = async (e) =>{

    try {
      const respuesta = await axios.get("http://localhost:8000/usuario_rol/info_estudiantes_sin_seguimientos/");
      data_tabla = respuesta.data
      console.log("estos son los primeros datos :"+respuesta.data)
    }catch (err) {
      console.log("no llega :"+data_tabla)
    }
  }

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
      selector:'cedula',
      sortable:true,
    },


    {
      name:
      <Row className="center_tabla_sin_seguimientos">
        <h4 className="texto_mas_pequeño">Nombres</h4>
        <input onChange={handleFilter_nombre}/>
      </Row>,
      selector:'nombres',
      sortable:true,
    },


    {
      name:
      <Row className="center_tabla_sin_seguimientos">
        <h4 className="texto_mas_pequeño">Apellidos</h4>
        <input onChange={handleFilter_apellido}/>
      </Row>,
      selector:'apellidos',
      sortable:true,
    },


    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Cantidad de fichas</h4>
        </Row>
            </div>),
      selector:'cantidad_de_fichas',
      sortable:true
    },


    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Cantidad de inasistencias</h4>
        </Row>
</div>),
      selector:'cantidad_de_inasistencias',
      sortable:true,
    },


    {
      name:(<div>
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">Total de fichas</h4>
        </Row>
</div>),
      selector:'total_fichas',
      sortable:true,
    },


    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Monitor</h4>
            <input onChange={handleFilter_monitor}/>
          </Row>,
      selector:'monitor',
      sortable: true
    },


    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">Practicante</h4>
            <input onChange={handleFilter_practicante}/>
          </Row>,
      selector:'practicante',
      sortable:true,
    },


    {
      name:
          <Row className="center_tabla_sin_seguimientos">
            <h4 className="texto_mas_pequeño">profesional</h4>
            <input onChange={handleFilter_profesional}/>
          </Row>,
      selector:'profesional',
      sortable:true,
    },
  ]
    



  const paginacionOpciones={
    rowsPerPageText:'textooooo',
    rangeSeparratorText:'de',
    selectAllRowsItem:true,
    selectAllRowsItemtEXT:'TODO',

  }


  const [records, setRecords] = useState(data_tabla);
  const [noResults, setNoResults] = useState(false);



  function handleFilter_cedula(event) {
    const newData = data_tabla.filter(row => row.cedula.toString().includes(event.target.value));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  function handleFilter_nombre(event) {
    const newData = data_tabla.filter(row => row.nombres.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_apellido(event) {
    const newData = data_tabla.filter(row => row.apellidos.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_monitor(event) {
    const newData = data_tabla.filter(row => row.monitor.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_practicante(event) {
    const newData = data_tabla.filter(row => row.practicante.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_profesional(event) {
    const newData = data_tabla.filter(row => row.profesional.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : data_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }











    return (
        
        <Container >
          <Row>
            <Cabecera/>
          </Row>
          {noResults && (
            <div className="alert alert-warning" role="alert">
              No se encontraron resultados.
            </div>
          )}
          {
            data_tabla.length > 0 ?
            (
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
            )
            :
            (
              <div className="alert alert-warning" role="alert">
                Cargando...
                <Button onClick={mostrar}>traer información</Button>
              </div>
            )
          }
          
        </Container>
    )
}

export default Tabla_sin_Seguimientos 