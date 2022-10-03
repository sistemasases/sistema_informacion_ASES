import React, {useState} from 'react';
import Inicio_semestre_component from "../../components/inicio_semestre_sistemas/inicio_semestre_component"
import {Container, Row} from "react-bootstrap";

const Inicio_semestre_sistemas_instancia = () =>{

    return (
        <Container>
            <Row className="rowJustFlex">
                <h1>INICIO DE SEMESTRE - SISTEMAS</h1>
            </Row>
            <Row className="containerRow">
                <Inicio_semestre_component/>
            </Row>
        </Container>
    )
}

export default Inicio_semestre_sistemas_instancia