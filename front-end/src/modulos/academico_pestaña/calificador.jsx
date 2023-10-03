import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Calificador from "../../components/academico_pestaña/calificador/calificador.jsx";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { desencriptar, desencriptarJson } from '../utilidades_seguridad/utilidades_seguridad.jsx';


const Academico_pestaña = () =>{

    const userRole = desencriptar(sessionStorage.getItem('permisos')); 

    return (
        <>{ userRole.includes('view_calificador') ? 
        <Col className="contenido_children">
            <Row className="containerRow">
                <Calificador/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Academico_pestaña 