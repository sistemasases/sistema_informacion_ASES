import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Academico_desplegables from "../../components/academico_pestaña/academico_desplegables";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { AES } from 'crypto-js';


const Academico_pestaña = () =>{

    const userRole = AES.decrypt(sessionStorage.getItem('rol'), 'rol');

    return (
        <>{userRole === 'superAses' || userRole === 'sistemas' || 'profesor' ? <Col className="contenido_children">
            <Row className="containerRow">
                <Academico_desplegables/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Academico_pestaña 