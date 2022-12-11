import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Listas_no_seleccion = (props) => {

    const{childClicked} = props

    if(props.rol === "practicante" && props.item.rol === "practicante" ){
        return (
            <Row>
                    <Col className="fichas-item" onClick={()=>childClicked(props.item.nombre)}>
                    <Row className="link_reporte_seguimientos1" >
                        <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover1">
                                                <Col  xs={"10"} md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cedula}
                                                    </Row>
                                                </Col>
                                                
                                                
                                            </Row>
                            </Col>
                    </Row>
                        
                </Col>
            </Row>
        )
    }else if(props.rol === "monitor" && props.item.rol === "monitor") {
        return (
            <Row>
            {
                props.practicante_seleccionado === props.item.superior ?
                (
                    <Col></Col>
                )
                :
                (
                    <Col className= "fichas-item2">
                    <Row className="link_reporte_seguimientos1">
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col  xs={"10"} md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cedula}
                                                    </Row>
                                                </Col>
                                            
                                                
                                                
                                            </Row>
                            </Col>
                    </Row>
                    
                </Col>
                )
            }
                    
            </Row>
        )
    }
    else if (props.rol === "estudiante" && props.item.rol === "estudiante"){
        return (
        <Row>
        {
                props.monitor_seleccionado === props.item.superior ?
                (
                    <Col></Col>
                )
                :
                (
        <Col className="fichas-item3">
        <Row className="link_reporte_seguimientos1" >
        <Col className="link_text_reporte_seguimientos1" >
                                <Row className="link_text_reporte_seguimientos_hover3">
                                    <Col  xs={"10"} md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cedula}
                                                    </Row>
                                                </Col>
                                    
                                    
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































