import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Calificador from "../../components/academico_pestaña/calificador/calificador.jsx";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";


const Academico_pestaña = () =>{

    const userRole = sessionStorage.getItem('permisos');

    return (
        <>{userRole === 'superAses' || userRole === 'sistemas' || 'profesor' ? 
        <Col className="contenido_children">
            <Row className="containerRow">
                <Calificador/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Academico_pestaña 