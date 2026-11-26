/**
 * @file descargar_fichas.js
 * @version 1.0.0
 * @description service que descarga las fichas según sus filtros.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const descargar_fichas = async (form) => {
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  try {
    // Tus rutas reales
    const url_seguimientos = `${process.env.REACT_APP_API_URL}/seguimiento/exportar/seguimientos/`;
    const url_inasistencias = `${process.env.REACT_APP_API_URL}/seguimiento/exportar/inasistencias/`;

    // Enviar las solicitudes con los filtros
    const [seguimientosRes, inasistenciasRes] = await Promise.all([
      axios.post(url_seguimientos, form, config),
      axios.post(url_inasistencias, form, config),
    ]);

    return {
      data: {
        seguimientos: seguimientosRes.data,
        inasistencias: inasistenciasRes.data,
      },
    };
  } catch (err) {
    console.error("Error al descargar fichas:", err);
    return false;
  }
};

const descargar_consolidado = async (form) => {
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  try {
    // Ajusta la ruta si en tu urls.py de seguimiento usas otro path
    const url_consolidado = `${process.env.REACT_APP_API_URL}/seguimiento/exportar/consolidado/`;
    const consolidadoRes = await axios.post(url_consolidado, form, config);

    return {
      data: consolidadoRes.data,
    };
  } catch (err) {
    console.error("Error al descargar consolidado:", err);
    return false;
  }
};

const descargarFichasService = {
  descargar_fichas,
  descargar_consolidado,
};

export default descargarFichasService;