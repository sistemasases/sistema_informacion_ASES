import axios from "axios";

const all_monitorias_formularios_externos = async (id_monitoria) => {
  try {
    // Constante que va en el header con información del token para el axios
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    //   },
    // };

    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_monitorias/`;

    // Interacción con la API
    const res = await axios.get(url_axios);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { all_monitorias_formularios_externos };
