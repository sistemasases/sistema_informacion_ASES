// src/utils/apiUtils.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getGrupoOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/persona/pertenencia_grupo_poblacional/`);
    return response.data.map((item) => ({
      value: item.id_grupo_poblacional,
      label: item.nombre_grupo_poblacional,
    }));
  } catch (error) {
    console.error('Error fetching razas options:', error);
    throw error;
  }
};

export const getExpresionesOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/diversidad-sexual/expresion-genero/`);
    return response.data.map((item) => ({
      value: item.id_expresion_genero,
      label: item.nombre_expresion_genero,
    }));
  } catch (error) {
    console.error('Error fetching expresiones options:', error);
    throw error;
  }
};

// Define otras funciones similares para obtener opciones de pronombres, orientaciones sexuales, etc.
