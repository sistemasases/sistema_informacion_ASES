import React, {useState} from 'react';
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_user_service from '../../service/all_users'
import Accordion from 'react-bootstrap/Accordion';
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';



const selector_usuarios = () =>{
  const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

  const datos_option_user = []
  const datos_option_rol = []
  var bandera_option_user = true;
  var bandera_option_rol = true;
  var bandera = true;
  const [state,set_state] = useState({
    rol: '',
    usuario : '',
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
    set_state({
      ...state,
      usuario : [e.value],
    })
  }
  const handle_option_rol = (e) => {
    // Getting the files from the input
    console.log(e)
    set_state({
      ...state,
      rol : [e.value],
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
  }
  return (
        <Container className="container_selector_usuarios_rol">
                  <Dropdown className="dropdown_selector_usuarios">
                        <DropdownToggle className="boton_selector_usuario" onClick={aja} onClick={toggle}>
                          <Row className="titulo_selector_usuario">
                            <h3>Selecciona un usuario</h3>
                          </Row>
                        </DropdownToggle>

                        <DropdownMenu>
                        { isOpen ? 
                        (
                          <Row className="formulario_selector_usuario">
                          <Row >

                            <Select class="form-control" options={datos_option_user} onMenuOpen={handle_users} onChange={handle_option_user} />
                          
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
                              <Form.Control as="textarea" value={state.rol}  rows={1} readOnly/>
                          </Row>
                          <Row className="g-2">
                              <h3>Selecciona un Rol</h3>
                          </Row>

                          <Row className="g-2" >
                            <Select class="form-control"  options={datos_option_rol} onMenuOpen={handle_all_rol} onChange={handle_option_rol} />
                              
                          </Row>
                          <Row className='mt-2'> 
                          <Col lg={{ span: 1, offset: 5}}>
                              <Button onClick={handle_upload}>Aceptar</Button> 
            
                          </Col>
                          <Col>

                              <Button onClick={handle_all_rol}>Cancelar</Button> 
                          </Col>    
                      </Row>  
                          </Row>      
                        ) 
                        :
                        (<Row></Row>)
                        }
                            
                            
                        </DropdownMenu>
            </Dropdown>


        </Container>
  )
}

export default selector_usuarios


  
  
  
