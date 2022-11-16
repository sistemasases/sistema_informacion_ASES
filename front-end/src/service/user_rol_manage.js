import axios from 'axios';

const user_rol_manage = async(formData) => {
    try {
        // FALTA ORGANIZAR EL PK
    const url_axios = 'http://localhost:8000/usuario_rol/usuario_rol/1';
    await axios({
        url:  url_axios,
        method: "GET",
        data: formData,
    })
    .then((res => {
        return res.data
    }))
    } catch (err) {
        console.log(err)
    }
}
  
export default {
    user_rol_manage
}