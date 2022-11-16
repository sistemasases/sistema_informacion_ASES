import axios from 'axios';

const url = "http://localhost:8000/login"

const login = (info) => {
    axios.get(url, info)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
  }

  export default {
    login
}