// utilidades_seguridad.js
import CryptoJS from 'crypto-js';
const { BigInt } = global;


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

// Función para desencriptar tokens.
export const decryptTokenFromSessionStorage = () => {
  const encryptedToken = sessionStorage.getItem('token');
  if (!encryptedToken) {
    return null; // No hay token en sessionStorage
  }

  // Desencriptar el token usando la clave secreta
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedToken;
};

// Función para desencriptar Json's
export const desencriptarJson = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(valorDesencriptado);
  } catch (error) {
    console.error('Error al desencriptar el json:', error);
    return null;
  }
}
// Función para desencriptar el ID de usuario.
export const decryptUserIdFromSessionStorage = () => {
  const encryptedUserId = sessionStorage.getItem('id_usuario');
  if (!encryptedUserId) {
    return null; // No hay un id de usuario en el sessionStorage.
  }

  // Desencriptar el id de usuario usando la clave secreta.
  const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
  const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedUserId;
};
// Función para encriptar campos de tipo BigInt.
export const encriptarBigInt = (valor) => {
  try {
    // Convertir BigInt a cadena y luego encriptar la cadena.
    const valorComoCadena = valor.toString();
    const valorEncriptado = CryptoJS.AES.encrypt(valorComoCadena, secretKey).toString();
    return valorEncriptado;
  } catch (error) {
    console.error('Error al encriptar el valor seleccionado:', error);
    return null;
  }
};

//Función para desencriptar campos de tipo BigInt.
export const desencriptarBigInt = (valorEncriptado) => {
  
  try {
    // Desencriptar la cadena y luego convertirla a BigInt.
    const decryptedValue = CryptoJS.AES.decrypt(valorEncriptado, secretKey).toString(CryptoJS.enc.Utf8);
    return BigInt(decryptedValue);
  } catch (error) {
    console.error('Error al desencriptar el valor:', error);
    return null;
  }
};

export const desencriptarIdEstudianteSeleccionado = (idEstudianteSeleccionado) => {
  const encryptedIdEstudianteSeleccionado = sessionStorage.getItem('id_estudiante_seleccionado');
  if (!encryptedIdEstudianteSeleccionado) {
    return null; // No hay un estudiante seleccionado en el sessionStorage.
  }
  idEstudianteSeleccionado = CryptoJS.AES.decrypt(encryptedIdEstudianteSeleccionado, secretKey);
  const decryptedIdEstudianteSeleccionado = idEstudianteSeleccionado.toString(CryptoJS.enc.Utf8);
  return decryptedIdEstudianteSeleccionado;
};  
