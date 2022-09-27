import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';

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



const Cabecera = () =>{

    return (
        <Container>
            <Row className="row_presentacion_reportes_seguimientos">
                <Row className="row_titulo_reportes_seguimientos">
                    <h2>Seguimientos pilo</h2>
                </Row>
                <Row className="row_selectores_reportes_seguimientos">
                    <Col className="col_selectores_reportes_seguimientos">
                        Selector periodo
                        <Select></Select>
                    </Col>
                    <Col className="col_selectores_reportes_seguimientos">
                        Selector persona
                        <Select></Select>
                    </Col>
                    <Col className="col_selectores_reportes_seguimientos">
                        <Button>Consultar</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Cabecera 


















