import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_horario = async (data) => {
    const config = {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_horarios_monitorias/crear_horario/`;

    try {
        const response = await axios.post(url_axios, data, { headers: config });
        return response;
    } catch (error) {
        console.error("Error al crear horario:", error);
        Swal.fire({
            title: "Error",
            text: error?.response?.data?.error || "No se pudo registrar el horario.",
            icon: "error",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }
};

export default { crear_horario };
