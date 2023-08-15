import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const Seguimiento_individual = (props) =>{

    const set_info = (e) => {
    }

    console.log(props.item)

    return (
        
        <Modal {...props}
        size="lg">
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
                    <h6>Individual:</h6>
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
                <Row className="g-2">
                    <h6>Familiar:</h6>
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
                    <h6><b>Temáticas (Familiar)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Dinámica Familiar" />
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Academico:</h6>
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
                    <h6><b>Temáticas (Academico)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Desempeño académico" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Elección vocacional" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo del tiempo" />
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Económico:</h6>
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
                    <h6><b>Temáticas (Económico)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyos económicos institucionales" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo de sus finanzas" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo económico familiar" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Situación laboral y ocupacional" />        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Vida universitaria y ciudad*:</h6>
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
                    <h6><b>Temáticas (Vida universitaria y ciudad)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Motivación para el acompañamiento" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Referencia geográfica" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Adaptación a la ciudad y Universidad" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Oferta de servicios" />        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vivienda" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vinculación a grupos y realización de actividades extracurriculares" />        
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <h6><b>Acciones (Ubique el cursor sobre la acción para obtener más información)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo académico" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Actividades grupales" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Matrícula financiera" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Taller par-par" />        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Monitorías académicas" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Desarrollo humano y promoción SE" />        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Reconocimiento ciudad y U." />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Proyectos de la Universidad" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Directores de programa" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Profesional SE" />        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Servicio de salud" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Grupos de la Universidad" />        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Practicante SE" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Registro académico" />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Externa" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Ninguna acción realizada" />        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Observaciones:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3}/>
                </Row>
                <hr></hr>
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
            <Button variant="secondary" onClick={()=>props.handleClose()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Seguimiento_individual 