/**
 * @file admin_usuarios.jsx
 * @version 1.0.0
 * @description modulo para CRUD de los usuarios.
 * @author Valentina Salamanca
 * @contact salamanca.valentina@correounivalle.edu.co
 * @date 13 de noviembre del 2024
 */

import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { desencriptar } from "../utilidades_seguridad/utilidades_seguridad.jsx";
import { Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import SelectorUsuarios from "../../components/componentes_generales/acordeon_usuarios.jsx";
import SelectorEstudiantes from "../../components/componentes_generales/acordeon_estudiantes.jsx";
import SelectorRoles from "../../components/componentes_generales/acordeon_roles.jsx";
import SelectorPermisos from "../../components/componentes_generales/acordeon_permisos.jsx";
import SelectorSedes from "../../components/componentes_generales/acordeon_sedes.jsx";
import SelectorCohortes from "../../components/componentes_generales/acordeon_cohortes.jsx";
import SelectorFacultad from "../../components/componentes_generales/acordeon_facultades.jsx";
import SelectorAsignaciones from "../../components/componentes_generales/acordeon_asignaciones.jsx";
import SelectorAsignacionesMonitores from "../../components/componentes_generales/acordeon_asignaciones_monitores.jsx"; 
import SelectorProgramas from "../../components/componentes_generales/acordeon_programas.jsx"; 
import SelectorSemestres from "../../components/componentes_generales/acordeon_semestres.jsx";

const Gestion_usuario_roles = () => {
  // Desencriptar los permisos del usuario desde el sessionStorage
  const userRole = desencriptar(sessionStorage.getItem("permisos"));

  return (
    <>
      {userRole.includes("view_gestion_usuarios") ? (
        <Col
          className="contenido_children"
          style={{ position: "relative", zIndex: 0 }}
        >
          <Row className="rowJustFlex_usuario_rol">
            <h1>Administrador Ases</h1>
          </Row>
          <Row className="rowJustFlex_usuario_rol2">
            <SelectorUsuarios />                {/* CONECTADO */}
            <SelectorEstudiantes />             {/* CONECTADO */}
            <SelectorRoles />                   {/* CONECTADO */}
            <SelectorPermisos />                {/* CONECTADO */}
            <SelectorSedes />                   {/* CONECTADO */}
            <SelectorCohortes />                {/* CONECTADO */}
            <SelectorFacultad />                {/* CONECTADO */}
            <SelectorAsignaciones />            {/* CONECTADO */}
            <SelectorAsignacionesMonitores />   {/* CONECTADO */}
            <SelectorProgramas />               {/* CONECTADO */}
            <SelectorSemestres />               {/* CONECTADO */}
          </Row>
          <Row></Row>
        </Col>
      ) : (
        <Acceso_denegado />
      )}
      <br />
    </>
  );
};

export default Gestion_usuario_roles;
