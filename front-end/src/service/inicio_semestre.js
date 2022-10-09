import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const url_semestre = 'http://127.0.0.1:8000/wizard/semestre_actual'

const inicio_semestre = (instancia) => {

  axios({
    // Endpoint to send files
    url: url_semestre,
    method: "POST",
  })
  .then(res=>{console.log(res.data)})
  .catch(err=>console.log(err))

  return (
    0
  )
}



export default {
  inicio_semestre
}
