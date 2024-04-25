/**
  * @file sin_seguimiento.jsx
  * @version 1.0.0
  * @description modulo para visualizar la información cuando no tiene seguimientos.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import Tabla_sin_seguimientos from "../../components/sin_seguimientos/tabla_sin_seguimientos";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {desencriptar} from '../../modulos/utilidades_seguridad/utilidades_seguridad';
import {Row, Col} from "react-bootstrap";
import React from 'react';


const Sin_seguimientos = () =>{
    // Desencriptar los permisos del usuario desde el sessionStorage.
    const userRole = desencriptar(sessionStorage.getItem('permisos'));

    return (
        <>{ userRole.includes('view_estudiantes_sin_segui') ? <Col className="contenido_children">
            <Row className="containerRow">
                <Tabla_sin_seguimientos></Tabla_sin_seguimientos>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Sin_seguimientos 
