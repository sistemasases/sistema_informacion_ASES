import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import axios from 'axios';

const Listas = (props) => {


    const config = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };

    const config2 = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };

    const{childClicked, childClicked2} = props
    
    const quitar_estudiante = (e) =>{
      axios.get('http://localhost:8000/asignacion/asignacion_estudiante/'+props.item.id+'/', config)
      .then(response => {
        childClicked2(props.monitor_seleccionado)
        alert("estudiante "+props.item.id+" eliminado correctamente")
      })
      .catch(error => {
        alert("error al eliminar el estudiante : "+props.item.id);
      });
    }

    const quitar_usuario_monitor = (e) =>{
        let formData = new FormData();
        formData.append("llamada", "eliminar");
        formData.append("id_usuario", props.item.id);
        formData.append("id_jefe", props.practicante_seleccionado);

      axios({
      // Endpoint to send files
      url: 'http://localhost:8000/asignacion/asignacion_usuario/',
      method: "POST",
      headers: config2,
      data: formData,
        })
        .then((res)=>{
        console.log(res)
        childClicked(props.practicante_seleccionado)
            alert("el monitor "+props.item.id+" fue eliminado correctamente de :"+props.practicante_seleccionado)
        })
        .catch(err=>{
            alert("error al eliminar el usuario : "+props.item.id+" del practicante : "+props.practicante_seleccionado);
        })

    }

    const quitar_usuario = (e) =>{
        let formData = new FormData();
        formData.append("llamada", "eliminar");
        formData.append("id_usuario", props.item.id);
        formData.append("id_jefe", props.profesional_seleccionado);

      axios({
      // Endpoint to send files
      url: 'http://localhost:8000/asignacion/asignacion_usuario/',
      method: "POST",
      headers: config2,
      data: formData,
        })
        .then((res)=>{
        console.log(res)
            alert("practicante "+props.item.id+" fue eliminado correctamente de :"+props.profesional_seleccionado)
        })
        .catch(err=>{
            alert("error al eliminar el usuario : "+props.item.id);
        })

    }

    if(props.rol === "practicante"){
        return (
            <Row className="row_opcion">
            {
                props.profesional_seleccionado === '' ?
                (
                <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.id)}>
                    <Row className="asignaciones_hover1">
                        <Col  xs={"10"} md={"4"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                )
                :
                (
                <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.id)}>
                    <Row className="asignaciones_hover1">
                        <Col xs={"2"} md={"2"}  className="center_asignacion"> 
                        <button onClick={()=>quitar_usuario()} className="asignaciones_icons_quitar">
                        <i class="bi bi-x"></i>                                                    
                        </button>
                        </Col>

                        <Col  xs={"10"} md={"8"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
{/*
                        <Col  xs={"2"} md={"2"}  className="center_asignacion"> 
                            <button className="asignaciones_icons">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                        </Col>
*/}
                    </Row>
                        
                </Col>
                )
            }
                    
            </Row> 
        )
    }else if(props.rol === "monitor") {
        return (
            <Row className="row_opcion">
            {
                props.practicante_seleccionado === '' ?
                (
                <Col className= "listas_cuerpo" onClick={()=>childClicked2(props.item.id)}>
                    <Row className="asignaciones_hover1">

                        <Col  xs={"10"} md={"4"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
                        
                    </Row>
                </Col>
                    
                )
                :
                (
                    <Col className= "listas_cuerpo" onClick={()=>childClicked2(props.item.id)}>
                        <Row className="asignaciones_hover1">
                            <Col  xs={"2"} md={"2"}  className="center_asignacion"> 
                                <button onClick={()=>quitar_usuario_monitor()} className="asignaciones_icons_quitar">
                                    <i class="bi bi-x"></i>                                                    
                                </button>
                            </Col>


                            <Col  xs={"10"} md={"8"}> 
                                <Row className="nombres_asignacion">
                                    {props.item.username}
                                </Row>
                                <Row className="nombres_asignacion">
                                    {props.item.first_name}
                                    {props.item.last_name}
                                </Row>
                            </Col>

{/*
                            <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                            <button className="asignaciones_icons">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                            </Col>
*/}
                        </Row>                  
                    </Col>
                )
            }
            </Row>
        )
    }
    else if (props.rol === "estudiante"){
        return (
        <Row className="row_opcion">
        {
                props.monitor_seleccionado === '' ?
                (
            <Col className="listas_cuerpo" >
                <Row className="asignaciones_hover1">
                    <Col  xs={"10"} md={"8"}> 
                        <Row className="nombres_asignacion">
                            {props.item.cod_univalle}
                        </Row>
                        <Row className="nombres_asignacion">
                            {props.item.nombre}
                            {props.item.apellido}
                        </Row>
                    </Col>
                </Row>
            </Col>
            )
            :
            (
                <Col className="listas_cuerpo" >
                    <Row className="asignaciones_hover1">
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                            <button onClick={()=>quitar_estudiante()} className="asignaciones_icons_quitar">
                                <i class="bi bi-x"></i>                                                    
                            </button>
                        </Col>


                        <Col  xs={"10"} md={"8"}> 
                            <Row className="nombres_asignacion">
                                {props.item.cod_univalle}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.nombre}
                                {props.item.apellido}
                            </Row>
                        </Col>

{/*
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                        <button className="asignaciones_icons">
                            <i class="bi bi-arrow-left-right"></i>
                        </button>
                        </Col>
*/}
                    </Row>
            </Col>
            )
            }
        </Row>
        )
    }
    
    
    
}

export default Listas































