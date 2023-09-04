import React, {useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import  {useEffect} from 'react';
import axios from 'axios';


const Tabla_sin_Seguimientos = (props) =>{

  const config = {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

  const [state,set_state] = useState({
    id_semestre : sessionStorage.getItem('id_semestre_actual'),
    la_info_de_la_tabla : [],
  })

  useEffect(()=>{
      const paramsget = {
        id_sede: sessionStorage.getItem('sede_id'),
      };
      axios({
        // Endpoint to send files
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/info_estudiantes_sin_seguimientos/`+state.id_semestre+"/",
        params : paramsget,
        method: "GET",
        headers: config,
      })
      .then((respuesta)=>{
        set_state({
          la_info_de_la_tabla : respuesta.data
        })
          setRecords(respuesta.data)
        })
      .catch(err=>{
          console.log("no llega :"+err)
      })
    
  },[state.id_semestre]);

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


  const [records, setRecords] = useState(state.la_info_de_la_tabla);
  const [noResults, setNoResults] = useState(false);



  function handleFilter_cedula(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.cedula.toString().includes(event.target.value));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }

  function handleFilter_nombre(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.nombres.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_apellido(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.apellidos.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_monitor(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.monitor.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_practicante(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.practicante.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }
  
  function handleFilter_profesional(event) {
    const newData = state.la_info_de_la_tabla.filter(row => row.profesional.toLowerCase().includes(event.target.value.toLowerCase()));
    const updatedData = newData.length > 0 ? newData : state.la_info_de_la_tabla;
    setRecords(updatedData);
    setNoResults(newData.length === 0);
  }


  function semestre_seleccion(name) {
    set_state({
      ...state,
      id_semestre: name,
    });
  }





    return (
        
        <Container >
          <Row>
            <Cabecera childClicked={(name) => semestre_seleccion(name)}/>
          </Row>
          {noResults && (
            <div className="alert alert-warning" role="alert">
              No se encontraron resultados.
            </div>
          )}
          {
            records.length > 0 ?
            (
              <Row>
              <DataTableExtensions
                columns={columnas2}
                data={records}
                filter={true}
                filterPlaceHolder={2}
                filterDigit={1}
                exportHeaders={true}>

                <DataTable
                  pagination 
                  paginationRowsPerPageOptions={[10,20,30,40,50,100]}
                  paginationComponentOptions={paginacionOpciones}
                  striped      
                  />
              </DataTableExtensions>
                
              </Row>
            )
            :
            (
              <div className="alert alert-warning" role="alert">
                Cargando...
              </div>
            )
          }
          
        </Container>
    )
}

export default Tabla_sin_Seguimientos 