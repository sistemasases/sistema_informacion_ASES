import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect} from 'react';
import axios from 'axios';


const Info_general = (props) =>{

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]


    
    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);


    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      rol: 'sss',
      usuario : '',
      data_user : [],
      data_rol : [],

      nombres:'',
      apellidos: '',
      cedula:'',
      correo:'',
      telefono:'',

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
        nombres : [e.value],
        apellidos : [],
        correo : [],
        cedula : [e.id],
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
        <Container className="container_informacion_general">
            <Col className="columna_informacion_general">
                <Row>
                    <h1>INFORMACIÓN DEL ESTUDIANTE con Id : {props.id}</h1>
                    <Row className="row_flex">
                        <h4>Puntaje Icfes  </h4><h4>{props.nombres}</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Año ingreso Univalle</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Estrato</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Teléfono residencia</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Celular</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Email alternativo</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Dirección residencia</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Barrio</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Municipio actual</h4><h4>texto 2</h4>
                    </Row>
                    <Row className="row_flex">                
                        <h4>País de origen</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">            
                        <h4>Grupo étnico</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Actividad simultánea</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">                                        
                        <h4>Identidad de género</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Sexo</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Estado civil</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Cantidad hijo/s</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Actividades que realiza en su tiempo libre</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Deportes que practica</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Condiciòn de excepciòn</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Otros acompañamientos</h4><Select></Select>
                    </Row>
                </Row>
            </Col>

            <Col className="columna_informacion_general">
            <Row>
                    <h1>PERSONAS CON QUIEN VIVE</h1>
                    <h3>Nombre Completo</h3><h3>Parentesco</h3>
                </Row>
                <Row>
                    <h1>INFORMACIÓN DEL ACUDIENTE O CONTACTO DE EMERGENCIA</h1>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                </Row>
                <Row>
                    <h1>INFORMACIÓN DEL ÚLTIMO PROFESIONAL, PRACTICANTE Y MONITOR</h1>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                </Row>
                <Row>
                    <h1>Observaciones</h1>
                    <h4>texto</h4>
                </Row>
            </Col>
            
        </Container>
    )
}

export default Info_general 