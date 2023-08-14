import axios from 'axios';

const delete_user_rol = (id_usuario) => {
    try {
        const config = {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/` + id_usuario + '/';
        const url_usuario_rol = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/` + id_usuario + '/';

        axios({
            url:  url_axios,
            method: "DELETE",
            headers: config,
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}
  
export default {
    delete_user_rol
}