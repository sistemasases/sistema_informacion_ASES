/**
  * @file profesores.jsx
  * @version 1.0.0
  * @description @description Componente para mostrar información de profesores y sus cursos.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
import React from 'react';
import {useState } from "react";
import {Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import {decryptTokenFromSessionStorage} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Componente para mostrar información de profesores y sus cursos.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Información del estudiante y sus cursos.
 * @returns {JSX.Element} Componente Profesores.
 */
const Profesores = ({item}) => {
    // Configuración para las llamadas a la API
    const config = {
        headers: {
            // Obtención del token de sesión
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
        }
      };

    // Estado para controlar el filtro y los cursos del estudiante
    const [state,set_state] = useState({
        cursos_profesor : [],
        filtro : '',

      })

      //Función para cambiar el valor del filtor
    const cambiar_dato = (e) =>{
        set_state({
              ...state,
              [e.target.name] : e.target.value
        })
  }
  
  // Estado para el control del despliegue
  const [open, setOpen] = useState(false)

  //Traer los cursos del profesor desde la API
    const traer_cursos = async (index)=>{
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/academico/traer_cursos_del_profesor/`+index+"/", config);
          set_state({
            cursos_profesor : response.data
          })
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


    //Renderizado  
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
                            console.log(state.filtro.toLowerCase())
                                return state.filtro.toLowerCase() === '' ? item 
                                : 
                                item.first_name.toLowerCase().includes(state.filtro.toLowerCase()) ||  
                                item.last_name.toLowerCase().includes(state.filtro.toLowerCase())  ||
                                item.email.toLowerCase().includes(state.filtro.toLowerCase)                                          
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
                                    <a>{item.first_name} --  {item.last_name}   correo : <a href={`mailto:${item.email}`} className="email-link">{item.email}</a></a>
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
                            rel="noopener noreferrer" className="link_text_academico_hover4">
                            {item.nombre} -- {item.cod_materia} -- {item.franja}
                        </a>
                    </Row>
                    <Row className="content_academico">
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


