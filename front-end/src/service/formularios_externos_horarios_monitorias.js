import axios from "axios";

const listar_horarios_publicos = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_horarios_monitorias/`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Error al obtener los horarios públicos:", error);
        return [];
    }
};

const listar_sedes_publicas = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_sedes/`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Error al obtener sedes:", error);
        return [];
    }
};

export default {
    listar_horarios_publicos,
    listar_sedes_publicas,
};
