import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Academico_desplegables from "../../components/academico_pestaña/academico_desplegables";


const Academico_pestaña = () =>{

    return (
        
        <Container >
            <Row className="containerRow">
                <Academico_desplegables/>
            </Row>
        </Container>
    )
}

export default Academico_pestaña 