import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_estudiante/info_basica";
import Selector from "../../components/ficha_estudiante/selector";
import {Dropdown, Button} from "react-bootstrap";
import {Container, Row, Col} from "styled-bootstrap-grid";

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
                        <Row xs={"12"} sm={"12"}>
                            <Col>
                                <h3 className="texto_subtitulo">Riesgos</h3>
                            </Col>
                        </Row>

                        <Row xs={"12"} ms={"12"}>
                            <Col xs={"0"} sm={"1"} ></Col>
                            <Col xs={"11"} sm={"10"}>

                                <Row className="row_riesgo">
                                    <Col xs={"3"} sm={"3"} className="columna_boton_riesgo">
                                    <Button className="buttonRiesgos"></Button>
                                    </Col>
                                    <Col  xs={"9"}  sm={"9"}>
                                        individual
                                    </Col>
                                </Row>
                                
                                <Row  className="row_riesgo">
                                    <Col xs={"3"} sm={"3"}  className="columna_boton_riesgo">
                                        <Button className="buttonRiesgos"></Button>
                                    </Col>
                                    <Col  xs={"9"}  sm={"9"}>
                                        familiar
                                    </Col>
                                </Row>
                                
                                <Row  className="row_riesgo">
                                        <Col xs={"3"} sm={"3"}  className="columna_boton_riesgo">
                                            <Button className="buttonRiesgos"></Button>
                                        </Col>
                                        <Col  xs={"9"} sm={"9"}>
                                        academico
                                        </Col>
                                </Row>
                                
                                <Row className="row_riesgo">
                                        <Col xs={"3"} sm={"3"}  className="columna_boton_riesgo">
                                            <Button className="buttonRiesgos"></Button>
                                        </Col>
                                        <Col  xs={"9"} sm={"9"}>
                                        econocmico
                                        </Col>
                                    </Row>
                                
                                <Row className="row_riesgo">
                                        <Col xs={"3"} sm={"3"}  className="columna_boton_riesgo">
                                            <Button className="buttonRiesgos"></Button>
                                        </Col>
                                        <Col  xs={"9"} sm={"9"}>
                                        vida Univ.
                                        </Col>
                                    </Row>
                                
                                    <Row className="row_riesgo" >
                                        <Col xs={"3"} sm={"3"}  className="columna_boton_riesgo">
                                            <Button className="buttonRiesgos"></Button>
                                        </Col>
                                        <Col  xs={"9"} sm={"9"}>
                                            Geografico
                                        </Col>
                                    </Row>

                            </Col>
                            

                        </Row>
                            
                </Row>
            </Col>
        </Container>
    )
}

export default Info_registros 