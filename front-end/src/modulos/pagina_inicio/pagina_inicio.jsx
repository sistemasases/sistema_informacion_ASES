import React, {useState} from 'react';

import {Row, Col} from "react-bootstrap";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "../../components/componentes_generales/sideBar";



const Pagina_inicio = () => {
  const[nombreUsuario] = useState("usuario1");
  const[rolUsuario] = useState("monitor");
  const[area] = useState('1');

    return (
        <BrowserRouter>
            <Row> 
                <SideBar usuario={nombreUsuario} rolUsuario={rolUsuario}>
                </SideBar>
            </Row>
        </BrowserRouter>
    )
}

export default Pagina_inicio