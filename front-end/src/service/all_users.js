import axios from 'axios';

const all_users = async () => {
  try {
    const url_axios = 'http://127.0.0.1:8000/usuario_rol/alluser/';
    const resUserRol = await axios(url_axios)
    return resUserRol.data;
    
} catch (error) {
    console.log(error);
}
  }

  export default {
    all_users
}