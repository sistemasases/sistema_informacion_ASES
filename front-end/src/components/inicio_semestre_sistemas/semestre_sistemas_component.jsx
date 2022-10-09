import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, Table} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Inicio_semestre from '../../service/inicio_semestre';

const semestre_sistemas_component = () =>{

    const data = [
        {id: 1, firs_name: "Deiby", last_name: "Rodriguez", rol: "profesor"},
        {id: 2, firs_name: "Clara", last_name: "Alvarez", rol: "director"},
        {id: 3, firs_name: "Jose", last_name: "Muñoz", rol: "socieducativo"},
        {id: 4, firs_name: "Luz", last_name: "Murillo", rol: "profesor"},
        {id: 5, firs_name: "Santiago", last_name: "Burbano", rol: "profesor"},
    ]

    const [state,set_state] = useState({
        data: data,
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Insertar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Hola!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        <Row className="rowJustFlex">
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Roles que continúan</Accordion.Header>
                    <Accordion.Body>
                        <Table responsive size="sm" class="table">
                            <thead>
                                <tr class="table-info">
                                    <th align='center'>Nombre</th>
                                    <th align='center'>Apellido</th>
                                    <th align='center'>Rol</th>
                                    <th align='center'>Continua</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.data.map((e)=>(
                                    <tr>
                                        <td>{e.firs_name}</td>
                                        <td>{e.last_name}</td>
                                        <td>{e.rol}</td>
                                        <td align='center'><input class="form-check-input" type="checkbox" defaultChecked/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Button variant="primary" onClick={handleShow}>Insertar Usuario</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Carga masiva de los estudiantes nuevos</Accordion.Header>
                    <Accordion.Body>
                        Hola!
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Carga masiva de los monitores y practicantes nuevos</Accordion.Header>
                    <Accordion.Body>
                        Hola!
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Row>
        </Container>
    )
}

export default semestre_sistemas_component