import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";


const Estudiantes = ({item}) => {

    const [state,set_state] = useState({

        filtro : '',

      })

    const cambiar_dato = (e) =>{
        set_state({
              ...state,
              [e.target.name] : e.target.value
        })
        console.log(e.target.value)
  }

    const [open, setOpen] = useState(true)

    if(item.estudiantes) {
        return (
            <Row>
                    <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                        <Row className="link_academico1">
                            <Col className="link_text_academico1" >
                                            <Row className="link_text_academico_hover2">
                                                {item.asignatura}
                                                return
                                                <Col xs={"12"} md={"9"}>
                                                    <input name="filtro" onChange={cambiar_dato}></input>
                                                </Col>
                                            </Row>
                            </Col>
                        </Row>
                        <Row className="content_academico">
                            <Col className="contenido_fichas_academico2">

                            { item.estudiantes.filter((item)=>{
                                    return state.filtro.toLowerCase() === '' ? item 
                                    : 
                                    item.nombre.toLowerCase().includes(state.filtro);                      
                                    }).map((item, index) => <Estudiantes 
                                key={index} item={item} practicante_seleccionado={state.practicante_seleccionado}
                                />) }
                                
                                </Col>
                            </Row>
                </Col>
            </Row>
        )
    }
    else{
        return (
        <Row>
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
        </Row>
        )
    }
    
}

export default Estudiantes



