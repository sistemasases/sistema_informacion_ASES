import { desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Descarga_fichas_component from "../../components/descarga_fichas/descarga_fichas_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { Row, Col } from "react-bootstrap";
import React from "react";


const Descarga_fichas = () =>{

  //Desencriptar los permisos del usuario desde el sessionStorage
  const userRole = desencriptar(sessionStorage.getItem("permisos"));
    return (
        <>{ userRole.includes("view_carga_masiva") ? <Col className="contenido_children">
            <Row className="justify-content-md-center">
                <h1>DESCARGA FICHAS</h1>
            </Row>
            <Row className="containerRow">
                <Descarga_fichas_component/>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Descarga_fichas
