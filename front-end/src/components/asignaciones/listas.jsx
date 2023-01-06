import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Listas = (props) => {

    const{childClicked, childClicked2, childClicked3} = props

    if(props.rol === "practicante"){
        return (
            <Row>
            {
                props.profecional_seleccionado === '' ?
                (
                <Col className="fichas-item" onClick={()=>childClicked(props.item.id)}>
                    <Row className="link_reporte_seguimientos1" >
                        <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover1">
                                                <Col  xs={"10"} md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.username}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.first_name}
                                                        {props.item.last_name}
                                                    </Row>
                                                </Col>
                                                
                                            </Row>
                            </Col>
                    </Row>
                        
                </Col>
                    
                )
                :
                (
                   <Col className="fichas-item" onClick={()=>childClicked(props.item.id)}>
                    <Row className="link_reporte_seguimientos1" >
                        <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover1">
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>


                                                <Col  xs={"10"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.username}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.first_name}
                                                        {props.item.last_name}
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
            }
                    
            </Row>
        )
    }else if(props.rol === "monitor") {
        return (
            <Row>
            {
                props.practicante_seleccionado === '' ?
                (
                <Col className= "fichas-item2" onClick={()=>childClicked2(props.item.id)}>
                    <Row className="link_reporte_seguimientos1">
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">

                                                <Col  xs={"10"} md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.username}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.first_name}
                                                        {props.item.last_name}
                                                    </Row>
                                                </Col>
                                                
                                            </Row>
                            </Col>
                    </Row>
                    
                </Col>
                    
                )
                :
                (
                    <Col className= "fichas-item2" onClick={()=>childClicked2(props.item.id)}>
                    <Row className="link_reporte_seguimientos1">
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>


                                                <Col  xs={"10"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.username}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.first_name}
                                                        {props.item.last_name}
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
            }
            </Row>
        )
    }
    else if (props.rol === "estudiante"){
        return (
        <Row>
        {
                props.monitor_seleccionado === '' ?
                (
            <Col className="fichas-item3" onClick={()=>childClicked3(props.item.id)}>
                <Row className="link_reporte_seguimientos1" >
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col  xs={"10"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cod_univalle}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                        {props.item.apellido}
                                                    </Row>
                                                </Col>
                                                
                                            </Row>
                    </Col>
                </Row>
            </Col>
            )
            :
            (
                <Col className="fichas-item3" onClick={()=>childClicked3(props.item.id)}>
                <Row className="link_reporte_seguimientos1" >
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"2"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>


                                                <Col  xs={"10"} md={"8"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.cod_univalle}
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        {props.item.nombre}
                                                        {props.item.apellido}
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
            }
        </Row>
        )
    }
    
    
    
}

export default Listas































