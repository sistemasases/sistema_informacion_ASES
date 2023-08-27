/**
 * @file pagina_inicio.jsx
 * @version 1.0.0
 * @description página de inicio con un banner informativo.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import All_sede_service from "../../service/all_sede";
import Select from "react-select";
import incioima  from "../../images/inicio.jpg";
import boton1 from '../../images/17.png';
import boton2 from '../../images/18.png';
import boton3 from '../../images/19.png';
import boton4 from '../../images/20.png';
import boton6 from '../../images/2.png';
import boton7 from '../../images/3.png';
import boton8 from '../../images/4.png';
import boton9 from '../../images/5.png';
import boton10 from '../../images/6.png';
import boton11 from '../../images/7.png';
import boton12 from '../../images/8.png';
import boton13 from '../../images/9.png';
import boton14 from '../../images/10.png';
import boton15 from '../../images/11.png';
import boton16 from '../../images/12.png';
import boton17 from '../../images/13.png';
import boton18 from '../../images/14.png';
import boton19 from '../../images/15.png';
import boton20 from '../../images/16.png';
import boton21 from '../../images/21.png';

import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Pagina_inicio = () => {
  const userRole = sessionStorage.getItem("rol");
  let desplegable;

  if (sessionStorage.rol === 'sistemas' || sessionStorage.rol === 'super_ases') {
    desplegable = 'ADMIN';
  } else if (sessionStorage.rol === 'socioeducativo_reg' || sessionStorage.rol === 'socioeducativo') {
    desplegable = 'SOCIOEDUCATIVO';
  } else if (sessionStorage.rol === 'dir_academico') {
    desplegable = 'DIRECTOR ACÁDEMICO';
  } else if (sessionStorage.rol === 'monitor') {
    desplegable = 'MONITOR';
  } else if (sessionStorage.rol === 'practicante') {
    desplegable = 'PRACTICANTE';
  } else if (sessionStorage.rol === 'dir_investigacion') {
    desplegable = 'DIRECTOR INVES.';
  }  else if (sessionStorage.rol === 'dir_programa') {
    desplegable = 'DIRECTOR PROGRAMA';
  } else if (sessionStorage.rol === 'vcd_academico') {
    desplegable = 'VICERRECTOR ACADE.';
  } else if (sessionStorage.rol === 'profesional') {
    desplegable = 'PROFESIONAL';
  } 
  
  //Constante y variable que se usaran para el select
  const opciones = [];
  var bandera_option = true;

  

  //Estado que se usara para extraer todas las sedes
  const [state, set_state] = useState({ tabs: [] });
  const [temp, set_temp] = useState({ seleccionado: "", value: "", id: "" });

  //Conexion con el back para extraer todas las sedes
  useEffect(() => {
    All_sede_service.all_sede().then((res) => {
      set_state({
        ...state,
        tabs: res,
      });
    });
  }, []);

  /**
   * Prop que toma las sedes y las transforma en opciones para el select
   */
  const handle_sedes = () => {
    if (bandera_option === true) {
      for (var i = 0; i < state.tabs["length"]; i++) {
        const dato = {
          value: state.tabs[i]["nombre"],
          label: state.tabs[i]["nombre"],
          id: state.tabs[i]["id"],
        };
        opciones.push(dato);
        
      }
      bandera_option = false;
    }
  };

  //Estados para Pop Up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    set_temp({
      ...temp,
      value: e["value"],
      seleccionado: e["label"],
      id: e["id"],
      
    });
    //Comandos para reconocer qué objeto fue seleccionado
    // set_state({ ...state, seleccionado: e["value"] });
    // set_state({ ...state, seleccionado: e["id"] });
    // console.log(temp.value + "AQUI");
    // console.log(Object.values(e));
    setShow(true);
  };

  //Cambia las sedes para visualizarse
  const handle_storage = () => {
    localStorage.setItem("sede", temp.value);
    // console.log(nombre_sede);
    localStorage.setItem("sede_id", temp.id);
    // console.log(temp.value + " fue Seleccionada");
    console.log(
      "la sede seleccionada es: " +
        localStorage.getItem("sede") +
        " con ID: " +
        localStorage.getItem("sede_id")
    );
    // });
  };
        /*<div
          className="banner"
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 22 }}
        >
          <h1>Ingresaste como admin.</h1>
          <>
            {
              <Container>
                <div className="smolSelect" style={{ width: 300 }}>
                  <Row className="rowJustFlex">
                    <h4>Para cambiar de sede:</h4>
                  </Row>
                  <Row className="rowJustFlex">
                    <Select
                      name="def"
                      class="option"
                      options={opciones}
                      onMenuOpen={handle_sedes}
                      onChange={handleShow}
                      className="option"
                      placeholder="Selecione una sede"
                    />
                  </Row>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Está seguro qué desea seleccionar otra sede?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handle_storage}
                        onClickCapture={handleClose}
                        autoFocus
                      >
                        Cambiar de Sede
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Container>
            }
          </>
          
        </div>*/
  return (
        <Row className="fondo_inicio">
            <Col xs={"12"} md={"6"} className="col_background">
            <p className="estilo_bienvenido"> ¡Bienvenido!</p>  
              <p className="estilo_sesion">INICIASTE SESIÓN </p>
            <p className="estilo_como">COMO {desplegable}</p>
            </Col>
            <Col style={{ background:"white"}} xs={"12"} md={"6"}>
              <Row> 
                <Col xs={"12"} md={"5"} className="botones-container">
                {(userRole === "super_ases" || userRole === "sistemas")&&(
                <Link to={`/gestion_usuario_rol`}> 
                  <img src={boton6} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === 'dir_academico' || userRole === 'dir_programa' || userRole === 'vcd_academico' || userRole === 'practicante' || userRole === 'monitor' || userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' || userRole === "super_ases" || userRole === "sistemas")&& (
                <Link to={`/ficha_estudiante/sin_seleccion`}> 
                  <img src={boton9} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === 'dir_academico' ||userRole === 'dir_programa' || userRole === 'vcd_academico' || userRole === 'practicante' || userRole === 'monitor' || userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' || userRole === "super_ases" || userRole === "sistemas")&& (
                <Link to={`/reporte`}> 
                  <img src={boton15} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === "super_ases" || userRole === "sistemas")&& (
                <Link to={`/carga_masiva`}> 
                  <img src={boton21} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === 'practicante'|| userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' )&& (
                <Link to={`/reporte_seguimientos`}> 
                  <img src={boton17} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' )&& (
                <Link to={`/sin_seguimientos`}> 
                  <img src={boton8} className="boton" alt='/'></img>
                </Link>)}
                {(userRole === 'dir_academico' )&& (
                <Link to={`/academico`}> 
                  <img src={boton20} className="boton" alt='/'></img>
                </Link>)}
                </Col>

                <Col className="vertical-line-col"><div className="vertical"></div></Col>

                <Col xs={"12"} md={"5"} className="botones-container">
                <Link to={`https://sistemasases.github.io/rutasdeatencion/`}> 
                  <img src={boton1} className="boton" alt='/'></img>
                </Link>
                <Link to={`https://asesinteractiva.univalle.edu.co/semaforoalertas/`}> 
                  <img src={boton2} className="boton" alt='/'></img>
                </Link>
                {/* <Link to={`https://caja-de-herramientas-univalle.vercel.app/`}> 
                  <img src={boton3} className="boton" alt='/'></img>
                </Link> */}
                <Link to={`https://ases.univalle.edu.co/`}> 
                  <img src={boton4} className="boton" alt='/'></img>
                </Link>
              </Col>
              </Row>
            </Col>
        </Row>
  );
};

export default Pagina_inicio;

