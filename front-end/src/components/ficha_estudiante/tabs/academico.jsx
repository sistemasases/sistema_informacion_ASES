import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Desplegable_item_academico from "./desplegable_Item_Academico";
import Modal from 'react-bootstrap/Modal';

/*
Tabla Conteo de Seguimientos:
- codigo
- Nombres
- Apellidos
- documento
- Conteos
--- Fichas normales
--- Fichas de inasistencias
----Total conteos
- Profesional
- Practicante
- Monitor
*/


const Academico = () =>{

    
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
        <Container className="socioeducativa_container">
            <Row className="socioeducativa_seguimientos_pares">Academico</Row>

                        <Row className="socioeducativa_fondo" >

                            { tabs.map((item, index) => 
                            <Row>
                            <Col className={item[0]['nombre'] === activeTabIndex ? "periodo_asignaciones open" : "periodo_asignaciones"}>
                            <Row className="periodo_asignaciones_seleccionar" onClick={() => activeTab(item[0]['nombre'])}>
                                <Col className="periodo_asignaciones_seleccionar_text" >
                                                    <Row className="periodo_asignaciones_seleccionar_hover">
                                                        <Col  className="col_periodo_asignaciones_seleccionar_text" > 
                                                                {item[0]['nombre']}
                                                                {
                                                                    item[0]['nombre'] === activeTabIndex ?
                                                                    (
                                                                            <i class="bi bi-chevron-up"></i>
                                                                    )   
                                                                    :
                                                                    (
                                                                            <i class="bi bi-chevron-down"></i>
                                                                    )
                                                                }
                                                        </Col>
                                                    </Row>
                                    </Col>
                            </Row>
                                <Row className="periodo_asignaciones_contenido">
                                    {item.map((item, index) => <Desplegable_item_academico key={index} item={item} /> )}
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

export default Academico 