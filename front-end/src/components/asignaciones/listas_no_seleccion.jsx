import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import axios from 'axios';

const Listas_no_seleccion = (props) => {

    const{childClicked, childClicked2, childClicked3} = props

    const añadir_usuario_monitor = (e) =>{
        let formData = new FormData();

        formData.append("llamada", "asignar");
        formData.append("id_jefe", props.practicante_seleccionado)
        formData.append("id_usuario", props.item.id)

        axios({
      // Endpoint to send files
      url: 'http://localhost:8000/asignacion/asignacion_usuario/',
      method: "POST",
      data: formData,
        })
        .then((res)=>{
            console.log(res)
            childClicked(props.practicante_seleccionado)
            alert("estudiante "+props.item.id+" fue asignado correctamente a :"+props.practicante_seleccionado)
        })
        .catch(err=>{
            alert("error al asignar el estudiante : "+props.item.id);
        })
    }

    const añadir_usuario_practicante = (e) =>{
        let formData = new FormData();

        formData.append("llamada", "asignar");
        formData.append("id_jefe", props.profecional_seleccionado)
        formData.append("id_usuario", props.item.id)


        axios({
      // Endpoint to send files
      url: 'http://localhost:8000/asignacion/asignacion_usuario/',
      method: "POST",
      data: formData,
        })
        .then((res)=>{
        console.log(res)
            alert("estudiante "+props.item.id+" fue asignado correctamente a :"+props.profecional_seleccionado)
        })
        .catch(err=>{
            alert("error al asignar el estudiante : "+props.item.id);
        })
    }

    const añadir_estudiante = (e) =>{
        let formData = new FormData();

        formData.append("id_usuario", props.monitor_seleccionado);
        formData.append("id_estudiante", props.item.id);

        axios({
      // Endpoint to send files
      url: 'http://localhost:8000/asignacion/asignacion_estudiante/',
      method: "POST",
      data: formData,
        })
        .then((res)=>{
        console.log(res)
            childClicked2(props.monitor_seleccionado)
            alert("estudiante "+props.item.id+" fue asignado correctamente a :"+props.monitor_seleccionado)
        })
        .catch(err=>{
            alert("error al asignar el estudiante : "+props.item.id);
        })

    }

    if(props.rol === "practicante"){
        return (
            <Row className="row_opcion">
                {
                props.profecional_seleccionado === '' ?
                (
                <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.nombre)}>
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
                   <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.nombre)}>

                                            <Row className="asignaciones_hover1">
                                                <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                                                    <button onClick={()=>añadir_usuario_practicante()} className="asignaciones_icons_añadir">
                                                        <i class="bi bi-chevron-left"></i>                                                    
                                                    </button>
                                                </Col>

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
            }
            </Row>
        )
    }else if(props.rol === "monitor" ) {
        return (
            <Row className="row_opcion">
            {
                props.practicante_seleccionado === '' ?
                (
                    <Col></Col>
                )
                :
                (
                    <Col className= "listas_cuerpo">
                                            <Row className="asignaciones_hover1">
                                                <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                                                <button onClick={()=>añadir_usuario_monitor()} className="asignaciones_icons_añadir">
                                                    <i class="bi bi-chevron-left"></i>                                                    
                                                    </button>
                                                </Col>

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
                    <Col></Col>
                )
                :
                (
        <Col className="listas_cuerpo">
                                <Row className="asignaciones_hover1">
                                                <Col xs={"2"} md={"2"} className="center_asignacion"> 
                                                    <button onClick={()=>añadir_estudiante()} className="asignaciones_icons_añadir">
                                                    <i class="bi bi-chevron-left"></i>                                                    
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
                                </Row>
            
                </Col>
            )
            }
            </Row>
        )
    }
    
    
    
}

export default Listas_no_seleccion