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
    const [state,set_state] = useState({
        data_user : props.data_user_socioedu[0],
      })







const[activeTabIndex, setActiveTabIndex] = useState(state.data_user[0]['nombre']);
const activeTab = (index)=> 
{
    index === activeTabIndex ?
    (setActiveTabIndex(0))
    :
    setActiveTabIndex(index)
}

const userRole = sessionStorage.getItem('rol');

    return (
        <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> : 
        <Container className="socioeducativa_container">
        <Row className="socioeducativa_seguimientos_pares">Seguimientos de pares</Row>

                    <Row className="socioeducativa_fondo" >

                        { state.data_user.map((item, index) => 
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
    }</>
    )
}

export default Socieducativa 