import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable from "./desplegable";
import  {useEffect} from 'react';




const Informacion_rol = (props) =>{

    const la_lista_de_practicantes = []
    const la_lista_de_monitores = []
    const la_lista_de_estudiantes = []

    const [state,set_state] = useState({
        periodo : '',
  
        usuario : '',
        data_user : [],
        data_periodo : [],
        data_rol : [],
  
        seleccionado:'',
  
        id_usuario:'',
        nombres:'',
        apellidos: '',
        cedula:'',
        correo:'',
        telefono:'',
  
        reportes_estudiante : [],
        ids_estudiantes_del_monitor : [],
        ids_monitores_del_practicante : [],
        ids_practicantes_del_profesional : [],

        reportes_estudiante2 : [],
        ids_estudiantes_del_monitor2 : [],
        ids_monitores_del_practicante2 : [],
        ids_practicantes_del_profesional2 : [],

        lista : [],
        lista1 : [],
        lista2 : [],
        lista1_1 : [],
        lista2_1 : [],


      })
  


  
      useEffect(()=>{



      },[props.ids_practicantes_del_profesional]);
  
  

    


    return (
        <Container className="container_reportes_seguimientos2">

            <Row className="row_contenido_reportes_seguimientos">
            <div class="d-none d-md-inline"> <br/></div>

                        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>

                            <Row>
                                <Col xs={"12"} md={"3"}>
                                Profesional
                                </Col>
                            </Row> 
                            <Row lassName="margin_top_info_rol"> 
                                <Col xs={"12"} md={"3"} >
                                <b>Fichás:</b> 
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: {props.fichas_profesional_revisado}
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: {props.fichas_profesional_no_revisado}
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : {props.fichas_profesional_total}
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                                <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: {props.inasistencias_profesional_revisado}
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: {props.inasistencias_profesional_no_revisado}
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : {props.inasistencias_profesional_total}
                                </Col>          
                            </Row>
                        </Col>





                        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
 
                            <Row>
                                <Col xs={"12"} md={"3"}>
                                <b>Practicantes:</b>
                                </Col>
                            </Row>
                            <Row className="margin_top_info_rol">

                                <Col  xs={"12"} md={"3"}>
                                <b>Fichás:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : {props.fichas_practicante_revisado}
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : {props.fichas_practicante_no_revisado}
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : {props.fichas_practicante_total}
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                            <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : {props.inasistencias_practicante_revisado}
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : {props.inasistencias_practicante_no_revisado}
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : {props.inasistencias_practicante_total}
                                </Col>           
                            </Row>
                        </Col> 
                        <div class="d-none d-md-inline"> <br/></div>

            </Row>
                <Desplegable pintar={props.ids_practicantes_del_profesional}></Desplegable>
        </Container>
    )
}

export default Informacion_rol 



