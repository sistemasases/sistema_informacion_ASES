import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../../../Scss/campus_diverso/footerCampus.css';
const FooterCampusDos = () => {
    return (
      <Container fluid className="footer-container">
      <Container className="p-1">
        <Row className="my-3 d-flex justify-content-center">
          <Col lg={3} md={6} className="mb-4 mb-md-0 text-center d-flex flex-column align-items-center">
            <div className="logo-container">
              <Image src='/imgs/campus_footer_logo.jpg' height="90" alt="Logo" loading="lazy" />
            </div>
            <p className="text-center">Programa académico Campus Diverso</p>
            <ul className="list-unstyled d-flex flex-row justify-content-center">
              <li><a className="text-white px-2" href="#!"><i className="bi-facebook"></i></a></li>
              <li><a className="text-white px-2" href="#!"><i className="bi-instagram"></i></a></li>
              <li><a className="text-white ps-2" href="#!"><i className="bi-youtube"></i></a></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0 text-center d-flex flex-column align-items-center">
            <div className="logo-container">
              <Image src='/imgs/vbu_logo.png' height="90" alt="Logo" loading="lazy" />
            </div>
          </Col>

          <Col lg={3} md={6} className="contacto-col">
        <h5>Contacto</h5>
        <ul>
            <li><p><i className="bi-geo-alt"></i>Vicerrectoría Académica, Edificio E##, Oficina ###</p></li>
            <li><p><i className="bi-telephone"></i>3212100 Ext. 3319 - 3309</p></li>
            <li><p><i className="bi-envelope"></i>campusdiverso@correounivalle.edu.co</p></li>
        </ul>
        </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default FooterCampusDos;
