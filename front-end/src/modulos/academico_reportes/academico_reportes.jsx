/**
  * @file academico_reportes.jsx
  * @version 1.0.0
  * @description modulo para visualizar reportes académicos.
  * @author Carlos Mauricio Tovar Parra
  * @contact carlos.mauricio.tovar@correounivalle.edu.co
  * @date 29 de abril de 2024
*/

import Tabla_resumen from "../../components/academico_reportes/tabla_resumen.jsx";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { desencriptar } from '../utilidades_seguridad/utilidades_seguridad.jsx';
import { Row, Col } from "react-bootstrap";
import React from 'react';
import Contenedor_reportes from "../../components/academico_reportes/contenedor_reportes.jsx";


/**
 * Componente que representa la sección de reportes académicos.
 *
 * @returns {JSX.Element} El elemento JSX que contiene la sección de reportes académicos.
 */
const Academico_reportes = () => {
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(localStorage.getItem('permisos'));
  return (
    <>{userRole === 'super_ases' || userRole === 'sistemas' || 'profesor' ? <Col className="contenido_children">
        <Row className="containerRow">
        <Contenedor_reportes/>
        </Row>
    </Col> : <Acceso_denegado/>}</>
    );
}

export default Academico_reportes