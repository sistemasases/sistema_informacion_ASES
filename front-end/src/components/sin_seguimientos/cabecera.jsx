import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Select from 'react-select'  ;


const Cabecera = () =>{

    return (
        
        <Container >
            <Row className="texto_titulo_bold">
                Reporte cantidad de seguimientos
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