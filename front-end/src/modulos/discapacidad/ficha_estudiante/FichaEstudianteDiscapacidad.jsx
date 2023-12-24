import React, { useEffect } from "react";
import {
  desencriptar,
  desencriptarInt,
  desencriptarBigInt,
} from "../../utilidades_seguridad/utilidades_seguridad.jsx";
import Select from "../../../components/ficha_estudiante_dicapacidad/Componentes/Select.jsx";
import Riesgos from "../../../components/ficha_estudiante_dicapacidad/Componentes/Riesgos.jsx";
import Acordiones from "../../../components/ficha_estudiante_dicapacidad/Componentes/Acordiones.jsx";
import "../../../Scss/ficha_estudiante_discapacidad/discapacidad.css";
import { useAuthStore } from "../../../components/ficha_estudiante_dicapacidad/store/auth.js";
import AccesoDenegado from "../../../components/ficha_estudiante_dicapacidad/Componentes/AccesoDenegado.jsx";

const FichaEstudianteDiscapacidad = (props) => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    setUser({
      rol: desencriptar(sessionStorage.getItem("rol")).toString(),
      sede_id: desencriptarInt(sessionStorage.getItem("sede_id")).toString(),
      id_usuario: desencriptarBigInt(
        sessionStorage.getItem("id_usuario")
      ).toString(),
      userRole: desencriptar(sessionStorage.getItem("permisos")).toString(),
    });
    console.log("USER: ", user);
  }, []);

  return (
    <>
      {user && user.userRole.includes("view_ficha_estudiantes") ? (
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

export default FichaEstudianteDiscapacidad;
