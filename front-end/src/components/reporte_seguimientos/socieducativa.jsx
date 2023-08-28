import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';
import Desplegable_item from "./desplegable_Item copy";
import Desplegable from "./desplegable";

const Socieducativa = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state,set_state] = useState({
        data_user : props.data_user_socioedu,
      })



    return (
        <Container className="socioeducativa_container">
                            
                        {/* <li>{JSON.stringify(props.data_user_socioedu)}</li>
                        <li>{JSON.stringify(props.data_user_socioedu[0])}</li> */}

                            

            <Row className="socioeducativa_fondo" >

                { props.data_user_socioedu.map((item, index) => 
                        <Col className={"periodo_asignaciones open"} xs={'12'}>
                            {item['nombre']?
                                (
                                    <Row className="periodo_asignaciones_seleccionar">
                                        <Col className="periodo_asignaciones_seleccionar_text" >
                                            <Row className="periodo_asignaciones_seleccionar_hover">
                                                <Col  className="col_periodo_asignaciones_seleccionar_text" > 
                                                    Seguimientos del periodo : {item['nombre']}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                                :
                                (
                                    <Row className="periodo_asignaciones_contenido">
                                        <Desplegable_item key={index} item={item} /> 
                                    </Row>
                                )
                            }

                        </Col>

                    ) 
                }
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



