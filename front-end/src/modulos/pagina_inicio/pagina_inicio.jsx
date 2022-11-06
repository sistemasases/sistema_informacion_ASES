import React, {useState} from 'react';

import {Row, Col} from "react-bootstrap";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideBar from "../../components/componentes_generales/sideBar";
import Navbar from"../../components/componentes_generales/NavBar";




const Pagina_inicio = () => {
  const[nombreUsuario] = useState("Marcela Pérez Gaviria / Sede Cali / 2022 - 2");
  const[rolUsuario] = useState("");
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