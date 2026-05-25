import axios from "axios";

/**
 * Obtiene los días festivos de Colombia para un año dado.
 *
 * @async
 * @function obtener_festivos_colombia
 * @param {number} [año=new Date().getFullYear()] - Año a consultar.
 * @returns {Promise<{cantidad: number, festivos: Array}|false>}
 *
 * @example
 * const resultado = await obtener_festivos_colombia(2025);
 * console.log(resultado.cantidad); // 18
 */
const obtener_festivos_colombia = async (año = new Date().getFullYear()) => {
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/PublicHolidays/${año}/CO`
    );

    if (response.status === 200) {
      return {
        cantidad: response.data.length,
        festivos: response.data,
      };
    }
  } catch (error) {
    console.error("Error al obtener festivos de Colombia:", error);
    return false;
  }
};

export default obtener_festivos_colombia;