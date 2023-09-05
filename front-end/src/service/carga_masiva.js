import axios from 'axios';
import CryptoJS from 'crypto-js';

const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva`;

const secretKey = process.env.REACT_APP_SECRET_KEY;



const decryptTokenFromSessionStorage = () => {
  const encryptedToken = sessionStorage.getItem('token');
  if (!encryptedToken) {
    return null; // No hay token en sessionStorage
  }

  // Desencriptar el token usando la clave secreta
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedToken;
};


const carga_masiva = (file,option) => {
    let formData = new FormData();
    const config = {
      Authorization: 'Bearer ' +   decryptTokenFromSessionStorage()
    };
  
    //Adding files to the formdata
    formData.append("tipo_de_carga", option);
    formData.append("file", file);
  
    axios({
      // Endpoint to send files
      url: url_carga,
      method: "POST",
      headers: config,
      // Attaching the form data
      data: formData,
    })
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err))
  }

  export default {
    carga_masiva
}