import axios from 'axios';

const all_monitores = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`;
        const res = await axios.get(url_axios, config)
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_monitores
}