/**
  * @file academico_desplegables.jsx
  * @version 1.0.0
  * @description Componente para los desplegables del módulo académico
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Desplegable_item_listas_materias from './desplegable_Item_listas_materias';
import Modal from 'react-bootstrap/Modal';
import Estudiantes from './estudiantes';
import Profesores from './profesores';
import axios from 'axios';
import {decryptTokenFromSessionStorage, desencriptar, desencriptarInt} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Academico_desplegable
 * @description Componente que muestra el desplegable para seleccionar diferentes elementos académicos como facultades, profesores y estudiantes.
 * @returns {JSX.Element} Componente Academico_desplegable.
 */
const Academico_desplegable = () => {

  // Configuración para las llamadas a la API
  const config = {
    headers: {
      // Obtención del token de sesión 
      Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    }
  };

  // Estado para el interruptor de cambio
  const [switchChecked, setChecked] = useState(false);
  const handleChange = () => setChecked(!switchChecked);

  // Estado para el modal y sus controladores
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estado para almacenar datos y su actualización
  const [state, set_state] = useState({
    facultades: [],
    profesores: [{ profesores: '' }],
    estudiantes_a_consultar: [{ estudiantes: '' }],
    traer_materias_del_profesor: [],
    tiene_estudiantes: false,
    tiene_facultades: false,
    tiene_profesores: false,
    filtro: ''
  });

  // Estado para la pestaña activa y su controlador
  const [activeTabIndex, setActiveTabIndex] = useState('0');
  const activeTab = (index) => {
    index === activeTabIndex ? setActiveTabIndex(0) : setActiveTabIndex(index);
  };

  // Cambiar dato en el estado
  const cambiar_dato = (e) => {
    set_state({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // Efecto para realizar llamadas iniciales
  useEffect(() => {
    if(desencriptar(sessionStorage.getItem('rol')) === 'profesor')
    {
      traer_materias_del_profesor()
    }
    else
    {
        traer_cursos_de_facultad();
    }
  }, []);

  // Obtener materias del profesor desde la API
  const traer_materias_del_profesor = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/traer_materias_del_profesor/`+desencriptar(sessionStorage.getItem('id_usuario'))+'/', config);
      set_state({
        traer_materias_del_profesor: response.data,
      });
    } catch (error) {
      console.log('Error al obtener facultades:', error);
    }
  };

  // Obtener cursos de la facultad desde la API
  const traer_cursos_de_facultad = async (index)=>{
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/cursos_facultad/`, config);
    set_state({
      facultades: [{ materias: response.data }],
      tiene_facultades: true
    })

    }
    catch (error){
      console.log("no capto el dato")
    }
  }

  // Obtener facultades desde la API
  const traer_facultades = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/lista_de_facultades/`, config);
      set_state({
        facultades: response.data,
        tiene_facultades: true
      });
    } catch (error) {
      console.log('Error al obtener facultades:', error);
    }
  };

  // Obtener profesores desde la API
  const traer_profesores = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/lista_de_profesores/`, config);
      set_state({
        profesores: [{ profesores: response.data }],
        tiene_profesores: true
      });
    } catch (error) {
      console.log('Error al obtener profesores:', error);
    }
  };

  // Obtener estudiantes desde la API
  const traer_estudiantes = async () => {
    try {
      const paramsget = {
        id_sede: desencriptarInt(sessionStorage.getItem('sede_id')),
      };
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/`, config,{paramsget});
      set_state({
        estudiantes_a_consultar: [{ estudiantes: response.data }],
        tiene_estudiantes: true
      });
    } catch (error) {
      console.log('Error al obtener estudiantes:', error);
    }
  };

  // Determinar el tipo de usuario y renderizar el contenido correspondiente
  if (desencriptar(sessionStorage.rol) === 'profesor') {
    return (
      <Container className="academico_container">
        <Row className="academico_fondo">
          <Col className='academico_deplegable open'>
            <Row className="academico_deplegable_seleccionar">
              <Col className="academico_deplegable_seleccionar_text">
                <Row className="academico_deplegable_seleccionar_hover">
                  <Col className="col_academico_deplegable_seleccionar_text">
                    Mis Cursos
                  </Col>
                </Row>
              </Col>
            </Row>
              <Row className="academico_deplegable_contenido">
                {state.traer_materias_del_profesor.map((item, index) => <Profesores key={index} item={item} />)}
              </Row>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="academico_container">
        <Row className="academico_seguimientos_pares">Academico</Row>
        <Row className="academico_fondo">
          <Col className={'facultades' === activeTabIndex ? 'academico_deplegable open' : 'academico_deplegable'}>
            <Row className="academico_deplegable_seleccionar" onClick={() => { activeTab('facultades');  traer_cursos_de_facultad();}}>
              <Col className="academico_deplegable_seleccionar_text">
                <Row className="academico_deplegable_seleccionar_hover">
                  <Col className="col_academico_deplegable_seleccionar_text">
                    Separación por asignaturas
                    {'facultades' === activeTabIndex ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
                  </Col>
                </Row>
              </Col>
            </Row>
            {state.tiene_facultades ? (
              <Row className="academico_deplegable_contenido">
                {state.facultades.map((item, index) => 
                  <Desplegable_item_listas_materias key={index} item={item} />)}
              </Row>
            ) : (
              <Row></Row>
            )}
          </Col>
        </Row>

        <Row className="academico_fondo">
          <Col className={'profesores' === activeTabIndex ? 'academico_deplegable open' : 'academico_deplegable'}>
            <Row className="academico_deplegable_seleccionar" onClick={() => { activeTab('profesores'); traer_profesores(); }}>
              <Col className="academico_deplegable_seleccionar_text">
                <Row className="academico_deplegable_seleccionar_hover">
                  <Col className="col_academico_deplegable_seleccionar_text">
                    Profesores
                    {'profesores' === activeTabIndex ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
                  </Col>
                </Row>
              </Col>
            </Row>
            {state.tiene_profesores ? (
              <Row className="academico_deplegable_contenido">
                {state.tiene_profesores && state.profesores.map((item, index) => 
                  <Profesores key={index} item={item} />)}
              </Row>
            ) : (
              <Row></Row>
            )}
          </Col>
        </Row>

        <Row className="academico_fondo">
          <Col className={'estudiantes' === activeTabIndex ? 'academico_deplegable open' : 'academico_deplegable'}>
            <Row className="academico_deplegable_seleccionar" onClick={() => { traer_estudiantes(); activeTab('estudiantes'); }}>
              <Col className="academico_deplegable_seleccionar_text">
                <Row className="academico_deplegable_seleccionar_hover">
                  <Col className="col_academico_deplegable_seleccionar_text">
                    Estudiantes
                    {'estudiantes' === activeTabIndex ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="academico_deplegable_contenido">
              {state.tiene_estudiantes && state.estudiantes_a_consultar.map((item, index) => 
                <Estudiantes key={index} item={item} />)}
            </Row>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>Seleccione un estudiante.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
};

export default Academico_desplegable;