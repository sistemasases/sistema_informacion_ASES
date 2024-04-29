/**
 * @file FichaEstudianteV2.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar cargas los componentes necesarios para la ficha.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useEffect } from "react";
import {
  desencriptar,
  desencriptarInt,
  desencriptarBigInt,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import Select from "../../components/ficha_estudiante_V2/Componentes/Select.jsx";
import Riesgos from "../../components/ficha_estudiante_V2/Componentes/Riesgos.jsx";
import Acordiones from "../../components/ficha_estudiante_V2/Componentes/Acordiones.jsx";
import "../../Scss/ficha_estudiante_V2/discapacidad.css";
import { useAuthStore } from "../../components/ficha_estudiante_V2/store/auth.js";
import AccesoDenegado from "../../components/ficha_estudiante_V2/Componentes/AccesoDenegado.jsx";
import fetchEstudiantes from "../../components/ficha_estudiante_V2/api/fetch_estudiantes.js";

const FichaEstudianteV2 = () => {
  const { user, setUser, setEstudiantes } = useAuthStore();

  useEffect(() => {
    // Method setUser is used to set the user data in the store
    setUser({
      rol: desencriptar(sessionStorage.getItem("rol")).toString(),
      sede_id: desencriptarInt(sessionStorage.getItem("sede_id")).toString(),
      id_usuario: desencriptarBigInt(
        sessionStorage.getItem("id_usuario")
      ).toString(),
      userRole: desencriptar(sessionStorage.getItem("permisos")).toString(),
    });
    // Method setEstudiantes is used to set the students data in the store
    const getStudents = async () => {
      const { id_usuario, sede_id, rol } = user;
      const res = await fetchEstudiantes(id_usuario, sede_id, rol);
      if (res) {
        setEstudiantes(res);
      }
    };
    getStudents();
  }, []);

  return (
    <>
      {/* The userRole is used to check if the user has the permission to view the page
        if the user has the permission, the page is displayed, otherwise, the user is 
        redirected to the AccesoDenegado component */}
      {user &&
      user.userRole &&
      user.userRole.includes("view_ficha_estudiantes") ? (
        <div className="container-ficha">
          <div className="select-container">
            <Select />
          </div>
          <div className="riesgo-container">
            <Riesgos />
          </div>
          <div className="acordion-container">
            <Acordiones />
          </div>
        </div>
      ) : (
        <AccesoDenegado />
      )}
    </>
  );
};

export default FichaEstudianteV2;
