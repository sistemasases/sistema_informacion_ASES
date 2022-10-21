import React from 'react';
import Semestre__sistemas_component from "../../components/inicio_semestre_sistemas/semestre_sistemas_component"
import {Container, Row, Accordion,} from "react-bootstrap";

const Inicio_semestre_sistemas = () =>{

    return (
        <Container>
            <Row className="rowJustFlex">
                <h1>INICIO DE SEMESTRE</h1>
            </Row>
            <Row className="containerRow">
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Roles que continúan</Accordion.Header>
                        <Accordion.Body>
                            <Semestre__sistemas_component/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" e>
                        <Accordion.Header>Carga masiva de los estudiantes nuevos</Accordion.Header>
                        <Accordion.Body>
                            Hola!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Carga masiva de los monitores y practicantes nuevos</Accordion.Header>
                        <Accordion.Body>
                            Hola!
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    )
}

export default Inicio_semestre_sistemas