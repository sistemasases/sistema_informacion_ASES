/**
 * @file utilidades_seguridad.jsx
 * @version 1.0.0
 * @description Modulo de seguridad creado con el proposito de encriptar y desencriptar datos traidos desde el backend que son almacenados por el session storage.
 * @author Juan Pablo Carabali Quiroz
 * @contact carabali.juan@correounivalle.edu.co,
 * @date 13 de febrero del 2024
 */
import CryptoJS from "crypto-js";

// Clave secreta para la encriptación y desencriptación de datos
const secretKey = process.env.REACT_APP_SECRET_KEY;

// Importar BigInt para manejar números enteros grandes
const { BigInt } = global;

/**
 * Descripción: Función para encriptar un valor
 * @param {String} valor - Valor a encriptar
 * @param {String} secretKey - Clave secreta para encriptar
 * @return {String} - Valor encriptado
 * @throws {Error} Si el valor no se puede encriptar
 */
export const encriptar = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(valor, secretKey).toString();
    return valorEncriptado;
  } catch (error) {
    console.error("Error al encriptar:", error);
    return null;
  }
};

/**
 * Descripción: Función para encriptar un valor
 * @param {String} Recibe un string encriptado
 * @param {String} secretKey - Clave secreta para encriptar
 * @return {String} - Retorna el valor desencriptado
 * @throws {Error} Si el valor no se puede desencriptar
 */
export const desencriptar = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return valorDesencriptado;
  } catch (error) {
    console.error("Error al desencriptar:", error);
    return null;
  }
};
/**
 * Funcion para encriptar un valor de tipo Json
 * @param {JavaScript Object Notation} Recibe un objeto de tipo Json.
 * @param {String} secretKey - Clave secreta para encriptar
 * @return {Encrypted JavaScript Object Notation} Retorna el Json encriptado .
 * @throws {Error} Si el valor no se puede encriptar.
 */
export const encriptarJson = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(
      JSON.stringify(valor),
      secretKey
    ).toString();
    return valorEncriptado;
  } catch (error) {
    console.error("Error al encriptar los permisos:", error);
    return null;
  }
};
/**
 * Funcion para encriptar un valor de tipo entero
 * @param {Int} Recibe un valor de tipo Entero.
 * @param {String} secretKey - Clave secreta para encriptar
 * @return {Encrypted Int} Retorna el Int encriptado .
 * @throws {Error} Si el valor no se puede encriptar.
 */
export const encriptarInt = (valor) => {
  try {
    const valorEncriptado = CryptoJS.AES.encrypt(
      valor.toString(),
      secretKey
    ).toString();
    return valorEncriptado;
  } catch (error) {
    console.error("Error al encriptar el valor seleccionado:", error);
    return null;
  }
};
/**
 * Función para desencriptar un valor de tipo entero
 * @param {String} Recibe un valor de tipo entero encriptado.
 * @param {String} secretKey - Clave secreta para desencriptar.
 * @return {Int} Retorna el valor desencriptado.
 * @throws {Error} Si el valor no se puede desencriptar.
 * @throws {Error} Si el valor desencriptado no es un número válido.
 */
export const desencriptarInt = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);

    if (!isNaN(valorDesencriptado)) {
      return parseInt(valorDesencriptado);
    } else {
      console.error(
        "El valor desencriptado no es un número válido:",
        valorDesencriptado
      );
      return null;
    }
  } catch (error) {
    console.error("Error al desencriptar el valor seleccionado:", error);
    return null;
  }
};
/**
 * Función para desencriptar el token almacenado en sessionStorage.
 * @param {String} Recibe un token encriptado.
 * @param {String} secretKey - Clave secreta para desencriptar.
 * @return {String} Retorna el token desencriptado.
 * @throws {Null} Si no hay un token almacenado en el sessionStorage.
 */

export const decryptTokenFromSessionStorage = () => {
  const encryptedToken = sessionStorage.getItem("token");
  if (!encryptedToken) {
    return null; // No hay token en sessionStorage
  }

  // Desencriptar el token usando la clave secreta
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedToken;
};
/**
 * Función para desencriptar el token almacenado en sessionStorage.
 * @param {String} Recibe un token encriptado.
 * @param {String} secretKey - Clave secreta para desencriptar.
 * @return {String} Retorna el token desencriptado.
 * @throws {Null} Si no hay un token almacenado en el sessionStorage.
 */
export const desencriptarJson = (valorEncriptado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(valorEncriptado, secretKey);
    const valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(valorDesencriptado);
  } catch (error) {
    console.error("Error al desencriptar el json:", error);
    return null;
  }
};
/**
 * Función para desencriptar el id de usuario almacenado en sessionStorage.
 * @param {String} Recibe un id de usuario encriptado.
 * @param {String} secretKey - Clave secreta para desencriptar.
 * @return {String} Retorna el id de usuario desencriptado.
 * @throws {Null} Si no hay un id de usuario almacenado en el sessionStorage.
 */
export const decryptUserIdFromSessionStorage = () => {
  const encryptedUserId = sessionStorage.getItem("id_usuario");
  if (!encryptedUserId) {
    return null;
  }

  const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
  const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedUserId;
};
/**
 * Función para encriptar enteros muy grandes.
 * @param {BigInt} valor - Valor a encriptar
 * @param {String} secretKey - Clave secreta para encriptar
 * @return {String} - Valor encriptado
 * @throws {Error} Si el valor no se puede encriptar
 */

export const encriptarBigInt = (valor) => {
  try {
    const valorComoCadena = valor.toString();
    const valorEncriptado = CryptoJS.AES.encrypt(
      valorComoCadena,
      secretKey
    ).toString();
    return valorEncriptado;
  } catch (error) {
    console.error("Error al encriptar el valor seleccionado:", error);
    return null;
  }
};

/**
 * Función para desencriptar enteros muy grandes.
 * @param {String} valorEncriptado - Valor encriptado
 * @param {String} secretKey - Clave secreta para desencriptar
 * @return {BigInt} - Valor desencriptado
 * @throws {Error} Si el valor no se puede desencriptar
 */
export const desencriptarBigInt = (valorEncriptado) => {
  try {
    // Desencriptar la cadena y luego convertirla a BigInt.
    const decryptedValue = CryptoJS.AES.decrypt(
      valorEncriptado,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return BigInt(decryptedValue);
  } catch (error) {
    console.error("Error al desencriptar el valor:", error);
    return null;
  }
};

/**
export const desencriptarIdEstudianteSeleccionado = (idEstudianteSeleccionado) => {
  const encryptedIdEstudianteSeleccionado = sessionStorage.getItem('id_estudiante_seleccionado');
  if (!encryptedIdEstudianteSeleccionado) {
    return null; // No hay un estudiante seleccionado en el sessionStorage.
  }
  idEstudianteSeleccionado = CryptoJS.AES.decrypt(
    encryptedIdEstudianteSeleccionado,
    secretKey
  );
  const decryptedIdEstudianteSeleccionado = idEstudianteSeleccionado.toString(
    CryptoJS.enc.Utf8
  );
  return decryptedIdEstudianteSeleccionado;
}; 
**/
