import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const url_carga = 'http://127.0.0.1:8000/wizard/all'
var selected = {}

const inicio_semestre = () => {
  const opciones = [];
  var bandera_option = true;

  const [state,set_state] = useState({
    tabs: [],
  })

  useEffect(()=>{
    axios({
      url:  url_carga,
      method: "GET",
    })
    .then((respuesta)=>{
      set_state({
        ...state,
        tabs : respuesta.data
      })
    })
    .catch(err=>{
      return (err)
    })
  },[]);

  const handle_instancias = (e) => {
    if(bandera_option==true){
      for (var i = 0; i < state.tabs['length'] ; i++) {
        const dato = { value: state.tabs[i]['nombre'], label: state.tabs[i]['nombre'], id: state.tabs[i]['id'] }
        opciones.push(dato);
      }
      console.log([opciones]);
      bandera_option = false;
    }
    else{
      console.log([opciones]);
    }
  }

  const handle_option_instancia = (e) => {
    // Getting the files from the input
    selected = e
    console.log(selected)
    set_state({
      ...state,
      opciones : [e.value],
    })
  }

  return (
    <Container>
      <Row className="rowJustFlex">
        <p>Para iniciar el semestre selecione la instancia con la cual desea trabajar:</p>
      </Row>
      <Row className="rowJustFlex">
        <Select class="option" options={opciones} onMenuOpen={handle_instancias} onChange={handle_option_instancia} className="option"/>
      </Row>
      <Row className="rowJustFlex">
        <p>Crear semestre: </p>  
      </Row>
    </Container>
  )
}



export default {
  inicio_semestre
}
