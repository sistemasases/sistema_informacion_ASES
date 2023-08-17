import React from 'react';
import {useState } from "react";
import {Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const Profesores = ({item}) => {

    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      };

    const [state,set_state] = useState({
        cursos_profesor : [],
        filtro : '',

      })

    const cambiar_dato = (e) =>{
        set_state({
              ...state,
              [e.target.name] : e.target.value
        })
        console.log(e.target.value)
  }

    const [open, setOpen] = useState(false)


    const traer_cursos = async (index)=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/traer_cursos_del_profesor/`+index+"/", config);
          set_state({
            cursos_profesor : response.data
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


    if(item.profesores) {
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
                        { item.profesores.filter((item)=>{
                                return state.filtro.toLowerCase() === '' ? item 
                                : 
                                item.first_name.toLowerCase().includes(state.filtro);  
                                item.last_name.toLowerCase().includes(state.filtro);                                          
                                }).map((item, index) => <Profesores 
                                key={index} item={item} 
                            />) }
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    else if(item.username) {
        return (
            <Row>
                <Col className={open ? "fichas_academico3 open" : "fichas_academico3"}>

                        <Row className="link_academico1" onClick={() => {setOpen(!open); traer_cursos(item.id)}}>
                            <Col className="link_text_academico1" >
                                <Row className="link_text_academico_hover3">
                                    {item.first_name} --  {item.last_name}
                                </Row>
                            </Col>
                        </Row>
                        <Row className="content_academico">
                                <Col className="contenido_fichas_academico3">
                                    {state.cursos_profesor.map((child, index) => <Profesores key={index} item={child}/>) }
                                </Col>
                        </Row>
                    </Col>
            </Row>
        )
    }
    else if(item.cod_materia) {
        return (
            <Row >
                <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
                    <Row className="link_text_academico_hover4" onClick={() => { setOpen(!open) }}>
                        <a href={`/calificador/${encodeURIComponent(item.id)}/${encodeURIComponent(item.id_profesor)}/${encodeURIComponent(item.cod_materia)}/${encodeURIComponent(item.franja)}`} 
                            target="_blank" rel="noopener noreferrer" className="link_text_academico_hover4">
                            {item.nombre} -- {item.cod_materia} -- {item.franja} 
                        </a>
                    </Row>
                    <Row className="content_academico">
                        {/* <Col className="contenido_fichas_academico3">
                            {item.estudiantes.map((child, index) => <Profesores key={index} item={child}/>) }
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        )
    }{
        return (
        <Row>
            <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
                <Row className="link_academico1_sin_borde">
                    <Col className="link_text_academico1_sin_borde" >
                        <Row className="link_text_academico_hover4">
                            <Link to={`/ficha_estudiante/${item.id}`} className="fichas_academico plain">
                                {item.estudiante} {item.apellido} - {item.cod_univalle}  -- {item.username}
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        )
    }
    
}

export default Profesores



