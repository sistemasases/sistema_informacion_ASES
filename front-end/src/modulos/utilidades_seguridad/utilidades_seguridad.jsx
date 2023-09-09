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
// Función para encriptar json's.
export const encriptarJson = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(JSON.stringify(valor), secretKey).toString();
    return valorEncriptado;
  } catch (error) {
    console.error('Error al encriptar los permisos:', error);
    return null;
  }
};
// Función para encriptar campos de tipo entero.
export const encriptarInt = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(valor.toString(), secretKey).toString();
    return valorEncriptado;
    
  } catch (error) {
    console.error('Error al encriptar el valor seleccionado:', error);
    return null;
    
  }

};
// Función para desencriptar campos de tipo entero.
export const desencriptarInt = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    
    // Verificar si la cadena es un número válido antes de convertirla en un entero
    if (!isNaN(valorDesencriptado)) {
      return parseInt(valorDesencriptado);
    } else {
      console.error('El valor desencriptado no es un número válido:', valorDesencriptado);
      return null;
    }
  } catch (error) {
    console.error('Error al desencriptar el valor seleccionado:', error);
    return null;
  }
};

    

