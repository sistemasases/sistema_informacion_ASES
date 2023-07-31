import axios from 'axios';

const url = "http://localhost:8000/login"

const login = (info) => {
    axios.post("http://127.0.0.1:8000/login", {
      'username' : info.username,
      'password' : info.password
    })
    .then(res=>{
      console.log(res.data)
      sessionStorage.setItem('token',  AES.encrypt(res.data.token, 'token'))
      sessionStorage.setItem('user', AES.encrypt(res.data.user.nombre_completo,'user'))
      sessionStorage.setItem('refresh-token', AES.encrypt(res.data['refresh-token'],'refresh-token'))
    })
    .catch(err=>console.log(err))
  }

  export default {
    login
}