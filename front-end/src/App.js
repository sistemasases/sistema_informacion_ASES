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
import "./Scss/descarga_fichas/descarga_fichas.css";
import "./Scss/reporte_desercion/desercion.css";
import "./Scss/inicio/inicio.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "./components/componentes_generales/sideBar.jsx";
import Path from './modulos/path/path.jsx';
import Pagina_no_encontrada from "./components/componentes_generales/pagina_no_encontrada.jsx";
import ObtenerEstudiante from './modulos/campus_diverso/obtener_estudiante.jsx';
import Registro_estudiante from './modulos/campus_diverso/registro_estudiante.jsx';

const App = () => {
  const[nombreUsuario] = useState("Marcela Pérez Gaviria / Sede Cali / ");
  const[rolUsuario] = useState("superSistemas");
  const[periodo] = useState("2024-1");
  const[area] = useState('1');

    return (
        <BrowserRouter>
        <Routes><Route path="/campus-diverso/formulario" element={<Registro_estudiante/>}/></Routes>
        
            <Row> 
                <SideBar usuario={nombreUsuario} rolUsuario={rolUsuario} periodo={periodo} >
                    <Routes>
                        <Route path="/"element={<Path usuario={nombreUsuario} rolUsuario={rolUsuario} area={area} periodo={periodo}/>}/>
                        <Route path="*"element={<Pagina_no_encontrada/>}/>
                    </Routes>
                </SideBar>
            </Row>

        </BrowserRouter>
    )
}

export default App