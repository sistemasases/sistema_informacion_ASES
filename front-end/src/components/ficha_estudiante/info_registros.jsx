import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_estudiante/info_basica";
import Selector from "../../components/ficha_estudiante/selector";
import {Dropdown, Button} from "react-bootstrap";
import {Container, Row, Col} from "styled-bootstrap-grid";

import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/componentes_generales/footer';


const Info_registros = () =>{

    return (
        <Container className="container_info_registro">
            <Col>
                <Row className="generar_nuevo_reporte">
                    <Button className="boton_nuevo_registro">NUEVO SEGUIMIENTO</Button>
                </Row>

                


                <Row className="riesgos">
                    <Col>
                        <Row xs={"12"} className="titulo_riesgos">
                            <Col xs={"12"}>
                                <h3 className="texto_subtitulo" activeClassName="text_center">RIESGOS</h3>
                            </Col>
                        </Row>


                        <Row xs={"12"} className="tipos_riesgos">
                            <Col xs={"12"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos">
                                    <label className="button_tipo_riesgo_alto">A</label>
                                    <h1 className="texto_alto">ALTO</h1>
                                </Row> 
                            </Col>
                            <Col xs={"12"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos">
                                    <label className="button_tipo_riesgo_medio">M</label>
                                    <h3 className="texto_medio">MEDIO</h3>
                                </Row>
                            </Col>
                            <Col xs={"12"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos"> 
                                    <label className="button_tipo_riesgo_bajo">B</label>
                                    <h3 className="texto_bajo">BAJO</h3>
                                </Row>
                            </Col>
                        </Row>




                        <Row className="riesgos_fondo_claro">
                            <Col>

                                <Row className="row_riesgo">
                                    <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                    </Col>
                                    <Col  xs={"10"}  sm={"10"} className="center_tipos_riesgos">
                                        <label  className="button_tipo_riesgo_bajo_texto">INDIVIDUAL</label> 
                                    </Col>
                                </Row>
                                






                                <Row  className="row_riesgo">
                                    <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                    </Col>
                                    <Col  xs={"10"}  sm={"10"} className="center_tipos_riesgos">
                                        <label  className="button_tipo_riesgo_medio_texto">FAMILIAR</label>
                                    </Col>
                                </Row>
                                





                                <Row  className="row_riesgo">
                                    <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col  xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                            <label  className="button_tipo_riesgo_alto_texto">ACADEMICO</label>
                                        </Col>
                                </Row>
                                




                                <Row className="row_riesgo">
                                    <Col xs={"2"} sm={"2"} className="z_index_2">
                                            <label className="borde_riesgos_bajo">
                                                <label className="button_tipo_riesgo_bajo_2">B</label>
                                            </label>                             
                                    </Col>
                                    <Col  xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                            <label  className="button_tipo_riesgo_bajo_texto">ECONOMICO</label> 
                                    </Col>
                                </Row>
                                




                                <Row className="row_riesgo">
                                    <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                    </Col>
                                    <Col  xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label  className="button_tipo_riesgo_medio_texto">VIDA UNIV..</label>
                                    </Col>
                                </Row>
                                





                                    <Row className="row_riesgo" >
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                            <label className="borde_riesgos_alto">
                                                <label className="button_tipo_riesgo_alto_2">A</label>
                                            </label>                                        </Col>
                                        <Col  xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                            <label  className="button_tipo_riesgo_alto_texto">GEOGRAFICO</label>
                                        </Col>
                                    </Row>

                            </Col>
                            

                        </Row>
                    </Col>
                        

                        
                            
                </Row>
            </Col>
        </Container>
    )
}

export default Info_registros 