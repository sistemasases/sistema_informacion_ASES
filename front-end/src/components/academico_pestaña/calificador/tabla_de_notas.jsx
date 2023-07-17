import React, {useMemo, useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

const Desplegable_item_listas_materias = ({item}) => {

    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };

    const [open, setOpen] = useState(false)

    const [state,set_state] = useState({
        cursos_de_la_facultad : [],
        franjas_de_curso : [],
        profesores_de_la_franja : [],
        alumnos_del_profesor : []

      })
    
      const traer_cursos_de_facultad = async (index)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/cursos_facultad/" + index + "/", config);
          set_state({
            cursos_de_la_facultad : response.data
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


      const franjas_del_curso = async (index)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/franja_curso/" + index + "/", config);
          set_state({
            franjas_de_curso : response.data
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }

      const profesores_de_la_franja = async (index, index2)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/profesores_del_curso/",
                                    {params : {curso : index, franja : index2}}, config);
          set_state({
            profesores_de_la_franja : response.data
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }

      const alumnos_del_profesor = async (index, index2)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/alumnos_del_profesor/", 
                                                        {params : {curso : index, profesor : index2}}, config);
          set_state({
            alumnos_del_profesor : response.data
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


    if(item.codigo_univalle){
        return (
            <Row>
                <Col className={open ? "fichas_academico open" : "fichas_academico"}>
                    <Row className="link_academico1" onClick={() => {setOpen(!open); traer_cursos_de_facultad(item.id)}}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover1">
                                {item.nombre} entra 1
                            </Row>
                        </Col>
                    </Row>
                    <Row className="content_academico">
                        
                        <Col className="contenido_fichas_academico1">
                            { state.cursos_de_la_facultad.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />) }
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }else if(item.tipo_dato === 'curso') {
        return (
            <Row>
                <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                    <Row className="link_academico1" onClick={() => {setOpen(!open); franjas_del_curso(item.cod_materia)}}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.nombre}
                                {item.codigo} entra 2
                            </Row>
                        </Col>
                    </Row>
                    <Row className="content_academico">
                        <Col className="contenido_fichas_academico2">
                            { state.franjas_de_curso.map((child, index) => <Desplegable_item_listas_materias key={index} item={child} />) }
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }else if(item.tipo_dato === 'franja') {
        return (
            <Row>
                <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                    <Row className="link_academico1" onClick={() => {setOpen(!open); profesores_de_la_franja(item.cod_materia, item.franja)}}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.nombre} - {item.codigo} - {item.franja}  entra 3
                            </Row>
                        </Col>
                    </Row>
                    <Row className="content_academico">
                            <Col className="contenido_fichas_academico2">
                                { state.profesores_de_la_franja.map((child, index) => 
                                    <Desplegable_item_listas_materias key={index} item={child} />) 
                                }
                            </Col>
                        </Row>
                </Col>
            </Row>
        )
    }
    else if (item.tipo_dato === 'profesor'){
        return (
        <Row>
        <Col className={open ? "fichas_academico3 open" : "fichas_academico3"}>
            <Row className="link_academico1" onClick={() => {setOpen(!open); alumnos_del_profesor(item.curso_del_profesor, item.id)}}>
                <Col className="link_text_academico1" >
                    <Row className="link_text_academico_hover3">
                        {item.nombre} -- {item.curso_del_profesor} entra 4
                    </Row>
                </Col>
            </Row>
            <Row className="content_academico">
                            <Col className="contenido_fichas_academico2" xs={4}>
                            </Col>
                            { item.items_materia.map((item, index) => 
                                    <Col>( {item.nombre}  :   {item.porcentaje} )</Col>)
                                } entra 5
                        </Row>
            <Row className="content_academico">
                <Col className="contenido_fichas_academico3">
                    {state.alumnos_del_profesor.map((child, index) => <Desplegable_item_listas_materias key={index} item={child}/>) }
                </Col>
            </Row>
        </Col>
    </Row>
        )
    }
    else if (item.tipo_dato === 'estudiante'){
        return (
        <Row>
        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
            <Row className="link_academico1_sin_borde" onClick={() => setOpen(!open)}>
                <Col className="link_text_academico1_sin_borde" xs={4}>
                    <Link to={`/ficha_estudiante/${item.id}`} className="fichas_academico plain">
                        {item.nombre} {item.apellido} - {item.cod_univalle} entra 6
                    </Link>
                </Col>
                { item.notas.map((item, index) => 
                    <Col>( {item.nombre}  :   {item.calificacion} )</Col>)
                }
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



