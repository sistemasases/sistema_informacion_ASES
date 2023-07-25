import axios from 'axios';

const all_sede = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = 'http://127.0.0.1:8000/wizard/instancia/';
        const resInst = await axios.get(url_axios, config)
        return resInst.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_sede
}