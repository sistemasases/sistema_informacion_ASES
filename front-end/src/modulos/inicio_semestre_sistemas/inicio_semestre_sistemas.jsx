import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import InfoBasica from "../../components/fichaDeEstudiante/infoBasica"
import Selector from "../../components/fichaDeEstudiante/selector"
import Inicio_semestre_component from "../../components/inicio_semestre_sistemas/inicio_semestre_component"
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Inicio_semestre_sistemas = () =>{

    return (
        <Container>
            <Row className="rowJustFlex">
                <h1>INICIO DE SEMESTRE - SISTEMAS</h1>
            </Row>
            <Row className="containerRow">
                <Inicio_semestre_component/>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}

export default Inicio_semestre_sistemas