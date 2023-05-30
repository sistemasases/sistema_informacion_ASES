import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Desplegable_item = ({item}) => {

    const [open, setOpen] = useState(false)

    if(item.tipo_usuario === "practicante"){
        return (
            <Row>
                    <Col className={open ? "fichas-item open" : "fichas-item"}>
                    <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                        <Col className="link_text_reporte_seguimientos1" >
                                <Row className="link_text_reporte_seguimientos_hover1">
                                    <Col  xs={"10"} md={"4"}> 
                                        <Row className="col_link_text_reporte_seguimientos_nombre">
                                            Nombres
                                            <br></br>
                                            Apellidos
                                        </Row>
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"1"}> 
                                        {item.monitores ?
                                            (
                                                <Row className="row_spans_card_content_flex">
                                                    <Col xs={12}>
                                                        <FaUser></FaUser> : {item.monitores.length}
                                                    </Col>
                                                    <Col xs={12}>
                                                        <FaGraduationCap></FaGraduationCap>  : {item.cantidad_estudiantes}
                                                    </Col>
                                                </Row>
                                            ):
                                            (
                                                <Row className="row_spans_card_content_flex">
                                                    <FaUser></FaUser> 
                                                    <FaGraduationCap></FaGraduationCap> 
                                                </Row>
                                            )
                                        }
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_info" xs={"12"}md={"6"}> 
                                    {item.cantidad_reportes ?
                                        (
                                            <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                <Col xs={"4"}>
                                                    <Row >Fichas : {item.cantidad_reportes.count_seguimientos}</ Row>
                                                    <Row >Inasistencias : {item.cantidad_reportes.count_inasistencias}</Row>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                        <Row >Pendientes prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional }</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                        <Row >P. prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional}</Row>
                                                    </div>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                        <Row >Pendientes pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                        <Row >P. pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                    </div>
                                                </Col>
                                            </Row>

                                        )  :
                                        (
                                            <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                <Col xs={"4"}>
                                                    <Row >Fichas : N/A</ Row>
                                                    <Row >Inasistencias : N/A</Row>)
                                                </Col>
                                                <Col xs={"4"}>
                                                <div class="d-none d-md-inline col-4">
                                                    <Row >Pendientes prof</Row>
                                                    <Row >Pendientes prof</Row>
                                                </div>
                                                <div class="d-inline d-md-none col-4">
                                                    <Row >P. prof</Row>
                                                    <Row >P. prof</Row>
                                                </div>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes pract</Row>
                                                        <Row >Pendientes pract</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. pract</Row>
                                                        <Row >P. pract</Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                    </Col>
                                    <div class="d-none d-md-inline col-1">
                                        <Col className="col_flecha_reportes">
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
                                    </div>
                                    
                                </Row>
                            </Col>
                    </Row>
                        <Row className="fichas-content">
                            <div class="d-none d-md-inline col-12">
                                <Col className="contenido_fichas">
                                    { item.monitores.map((child, index) => <Desplegable_item key={index} item={child} />) }
                                </Col>
                            </div>
                            <div class="d-inline d-md-none col-12">
                                <Col className="contenido_fichas_pequeño">
                                    { item.monitores.map((child, index) => <Desplegable_item key={index} item={child} />) }
                                </Col>
                            </div>
                        </Row>
                </Col>
            </Row>
        )
    }else if(item.tipo_usuario === "monitor") {
        return (
            <Row>
                    <Col className={open ? "fichas-item2 open" : "fichas-item2"}>
                    <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                    <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover2">
                                                <Col  xs={"10"}md={"4"}> 
                                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                                        Nombres
                                                        <br></br>
                                                        Apellidos
                                                    </Row>

                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_spans" xs={"2"} md={"1"}> 
                                                    {item.estudiantes ?
                                                        (
                                                            <Row className="row_spans_card_content_flex">
                                                                <Col xs={12}>
                                                                    <FaUser></FaUser> : {item.estudiantes.length}
                                                                </Col>
                                                            </Row>
                                                        ):
                                                        (
                                                            <Row className="row_spans_card_content_flex">
                                                                <FaUser></FaUser> 
                                                            </Row>
                                                        )
                                                    }
                                                </Col>
                                                <Col className="col_link_text_reporte_seguimientos_info" xs={"12"} md={"6"}> 
                                                {item.cantidad_reportes ?
                                                    (
                                                        <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                            <Col xs={"4"}>
                                                                <Row >Fichas : {item.cantidad_reportes.count_seguimientos}</ Row>
                                                                <Row >Inasistencias : {item.cantidad_reportes.count_inasistencias}</Row>
                                                            </Col>
                                                            <Col xs={"4"}>
                                                                <div class="d-none d-md-inline col-4">
                                                                    <Row >Pendientes prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                                    <Row >Pendientes prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional }</Row>
                                                                </div>
                                                                <div class="d-inline d-md-none col-4">
                                                                    <Row >P. prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                                    <Row >P. prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional }</Row>
                                                                </div>
                                                            </Col>
                                                            <Col xs={"4"}>
                                                                <div class="d-none d-md-inline col-4">
                                                                    <Row >Pendientes pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                                    <Row >Pendientes pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                                </div>
                                                                <div class="d-inline d-md-none col-4">
                                                                    <Row >P. pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                                    <Row >P. pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    )  :
                                                    (
                                                        <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                            <Col xs={"4"}>
                                                                <Row >Fichas : N/A</ Row>
                                                                <Row >Inasistencias : N/A</Row>)
                                                            </Col>
                                                            <Col xs={"4"}>
                                                            <div class="d-none d-md-inline col-4">
                                                                <Row >Pendientes prof</Row>
                                                                <Row >Pendientes prof</Row>
                                                            </div>
                                                            <div class="d-inline d-md-none col-4">
                                                                <Row >P. prof</Row>
                                                                <Row >P. prof</Row>
                                                            </div>
                                                            </Col>
                                                            <Col xs={"4"}>
                                                                <div class="d-none d-md-inline col-4">
                                                                    <Row >Pendientes pract</Row>
                                                                    <Row >Pendientes pract</Row>
                                                                </div>
                                                                <div class="d-inline d-md-none col-4">
                                                                    <Row >P. pract</Row>
                                                                    <Row >P. pract</Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                                                                                
                                                </Col>
                                                <div class="d-none d-md-inline col-1">
                                                    <Col className="col_flecha_reportes">
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
                                                </div>
                                            </Row>
                            </Col>
                    </Row>
                    <Row className="fichas-content">
                            <div class="d-none d-md-inline col-12">
                                <Col className="contenido_fichas">
                                    { item.estudiantes.map((child, index) => <Desplegable_item key={index} item={child} />) }
                                </Col>
                            </div>
                            <div class="d-inline d-md-none col-12">
                                <Col className="contenido_fichas_pequeño">
                                    { item.estudiantes.map((child, index) => <Desplegable_item key={index} item={child} />) }
                                </Col>
                            </div>
                        </Row>
                </Col>
            </Row>
        )
    }
    else if (item.cod_univalle){
        return (
        <Row>
            <Col className={open ? "fichas-item3 open" : "fichas-item3"}>
                <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>

                    <Col className="link_text_reporte_seguimientos1" >
                            <Row className="link_text_reporte_seguimientos_hover3">
                                <Col  xs={"12"} md={"4"}> 
                                    <Row className="col_link_text_reporte_seguimientos_nombre">
                                        Nombres
                                        <br></br>
                                        Apellidos
                                    </Row>
                                </Col>
                                <Col className="col_link_text_reporte_seguimientos_info" xs={"12"} md={"6"}> 
                                    {item.cantidad_reportes ?
                                        (
                                            <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                <Col xs={"4"}>
                                                    <Row >Fichas : {item.cantidad_reportes.count_seguimientos}</ Row>
                                                    <Row >Inasistencias : {item.cantidad_reportes.count_inasistencias}</Row>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                        <Row >Pendientes prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional }</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. prof : {item.cantidad_reportes.count_seguimientos_pendientes_profesional}</Row>
                                                        <Row >P. prof : {item.cantidad_reportes.count_inasistencias_pendientes_profesional }</Row>
                                                    </div>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                        <Row >Pendientes pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. pract : {item.cantidad_reportes.count_seguimientos_pendientes_practicante}</Row>
                                                        <Row >P. pract : {item.cantidad_reportes.count_inasistencias_pendientes_practicante}</Row>
                                                    </div>
                                                </Col>
                                            </Row>

                                        )  :
                                        (
                                            <Row className ="sub_col_link_text_reporte_seguimientos_info">
                                                <Col xs={"4"}>
                                                    <Row >Fichas : N/A</ Row>
                                                    <Row >Inasistencias : N/A</Row>)
                                                </Col>
                                                <Col xs={"4"}>
                                                <div class="d-none d-md-inline col-4">
                                                    <Row >Pendientes prof</Row>
                                                    <Row >Pendientes prof</Row>
                                                </div>
                                                <div class="d-inline d-md-none col-4">
                                                    <Row >P. prof</Row>
                                                    <Row >P. prof</Row>
                                                </div>
                                                </Col>
                                                <Col xs={"4"}>
                                                    <div class="d-none d-md-inline col-4">
                                                        <Row >Pendientes pract</Row>
                                                        <Row >Pendientes pract</Row>
                                                    </div>
                                                    <div class="d-inline d-md-none col-4">
                                                        <Row >P. pract</Row>
                                                        <Row >P. pract</Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                                                                
                                </Col>
                                <div class="d-none d-md-inline col-1">
                                                <Col className="col_flecha_reportes">
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
                                            </div>
                        </Row>
                    </Col>
                </Row>
                <div className="fichas-content">
                    <a href={item.path || "#"} className="fichas-reportes plain">
                        <h2>{item.num_doc_ini}</h2>
                    </a>
                </div>
            </Col>
        </Row>
        )
    }
    else{
        return (
            <a href={item.path || "#"} className="fichas-item plain">
                {item.num_doc_ini}
            </a>
        )
    }
    
    
}

export default Desplegable_item































