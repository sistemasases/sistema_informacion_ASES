import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Desplegable_item = ({item}) => {

    const [open, setOpen] = useState(false)

    if(item.practicante){
        return (
            <div className={open ? "fichas-item open" : "fichas-item"}>
                <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                    <Row className="link_text_reporte_seguimientos1" >
                                        <Row className="link_text_reporte_seguimientos_hover">
                                            <Col className="col_link_text_reporte_seguimientos_nombre"> 
                                                <h4 style={{font: "roboto"}}>Nombres</h4>
                                                <h4>Apellidos</h4>
                                            </Col>
                                            <Col className="col_link_text_reporte_seguimientos_spans"> 
                                                <Row className="row_spans_card_content_flex">
                                                    <FaUser></FaUser> 
                                                </Row>
                                                <Row className="row_spans_card_content_flex">
                                                    <FaGraduationCap></FaGraduationCap> 
                                                </Row>
                                            </Col>
                                            <Col className="col_link_text_reporte_seguimientos_info"> 
                                                                                            <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                                <h4>Fichas</h4>
                                                                                                <h4>Inasistencias</h4>
                                                                                            </Col>
                                                                                            <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                                <h4>pendientes prof</h4>
                                                                                                <h4>pendientes prof</h4>
                                                                                            </Col>
                                                                                            <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                                <h4>pendientes pract</h4>
                                                                                                <h4>pendientes pract</h4>
                                                                                            </Col>
                                                                                        </Col>
                                        </Row>
                        </Row>
                </Row>
                    <div className="fichas-content">
                        <Row className="contenido_fichas">
                            { item.practicante.map((child, index) => <Desplegable_item key={index} item={child} />) }
                        </Row>
                    </div>
                
            </div>
        )
    }else if(item.monitor) {
        return (
            <div className={open ? "fichas-item open" : "fichas-item"}>
                <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                <Row className="link_text_reporte_seguimientos1" >
                                    <Row className="link_text_reporte_seguimientos_hover">
                                        <Col className="col_link_text_reporte_seguimientos_nombre"> 
                                            <h4>Nombres</h4>
                                            <h4>Apellidos</h4>
                                        </Col>
                                        <Col className="col_link_text_reporte_seguimientos_spans"> 
                                            <Row className="row_spans_card_content_flex">
                                                <FaUser></FaUser> 
                                            </Row>
                                        </Col>
                                        <Col className="col_link_text_reporte_seguimientos_info"> 
                                                                                        <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                            <h4>Fichas</h4>
                                                                                            <h4>Inasistencias</h4>
                                                                                        </Col>
                                                                                        <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                            <h4>pendientes prof</h4>
                                                                                            <h4>pendientes prof</h4>
                                                                                        </Col>
                                                                                        <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                            <h4>pendientes pract</h4>
                                                                                            <h4>pendientes pract</h4>
                                                                                        </Col>
                                                                                    </Col>
                                    </Row>
                                </Row>
                            </Row>
                <div className="fichas-content">
                    <Row className="contenido_fichas">
                        { item.monitor.map((child, index) => <Desplegable_item key={index} item={child} />) }
                    </Row>
                </div>
            </div>
        )
    }
    else if (item.reporte){
        return (
            <div className={open ? "fichas-item open" : "fichas-item"}>
                <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
            <Row className="link_text_reporte_seguimientos1" >
                                <Row className="link_text_reporte_seguimientos_hover">
                                    <Col className="col_link_text_reporte_seguimientos_nombre"> 
                                        <h4>Nombres</h4>
                                        <h4>Apellidos</h4>
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_info"> 
                                                                                    <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                        <h4>Fichas</h4>
                                                                                        <h4>Inasistencias</h4>
                                                                                    </Col>
                                                                                    <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                        <h4>pendientes prof</h4>
                                                                                        <h4>pendientes prof</h4>
                                                                                    </Col>
                                                                                    <Col className="sub_col_link_text_reporte_seguimientos_info">
                                                                                        <h4>pendientes pract</h4>
                                                                                        <h4>pendientes pract</h4>
                                                                                    </Col>
                                                                                </Col>
                                </Row>
                            </Row>
                        </Row>
            <div className="fichas-content">
                <a href={item.path || "#"} className="fichas-reportes plain">
                    <h2>{item.reporte.datos}</h2>
                    <h2>Hay reportes</h2>
                </a>
            </div>
        </div>
        )
    }
    else{
        return (
            <a href={item.path || "#"} className="fichas-item plain">
                {item.datos}
            </a>
        )
    }
    
    
}

export default Desplegable_item































