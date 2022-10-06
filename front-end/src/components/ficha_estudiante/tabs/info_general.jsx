import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Info_general = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container className="container_informacion_general">
            <Col className="columna_informacion_general">
                <Row>
                    <h1>INFORMACIÓN DEL ESTUDIANTE</h1>
                    <Row className="row_flex">
                        <h4>Puntaje Icfes</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Año ingreso Univalle</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Estrato</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Teléfono residencia</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Celular</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Email alternativo</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Dirección residencia</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Barrio</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Municipio actual</h4><h4>texto 2</h4>
                    </Row>
                    <Row className="row_flex">                
                        <h4>País de origen</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">            
                        <h4>Grupo étnico</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Actividad simultánea</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">                                        
                        <h4>Identidad de género</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Sexo</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Estado civil</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Cantidad hijo/s</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Actividades que realiza en su tiempo libre</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Deportes que practica</h4><h4>text 2</h4>
                    </Row>
                    <Row className="row_flex">
                        <h4>Condiciòn de excepciòn</h4><Select></Select>
                    </Row>
                    <Row className="row_flex">
                        <h4>Otros acompañamientos</h4><Select></Select>
                    </Row>
                </Row>
            </Col>

            <Col className="columna_informacion_general">
            <Row>
                    <h1>PERSONAS CON QUIEN VIVE</h1>
                    <h3>Nombre Completo</h3><h3>Parentesco</h3>
                </Row>
                <Row>
                    <h1>INFORMACIÓN DEL ACUDIENTE O CONTACTO DE EMERGENCIA</h1>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                </Row>
                <Row>
                    <h1>INFORMACIÓN DEL ÚLTIMO PROFESIONAL, PRACTICANTE Y MONITOR</h1>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                    <h4>texto</h4><h4>texto</h4>
                </Row>
                <Row>
                    <h1>Observaciones</h1>
                    <h4>texto</h4>
                </Row>
            </Col>
            
        </Container>
    )
}

export default Info_general 