import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';
import Desplegable_item from "./desplegable_Item";
import Desplegable from "./desplegable";

const Socieducativa = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const tabs=[
    [
        {
            "nombre": "20231",
            "Actual": true
        }
    ],
    [
        {
            "nombre": "2022-2",
            "Actual": false
        },
        {
            "id": 1,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T15:49:28.811996Z",
            "modificacion": "2023-01-04T00:00:00Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 2,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T15:52:00.116142Z",
            "modificacion": "2023-01-04T15:52:00.116142Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 3,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T15:58:38.944201Z",
            "modificacion": "2023-01-04T15:58:38.944201Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 4,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T15:59:36.300078Z",
            "modificacion": "2023-01-04T15:59:36.300078Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 5,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T15:59:44.444969Z",
            "modificacion": "2023-01-04T15:59:44.444969Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 6,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T16:00:54.873222Z",
            "modificacion": "2023-01-04T16:00:54.873222Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 7,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T16:02:23.886040Z",
            "modificacion": "2023-01-04T16:02:23.886040Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 8,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T16:03:04.979050Z",
            "modificacion": "2023-01-04T16:03:04.979050Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 9,
            "fecha": "2023-01-04",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T16:05:00.298528Z",
            "modificacion": "2023-01-04T16:05:00.298528Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 1,
            "fecha": "2023-01-04",
            "lugar": "prueba",
            "hora_inicio": "14:21:00",
            "hora_finalización": "14:21:00",
            "objetivos": "trts",
            "individual": "tsts",
            "riesgo_individual": 1,
            "autoconocimiento": true,
            "rasgos_de_personalidad": false,
            "identificación": false,
            "red_de_apoyo": false,
            "proyecto_de_vida": false,
            "salud": false,
            "aspectos_motivacionales": false,
            "historia_de_vida": false,
            "relación_eriótico_afectivas": false,
            "diversidad_sexual": false,
            "familiar": "efdg",
            "riesgo_familiar": -1,
            "dinamica_familiar": false,
            "academico": null,
            "riesgo_academico": null,
            "desempeño_académico": false,
            "elección_vocacional": false,
            "manejo_del_tiempo": false,
            "economico": null,
            "riesgo_economico": null,
            "apoyos_económicos_institucionales": false,
            "manejo_finanzas": false,
            "apoyo_económico_familiar": false,
            "situación_laboral_ocupacional": false,
            "vida_universitaria_ciudad": null,
            "riesgo_vida_universitaria_ciudad": null,
            "motivación_compañamiento": false,
            "referencia_geográfica": false,
            "adaptación_ciudad_Universidad": false,
            "oferta_servicios": false,
            "vivienda": false,
            "vinculación_grupos_actividades_extracurriculares": false,
            "apoyo_académico": false,
            "taller_par_par": false,
            "reconocimiento_ciudad_U": false,
            "rem_profesional_SE": false,
            "rem_racticante_SE": false,
            "rem_actividades_grupales": false,
            "rem_monitorías_académicas": false,
            "rem_proyectos_Universidad": false,
            "rem_servicio_salud": false,
            "rem_registro_académico": false,
            "rem_matrícula_financiera": false,
            "rem_desarrollo_humano_promoción_SE": false,
            "rem_directores_programa": false,
            "rem_grupos_universidad": false,
            "rem_externa": false,
            "Ninguna_acción_realizada": false,
            "observaciones": null,
            "revisado_profesional": false,
            "revisado_practicante": false,
            "primer_acercamiento": false,
            "cierre": false,
            "creacion": "2023-01-04T19:25:16.028398Z",
            "modificacion": "2023-01-04T19:25:16.028398Z",
            "id_creador": 11,
            "id_modificador": null,
            "id_estudiante": 18
        },
        {
            "id": 10,
            "fecha": "2023-01-03",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T16:10:15.364728Z",
            "modificacion": "2023-01-04T16:10:15.364728Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        },
        {
            "id": 11,
            "fecha": "2023-01-03",
            "observaciones": "esto es una prueba",
            "revisado_profesional": false,
            "revisado_practicante": false,
            "creacion": "2023-01-04T17:53:24.516035Z",
            "modificacion": "2023-01-04T17:53:24.516035Z",
            "id_creador": 2,
            "id_modificador": 2,
            "id_estudiante": 18
        }
    ],
    [
        {
            "nombre": "2022-1",
            "Actual": false
        }
    ]
]

const[activeTabIndex, setActiveTabIndex] = useState(tabs[0][0]['nombre']);
const activeTab = (index)=> 
{
    index === activeTabIndex ?
    (setActiveTabIndex(0))
    :
    setActiveTabIndex(index)
}


    return (
        <Container className="containerSelector">

                        <Row className="tabs" >

                            { tabs.map((item, index) => 
                            <Row>
                            <Col className={item[0]['nombre'] === activeTabIndex ? "fichas-item open" : "fichas-item"}>
                            <Row className="link_reporte_seguimientos1" onClick={() => activeTab(item[0]['nombre'])}>
                                <Col className="link_text_reporte_seguimientos1" >
                                                    <Row className="link_text_reporte_seguimientos_hover1">
                                                        <Col  xs={"10"} md={"10"}> 
                                                            <Row className="col_link_text_reporte_seguimientos_nombre">
                                                            {item[0]['nombre']}
                                                            </Row>
                                                        </Col>
                                                        
                                                        <div class="d-none d-md-inline col-1">
                                                            <Col className="col_flecha_reportes">
                                                                {
                                                                    item[0]['nombre'] === activeTabIndex ?
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
                                    {item.map((item, index) => <Desplegable_item key={index} item={item} /> )}
                                </Row>
                        </Col>
                    </Row>

                            ) }
                </Row>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Seleccione un estudiante.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
        </Container>
    )
}

export default Socieducativa 