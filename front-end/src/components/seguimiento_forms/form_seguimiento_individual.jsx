import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const Seguimiento_individual = (props) =>{

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const set_info = (e) => {
        setShow(false)   
      }

    return (
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Seguimiento Individual</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1><b>Seguimiento de Pares</b></h1>
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
                    <Col>
                        <Row className="g-2">
                            <h6>Lugar*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="text" />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Inicio*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" />
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Finalización*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" />
                        </Row>
                    </Col>
                </Row>
                <Row className="g-2">
                    <h6>Objetivos*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3}/>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Individual*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" />
                    </Col>
                    <Col>
                        <Button variant="secondary">
                            Limpiar
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (individual)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Autoconocimiento" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Proyecto de vida" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Historia de vida" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rasgos de personalidad" />        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Salud" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Relación eriótico-afectivas" />        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Identificación" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Aspectos motivacionales" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Diversidad sexual" />      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Red de apoyo" /> 
                    </Col>
                </Row>
                <hr></hr>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={set_info}>
              Registrar
            </Button>
            <Button variant="secondary" onClick={set_info}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Seguimiento_individual 