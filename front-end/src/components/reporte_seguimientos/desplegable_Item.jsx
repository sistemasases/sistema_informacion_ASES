import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Desplegable_item = ({item}) => {

    const [open, setOpen] = useState(false)

    if(item.practicante){
        return (
            <Row>
                    <Col className={open ? "fichas-item open" : "fichas-item"}>
                    <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                        <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover">
                                                <Col  xs={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        Nombres
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        Apellidos
                                                    </Row>
                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"1"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaGraduationCap></FaGraduationCap> 
                                                    </Row>
                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_info" xs={"6"}> 
                                                    <Row>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">Fichas</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">Inasistencias</Row>
                                                        </Col>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                                        </Col>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                                        </Col>
                                                    </Row>
                                                                                                
                                                </Col>
                                                <Col className="col_flecha_reportes" xs={"1"}>
                                                    {
                                                        open ?
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-up"></i>
                                                            </Row>
                                                        )   
                                                        :
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-down"></i>
                                                            </Row>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                            </Col>
                    </Row>
                        <div className="fichas-content">
                            <Row className="contenido_fichas">
                                { item.practicante.map((child, index) => <Desplegable_item key={index} item={child} />) }
                            </Row>
                        </div>
                </Col>
            </Row>
        )
    }else if(item.monitor) {
        return (
            <Row>
                    <Col className={open ? "fichas-item2 open" : "fichas-item2"}>
                    <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover">
                                                <Col  xs={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        Nombres
                                                    </Row>
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        Apellidos
                                                    </Row>
                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"1"}> 
                                                    <Row className="row_spans_card_content_flex">
                                                        <FaUser></FaUser> 
                                                    </Row>
                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_info" xs={"6"}> 
                                                    <Row>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">Fichas</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">Inasistencias</Row>
                                                        </Col>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                                        </Col>
                                                        <Col xs={"4"}>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                                            <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                                        </Col>
                                                    </Row>
                                                                                                
                                                </Col>
                                                <Col className="col_flecha_reportes" xs={"1"}>
                                                    {
                                                        open ?
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-up"></i>
                                                            </Row>
                                                        )   
                                                        :
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-down"></i>
                                                            </Row>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                            </Col>
                    </Row>
                    <div className="fichas-content">
                        <Row className="contenido_fichas">
                            { item.monitor.map((child, index) => <Desplegable_item key={index} item={child} />) }
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
    else if (item.reporte){
        return (
        <Row>
        <Col className={open ? "fichas-item3 open" : "fichas-item3"}>
        <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
        <Col className="link_text_reporte_seguimientos1" >
                                <Row className="link_text_reporte_seguimientos_hover">
                                    <Col  xs={"4"}> 
                                        <Row className="col_link_text_reporte_seguimientos_nombre">
                                            Nombres
                                        </Row>
                                        <Row className="col_link_text_reporte_seguimientos_nombre">
                                            Apellidos
                                        </Row>
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_info" xs={"6"}> 
                                        <Row>
                                            <Col xs={"4"}>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">Fichas</Row>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">Inasistencias</Row>
                                            </Col>
                                            <Col xs={"4"}>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes prof</Row>
                                            </Col>
                                            <Col xs={"4"}>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                                <Row className="sub_col_link_text_reporte_seguimientos_info">pendientes pract</Row>
                                            </Col>
                                        </Row>
                                                                                    
                                    </Col>
                                    <Col className="col_flecha_reportes" xs={"1"}>
                                                    {
                                                        open ?
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-up"></i>
                                                            </Row>
                                                        )   
                                                        :
                                                        (
                                                            <Row>
                                                                <i class="bi bi-chevron-down"></i>
                                                            </Row>
                                                        )
                                                    }
                                                </Col>
                                </Row>
                </Col>
        </Row>
            <div className="fichas-content">
                <a href={item.path || "#"} className="fichas-reportes plain">
                    <h2>{item.reporte.datos}</h2>
                    <h2>Hay reportes</h2>
                </a>
            </div>
    </Col>
</Row>
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































