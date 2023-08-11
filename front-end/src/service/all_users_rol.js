import axios from 'axios';

const all_users_rols = async (pk) => {
    try {
        const config = {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/actual_usuario_rol/`+ pk +"/";
        await axios({
            url:  url_axios,
            method: "GET",
            headers: config,
        })
        .then((res => {
            console.log("llamda: "+ res.data[1])
            return res.data
        }))
    } catch (err) {
        console.log(err)
    }
}

export default{
    all_users_rols
}