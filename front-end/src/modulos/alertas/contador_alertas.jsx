/**
  * @file contador_alertas.jsx
  * @version 1.0.0
  * @description modulo para visualizar el conteo de las alertas.
  * @author Steven Bernal
  * @contact steven.bernal@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import React, { useState, useEffect} from "react";
import axios from "axios";


export const Contador_alertas = () => {
  // constante para guardar el total de alertas
  const [state, set_state] = useState({ alertas_total: ''});
  // Contabiliza todas las alertas
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    const estudiantes_por_rol = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alertas/contador_alertas/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          alertas_total: response.data,
        });
      } catch (error) {
      }
    };
    estudiantes_por_rol();
  }, []);

  return <>{state.alertas_total}</>;
};
