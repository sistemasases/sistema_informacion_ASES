import axios from 'axios';

const all_users = async () => {
  try {
    const config = {
      headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const url_axios = 'http://localhost:8000/usuario_rol/user/';
    const resUserRol = await axios(url_axios, config)
    return resUserRol.data;
    
  } catch (error) {
      console.log(error);
  }
}

  export default {
    all_users
}