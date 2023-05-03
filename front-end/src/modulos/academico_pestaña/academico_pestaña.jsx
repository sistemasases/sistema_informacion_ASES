import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Academico_desplegables from "../../components/academico_pestaña/academico_desplegables";


const Academico_pestaña = () =>{

    return (
        
        <Col className="contenido_children">
            <Row className="containerRow">
                <Academico_desplegables/>
            </Row>
        </Col>
    )
}

export default Academico_pestaña 