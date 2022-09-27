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

import React from 'react';
import {Row, Col} from "react-bootstrap";
import NavBar from "./components/componentes_generales/NavBar";
import "./Scss/Styles.css";
import "./Scss/fichaEstudiante/Styles.css";
import "./Scss/fichaEstudiante/selector.css";
import "./App.css";


import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentes_generales/SideBar"
import Analitics from "./components/componentes_generales/ejemplo_navbar/Analitics.jsx";
import FichaDeEstudiante from "./components/fichaDeEstudiante/fichaDeEstudiante.jsx";
import Login from "./modulos/login/login.jsx";
import Carga_masiva from "./modulos/carga_masiva/carga_masiva.jsx";
import Inicio_semestre_sistemas from "./modulos/inicio_semestre_sistemas/inicio_semestre_sistemas";
import Gestion_usuario_rol from "./modulos/gestion_usuario_rol/gestion_usuario_rol.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Row>
                <NavBar />
 
                <SideBar>
                    <Routes>
                        <Route path="/"element={<Analitics/>}/>
                        <Route path="/fichaDeEstudiante"element={<FichaDeEstudiante/>}/>
                        <Route path="/login"element={<Login/>}/>
                        <Route path="/carga_masiva"element={<Carga_masiva/>}/>
                        <Route path="/inicio_semestre_sistemas"element={<Inicio_semestre_sistemas/>}/>
                        <Route path="/gestion_usuario_rol"element={<Gestion_usuario_rol/>}/>
                    </Routes>
                </SideBar>
            </Row>
        </BrowserRouter>
    )
}

export default App