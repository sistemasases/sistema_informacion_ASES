import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Create_Inasistencia from '../../service/create_inasistencia';
import { CSVLink } from 'react-csv';
import { desencriptarInt, desencriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Inasistencia = (props) => {
    const id_estudiantecons = props.estudiante_seleccionado
    const [state, set_state] = useState({
        fecha: null,
        observaciones: "",
        revisado_profesional: false,
        revisado_practicante: false,
        id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
        id_modificador: null,

    });



    const recargarPagina = () => {
        
            // Cambiar la URL a la página con el ID del estudiante seleccionado
            window.location.href = `/ficha_estudiante/${state.id_estudiante}`;

    };


    useEffect(() => {
        set_state(prevState => ({
            ...prevState,
            id_estudiante: id_estudiantecons,
        }))
    },[state.fecha])



    const set_info = async () => {

        // Llamada a la función set_state para actualizar el estado
        


        // Llamada a la función Create_Inasistencia.create_inasistencia solo cuando se hace clic en el botón Registrar
        try {
            const res = await Create_Inasistencia.create_inasistencia(state);
            if (res) {
                recargarPagina();
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

    const userRole = desencriptar(sessionStorage.getItem('rol'));

    return (
        <Modal {...props} backdrop="static">
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
                <CSVLink
                    data={[state]}
                    filename={"Inasistencia Individual " + state.fecha}
                >   
                    <Button variant="secondary" onClick={() => {set_info()}}>
                        Registrar
                    </Button>
                </CSVLink>
                
                <Button variant="secondary" onClick={() => { props.handleCloseIn() }}>
                    Cerrar
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default Inasistencia;
