import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaRegChartBar, FaThList, FaGraduationCap, FaUser } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import axios from 'axios';


const Estudiantes = ({ item }) => {

    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };


    const [state, set_state] = useState({

        filtro: '',
        cursos_estudiante: []

    })


    const [open, setOpen] = useState(false)


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

    const cambiar_dato = (e) => {
        set_state({
            ...state,
            [e.target.name]: e.target.value
        })
    }

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
                                console.log(state.filtro.toLowerCase())
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
                        <a href={`/calificador/${encodeURIComponent(item.id_curso)}/${encodeURIComponent(item.curso_data.id_profesor)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`}
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
                {/*
            <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
                <Row className="link_academico1_sin_borde">
                    <Col className="link_text_academico1_sin_borde" >
                        <Row className="link_text_academico_hover4">
                            <Link to={`/ficha_estudiante/${item.id}`} className="link_text_academico_hover4">
                                {item.nombre} {item.apellido} - {item.cod_univalle}
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Col>
        */}
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


