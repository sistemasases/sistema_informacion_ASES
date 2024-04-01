import React, { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaThList, FaBars, FaFontAwesome } from "react-icons/fa";
import { DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <Col className="container_footer">
      <div class="d-none d-md-inline">
        <Row className="footer_links">Información de contacto</Row>
        <Row className="footer_links_bajo">
          <h4 className="texto_pequeño">Sistemas ASES</h4>
          <a
            href="https://mail.google.com/mail/"
            target="_blank"
            rel="noonpener noreferrer"
          >
            sistemas.ases@correounivalle.edu.co
          </a>
          <h4 className="texto_pequeño">Tel : +57 (602) 3212100 Ext:3318</h4>
          <h4 className="texto_pequeño"> Bajos de Biblioteca Mario Carvajal</h4>
          <h4 className="texto_pequeño"> Universidad del Valle</h4>
          <h4 className="texto_pequeño"> Cali, Colombia 2016-2023</h4>
        </Row>
        <Row className="footer_links_bajo">
          <a
            href="https://www.instagram.com/estrategia.ases/?hl=es-la"
            target="_blank"
            rel="noonpener noreferrer"
          >
            <i class="bi-instagram"></i>
          </a>
        </Row>
      </div>

      <div class="d-inline d-md-none">
        <Row className="footer_links_pequeño">
          <Col>Información de contacto</Col>
        </Row>
        <Row className="footer_links_bajo_pequeño">
          <h4 className="texto_footer_pequeño">Estrategias ASES</h4>
          <a
            className="texto_footer_pequeño"
            href="https://campusvirtual.univalle.edu.co/"
            target="_blank"
            rel="noonpener noreferrer"
          >
            estrategia.ases@correounivalle.edu.co
          </a>
          <h4 className="texto_footer_pequeño">
            Tel : +57 (2) 3212100 Ext:3319
          </h4>
          <h4 className="texto_footer_pequeño">
            {" "}
            Bajos de Biblioteca Mario Carvajal
          </h4>
          <h4 className="texto_footer_pequeño"> Universidad del Valle</h4>
          <h4 className="texto_footer_pequeño"> Cali, Colombia 2016-2017</h4>
        </Row>
        <Row className="footer_links_bajo_pequeño">
          <i class="bi-instagram"></i>
        </Row>
      </div>
    </Col>
  );
};

export default Footer;
