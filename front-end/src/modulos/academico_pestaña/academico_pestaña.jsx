import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Academico_desplegables from "../../components/academico_pestaña/academico_desplegables";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";


const Academico_pestaña = () =>{

    const userRole = localStorage.getItem('rol');

    return (
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
            <Row className="containerRow">
                <Academico_desplegables/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Academico_pestaña 