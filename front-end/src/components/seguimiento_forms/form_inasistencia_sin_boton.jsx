/**
 * @file form_inasistencia_sin_boton.jsx.
 * @version 1.0.0.
 * @description Formulario de inasistencia sin botón de agregar.
 * @author Componente Sistemas Ases.
 * @contact sistemas.ases@correounivalle.edu.co.
 */

import React, { useState } from 'react';
import { Row, Col, Button, Modal  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Update_Inasistencia from '../../service/update_inasistencia';
import Delete_inasistencia from '../../service/delete_inasistencia';
import { CSVLink } from 'react-csv';
import { desencriptarInt, desencriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Componente funcional que representa un formulario de inasistencia sin botón de agregar.
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} Formulario de inasistencia.
 */
const Inasistencia = (props) =>{

    /**
     * Función para recargar la página.
     */
    const recargarPagina = () => {
        
        if (props.recarga_ficha_estudiante) {
            // Cambiar la URL a la página con el ID del estudiante seleccionado
            window.location.href = `/ficha_estudiante/${form.id_estudiante}`;
        } else {
            props.updateDataUserSocioedu(form.id_estudiante);
        }
    };

    // Estado local del formulario.
    const [form, set_form] = useState({
        id: props.item.id,
        fecha: props.item.fecha,
        observaciones: props.item.observaciones,
        revisado_profesional: props.item.revisado_profesional,
        revisado_practicante: props.item.revisado_practicante,
        id_creador: props.item.id_creador,
        id_modificador: parseInt(desencriptarInt(sessionStorage.getItem("id_usuario"))),
        id_estudiante: props.item.id_estudiante,
    });

    // Hora de creación y edición del formulario.
    const hora_creacion = new Date(props.item.creacion);
    const hora_edicion = new Date(props.item.modificacion);

    /**
     * Actualiza la información de la inasistencia.
     */
    const set_info = (e) => {
        Update_Inasistencia.Update_inasistencia(form).then(res=>{
            if(res){
                props.handleCloseIn();
                recargarPagina();
            } else {
                window.alert("Hubo un error al momento de actualizar la inasistencia, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria.");
            }
        });
    };

    /**
     * Elimina la información de la inasistencia.
     */
    const delete_info = (e) => {
        if(window.confirm("¿Está seguro que desea eliminar la inasistencia?")){
            Delete_inasistencia.Delete_inasistencia(form.id).then(res=>{
                if(res){
                    props.handleCloseIn();
                    recargarPagina();
                } else {
                    window.alert("Hubo un error al momento de eliminar la inasistencia.");
                }
            });
        }
    };

    /**
     * Maneja el cambio de los checkbox en el formulario.
     * @param {Event} e - Evento de cambio en el checkbox.
     */
    const handleFormChecks = (e) => {
        set_form({
            ...form,
            [e.target.name]: e.target.checked
        });
    };

    /**
     * Maneja el cambio en los campos del formulario.
     * @param {Event} e - Evento de cambio en el input.
     */
    const handleForm = (e) => {
        set_form({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Rol del usuario actual.
    const userRole = desencriptar(sessionStorage.getItem('rol'));

    /**
     * Maneja el cierre del modal.
     */
    const handleChange = () => {
        props.handleCloseIn();
        props.handleModal();
    };

    // Renderiza el formulario de inasistencia.
    return (
        
        <Modal {...props} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Inasistencia</Modal.Title>
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
                            <Form.Control type="date" defaultValue={props.item.fecha} name="fecha" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <br/> 
                <Row className="g-2">
                    <h6>Observaciones*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.observaciones} name="observaciones" onChange={handleForm}/>
                </Row>
                <br/> 
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado profesional" defaultChecked={props.item.revisado_profesional} disabled={!(userRole === 'profesional'||userRole === 'super_ases')} name="revisado_profesional" onChange={handleFormChecks}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado practicante" defaultChecked={props.item.revisado_practicante} disabled={!(userRole === 'practicante' || userRole === 'profesional'|| userRole === 'super_ases')} name="revisado_practicante" onChange={handleFormChecks}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6><b>Creación: </b> fecha: {hora_creacion.toLocaleDateString()} hora: {hora_creacion.toLocaleTimeString()} </h6>
                </Row>
                <Row className="g-2">
                    <h6><b>Última modificación: </b>fecha: {hora_edicion.toLocaleDateString()} hora: {hora_edicion.toLocaleTimeString()} </h6>
                </Row>
            </Modal.Body>
          <Modal.Footer>
            <CSVLink
                data={[props.item]}
                filename={"Inasistencia Individual " + props.item.fecha}
            >
                <Button variant="link">Descargar CSV</Button>
            </CSVLink>
            {(!(props.item.revisado_profesional=== true && !(userRole === 'profesional' ||userRole === 'super_ases'))) ? (
            <>
                <Button variant="danger" onClick={() => { delete_info() }} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
                Eliminar
                </Button>
                <Button variant="secondary" onClick={() => { set_info() }} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
                Aceptar cambios
                </Button>
            </>
            ) : null}
            <Button variant="secondary" onClick={() => { props.handleCloseIn() }}>
                Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    );
};

export default Inasistencia;
