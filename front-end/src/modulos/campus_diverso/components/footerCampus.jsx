import React from "react";
import { Row, Col } from "react-bootstrap";
import '../../../Scss/campus_diverso/footerCampus.css';

export const FooterCampus = () => {
  return (

    <Col className="container_footer_campus">
      <div class="d-none d-md-inline">
        <Row className="footer_links_campus">Información de contacto</Row>
        <Row className="footer_links_bajo_campus">
          <h4 className="texto_pequeño_campus">Sistemas ASES</h4>
          <a
            href="https://mail.google.com/mail/"
            target="_blank"
            rel="noonpener noreferrer"
          >
            sistemas.ases@correounivalle.edu.co
          </a>
          <h4 className="texto_pequeño_campus">Tel : +57 (602) 3212100 Ext:3318</h4>
          <h4 className="texto_pequeño_campus"> Bajos de Biblioteca Mario Carvajal</h4>
          <h4 className="texto_pequeño_campus"> Universidad del Valle</h4>
          <h4 className="texto_pequeño_campus"> Cali, Colombia 2016-2023</h4>
        </Row>
        <Row className="footer_links_bajo_campus">
          <a
            href="https://www.instagram.com/estrategia.ases/?hl=es-la"
            target="_blank"
            rel="noonpener noreferrer"
          >
            <i class="bi-instagram"></i>
          </a>
          <a
            href="google.com"
            target="_blank"
            rel="noonpener noreferrer"
          >
            <i class="bi-twitter"></i>
          </a>
        </Row>
      </div>

      <div class="d-inline d-md-none">
        <Row className="footer_links_pequeño_campus">
          <Col>Información de contacto</Col>
        </Row>
        <Row className="footer_links_bajo_pequeño">
          <h4 className="texto_footer_pequeño_campus">Estrategias ASES</h4>
          <a
            className="texto_footer_pequeño_campus"
            href="https://campusvirtual.univalle.edu.co/"
            target="_blank"
            rel="noonpener noreferrer"
          >
            estrategia.ases@correounivalle.edu.co
          </a>
          <h4 className="texto_footer_pequeño_campus">
            Tel : +57 (2) 3212100 Ext:3319
          </h4>
          <h4 className="texto_footer_pequeño_campus">
            {" "}
            Bajos de Biblioteca Mario Carvajal
          </h4>
          <h4 className="texto_footer_pequeño_campus"> Universidad del Valle</h4>
          <h4 className="texto_footer_pequeño_campus"> Cali, Colombia 2016-2017</h4>
        </Row>
        <Row className="footer_links_bajo_pequeño_campus">
          <i class="bi-instagram"></i>
        </Row>
      </div>
    </Col>


  )
}
