/**
  * @file calificador.jsx
  * @version 1.0.0
  * @description modulo para visualizar el calificador.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import Calificador from "../../components/academico_pestaña/calificador/calificador.jsx";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {desencriptar} from '../utilidades_seguridad/utilidades_seguridad.jsx';
import {Row, Col} from "react-bootstrap";
import React from 'react';


const Academico_pestaña = () =>{
    // Constante para obtener los permisos del usuario.
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