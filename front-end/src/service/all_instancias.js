import axios from 'axios';

const all_instancias = async () => {
    try {
        const url_axios = 'http://127.0.0.1:8000/wizard/instancia/';
        const resInst = await axios.get(url_axios)
        return resInst.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_instancias
}