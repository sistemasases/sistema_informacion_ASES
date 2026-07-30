import axios from "axios";

/**
 * Obtiene los días festivos de Colombia dentro de un rango de fechas específico.
 *
 * @async
 * @function obtener_festivos_colombia
 * @param {string} fecha_inicio - Fecha de inicio del rango (ISO string o YYYY-MM-DD).
 * @param {string} fecha_fin - Fecha de fin del rango (ISO string o YYYY-MM-DD).
 * @returns {Promise<{cantidad: number, festivos: Array}|false>}
 *
 * @example
 * const resultado = await obtener_festivos_colombia("2026-02-08T00:00:00Z", "2026-06-30T00:00:00Z");
 * console.log(resultado.cantidad); // cantidad de festivos en ese rango
 */
const obtener_festivos_colombia = async (fecha_inicio, fecha_fin) => {
  try {
    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    const añoInicio = inicio.getFullYear();
    const añoFin = fin.getFullYear();

    // arma la lista de años a consultar (normalmente 1, a veces 2)
    const años = [];
    for (let año = añoInicio; año <= añoFin; año++) {
      años.push(año);
    }

    // pide los festivos de todos los años necesarios en paralelo
    const respuestas = await Promise.all(
      años.map((año) =>
        axios.get(`https://date.nager.at/api/v3/PublicHolidays/${año}/CO`)
      )
    );

    const todosLosFestivos = respuestas.flatMap((r) => r.data);

    // filtra solo los que caen dentro del rango exacto del semestre
    const festivosEnRango = todosLosFestivos.filter((festivo) => {
      const fechaFestivo = new Date(festivo.date);
      return fechaFestivo >= inicio && fechaFestivo <= fin;
    });

    return {
      cantidad: festivosEnRango.length,
      festivos: festivosEnRango,
    };
  } catch (error) {
    console.error("Error al obtener festivos de Colombia:", error);
    return false;
  }
};

export default obtener_festivos_colombia;