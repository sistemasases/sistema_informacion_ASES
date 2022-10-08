import React, {useState} from 'react';
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_user_service from '../../service/all_users'
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
const selector_usuarios = () =>{

  const datos_option_user = []
  const datos_option_rol = []
  var bandera_option_user = true;
  var bandera_option_rol = true;
  var bandera = true;
  const [state,set_state] = useState({
    rol: '',
    rol_actual: '',
    usuario : '',
    id_rol: '',
    id_usuario : '',
    data_user : [],
    data_rol : [],
  })

  useEffect(()=>{
    axios({
      // Endpoint to send files
      url:  "http://127.0.0.1:8000/usuario_rol/alluser/",
      method: "GET",
    })
    .then((respuesta)=>{
      set_state({
        ...state,
        data_user : respuesta.data
      })
    })
    .catch(err=>{
        return (err)
    })
    
  },[]);

  const aja = (e)=>{
    if(bandera=true){
      bandera = false
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/allrol/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_rol : respuesta.data
        })
      })
      .catch(err=>{
          return (err)
      })

    }

    
  }
  const handle_all_rol = (e)=>{
    if(bandera_option_rol==true){

      for (var i = 0; i < state.data_rol['length'] ; i++) {
        const dato2 = { value: state.data_rol[i]['nombre'], label: state.data_rol[i]['nombre'],id:state.data_rol[i]['id'] }
        datos_option_rol.push(dato2)
      }
      console.log([datos_option_rol]);
      bandera_option_rol = false;
    }
    else{
      console.log([datos_option_rol]);
    }
  }
  

 


  const handle_option_user = (e) => {
    // Getting the files from the input
    console.log(e)
    let formData = new FormData();
  
    //Adding files to the formdata
    formData.append('id', e.id);
    axios({
      // Endpoint to send files
      url:  "http://127.0.0.1:8000/usuario_rol/user_rol_manage/",
      method: "POST",
      data: formData,
    })
    .then(res=>{set_state({
      ...state,
      usuario : [e.value],
      id_usuario : [e.id],
      rol_actual: res.data
      
    })})
    .catch(err=>console.log(err))
    console.log(state.rol_actual)

  }
  const handle_option_rol = (e) => {
    // Getting the files from the input
    console.log(e)
    set_state({
      ...state,
      rol : [e.value],
      id_rol : [e.id],
    })
  }
  const handle_users = (e) => {
    // Getting the files from the input
    if(bandera_option_user==true){

      for (var i = 0; i < state.data_user['length'] ; i++) {
        const dato = { value: state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'], label: state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'],id:state.data_user[i]['id'] }
        datos_option_user.push(dato)
      }
      console.log([datos_option_user]);
      bandera_option_user = false;
    }
    else{
      console.log([datos_option_user]);
    }
  }
  const handle_upload = (e) => {
    // Getting the files from the input
    console.log([state.rol])
    console.log([state.usuario])
    let formData = new FormData();
  
    //Adding files to the formdata
    formData.append('id_rol', state.id_rol[0]);
    formData.append('id_user', state.id_usuario[0]);
    axios({
      // Endpoint to send files
      url:  "http://127.0.0.1:8000/usuario_rol/user_rol/",
      method: "POST",
      data: formData,
    })
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err))
  }
  return (
        <Container>
        <Accordion>
          <Accordion.Item  eventKey="0">
            <Accordion.Header onClick={aja} >Selector de Usuarios</Accordion.Header>
            <Accordion.Body>
            <Row className="g-2">
                <h3>Selecciona un usuario</h3>
            </Row>
            <Row className="mb-3">

                <Select class="form-control" options={datos_option_user} onMenuOpen={handle_users} onChange={handle_option_user} className="justMargin1" />
                
            </Row>
            <Row className="g-2">
                <h6>Nombre Completo:</h6>
            </Row>
            <Row className="g-2">
                <Form.Control as="textarea" value={state.usuario}  rows={1} readOnly/>
            </Row>
            <Row className="g-2">
                <h6>Rol actual:</h6>
            </Row>
            <Row className="g-2">
                <Form.Control as="textarea" value={state.rol_actual}  rows={1} readOnly/>
            </Row>
            <Row className="g-2">
                <h3>Selecciona un Rol</h3>
            </Row>

            <Row className="g-2" >
              <Select class="form-control"  options={datos_option_rol} onMenuOpen={handle_all_rol} onChange={handle_option_rol} className="justMargin1" />
                
            </Row>
            <Row className='mt-2'> 
                <Col lg={{ span: 1, offset: 5}}>
                    <Button onClick={handle_upload}>Aceptar</Button> 
   
                </Col>
                <Col>

                    <Button onClick={handle_all_rol}>Cancelar</Button> 
                </Col>    
            </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item  eventKey="1">
          <Accordion.Header>Lista de Usuarios</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Rol1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Rol1</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Rol1</td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
            
        </Container>
  )
}

export default selector_usuarios


  
  
  
