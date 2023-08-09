import axios from 'axios';

const all_users_rols = async (pk) => {
    try {
        const config = {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        };
        const url_axios = 'http://localhost:8000/usuario_rol/actual_usuario_rol/'+ pk.toString()+"/";;
        await axios({
            url:  url_axios,
            method: "GET",
            headers: config,
        })
        .then((res => {
            return res.data
        }))
    } catch (err) {
        console.log(err)
    }
}

export default{
    all_users_rols
}