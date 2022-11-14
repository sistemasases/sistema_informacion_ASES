import axios from 'axios';

const user_rol_manage = async(formData) => {
    try {
    const url_axios = 'http://127.0.0.1:8000/usuario_rol/user_rol_manage/';
    await axios({
        url:  url_axios,
        method: "POST",
        data: formData,
    })
    .then((res => {
        return res.data
    }))
    } catch (err) {
        console.log(err)
    }
}
  
export default {
    user_rol_manage
}