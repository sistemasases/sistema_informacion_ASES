import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const listar_horarios = async (data = {}) => {
    const config = {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_horarios_monitorias/listar_horarios/`;

    try {
        const response = await axios.post(url_axios, data, { headers: config });
        return response.data;
    } catch (error) {
        console.error("Error al listar horarios:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudieron obtener los horarios de monitorías.",
            icon: "error",
            confirmButtonColor: "#3085d6",
        });
        return [];
    }
};

export default { listar_horarios };
