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
import React, {useState} from 'react';

import {Row, Col} from "react-bootstrap";
import "@fontsource/manrope";

import 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Scss/navbar/navbar.css";
import "./Scss/sidebar/sidebar.css";
import "./Scss/academico/academico.css";
import "./Scss/academico/academico_listas.css";
import "./Scss/ficha_estudiante/Styles.css";
import "./Scss/ficha_estudiante/info_registro.css";
import "./Scss/ficha_estudiante/socieducativa.css";
import "./Scss/ficha_estudiante/selector.css";
import "./Scss/ficha_estudiante/informacion_general.css";
import "./Scss/ficha_estudiante/academico.css";
import "./Scss/reporte_seguimientos/reporte_seguimientos.css";
import "./Scss/reporte_seguimientos/desplegable.css"
import "./Scss/gestion_usuarios_rol/selector_usuarios.css"
import "./Scss/gestion_usuarios_rol/gestion_usuario_rol.css"
import "./Scss/footer/footer.css";
import "./Scss/asignaciones/asignaciones.css";
import "./Scss/sin_seguimientos/sin_seguimientos.css"
import "./Scss/login/login_component.css";


import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentes_generales/sideBar.jsx";
import Login from "./modulos/login/login.jsx";
//import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Ficha_monitor from "./modulos/ficha_monitor/ficha_monitor.jsx";
import Reporte_seguimientos from "./modulos/reporte_seguimientos/reporte_seguimientos.jsx";
import Sin_seguimientos from "./modulos/sin_seguimientos/sin_seguimiento.jsx";
import Desercion from "./modulos/desercion/desercion.jsx";
import Academico_pestaña from "./modulos/academico_pestaña/academico_pestaña.jsx";
import Inicio from "./modulos/pagina_inicio/pagina_inicio.jsx";
import Gestion_usuario_rol from "./modulos/gestion_usuario_rol/gestion_usuario_rol.jsx";
import Carga_masiva from "./modulos/carga_masiva/carga_masiva.jsx";
import Asignaciones from "./modulos/asignaciones/asignaciones.jsx";
import Inicio_semestre_sistemas from "./modulos/inicio_semestre_sistemas/inicio_semestre_sistemas_instancia.jsx";
import Semestre_sistemas from "./modulos/inicio_semestre_sistemas/inicio_semestre_sistemas.jsx";
import Reporte from "./modulos/reportes/reporte.jsx";
import Footer from './components/componentes_generales/footer.jsx';


/*
<SideBar usuario={nombreUsuario} rolUsuario={rolUsuario}>
                    <Routes>
                        <Route path="/"element={<Login/>}/>
                        <Route path="/ficha_estudiante"element={<Ficha_estudiante usuario={nombreUsuario}/>}/>
                        <Route path="/reporte_seguimientos"element={<Reporte_seguimientos usuario={nombreUsuario} area={area}/>}/>
                        <Route path="/sin_seguimientos"element={<Sin_seguimientos usuario={nombreUsuario}/>}/>
                        <Route path="/gestion_usuario_rol" element={<Gestion_usuario_rol usuario={nombreUsuario}/>}/>
                    </Routes>
                </SideBar>

                Login>
                  <Route path="/"element={<Login/>}/>
                  <Route path="/inicio"element={<Inicio usuario={nombreUsuario} area={area}/>}/>
                  <Route path="/ficha_estudiante"element={<Ficha_estudiante usuario={nombreUsuario}/>}/>
                  <Route path="/reporte_seguimientos"element={<Reporte_seguimientos usuario={nombreUsuario} area={area}/>}/>
                  <Route path="/sin_seguimientos"element={<Sin_seguimientos usuario={nombreUsuario}/>}/>
                  <Route path="/gestion_usuario_rol" element={<Gestion_usuario_rol usuario={nombreUsuario}/>}/>
              </Login>
                 */


const App = () => {
  const[nombreUsuario] = useState("Marcela Pérez Gaviria / Sede Cali / ");
  const[rolUsuario] = useState("superSistemas");
  const[periodo] = useState("2022-2");
  const[area] = useState('1');

    return (
        <BrowserRouter>
            <Row> 
            <SideBar usuario={nombreUsuario} rolUsuario={rolUsuario} periodo={periodo} >
                    <Routes>
                        <Route path="/ficha_estudiante/:id" element={<Ficha_estudiante path_actual={"Ficha Estudiante"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/ficha_monitor" element={<Ficha_monitor path_actual={"Ficha Monitor"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/reporte_seguimientos"element={<Reporte_seguimientos path_actual={"Reporte seguimientos"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/sin_seguimientos"element={<Sin_seguimientos path_actual={"Cantidad seguimientos"} usuario={nombreUsuario}/>}/>
                        <Route path="/desercion"element={<Desercion path_actual={"Deserción"} usuario={nombreUsuario}/>}/>
                        <Route path="/academico"element={<Academico_pestaña path_actual={"Deserción"} usuario={nombreUsuario}/>}/>
                        <Route path="/gestion_usuario_rol" element={<Gestion_usuario_rol path_actual={"Gestion usuarios"} usuario={nombreUsuario}/>}/>
                        <Route path="/carga_masiva" element={<Carga_masiva/>}/>
                        <Route path="/asignaciones" element={<Asignaciones/>}/>
                        <Route path="/inicio_semestre_sistemas"element={<Inicio_semestre_sistemas/>}/>
                        <Route path="/crear_semestre_sistemas"element={<Semestre_sistemas/>}/>
                        <Route path="/reporte"element={<Reporte/>}/>
                        <Route path="/"element={<Inicio/>}/>
                    </Routes>
                </SideBar>

            </Row>

        </BrowserRouter>
    )
}

export default App


/*

.texto_pequeño{
    font-size: 14pt;
    font-family: "Manrope";
}


.texto_subtitulo{
    font-size: 20pt;
    font-family: "Manrope";
}

.texto_titulo{
    font-size: 36pt;
    font-family: "Manrope";
}

*/