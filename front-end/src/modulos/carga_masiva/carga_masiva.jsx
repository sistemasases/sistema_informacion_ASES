import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import InfoBasica from "../../components/fichaDeEstudiante/infoBasica"
import Selector from "../../components/fichaDeEstudiante/selector"
import Carga_masiva_component from "../../components/carga_masiva/carga_masiva_component"
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Carga_masiva = () =>{

    return (
        <Container>
            <Row className="containerRow">
                <Carga_masiva_component/>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}

export default Carga_masiva 