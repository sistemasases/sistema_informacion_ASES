/*
import React, {useEffect}from 'react';
import fetch from 'node-fetch';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";


const url = 'http://127.0.0.1:8000/login/tasks/'
function App() {
  useEffect(()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'username': 'rhazek',
        'password': 'rhazekmaster12'
      },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
*/
import React, { Component }  from 'react';

import {Row, Col} from "react-bootstrap";
import NavBar from "./components/componentes_generales/navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Scss/navbar/navbar.css";
import "./Scss/sidebar/sidebar.css";
import "./Scss/ficha_estudiante/Styles.css";
import "./Scss/ficha_estudiante/selector.css";
import "./Scss/ficha_estudiante/informacion_general.css";
import "./Scss/ficha_estudiante/academico.css";
import "./Scss/reporte_seguimientos/reporte_seguimientos.css";
import "./Scss/reporte_seguimientos/desplegable.css"
import "./Scss/gestion_usuarios_rol/selector_usuarios.css"
import "./Scss/gestion_usuarios_rol/gestion_usuario_rol.css"
import "./Scss/footer/footer.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentes_generales/sideBar";
import Login from "./modulos/login/login.jsx";
//import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Reporte_seguimientos from "./modulos/reporte_seguimientos/reporte_seguimientos.jsx";
import Sin_seguimientos from "./modulos/sin_seguimientos/sin_seguimiento.jsx";

import Gestion_usuario_rol from "./modulos/gestion_usuario_rol/gestion_usuario_rol.jsx";




const App = () => {
    return (
        <BrowserRouter>
            <Row> 
                <SideBar>
                    <Routes>
                        <Route path="/"element={<Login/>}/>
                        <Route path="/ficha_estudiante"element={<Ficha_estudiante/>}/>
                        <Route path="/reporte_seguimientos"element={<Reporte_seguimientos/>}/>
                        <Route path="/sin_seguimientos"element={<Sin_seguimientos/>}/>
                        <Route path="/gestion_usuario_rol" element={<Gestion_usuario_rol/>}/>
                    </Routes>
                </SideBar>
            </Row>
        </BrowserRouter>
    )
}

export default App