/**
  * @file login.js
  * @version 1.0.0
  * @description service que permite acceder al sistema.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import axios from 'axios';


// Constante que va en la url de la API para usarla en el axios
const url = `${process.env.REACT_APP_API_URL}/login`

const login = (info) => {
  // Conexion con la API
  axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    'username' : info.username,
    'password' : info.password
  })
  .then(res=>{
    console.log(res.data)
    sessionStorage.setItem('token', res.data.token)
    sessionStorage.setItem('user', res.data.user.nombre_completo)
    sessionStorage.setItem('refresh-token', res.data['refresh-token'])
  })
  .catch(err=>console.log(err))
}

export default {
  login
}