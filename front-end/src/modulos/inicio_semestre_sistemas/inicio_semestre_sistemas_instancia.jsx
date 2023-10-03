/**
  * @file inicio_semestre_sistemas_instancia.jsx
  * @version 1.0.0
  * @description modulo para la creación del semestre.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import React from 'react';
import Inicio_semestre_component from "../../components/inicio_semestre_sistemas/inicio_semestre_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {Container, Row, Col} from "react-bootstrap";
import {desencriptar} from '../utilidades_seguridad/utilidades_seguridad';



const Inicio_semestre_sistemas_instancia = () =>{

    const userRole = desencriptar(sessionStorage.getItem('permisos'));
    return (
    <>{ userRole.includes('view_inicio_semestre') ? <Col className="contenido_children">
        <Row className="rowJustFlex">
            <h1>INICIO DE SEMESTRE</h1>
        </Row>
        <Row className="containerRow">
            <Inicio_semestre_component/>
        </Row>
    </Col> : <Acceso_denegado/>}</>
    )
}

export default Inicio_semestre_sistemas_instancia