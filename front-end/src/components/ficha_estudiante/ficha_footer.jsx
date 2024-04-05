/**
 * @file ficha_footer.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar el footer de la ficha del estudiante.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaThList, FaBars, FaFontAwesome } from "react-icons/fa";
import { DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ficha_footer = () => {
  // variable que almacena la fecha de la última actualización en el estado.
  const [state, set_state] = useState({
    ultima_actualizacion: "",
  });

  // variable que almacena la fecha actual.
  var today = new Date();
  // variable que almacena la fecha actual en formato string.
  var now = today.toLocaleString();

  /**
   * @description Función que se encarga de actualizar la fecha de la última actualización.
   * @param {Evento} e - Evento que desencadenó la carga de información.
   * @return {void} - No retorna ningún valor.
   */
  const handle_time = (e) => {
    set_state({
      ...state,
      ultima_actualizacion: now,
    });
  };

  return (
    <Container>
      <Row className="ficha_footer">
        <h4 className="texto_pequeño">
          profesional: Practicante: Monitor:
          <br /> Ultima astualización:
          <br />
          <a
            href="https://campusvirtual.univalle.edu.co/"
            target="_blank"
            rel="noonpener noreferrer"
          >
            Documento de Autorización de Tratamiento de Datos
          </a>
        </h4>
      </Row>
    </Container>
  );
};

export default Ficha_footer;
