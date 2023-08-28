import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Update_Inasistencia from '../../service/update_inasistencia';
import Delete_Inasistencia from '../../service/delete_inasistencia';


const Inasistencia = (props) =>{

    const [form, set_form] = useState({
        id: props.item.id,
        observaciones: props.item.observaciones,
        revisado_profesional: props.item.revisado_profesional,
        revisado_practicante: props.item.revisado_practicante,
        id_creador: props.item.id_creador,
        id_modificador: parseInt(sessionStorage.getItem("id_usuario")),
        id_estudiante: parseInt(sessionStorage.getItem("id_estudiante_seleccionado"))
    })

    const set_info = (e) => {
        Update_Inasistencia.Update_inasistencia(form).then(res=>{
            if(res){
                props.handleCloseIn()
            } else {
                window.alert("Hubo un error al momento de actualizar la inasistencia, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria.")
            }
        })
    }

    const delete_info = (e) => {
        if(window.confirm("¿Está seguro que desea eliminar la inasistencia?")){
            Delete_Inasistencia.Delete_Inasistencia(form.id).then(res=>{
                if(res){
                    props.handleCloseIn()
                } else {
                    window.alert("Hubo un error al momento de eliminar la inasistencia.")
                }
            })
        }
    }

    const handleForm = (e) => {
        set_form({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const userRole = sessionStorage.getItem('rol');

    const handleChange = () => {
        props.handleCloseIn()
        props.handleModal()
    }

    return (
        
        <Modal {...props}>
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
                            <Form.Control type="date" defaultValue={props.item.fecha} name="hora_inicio" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Revisado profesional" defaultChecked={props.item.revisado_profesional} disabled={!(userRole === 'profesional')} name="revisado_profesional" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado practicante" defaultChecked={props.item.revisado_practicante} disabled={!(userRole === 'practicante' || userRole === 'profesional')} name="revisado_practicante" onChange={handleForm}/>        
                    </Col>
                </Row>
            </Modal.Body>
          <Modal.Footer>
            <CSVLink
                data={[props.item]}
                filename={"Inasistencia Individual " + props.item.fecha}
            >
                <Button variant="link">Descargar CSV</Button>
            </CSVLink>
            <Button variant="danger" onClick={delete_info} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={set_info}>
              Editar
            </Button>
            <Button variant="secondary" onClick={()=>props.handleCloseIn()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Inasistencia 