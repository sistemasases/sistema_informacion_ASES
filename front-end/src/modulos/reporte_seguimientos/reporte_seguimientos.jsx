import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import Informacion_rol from "../../components/reporte_seguimientos/informacion_rol";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import  {useEffect} from 'react';
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../utilidades_seguridad/utilidades_seguridad';

const Reporte_seguimientos = (props) =>{

  const config = {
          Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
  };

    const [state,set_state] = useState({
        periodo : '',
        data_user : [],

      })

    const userRole = desencriptar(sessionStorage.getItem('permisos'));

    useEffect(()=>{
      
      if (desencriptar(sessionStorage.getItem('rol')) === 'super_ases' || desencriptar(sessionStorage.getItem('rol')) === 'socioeducativo'|| desencriptar(sessionStorage.getItem('rol')) === 'socioeducativo_reg' )
      {
        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/profesional/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
        })
        .catch(err=>{
          console.log("error" + err)
        })
      }
      else if (desencriptar(sessionStorage.getItem('rol')) === 'profesional')
      {
        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/practicante/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
        })
        .catch(err=>{
          console.log("error" + err)
        })

      }
      else if (desencriptar(sessionStorage.getItem('rol')) === 'practicante')
      {
        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
        })
        .catch(err=>{
          console.log("error" + err)
        })
      }

  
      },[]);



    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    return (
        
        <>{userRole.includes('view_reporte_segui') ? <Col className="contenido_children">
            <Row className="containerRow">
                <Cabecera usuario={props.usuario} periodo={desencriptar(sessionStorage.getItem('semestre_actual'))} data_user={state.data_user}></Cabecera>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Reporte_seguimientos 