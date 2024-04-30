/**
  * @file estudiantes.jsx
  * @version 1.0.0
  * @description @description Componente para mostrar información de estudiantes y sus cursos.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaRegChartBar, FaThList, FaGraduationCap, FaUser } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import axios from 'axios';
import { encriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad';

/**
 * Componente para mostrar información de estudiantes y sus cursos.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Información del estudiante y sus cursos.
 * @returns {JSX.Element} Componente Estudiantes.
 */
const Estudiantes = ({ item }) => {
    // Configuración para las llamadas a la API
    const config = {
        headers: {
            // Obtención del token de sesión 
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };

    // Estado para controlar el filtro y los cursos del estudiante
    const [state, set_state] = useState({

        filtro: '',
        cursos_estudiante: []

    })

    // Estado para el control del despliegue
    const [open, setOpen] = useState(false)

    //Traer los cursos del estudiante desde la API
    const traer_cursos_del_estudiante = async (index) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/traer_cursos_del_estudiante/` + index + "/", config);
            set_state({
                cursos_estudiante: response.data
            })
        }
        catch (error) {
            console.log("no capto el dato")
        }
    }

    // Función para cambiar el valor del filtro
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
    
    // Renderizado
    if (item.estudiantes) {
        return (
            <Row>
                <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                    <Row className="link_academico1">
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.asignatura}
                                Buscar
                                <Col xs={"12"} md={"9"}>
                                    <input name="filtro" onChange={cambiar_dato}></input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="contenido_fichas_academico2">

                            {item.estudiantes.filter((item) => {
                                //console.log(state.filtro.toLowerCase())
                                return state.filtro.toLowerCase() === '' ? item
                                    :
                                    item.nombre.toLowerCase().includes(state.filtro.toLowerCase()) ||
                                    item.apellido.toLowerCase().includes(state.filtro.toLowerCase()) ||
                                    item.cod_univalle.toLowerCase().includes(state.filtro.toLowerCase())
                            }).map((item, index) => <Estudiantes
                                key={index} item={item}
                            />)}

                        </Col>
                    </Row>
                </Col>

            </Row>
        )
    }
    else if (item.tipo_dato === 'curso') {
        return (
            <Row >
                <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
                    <Row className="link_text_academico_hover4" onClick={() => { setOpen(!open) }}>
                        <a onClick={() => cambiar_ruta(`/calificador/${encodeURIComponent(item.id_curso)}/${encodeURIComponent(item.curso_data.id_profesor)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`)}
                            rel="noopener noreferrer" className="link_text_academico_hover4">
                            {item.curso_data.cod_materia}--{item.curso_data.franja} : {item.curso_data.nombre}
                        </a>
                    </Row>
                </Col>
            </Row>
        )
    }
    else {
        return (
            <Row>
                <Col className={open ? "fichas_academico3 open" : "fichas_academico3"}>
                    <Row className="link_academico1" onClick={() => { setOpen(!open); traer_cursos_del_estudiante(item.id) }}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover3">
                                <a><Link to={`/ficha_estudiante/${item.id}`}>Ficha del estudiante </Link> : {item.nombre} {item.apellido} - {item.cod_univalle}</a>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="content_academico">
                        <Col className="contenido_fichas_academico3">
                            {state.cursos_estudiante.map((child, index) => <Estudiantes key={index} item={child} />)}
                        </Col>
                    </Row>

                </Col>

            </Row>
        )
    }



}

export default Estudiantes


