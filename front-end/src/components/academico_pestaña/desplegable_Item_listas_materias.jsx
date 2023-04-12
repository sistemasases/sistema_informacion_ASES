import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';

const Desplegable_item_listas_materias = ({item}) => {

    const [open, setOpen] = useState(false)

    if(item.facultad){
        return (
            <Row>
                    <Col className={open ? "fichas_academico open" : "fichas_academico"}>
                    <Row className="link_academico1" onClick={() => setOpen(!open)}>
                        <Col className="link_text_academico1" >
                                            <Row className="link_text_academico_hover1">
                                                {item.facultad}
                                            </Row>
                            </Col>
                    </Row>
                        <Row className="content_academico">
                            <Col className="contenido_fichas_academico1">
                                { item.materias.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />) }
                            </Col>
                        </Row>
                </Col>
            </Row>
        )
    }else if(item.asignatura) {
        return (
            <Row>
                    <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                    <Row className="link_academico1" onClick={() => setOpen(!open)}>
                    <Col className="link_text_academico1" >
                                            <Row className="link_text_academico_hover2">
                                                {item.asignatura}
                                            </Row>
                            </Col>
                    </Row>
                    <Row className="content_academico">
                            <Col className="contenido_fichas_academico2">
                                { item.profesores.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />) }
                            </Col>
                        </Row>
                </Col>
            </Row>
        )
    }
    else if (item.profesor){
        return (
        <Row>
        <Col className={open ? "fichas_academico3 open" : "fichas_academico3"}>
            <Row className="link_academico1" onClick={() => setOpen(!open)}>
            <Col className="link_text_academico1" >
                                    <Row className="link_text_academico_hover3">
                                        {item.profesor}
                                    </Row>
                    </Col>
            </Row>
            <Row className="content_academico">
                        <Col className="contenido_fichas_academico3">
                            {item.alumnos.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />) }
                        </Col>
            </Row>
        </Col>
    </Row>
        )
    }
    else if (item.alumno){
        return (
        <Row>
        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
            <Row className="link_academico1_sin_borde" onClick={() => setOpen(!open)}>
            <Col className="link_text_academico1_sin_borde" >
                                    <Row className="link_text_academico_hover4">
                                        {item.alumno}
                                    </Row>
                    </Col>
            </Row>
        </Col>
    </Row>
        )
    }
    else{
        return (
            <a href={item.path || "#"} className="fichas_academico plain">
                return
            </a>
        )
    }
    
}

export default Desplegable_item_listas_materias



