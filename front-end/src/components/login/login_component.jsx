import React, {useState} from 'react';
import axios from 'axios';
const login_component = () =>{

  const[switchChecked, setChecked] = useState(false);
  const handleChange = () => setChecked(!switchChecked);

  const options = [
{ value: 'chocolate', label: 'Chocolate' },
{ value: 'strawberry', label: 'Strawberry' },
{ value: 'vanilla', label: 'Vanilla' }
  ]
  const url = "http://127.0.0.1:8000/login"
  const data = {
    'nombre_ingreso' : 'rhazek',
    'password' : 'rhazekmaster12'
  }
  const handleSendNewData = () => {
    axios.get(url, data)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Usuario</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={handleSendNewData} className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default login_component