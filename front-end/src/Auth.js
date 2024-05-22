
import React from "react"
import axios from 'axios';

export default function (props) {
  const url = `${process.env.REACT_APP_API_URL}/login`
  const data = {
    'username' : 'admin',
    'password' : 'admin'
  }
  const handleSendNewData = () => {
    axios.post(url, data)
    .then(res=>{
      //console.log(res.data)
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