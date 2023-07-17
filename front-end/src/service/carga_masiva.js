import axios from 'axios';

const url_carga = "http://127.0.0.1:8000/carga_masiva"

const carga_masiva = (file,option) => {
    let formData = new FormData();
    const config = {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
  
    //Adding files to the formdata
    formData.append("tipo_de_carga", option);
    formData.append("file", file);
    console.log ("ARCHIVO: "+formData.get("file"))
  
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