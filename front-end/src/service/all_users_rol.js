import axios from 'axios';

const all_users_rols = async (pk) => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/actual_usuario_rol/`+ pk +"/";
        const res_usuario_rols = await axios.get(url_axios, config)
        console.log(res_usuario_rols.data)
        return res_usuario_rols;
    } catch (err) {
        console.log(err)
    }
}

export default{
    all_users_rols
}