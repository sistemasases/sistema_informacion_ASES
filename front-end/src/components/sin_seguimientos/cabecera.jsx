import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Select from 'react-select'  ;


const Tabla_sin_Seguimientos = () =>{

    return (
        
        <Container >
            <Row>
                Reporte de estudiantes sin seguimientos
            </Row>


            <Row>
                <Col>
                    <Row>
                        <Col xs={"3"}>mostrar
                        </Col>
                        <Col xs={"3"}><Select/>
                        </Col>
                        <Col xs={"3"}>estudiantes
                        </Col>
                    </Row>
                    <Row>
                        mostrando el registro del 1 al 10 de un total de # registros
                    </Row>
                </Col>
                    Buscar
                <Col>

                </Col>
            </Row>          
        </Container>
    )
}

export default Tabla_sin_Seguimientos 