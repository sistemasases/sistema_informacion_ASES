import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';

const Desplegable_item = ({item}) => {

    const [open, setOpen] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(item.nombre){
        return (
            <Row>
                    <Col className={open ? "fichas-item open" : "fichas-item"}>
                    <Row className="link_reporte_seguimientos1" onClick={() => setOpen(!open)}>
                        <Col className="link_text_reporte_seguimientos1" >
                                            <Row className="link_text_reporte_seguimientos_hover1">
                                                <Col  xs={"10"} md={"4"}> 
                                                        {item.Actual ? (<Row>El periodo se encuentra en curso</Row>)
                                                                        :
                                                                        (<Row>El esta finalizado</Row>)}
                                                </Col>

                                            </Row>
                            </Col>
                    </Row>

                </Col>
            </Row>
        )
    } else{
        return (
            <Row>
                <Col onClick={handleShow}>
                    Reportes{item.datos}
                </Col>

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
            </Row>
        )
    }
    
    
}

export default Desplegable_item































