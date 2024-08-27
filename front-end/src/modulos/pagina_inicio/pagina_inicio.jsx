/**
 * @file pagina_inicio.jsx
 * @version 1.0.0
 * @description página de inicio con un banner informativo.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import { encriptar, desencriptar, encriptarInt } from '../../modulos/utilidades_seguridad/utilidades_seguridad';
import All_sede_service from "../../service/all_sede";
import boton15 from '../../images/BOTONES_SVG 12.svg';
import boton17 from '../../images/BOTONES_SVG 14.svg';
import boton20 from '../../images/BOTONES_SVG 17.svg';
import boton1 from '../../images/BOTONES_SVG 18.svg';
import boton2 from '../../images/BOTONES_SVG 19.svg';
import boton3 from '../../images/BOTONES_SVG 20.svg';
import boton4 from '../../images/BOTONES_SVG 21.svg';
import boton21 from '../../images/BOTONES_SVG 1.svg';
import boton6 from '../../images/BOTONES_SVG 3.svg';
import boton8 from '../../images/BOTONES_SVG 5.svg';
import boton9 from '../../images/BOTONES_SVG 6.svg';
import React, {useState, useEffect} from "react";
import {Row, Button, Col} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import Select from 'react-select';


const Pagina_inicio = () => {
  // Desencriptar los permisos del usuario desde el sessionStorage y los asignamos a userRole
  const userRole = desencriptar(sessionStorage.getItem('rol'));
  // Variable para guardar el rol
  let desplegable;
  // Setear la variable desplegable según el rol
  if (userRole === 'sistemas' || userRole === 'super_ases') {
    desplegable = 'ADMIN';
  } else if (userRole === 'socioeducativo_reg' || userRole === 'socioeducativo') {
    desplegable = 'SOCIOEDUCATIVO';
  } else if (userRole === 'dir_academico') {
    desplegable = 'DIRECTOR ACÁDEMICO';
  } else if (userRole === 'monitor') {
    desplegable = 'MONITOR';
  } else if (userRole === 'practicante') {
    desplegable = 'PRACTICANTE';
  } else if (userRole === 'dir_investigacion') {
    desplegable = 'DIRECTOR INVES.';
  }  else if (userRole === 'dir_programa') {
    desplegable = 'DIRECTOR PROGRAMA';
  } else if (userRole === 'vcd_academico') {
    desplegable = 'VICERRECTOR ACADE.';
  } else if (userRole === 'profesional') {
    desplegable = 'PROFESIONAL';
  } else if (userRole === 'profesor') {
    desplegable = 'PROFESOR';
  } else if (userRole === 'CAMPUS DIVERSO'){
    desplegable = 'campus diverso';
  }
  //Constante y variable que se usaran para el select
  const opciones = [];
  var bandera_option = true;
  //Estado que se usara para extraer todas las sedes
  const [state, set_state] = useState({ tabs: [] });
  const [temp, set_temp] = useState({ seleccionado: "", value: "", id: "" });
  //Conexion con el back para extraer todas las sedes
  useEffect(() => {
    if (bandera_option === true && state.tabs.length === 0) {
      All_sede_service.all_sede()
        .then((res) => {
          //console.log("Respuesta de la API:", res);
          if (res && Array.isArray(res)) {
            set_state({
              ...state,
              tabs: res,
            });
          } else {
            console.error("Respuesta de la API no es un arreglo válido:", res);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
        });
      bandera_option = false;
    }
  }, []);
  

  /**
   * @function handle_sedes
   * @description Prop que toma las sedes y las transforma en opciones para el select
  */
  const handle_sedes = () => {
    //console.log("ENTRO");
    //console.log(state.tabs);
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

  // Estados para Pop Up
  const [show, setShow] = useState(false);
  /**
   * @function handleClose
   * @description Cierra el modal
  */
  const handleClose = () => setShow(false);
  /**
   * @function handleShow
   * @description Abre el modal según el evento
  */
  const handleShow = (e) => {
    set_temp({
      ...temp,
      value: e["value"],
      seleccionado: e["label"],
      id: e["id"],
      
    });
    setShow(true);
  };
  /**
   * @function handle_storage
   * @description Actualiza la sede según lo seleccionado en el select
  */
  const handle_storage = () => {
    sessionStorage.setItem("sede", encriptar(temp.value));
    sessionStorage.setItem("sede_id", encriptarInt(temp.id));
    window.location.reload();
  };
  /**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
  */
  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };

  return (
    <Row className="fondo_inicio">
      <Col xs={"12"} md={"6"} className="col_background">
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
        {(userRole === "super_ases" || userRole === "socioeducativo"|| userRole === "socioeducativo_reg")&&(
        <Row className="rowJustFlex">
          <h4>Para cambiar de sede:</h4>
        </Row>)}
        {(userRole === "super_ases" || userRole === "socioeducativo"|| userRole === "socioeducativo_reg")&&(
        <Row className="selector_reg">
        {(userRole === "super_ases" || userRole === "socioeducativo"|| userRole === "socioeducativo_reg")&&(
          <Select
            name="def"
            class="option"
            options={opciones}
            onMenuOpen={handle_sedes}
            onChange={handleShow}
            className="option"
            placeholder="Selecione una sede"
          />)}
        </Row>)}
        <p className="estilo_bienvenido"> ¡Bienvenido!</p>  
        <p className="estilo_sesion">INICIASTE SESIÓN </p>
        <p className="estilo_como">COMO {desplegable}</p>
      </Col>
      <Col style={{ background:"white"}} xs={"12"} md={"6"}>
        <Row> 
          <Col xs={"12"} md={"5"} className="botones-container">
            {(userRole === "super_ases" || userRole === "sistemas")&&(
              <img src={boton6} className="boton" alt='/' onClick={() => cambiar_ruta(`/gestion_usuario_rol`)}></img>)}
            {(userRole === 'dir_academico' || userRole === 'dir_programa' || userRole === 'vcd_academico' || userRole === 'practicante' || userRole === 'monitor' || userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' || userRole === "super_ases" || userRole === "sistemas")&& (
              <img src={boton9} className="boton" alt='/' onClick={() => cambiar_ruta(`/ficha_estudiante/sin_seleccion`)}></img>)}
            {(userRole === 'dir_academico' ||userRole === 'dir_programa' || userRole === 'vcd_academico' || userRole === 'practicante' || userRole === 'monitor' || userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' || userRole === "super_ases" || userRole === "sistemas")&& (
              <img src={boton15} className="boton" alt='/' onClick={() => cambiar_ruta(`/reporte`)}></img>)}
            {(userRole === "super_ases" || userRole === "sistemas")&& (
              <img src={boton21} className="boton" alt='/' onClick={() => cambiar_ruta(`/carga_masiva`)}></img>)}
            {(userRole === 'practicante'|| userRole === 'profesional' || userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' )&& (
              <img src={boton17} className="boton" alt='/' onClick={() => cambiar_ruta(`/reporte_seguimientos`)}></img>)}
            {( userRole === 'socioeducativo' || userRole === 'socioeducativo_reg' || userRole === 'profesional')&& (
              <img src={boton8} className="boton" alt='/' onClick={() => cambiar_ruta(`/sin_seguimientos`)}></img>)}
            {(userRole === 'dir_academico' )&& (
              <img src={boton20} className="boton" alt='/' onClick={() => cambiar_ruta(`/academico`)}></img>)}
              {(userRole === 'CAMPUS DIVERSO' )&& (
              <img src={boton15} className="boton" alt='/' onClick={() => cambiar_ruta(`/campus_diverso/registro_estudiante`)}></img>)}
              {(userRole === 'CAMPUS DIVERSO' )&& (
              <img src={boton6} className="boton" alt='/' onClick={() => cambiar_ruta(`/campus_diverso/obtener_estudiante`)}></img>)}
            {(userRole === 'profesor')?<>{cambiar_ruta(`/academico`)}</>:<>{}</>}
          </Col>
          <Col className="vertical-line-col"><div className="vertical"></div></Col>
          <Col xs={"12"} md={"5"} className="botones-container">
            <Link to={`https://sistemasases.github.io/rutasdeatencion/`} target="_blank"> 
              <img src={boton1} className="boton" alt='/'></img>
            </Link>
            <Link to={`https://asesinteractiva.univalle.edu.co/semaforoalertas/`} target="_blank"> 
              <img src={boton2} className="boton" alt='/'></img>
            </Link>
            <Link to={`https://sistemaases.univalle.edu.co/caja-herramientas/`} target="_blank"> 
              <img src={boton3} className="boton" alt='/'></img>
            </Link>
            <Link to={`https://ases.univalle.edu.co/`} target="_blank"> 
              <img src={boton4} className="boton" alt='/'></img>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Pagina_inicio;