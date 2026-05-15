/**
 * @file panel_admin_firma_tratamiento_datos_temporales_eliminar_tratamientos_temporales.js
 * @version 1.0.0
 * @description Service para Eliminar los tratamientos de datos temporales de los estudiantes mediante el panel del administrador.
 * @author @PabloBecerraDev
 * @contact pablo.becerra@correounivalle.edu.co
 * @date 2026-04-27
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";


const eliminar_firmas_temporales = async (data) => {

    const config = {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/firma_tratamiento_datos_temp/eliminar_firmas_seleccionadas/`;

    try{
        const response = await axios.delete(url_axios, {data: data, headers: config});
        if (response.status == 200) {
            Swal.fire({
                title: "Operación exitosa",
                html: `
                <p><strong>Firmas eliminadas:</strong> ${response.data.firmas_eliminadas}</p>
                <p> ${response.data.mensaje}</p>`,
                icon: "success",
                timer: 2500,
                showConfirmButton: true,
                    })
            return response.data
        }

    }catch(error){
        console.error("Error en la operación:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo eliminar las firmas seleccionadas. Por favor, inténtelo de nuevo más tarde.",
            icon: "error",
            timer: 1500,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }
};

export default {eliminar_firmas_temporales};
