import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}/login`

const login = (info) => {
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