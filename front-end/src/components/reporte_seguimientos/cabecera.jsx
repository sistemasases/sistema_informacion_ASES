import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect} from 'react';
import axios from 'axios';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'y', label: 'x' }
      ]
  

const Cabecera = (props) =>{
    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);


    const datos_option_user = []
    const datos_option_periodo = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_periodo = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      periodo : '',

      usuario : '',
      data_user : [],
      data_periodo : [],
      data_rol : [],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      cedula:'',
      correo:'',
      telefono:'',

    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/all_semestres/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_periodo : respuesta.data
        })
        
              console.log([datos_option_user]);

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
  
      }
  
      
    }
  
  
    const handle_option_periodo = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        seleccionado:e.id,
        /*id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['nombre'],
        apellidos : state.data_user[e.id]['apellido'],
        correo : state.data_user[e.id]['email'],
        cedula : state.data_user[e.id]['num_doc'],
        telefono : state.data_user[e.id]['telefono_res'],
        */
      })
    }

    const handle_option_user = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        usuario : [e.value],
      })
    }


    const handle_periodo = (e) => {
      // Getting the files from the input
      if(bandera_option_periodo==true){
  
        for (var i = 0; i < state.data_periodo['length'] ; i++) {

          const dato = { value: state.data_periodo[i]['nombre'], label: state.data_periodo[i]['nombre'],id:['id_instancia'] }
          datos_option_periodo.push(dato)

      }
        
        console.log([datos_option_periodo]);
        bandera_option_periodo = false;
      }
      else{
        console.log([datos_option_periodo]);
      }
    }
    const handle_upload = (e) => {
      // Getting the files from the input
      console.log([state.rol])
      console.log([state.usuario])
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


    
    return (
        <Container>
            <Row className="row_presentacion_reportes_seguimientos">
                <Row className="row_selectores_reportes_seguimientos">
                    <Col className="col_selectores_reportes_seguimientos">
                        <h1>Seguimientos</h1>
                    </Col>
                    {
                        props.rolUsuario === 'superSistemas' ?
                        (<Col className="col_selectores_reportes_seguimientos">
                            periodo actual
                            <Select  
                                        options={datos_option_periodo} onMenuOpen={handle_periodo} 
                                        onChange={handle_option_periodo}  
                                        defaultInputValue={props.periodo}
                                        defaultValue={props.periodo}
                                         />
                        </Col>
                        )
                        :
                        (<Col className="col_label_reportes_seguimientos"> 
                            <label>{props.periodo}</label>
                        </Col>
                        )
                    }
                    
                    <Col className="col_selectores_reportes_seguimientos">
                        Selector persona
                        <Select options={datos_option_user} onMenuOpen={handle_users} 
                        onChange={handle_option_user} 
                         />
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Cabecera 


















