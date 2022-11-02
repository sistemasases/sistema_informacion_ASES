import axios from 'axios';

const url_carga = "http://127.0.0.1:8000/usuario_rol/alluser/"

const all_users = async () => {
    axios({
      // Endpoint to send files
      url: url_carga,
      method: "GET",
    })
    .then((respuesta)=>{
        console.log(respuesta.data)
        const data = (respuesta.data)
        return data
    })
    .catch(err=>{
        return (err)
    })

    
  }

  export default {
    all_users
}