/**
  * @file gestion_usuario_rol.jsx
  * @version 1.0.0
  * @description modulo para visualizar la gestion del los usuario por rol.
  * @author César Becerra
  * @contact cesar.becerra@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import Selector_usuarios from "../../components/componentes_generales/selector_usuarios";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {desencriptar} from '../../modulos/utilidades_seguridad/utilidades_seguridad';
import {Row, Col} from "react-bootstrap";
import React from 'react';


const Gestion_usuario_rol = () =>{
    // Desencriptar los permisos del usuario desde el sessionStorage
    const userRole = desencriptar(sessionStorage.getItem('permisos'));

    return (
        <>{ userRole.includes('view_gestion_usuarios') ? <Col className="contenido_children">
            <Row className="rowJustFlex_usuario_rol">
                <h1>Usuario Rol</h1>
            </Row>
            <Row className="rowJustFlex_usuario_rol2">

                <Selector_usuarios/>
            </Row>
            <Row></Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Gestion_usuario_rol