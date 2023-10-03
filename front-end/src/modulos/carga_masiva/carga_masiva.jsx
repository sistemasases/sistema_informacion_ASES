import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import Carga_masiva_component from "../../components/carga_masiva/carga_masiva_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { encriptar, desencriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';





const Carga_masiva = () =>{

  //Desencriptar los permisos del usuario desde el sessionStorage
  const userRole = desencriptar(sessionStorage.getItem('permisos'));
    return (
        <>{ userRole.includes('view_carga_masiva') ? <Col className="contenido_children">
            <Row className="justify-content-md-center">
                <h1>CARGA MASIVA</h1>
            </Row>
            <Row className="containerRow">
                <Carga_masiva_component/>
            </Row>
            <Row>

            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Carga_masiva 