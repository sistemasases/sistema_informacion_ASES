/**
  * @file desplegable_item_listas_materias.jsx
  * @version 1.0.0
  * @description Componente para mostrar listas desplegables de materias, cursos, franjas, profesores y estudiantes.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import { decryptTokenFromSessionStorage, encriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Componente para mostrar listas desplegables de materias, cursos, franjas, profesores y estudiantes.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Elemento de la lista de materias, cursos, franjas, profesores o estudiantes.
 * @param {string} [props.franja] - Franja del curso.
 * @returns {JSX.Element} Componente Desplegable_item_listas_materias.
 */
const Desplegable_item_listas_materias = ({ item, franja }) => {
  // Configuración para las llamadas a la API
  const config = {
    headers: {
      // Obtención del token de sesión 
      Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    }
  };

  // Estado para el control del despliegue
  const [open, setOpen] = useState(false)

  // Estado para almacenar datos y su actualización
  const [state, set_state] = useState({
    filtro: '',
    cursos_de_la_facultad: [],
    franjas_de_curso: [],
    profesores_de_la_franja: [],
    alumnos_del_profesor: []
  })

  // Obtener cursos de la facultad desde la API
  const traer_cursos_de_facultad = async (index) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/cursos_facultad/` + index + "/", config);
      set_state({
        cursos_de_la_facultad: response.data
      })
    }
    catch (error) {
      console.log("no capto el dato")
    }
  }

  //Obtener franjas de un curso desde la API
  const franjas_del_curso = async (index) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/franja_curso/` + index + "/", config);
      set_state({
        franjas_de_curso: response.data
      })
    }
    catch (error) {
      console.log("no capto el dato")
    }
  }

  // Función para obtener profesores de una franja
  const profesores_de_la_franja = async (index, index2) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/profesores_del_curso/`,
        { params: { curso: index, franja: index2 } }, config);
      set_state({
        profesores_de_la_franja: response.data
      })
    }
    catch (error) {
      console.log("no capto el dato")
    }
  }

  // Función para obtener alumnos de un profesor
  const alumnos_del_profesor = async (index, index2) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/alumnos_del_profesor/`,
        { params: { curso: index, profesor: index2 } }, config);
      set_state({
        alumnos_del_profesor: response.data
      })
    }
    catch (error) {
      console.log("no capto el dato")
    }
  }

  // Cambiar el valor de un dato en el estado
  const cambiar_dato = (e) => {
    set_state({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  /**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
  */
  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };
  
  // Renderizado condicional según el tipo de dato
  if (item.materias) {
    return (
      <Row>
                <Col className={open ? "fichas_academico1 open" : "fichas_academico1"}>
                    <Row className="link_academico1">
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.nombre}
                                Buscar
                                <Col xs={"12"} md={"2"}>
                                    <input name="filtro" onChange={cambiar_dato}></input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="contenido_fichas_academico2">
                        { item.materias.filter((item)=>{
                          //console.log(state.filtro)
                                return state.filtro === '' ? item 
                                : 
                                item.nombre.toLowerCase().includes(state.filtro.toLowerCase()) ||
                                item.cod_materia.toLowerCase().includes(state.filtro.toLowerCase())                                     
                                }).map((item, index) => <Desplegable_item_listas_materias 
                                key={index} item={item} 
                            />) }
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
    )
  }
  else if (item.tipo_dato === 'curso') {
    return (
      <>
        <Row>

          <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>


            <Row className="link_academico1" onClick={() => { setOpen(!open); franjas_del_curso(item.cod_materia) }}>
              <Col className="link_text_academico1" >

                <Row className="link_text_academico_hover2">
                  {item.nombre}     --     {item.cod_materia}
                </Row>
              </Col>
            </Row>
            <Row className="content_academico">
              <Col className="contenido_fichas_academico3">
                {state.franjas_de_curso.map((child, index) =>
                  <Desplegable_item_listas_materias key={index} item={child} franja={item.franja} />)
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
  else if (item.tipo_dato === 'franja') {
    return (
      <Row>

        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
          <Row className="link_text_academico_hover4" >
            <a onClick={() => cambiar_ruta(`/calificador/${encodeURIComponent(item.id)}/${encodeURIComponent(item.id_profesor)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`)}
              rel="noopener noreferrer" className="link_text_academico_hover4">
              Grupo {item.franja}     :     {item.profesor_data.first_name}   {item.profesor_data.last_name}
            </a>
          </Row>



          {/*
                    <Row className="content_academico">
                            <Col className="contenido_fichas_academico2">
                                { state.profesores_de_la_franja.map((child, index) => 
                                    <Desplegable_item_listas_materias key={index} item={child} franja={item.id}/>) 
                                }
                            </Col>
                        </Row>
                    */}
        </Col>
      </Row>
    )
  }

  else if (item.tipo_dato === 'profesor') {
    return (
      <Row>
        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
          <Row className="link_academico1_sin_borde" >
            <Col className="contenido_fichas_academico2" >
              <a onClick={() => cambiar_ruta(`/calificador/${encodeURIComponent(franja)}/${encodeURIComponent(item.id)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`)}
                rel="noopener noreferrer" className="link_text_academico_hover4">
                {item.first_name} {item.last_name}
              </a>
            </Col>
          </Row>

          <Row className="content_academico">
            <Col className="contenido_fichas_academico2" xs={4}>
            </Col>
            {item.items_materia.map((item, index) =>
              <Col>( {item.nombre} )</Col>)
            }
          </Row>

          <Row className="content_academico">
            <Col className="contenido_fichas_academico3">
              {state.alumnos_del_profesor.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />)}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  else if (item.tipo_dato === 'estudiante') {
    return (
      <Row>
        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
          <Row className="link_academico1_sin_borde" onClick={() => setOpen(!open)}>
            <Col className="link_text_academico1_sin_borde" xs={4}>
              <Link to={`/ficha_estudiante/${item.id}`} className="fichas_academico plain">
                {item.nombre} {item.apellido} - {item.cod_univalle}
              </Link>
            </Col>
            {item.notas ? (
              item.notas.length > 0 ? ( // Verificar si el array de notas no está vacío
                item.notas.map((nota, index) => ( // Si no está vacío, realizar el mapeo
                  <Col key={index}>( {nota.nombre} : {nota.calificacion} )</Col>
                ))
              ) : (
                <Col>No hay notas disponibles</Col> // Si está vacío, mostrar un mensaje o contenido alternativo
              )
            ) : (
              <Col>No hay notas disponibles</Col> // Si item.notas no existe, mostrar un mensaje o contenido alternativo
            )}
          </Row>
        </Col>
      </Row>
    );
  }



}

export default Desplegable_item_listas_materias