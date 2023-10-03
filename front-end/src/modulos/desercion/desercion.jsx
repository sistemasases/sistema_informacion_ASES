import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import Tabla_desercion from "../../components/desercion/tabla_desercion";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import  {useEffect} from 'react';
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../utilidades_seguridad/utilidades_seguridad';


const Desercion = () =>{

 

  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
  };

    //const userRole = sessionStorage.getItem('permisos');
    const userRole = desencriptar(sessionStorage.getItem('permisos'));
    console.log("Estos son los permisos:"+userRole)
    const [state,set_state] = useState({
        periodo : '',
    
        usuario : '',
        data_user : [],
        data_periodo : [],
        data_rol : [],
        id_cohorte:1,
    
      })
    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);
    useEffect(()=>{

        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/cohorte_estudiante_info/`+state.id_cohorte+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_cohorte : respuesta.data
          })
        })
        .catch(err=>{
          console.log("estos son los pr:"+state.data_user)
        })
      },[]);
    return (
        <>{ userRole.includes('view_reporte_desercion') ? <Col className="contenido_children">
            <Row className="containerRow">
                <Tabla_desercion data_cohorte={state.data_cohorte}/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Desercion 