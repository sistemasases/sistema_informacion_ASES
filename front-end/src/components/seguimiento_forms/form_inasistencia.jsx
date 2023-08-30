import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Create_Inasistencia from '../../service/create_inasistencia';

const Inasistencia = (props) => {
    const idEstudianteSeleccionado = sessionStorage.getItem("id_estudiante_seleccionado");

    const [state, set_state] = useState({
        fecha: null,
        observaciones: "",
        revisado_profesional: false,
        revisado_practicante: false,
        id_creador: parseInt(sessionStorage.getItem("id_usuario")),
        id_modificador: null,
        id_estudiante: !isNaN(idEstudianteSeleccionado) ? parseInt(idEstudianteSeleccionado) : null
    });
    useEffect(()=>{
        set_state({
            ...state,
            id_estudiante : parseInt(sessionStorage.getItem("id_estudiante_seleccionado"))

        })
    }, [state.fecha]);

    const set_info = async () => {
        const idEstudiante = !isNaN(idEstudianteSeleccionado) ? parseInt(idEstudianteSeleccionado) : null;
        console.log("Antes de asignar:", idEstudiante);
        // Llamada a la función set_state para actualizar el estado
        set_state(prevState => ({
            ...prevState,
            id_estudiante: idEstudiante
        }));
        console.log("ID del estudiante seleccionado lo que se asigna:", idEstudiante);
        console.log("ID del estudiante seleccionado enviado es:", state.id_estudiante);
        console.log(state);

        // Llamada a la función Create_Inasistencia.create_inasistencia solo cuando se hace clic en el botón Registrar
        try {
            const res = await Create_Inasistencia.create_inasistencia(state);
            if (res) {
                props.handleCloseIn();
            } else {
                window.confirm("Hubo un error al momento de crear el seguimiento, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = () => {
        props.handleCloseIn();
        props.handleModal();
    };

    const handleForm = (e) => {
        set_state({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const userRole = sessionStorage.getItem('rol');

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
                            <Form.Control type="date" name="fecha" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <br/> 
                <Row className="g-2">
                    <h6>Observaciones*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="observaciones" onChange={handleForm}/>
                </Row>
                <br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={set_info}>
                    Registrar
                </Button>
                <Button variant="secondary" onClick={() => props.handleCloseIn()}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Inasistencia;
