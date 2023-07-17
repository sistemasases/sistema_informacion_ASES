import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button,Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import carga_masiva_service from '../../service/carga_masiva';
import DataTable, {createTheme} from 'react-data-table-component';

const Carga_masiva_component = () =>{

  const[switchChecked, setChecked] = useState(false);
  const url_carga = "http://127.0.0.1:8000/carga_masiva/carga/"
  

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

    console.log(e.target.files)
    set_archivo(e.target.files[0])
  }
  const handle_options = (e) => {
    // Getting the files from the input
    console.log(e.target.value)
    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }
  const handle_upload=(e)=> {
    let option = [state.option];
    let formData = new FormData();
    console.log(archivo)
  
    //Adding files to the formdata
    formData.append("tipo_de_carga", option);
    formData.append("FILES", archivo);

    axios({
      // Endpoint to send files
      url: url_carga,
      method: "POST",
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
    console.log(state.mensaje)
    console.log(state.respuesta)

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
                  <option value="Usuario">Usuario</option>
                  <option value="Materia">Materia</option>
                  <option value="Nota">Nota</option>
                  <option value="Programa">Programa</option>
                  <option value="Retiro">Retiro</option>
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


  
  
  
