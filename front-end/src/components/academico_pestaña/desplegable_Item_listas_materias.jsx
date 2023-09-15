import React, {useMemo, useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import {decryptTokenFromSessionStorage} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Desplegable_item_listas_materias = ({item, franja}) => {

    const config = {
        headers: {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
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
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/cursos_facultad/` + index + "/", config);
          set_state({
            cursos_de_la_facultad : response.data
          })
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


      const franjas_del_curso = async (index)=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/franja_curso/` + index + "/", config);
          set_state({
            franjas_de_curso : response.data
          })
        }
        catch (error){
          console.log("no capto el dato")
        }
      }

      const profesores_de_la_franja = async (index, index2)=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/profesores_del_curso/`,
                                    {params : {curso : index, franja : index2}}, config);
          set_state({
            profesores_de_la_franja : response.data
          })
        }
        catch (error){
          console.log("no capto el dato")
        }
      }

      const alumnos_del_profesor = async (index, index2)=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/alumnos_del_profesor/`, 
                                                        {params : {curso : index, profesor : index2}}, config);
          set_state({
            alumnos_del_profesor : response.data
          })
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
                                {item.nombre}
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
                    <Row className="link_academico1" onClick={() => {setOpen(!open); profesores_de_la_franja(item.cod_materia, item.franja)}}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.nombre} --
                                {item.cod_materia} --
                                {item.franja}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="content_academico">
                        <Col className="contenido_fichas_academico2">
                            { state.profesores_de_la_franja.map((child, index) => 
                                <Desplegable_item_listas_materias key={index} item={child} franja={item.franja}/>) 
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    /*else if(item.tipo_dato === 'franja') {
        return (
            <Row>

                <Col className={open ? "fichas_academico2 open" : "fichas_academico2"}>
                    <Row className="link_academico1" onClick={() => {setOpen(!open); profesores_de_la_franja(item.cod_materia, item.franja)}}>
                        <Col className="link_text_academico1" >
                            <Row className="link_text_academico_hover2">
                                {item.nombre} - {item.codigo} - {item.franja}  
                            </Row>
                        </Col>
                    </Row>
                    <Row className="content_academico">
                            <Col className="contenido_fichas_academico2">
                                { state.profesores_de_la_franja.map((child, index) => 
                                    <Desplegable_item_listas_materias key={index} item={child} franja={item.franja}/>) 
                                }
                            </Col>
                        </Row>

                </Col>
            </Row>
        )
    }
    */
    else if (item.tipo_dato === 'profesor'){
        return (
        <Row>
        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
            <Row className="link_academico1_sin_borde" >
                <Col className="contenido_fichas_academico2" >
                        <a href={`/calificador/${encodeURIComponent(item.id)}/${encodeURIComponent(item.id_profesor)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`} 
                        target="_blank" rel="noopener noreferrer" className="link_text_academico_hover4">
                            {item.first_name} {item.last_name}  
                        </a>
                </Col>
            </Row>

            <Row className="content_academico">
                <Col className="contenido_fichas_academico2" xs={4}>
                </Col>
                { item.items_materia.map((item, index) => 
                    <Col>( {item.nombre} )</Col>)
                }
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
    // ...

    
}

export default Desplegable_item_listas_materias



