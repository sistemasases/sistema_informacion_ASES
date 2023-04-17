import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const Inasistencia = (props) =>{

    const set_info = (e) => {
    }

    const handleChange = () => {
        props.handleCloseIn()
        props.handleModal()
    }

    return (
        
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Inasistencia</Modal.Title>
                <Button onClick={handleChange}>Registrar Seguimiento</Button>
            </Modal.Header>
            <Modal.Body>
                <h1><b>Inasistencia</b></h1>
                <hr></hr>
                <Row>
                    <Col>
                        <Row className="g-2">
                            <h6>Fecha*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="date" />
                        </Row>
                    </Col>
                </Row>
                <br/> 
                <Row className="g-2">
                    <h6>Observaciones*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3}/>
                </Row>
                <br/> 
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado profesional" />        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado practicante" />        
                    </Col>
                </Row>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={set_info}>
              Registrar
            </Button>
            <Button variant="secondary" onClick={()=>props.handleCloseIn()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Inasistencia 