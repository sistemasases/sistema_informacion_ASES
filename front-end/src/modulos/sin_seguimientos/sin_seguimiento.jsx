import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import Tabla_sin_seguimientos from "../../components/sin_seguimientos/tabla_sin_seguimientos";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import  {useEffect} from 'react';
import axios from 'axios';

const Sin_seguimientos = () =>{

  const config = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const userRole = sessionStorage.getItem('rol');
    const [state,set_state] = useState({
        semestre_Seleccionado : '',
        semestre_activo : [],
    })

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

        useEffect(()=>{
        axios({
          // Endpoint to send files
          url:  "http://localhost:8000/usuario_rol/semestre/"+14+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            semestre_activo : respuesta.data
          })
        })
        .catch(err=>{
            console.log("no llega :"+err)
        })
        
      },[]);

    return (
        
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
            <Row className="containerRow">
                <Tabla_sin_seguimientos semestre_activo={state.semestre_activo['id']}></Tabla_sin_seguimientos>
            </Row>

        </Col> : <Acceso_denegado/>}</>
    )
}

export default Sin_seguimientos 