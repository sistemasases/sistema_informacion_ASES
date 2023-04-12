import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Listas_no_seleccion = (props) => {

    const{childClicked} = props

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
                                                    <button className="asignaciones_icons_añadir">
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
                                                <button className="asignaciones_icons_añadir">
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
                                                    <button className="asignaciones_icons_añadir">
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































