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
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Contador_alertas = () => {
  const rol = desencriptar(sessionStorage.getItem("rol"));
  const sede = desencriptarInt(sessionStorage.getItem("sede_id"));
  const id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));
  
  const [state, set_state] = useState({ 
    alertas_total: sessionStorage.getItem("alertas_total") || "" 
  });

  useEffect(() => {


    // Evita hacer la solicitud si el rol es usper_ases y ya hay un valor guardado en el estado,
    // se hace ya que este componente se recarga cada vez que se cambia de vista, de esta manera evitamos tener 
    // tener que hacer esa peticion cada vez si tenemos un dato ya guardado
    if (rol === "super_ases" && state.alertas_total) return;

    axios.get(
      `${process.env.REACT_APP_API_URL}/alertas/contador_alertas/${id_usuario}/`,
      { 
        params: { usuario_rol: rol, sede: sede },
        headers: {
          Authorization: "Bearer " + decryptTokenFromSessionStorage()
        }
      }
    )
    .then(response => {
      set_state({ alertas_total: response.data });
      sessionStorage.setItem("alertas_total", response.data);
    })
    .catch(error => {
      console.error("Error cargando alertas:", error);
    });
  }, []);

  return <>{state.alertas_total}</>;
};