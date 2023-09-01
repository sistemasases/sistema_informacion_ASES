import axios from 'axios';

const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva`;

const carga_masiva = (file,option) => {
    let formData = new FormData();
    const config = {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
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