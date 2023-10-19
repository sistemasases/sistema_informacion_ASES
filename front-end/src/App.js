import React, {useState} from 'react';

import {Row} from "react-bootstrap";
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
import "./Scss/componentes_generales/data_table_extensions.css";
import "./Scss/carga_masiva/carga_masiva.css";
import "./Scss/reporte_desercion/desercion.css";
import "./Scss/inicio/inicio.css";



import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentes_generales/sideBar.jsx";
// import Login from "./modulos/login/login.jsx";
//import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Ficha_estudiante from "./modulos/ficha_estudiante/ficha_estudiante.jsx";
import Ficha_monitor from "./modulos/ficha_monitor/ficha_monitor.jsx";
import Reporte_seguimientos from "./modulos/reporte_seguimientos/reporte_seguimientos.jsx";
import Sin_seguimientos from "./modulos/sin_seguimientos/sin_seguimiento.jsx";
import Desercion from "./modulos/desercion/desercion.jsx";
import Academico_pestaña from "./modulos/academico_pestaña/academico_pestaña.jsx";
import Calificador from "./modulos/academico_pestaña/calificador.jsx";
import Inicio from "./modulos/pagina_inicio/pagina_inicio.jsx";
import Gestion_usuario_rol from "./modulos/gestion_usuario_rol/gestion_usuario_rol.jsx";
import Carga_masiva from "./modulos/carga_masiva/carga_masiva.jsx";
import Asignaciones from "./modulos/asignaciones/asignaciones.jsx";
import Inicio_semestre_sistemas from "./modulos/inicio_semestre_sistemas/inicio_semestre_sistemas_instancia.jsx";
import Semestre_sistemas from "./modulos/inicio_semestre_sistemas/inicio_semestre_sistemas.jsx";
import Reporte from "./modulos/reportes/reporte.jsx";
import Alertas from './modulos/alertas/alertas.jsx';
import FichaEstudianteDiscapacidad from './modulos/discapacidad/ficha_estudiante/FichaEstudianteDiscapacidad.jsx';
import ReporteDiscapacidad from './modulos/discapacidad/reporte/ReporteDiscapacidad.jsx';
import { Registro } from './modulos/discapacidad/registro/Registro.jsx';
// import Footer from './components/componentes_generales/footer.jsx';

const App = () => {
  const[nombreUsuario] = useState("Marcela Pérez Gaviria / Sede Cali / ");
  const[rolUsuario] = useState("superSistemas");
  const[periodo] = useState("2023-2");
  const[area] = useState('1');

    return (
        <BrowserRouter>
            <Row> 
                <SideBar usuario={nombreUsuario} rolUsuario={rolUsuario} periodo={periodo} >
                    <Routes>
                        <Route path="/ficha_estudiante/:id" element={<Ficha_estudiante path_actual={"Ficha Estudiante"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/ficha_estudiante_discapacidad/:id" element={<FichaEstudianteDiscapacidad path_actual={"Ficha Estudiante Discapacidad"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/ficha_monitor" element={<Ficha_monitor path_actual={"Ficha Monitor"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/reporte_seguimientos"element={<Reporte_seguimientos path_actual={"Reporte seguimientos"} usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="/sin_seguimientos"element={<Sin_seguimientos path_actual={"Cantidad seguimientos"} usuario={nombreUsuario}/>}/>
                        <Route path="/desercion"element={<Desercion path_actual={"Deserción"} usuario={nombreUsuario}/>}/>
                        <Route path="/academico"element={<Academico_pestaña path_actual={"Deserción"} usuario={nombreUsuario}/>}/>
                        <Route path="/calificador/:profesor/:curso/:cod/:franja"element={<Calificador path_actual={"Deserción"} usuario={nombreUsuario}/>}/>
                        <Route path="/gestion_usuario_rol" element={<Gestion_usuario_rol path_actual={"Gestion usuarios"} usuario={nombreUsuario}/>}/>
                        <Route path="/carga_masiva" element={<Carga_masiva/>}/>
                        <Route path="/asignaciones" element={<Asignaciones/>}/>
                        <Route path="/inicio_semestre_sistemas"element={<Inicio_semestre_sistemas/>}/>
                        <Route path="/crear_semestre_sistemas"element={<Semestre_sistemas/>}/>
                        <Route path="/reporte" element={<Reporte/>}/>
                        <Route path="/reporte_discapacidad" element={<ReporteDiscapacidad/>}/>
                        <Route path="/alertas" element={<Alertas/>}/>
                        <Route path="/" element={<Inicio/>}/>
                        <Route path="/registro_discapacidad" element={<Registro/>}/>
                    </Routes>
                </SideBar>
            </Row>

        </BrowserRouter>
    )
}

export default App


