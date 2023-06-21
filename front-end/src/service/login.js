import axios from 'axios';

const url = "http://localhost:8000/login"

const login = (info) => {
    axios.post("http://127.0.0.1:8000/login", {
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