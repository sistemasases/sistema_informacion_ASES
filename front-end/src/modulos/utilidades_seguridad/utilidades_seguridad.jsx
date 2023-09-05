// utilidades_seguridad.js
import CryptoJS from 'crypto-js';

// Clave secreta para la encriptación (debes gestionarla de forma segura)
const secretKey = process.env.REACT_APP_SECRET_KEY;

// Función para encriptar un valor
export const encriptar = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(valor, secretKey).toString();
    return valorEncriptado;
  } catch (error) {
    console.error('Error al encriptar:', error);
    return null;
  }
};

// Función para desencriptar un valor
export const desencriptar = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return valorDesencriptado;
  } catch (error) {
    console.error('Error al desencriptar:', error);
    return null;
  }
};