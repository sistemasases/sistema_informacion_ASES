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

const Reporte_seguimientos = (props) =>{

  const config = {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const [state,set_state] = useState({
        periodo : '',
        data_user : [],

      })

    const userRole = sessionStorage.getItem('permisos');

    useEffect(()=>{
      
      if (sessionStorage.getItem('rol') === 'superAses')
      {
        axios({
          // Endpoint to send files
          url:  "http://localhost:8000/usuario_rol/profesional/"+sessionStorage.getItem('sede_id')+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
          console.log("estos son los primeros datos :"+respuesta.data)
        })
        .catch(err=>{
          console.log("error" + err)
        })
      }
      else if (sessionStorage.getItem('rol') === 'Profesional')
      {
        axios({
          // Endpoint to send files
          url:  "http://localhost:8000/usuario_rol/practicante/"+sessionStorage.getItem('sede_id')+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
          console.log("estos son los primeros datos :"+respuesta.data)
        })
        .catch(err=>{
          console.log("error" + err)
        })

      }
      else if (sessionStorage.getItem('rol') === 'Practicante')
      {
        axios({
          // Endpoint to send files
          url:  "http://localhost:8000/usuario_rol/monitor/"+sessionStorage.getItem('sede_id')+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
          console.log("estos son los primeros datos :"+respuesta.data)
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
                <Cabecera usuario={props.usuario} periodo={props.periodo} data_user={state.data_user}></Cabecera>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Reporte_seguimientos 