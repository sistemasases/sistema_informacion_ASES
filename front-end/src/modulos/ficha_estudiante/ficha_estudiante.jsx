import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_estudiante/info_basica";
import Selector from "../../components/ficha_estudiante/selector";
import {Container, Row, Col, Dropdown, Button} from "styled-bootstrap-grid";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/componentes_generales/footer';
import Info_registros from '../../components/ficha_estudiante/info_registros';
import Ficha_footer from '../../components/ficha_estudiante/ficha_footer';
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";



const Ficha_estudiante = (props) =>{

    const userRole = localStorage.getItem('rol');

    return (
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Row>
            <Col className="contenido_children">
                <Info_basica usuario={props.nombreUsuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>
            </Col>
        </Row> : <Acceso_denegado/>}</>
    )
}

export default Ficha_estudiante 