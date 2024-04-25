import React from 'react';
import {Container, Row, Col, } from "react-bootstrap";
import Select from 'react-select'  ;


const Cabecera = () =>{
    return (
        <Container >
            <Row >
                <Col xs={"12"} md={"8"} className="texto_titulo_bold">
                    Reporte de estudiantes activos en SRAA por semestre
                </Col>
                <Col xs={"12"} md={"4"} className="texto_pequeño">
                    Seleccione la cohorte
                    <Select></Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <h4>Mostrar <select className="select_tabla_cantidad_seguimientos"/> estudiantes</h4>
                    </Row>
                    <Row>
                        <Col xs={"12"} md={"6"}>
                            mostrando el registro del 1 al 10 de un total de # registros
                        </Col>
                        <Col xs={"12"} md={"6"}>
                            Buscar
                            <select/>
                        </Col>
                    </Row>
                </Col>

            </Row>          
        </Container>
    )
}

export default Cabecera 
