/**
  * @file carga_masiva_component.jsx
  * @version 1.0.0
  * @description Componente para la vista de carga masiva.
  * @author Cesar Becerra
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Button,Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import DataTable from 'react-data-table-component';
import { decryptTokenFromSessionStorage } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx'


/**
 * Carga_masiva_component
 * Componente para carga masiva de datos (con archivos csv).
 * @returns {JSX.Element} Componente Carga_masiva_component.
 */
const Carga_masiva_component = () =>{
  // Configuración para la autorización de la API
  const config = {
    //Token de sesión
    Authorization: 'Bearer ' +  decryptTokenFromSessionStorage()
  };

  const[switchChecked, setChecked] = useState(false);
  const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva/carga/`
  
  // Estados para almacenar la opción seleccionada, mensajes y respuesta de carga
  const [state,set_state] = useState({
    option : 'Estudiante',
    mensaje : [],
    respuesta : 'Cargando...',
  })
  // Estado para almacenar el archivo seleccionado
  const [archivo,set_archivo] = useState(null);

  // Estado para controlar la visibilidad del modal de estado de carga
  const [show, setShow] = useState(false);

  // Columnas para la tabla de mensajes de carga
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

  // Manejador para el cambio de archivo seleccionado
  const handle_file = (e) => {
    set_archivo(e.target.files[0])
  }

  // Manejador para el cambio de opción seleccionada
  const handle_options = (e) => {
    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }

  // Función para subir el archivo seleccionado
  const handle_upload=(e)=> {
    let option = [state.option];
    let formData = new FormData();

  
    // Agregar el archivo al formData
    formData.append("tipo_de_carga", option);
    formData.append("FILES", archivo);

    axios({
      // Endpoint para enviar archivos
      url: url_carga,
      method: "POST",
      headers: config,
      data: formData,
    })
    .then((res)=>{
      //console.log(res)
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
  // Función para cerrar el modal de estado de carga
  const set_info = (e) => {
    setShow(false)
    set_state({
      ...state,
      respuesta : 'Cargando...',
    })
  }

  // Función para cerrar el modal
  const handleClose = () => setShow(false);

  //Renderizar el componente
  return (
        <Container className="mi-clase-background">

            <Row className='mt-2' >

            <h5>Tipo de Carga</h5>

              <Col sm={9}>
                <Form.Select name= "option" onChange={handle_options} >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Activar_estudiante">Activar estudiante</option>
                  <option value="Programa_estudiante">Programa estudiante</option>
                  <option value="Estudiante_Cohorte">Cohorte estudiante</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Usuario_rol">Usuario rol</option>
                  <option value="Programa">Programa</option>
                  <option value="Materia">Materia</option>
                  <option value="Matricula">Matricula</option>
                  <option value="Ficha">Ficha de seguimiento</option>
                  <option value="FichaV2">Ficha de seguimiento con Código</option>
                  <option value="Inasistencia">Inasistencia</option>
                  <option value="Dir_programa">Director de programa</option>
                  <option value="Vcd_academico">Vicedecano</option>
                  <option value="Cambio_contrasena">Contraseña</option>
                  <option value="Eliminar_matricula">Eliminar matricula</option>
                  <option value="Firma_datos">Firma Trtamiento de Datos</option>
                  <option value="estudiante_disc">Estudiante Discapacidad</option>
                  <option value="volver_estudiante_disc">Activar estudiante Discapacidad</option>
                  <option value="quitar_estudiante_disc">Eliminar estudiante Discapacidad</option>
                  <option value="asignacion_disc">Asignación Discapacidad</option>
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