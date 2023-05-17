import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Desplegable from "./desplegable";

/*
Tabla Conteo de Seguimientos:
- codigo
- Nombres
- Apellidos
- documento
- Conteos
--- Fichas normales
--- Fichas de inasistencias
----Total conteos
- Profesional
- Practicante
- Monitor

*/



const Informacion_rol = () =>{
    return (
        <Container className="container_reportes_seguimientos2">

        
            <Row className="row_contenido_reportes_seguimientos">
            <div class="d-none d-md-inline"> <br/></div>

                        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
                            <Row>
                                <Col  xs={"12"} md={"3"}>
                                <b>Informacion:</b>
                                </Col>
                                <Col xs={"12"} md={"3"}>
                                Profesional
                                </Col>
                            </Row> 
                            <Row lassName="margin_top_info_rol"> 
                                <Col xs={"12"} md={"3"} c>
                                <b>Fichás:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: 1
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 1
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                                <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: 0
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 0
                                </Col>          
                            </Row>
                        </Col>





                        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
 
                            <Row>
                                <Col xs={"12"} md={"3"}>
                                <b>Practicante:</b>
                                </Col>
                                <Col xs={"12"} md={"3"}>
                                nombre
                                </Col>
                            </Row>
                            <Row className="margin_top_info_rol">

                                <Col  xs={"12"} md={"3"}>
                                <b>Fichás:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : 1
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 1
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                            <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : 0
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 0
                                </Col>           
                            </Row>
                        </Col>
                        <div class="d-none d-md-inline"> <br/></div>

            </Row>
                <Desplegable></Desplegable>
        </Container>
    )
}

export default Informacion_rol 



