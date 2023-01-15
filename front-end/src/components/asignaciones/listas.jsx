import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Listas = (props) => {

    const{childClicked, childClicked2, childClicked3} = props

    if(props.rol === "practicante"){
        return (
            <Row className="row_opcion">
            {
                props.profecional_seleccionado === '' ?
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
                                                <Col  xs={"2"} md={"2"}> 
                                                <button className="asignaciones_icons_quitar">
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

                                                <Col  xs={"2"} md={"2"}> 
                                                    <button className="asignaciones_icons">
                                                    <i class="bi bi-arrow-left-right"></i>
                                                    </button>
                                                </Col>
                                                
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
                                                <Col  xs={"2"} md={"2"}> 
                                                <button className="asignaciones_icons_quitar">
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


                                                <Col  xs={"2"} md={"2"}> 
                                                <button className="asignaciones_icons">
                                                    <i class="bi bi-arrow-left-right"></i>
                                                </button>
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
            <Col className="listas_cuerpo" onClick={()=>childClicked3(props.item.id)}>
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
                <Col className="listas_cuerpo" onClick={()=>childClicked3(props.item.id)}>
                                            <Row className="asignaciones_hover1">
                                                <Col  xs={"2"} md={"2"}> 
                                                <button className="asignaciones_icons_quitar">
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

                                                
                                                <Col  xs={"2"} md={"2"}> 
                                                <button className="asignaciones_icons">
                                                    <i class="bi bi-arrow-left-right"></i>
                                                </button>
                                                </Col>
                                            </Row>
            </Col>
            )
            }
        </Row>
        )
    }
    
    
    
}

export default Listas































