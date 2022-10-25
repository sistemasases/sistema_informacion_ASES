import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_estudiante/info_basica";
import Selector from "../../components/ficha_estudiante/selector";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/componentes_generales/footer';


const Info_registros = () =>{

    return (
        <Container>
            <Col className="container_info_registro">
                <Row className="generar_nuevo_reporte">
                    <Button >Generar Nuevo Reporte</Button>
                </Row>
                <Row className="riesgos">
                        <Row><h3>Riesgos</h3></Row>
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                            <Button className="buttonRiesgos"></Button>individual 
                            </Col>
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                                <Button className="buttonRiesgos"></Button>familiar
                            </Col>
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                                <Button className="buttonRiesgos"></Button>academico
                            </Col> 
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                                <Button className="buttonRiesgos"></Button>econocmico
                            </Col> 
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                                <Button className="buttonRiesgos"></Button> vida Univ.
                            </Col>
                            <Col className="rowJustFlex_to_right" xs={"6"} md={"12"}>
                                <Button className="buttonRiesgos"></Button>Geografico
                            </Col>
                </Row>
            </Col>
        </Container>
    )
}

export default Info_registros 