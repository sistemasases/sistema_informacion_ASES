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
import NavBar from "./components/componentesGenerales/NavBar";
import "./Scss/Styles.css";
import "./Scss/fichaEstudiante/Styles.css";
import "./Scss/fichaEstudiante/selector.css";


import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentesGenerales/SideBar"
import Analitics from "./components/componentesGenerales/ejemplo_navbar/Analitics.jsx";
import FichaDeEstudiante from "./components/fichaDeEstudiante/fichaDeEstudiante.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Row>
                <NavBar />
 
                <SideBar>
                    <Routes>
                        <Route path="/"element={<Analitics/>}/>
                        <Route path="/fichaDeEstudiante"element={<FichaDeEstudiante/>}/>
                    </Routes>
                </SideBar>
            </Row>
        </BrowserRouter>
    )
}

export default App