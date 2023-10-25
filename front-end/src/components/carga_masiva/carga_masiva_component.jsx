import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button,Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import carga_masiva_service from '../../service/carga_masiva';
import DataTable, {createTheme} from 'react-data-table-component';
import { decryptTokenFromSessionStorage } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';


const Carga_masiva_component = () =>{

  const config = {
     
    Authorization: 'Bearer ' +  decryptTokenFromSessionStorage()
   
  };

  const[switchChecked, setChecked] = useState(false);
  const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva/carga/`
  

  const [state,set_state] = useState({
    option : 'Estudiante',
    mensaje : [],
    respuesta : 'Cargando...',
  })
  const [archivo,set_archivo] = useState(null);
  const [show, setShow] = useState(false);
  const columnas =[
    {
      name: 'DATO',
      selector: row => row.dato,
      sortable: true,
    },
    {
      name: 'MENSAJE',
      selector: row => row.mensaje,
      sortable: true,
      grow : 2,
    },
  ]

  const handle_file = (e) => {

    set_archivo(e.target.files[0])
  }
  const handle_options = (e) => {

    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }
  const handle_upload=(e)=> {
    let option = [state.option];
    let formData = new FormData();

  
    //Adding files to the formdata
    formData.append("tipo_de_carga", option);
    formData.append("FILES", archivo);

    axios({
      // Endpoint to send files
      url: url_carga,
      method: "POST",
      headers: config,
      data: formData,
    })
    .then((res)=>{
      console.log(res)
      set_state({
        ...state,
        mensaje : res.data,
        respuesta: "Carga finalizada."
      })
    })
    .catch(err=>{
      set_state({
        ...state,
        respuesta: "ocurrio un error"
    })})
    setShow(true)

  }
  const set_info = (e) => {
    setShow(false)
    set_state({
      ...state,
      respuesta : 'Cargando...',
    })
  }
  const handleClose = () => setShow(false);

  return (
        <Container className="mi-clase-background">

            <Row className='mt-2' >

            <h5>Tipo de Carga</h5>

              <Col sm={9}>
                <Form.Select name= "option" onChange={handle_options} >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Programa_estudiante">Programa estudiante</option>
                  <option value="Estudiante_Cohorte">Cohorte estudiante</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Programa">Programa</option>
                  <option value="Materia">Materia</option>
                  <option value="Matricula">Matricula</option>
                  <option value="Retiro">Retiro</option>
                  <option value="Ficha">Ficha de seguimiento</option>
                  <option value="Inasistencia">Inasistencia</option>
                  <option value="Dir_programa">Director de programa</option>
                  <option value="Vcd_academico">Vicedecano</option>
                  <option value="Cambio_contrasena">Contraseña</option>
                  <option value="Eliminar_matricula">Eliminar matricula</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col sm={9}>
                <Form.Control type="file" name='file' onChange={handle_file}/>   
              </Col>
              <a href="https://docs.google.com/spreadsheets/d/1NcB2BQFo5yigrm4ffls7pNoGoCi766Pe7bXbfNOwDQY/edit#gid=0" target="_blank">Plantillas de Carga</a>
    
            </Row>
            <Row className='mt-2'>
              <Col lg={{ span: 0, offset: 0}} >
                  <Button onClick={handle_upload}>Subir</Button>
              </Col>
            </Row>
            <Row className='mt-2' >
                <DataTable 
                  columns={columnas}
                  data={state.mensaje}
                  noDataComponent=""
                  pagination
                />
            </Row>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>ESTADO CARGA</Modal.Title>
              </Modal.Header>
              <Modal.Body>{state.respuesta}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={set_info}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
        </Container>
  )
}

export default Carga_masiva_component


  
  
  
