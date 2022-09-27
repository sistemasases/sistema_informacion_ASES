import axios from 'axios';

const url_carga = "http://127.0.0.1:8000/wizard/all"

const inicio_semestre = (file,option) => {  
    axios({
      // Endpoint to send files
      url: url_carga,
      method: "get",
      // Attaching the form data
      data: "formData",
    })
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err))
  }

export default inicio_semestre
