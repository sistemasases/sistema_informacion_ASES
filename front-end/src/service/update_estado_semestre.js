import axios from 'axios';

const update_estado = async (semestre_id) => {
    try {
      const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      };
      const url_axios = `${process.env.REACT_APP_API_URL}/wizard/semestre/` + semestre_id.toString()+"/";
      const resUserRol = await axios(url_axios, config)
      return resUserRol.data;
      
    } catch (error) {
        console.log(error);
    }
  }
  
export default {
    update_estado
}