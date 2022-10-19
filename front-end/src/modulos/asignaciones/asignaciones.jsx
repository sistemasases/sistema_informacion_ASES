import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import Asignaciones_component from "../../components/asignaciones/asignaciones_component"
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Carga_masiva = () =>{

    return (
        <Container >
            <Row className="justify-content-md-center">
                <h1>ASIGNACIONES</h1>
            </Row>
            <Row className="containerRow">
                <Asignaciones_component/>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}

export default Carga_masiva 