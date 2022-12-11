import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Listas = (props) => {

    const{childClicked, childClicked2, childClicked3} = props

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
                    <Col className= "fichas-item2" onClick={()=>childClicked2(props.item.nombre)}>
                    <Row className="link_reporte_seguimientos1">
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>


                                                <Col  xs={"8"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cedula}
                                                    </Row>
                                                </Col>


                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>
                                                
                                            </Row>
                            </Col>
                    </Row>
                    
                </Col>
                    
                )
                :
                (
                    <Col></Col>
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
            <Col className="fichas-item3" onClick={()=>childClicked3(props.item.nombre)}>
                <Row className="link_reporte_seguimientos1" >
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>


                                                <Col  xs={"8"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cedula}
                                                    </Row>
                                                </Col>

                                                
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>
                                                
                                            </Row>
                    </Col>
                </Row>
            </Col>
            )
            :
            (
                <Col></Col>
            )
            }
        </Row>
        )
    }
    
    
    
}

export default Listas































