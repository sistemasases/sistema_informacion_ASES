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
        <Container className="container_reportes_seguimientos">

            <Row className="row_contenido_reportes_seguimientos">
                <Row className="row_align_rigth">
                    <Button>cache habilitado</Button>
                </Row>
                <Row className="row_card_reportes_seguimientos">

                    <Row>Informacion: Rol</Row>
                    <Row className="row_card_content_flex">
                        <Col className="subrow_card_content_flex">
                            <Row>Profesional</Row>
                            <Row>Fichas: Revisado 0 - No revisado : 1 - Total : 1</Row>
                            <Row>Inasistencias: Revisado : 0 - No revisado : 0 - Total : 0</Row>
                        </Col>
                        <Col className="subrow_card_content_flex">
                            <Row>Practicante</Row>
                            <Row>Fichas: Revisado : 0 - No revisado : 1 - Total : 1</Row>
                            <Row>Inasistencias: Revisado : 0 - No revisado : 0 - Total : 0</Row>
                        </Col>
                    </Row>
                </Row>

                <Desplegable></Desplegable>

            </Row>
        </Container>
    )
}

export default Informacion_rol 



