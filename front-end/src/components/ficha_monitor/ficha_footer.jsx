import React, {useState} from 'react';
import Select from 'react-select'  ;
// import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaThList, FaBars, FaFontAwesome} from "react-icons/fa";

import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Ficha_footer = () =>{

    const [state,set_state] = useState({
        ultima_actualizacion:'',
      })

    var today = new Date();
    var now = today.toLocaleString();
    const handle_time = (e) => {
        set_state({
            ...state,
            ultima_actualizacion:now,
          })
      }
  

    return (
        <Container>
            <Row className="ficha_footer">
                    <h4 className="texto_pequeño">
                            profesional: Practicante: Monitor: 
                        <br/> Ultima astualización:
                        <br/> 
                        <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">
                            Documento de Autorización de Tratamiento de Datos
                        </a>
                    </h4>
            </Row>
        </Container>
    )
}

export default Ficha_footer 