import React from 'react';
import {useState } from "react";
import Form from 'react-bootstrap/Form';
import { Row, Col, Button} from "react-bootstrap";
// import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {decryptTokenFromSessionStorage, desencriptarInt} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Listas = (props) => {


    const [state, set_state] = useState({
        detalle: "",
    }
    )

    const handleForm = (e) => {
        set_state({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const config = {
        headers: {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        }
    };

    const config2 = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    };

    const{childClicked, childClicked2} = props



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const quitar_estudiante = (e) =>{
        let formData = new FormData();

        formData.append("llamada", "eliminar");
        formData.append("id_usuario", props.monitor_seleccionado);
        formData.append("id_sede",desencriptarInt(sessionStorage.getItem('sede_id')));
        formData.append("id_estudiante", props.item.id);
        formData.append("detalle", ".");
        axios({
            // Endpoint to send files
            url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante/`,
            method: "POST",
            headers: config2,
            data: formData,
        })
        .then(response => {
            childClicked2(props.monitor_seleccionado)
        })
        .catch(error => {
            console.log("siii")
        });
    }

    const retirar_estudiante = (e) =>{
        let formData = new FormData();

        formData.append("llamada", "retiro");
        formData.append("id_usuario", props.monitor_seleccionado);
        formData.append("id_sede",desencriptarInt(sessionStorage.getItem('sede_id')));
        formData.append("id_estudiante", props.item.id);
        formData.append("detalle", state.detalle);
        axios({
            // Endpoint to send files
            url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante/`,
            method: "POST",
            headers: config2,
            data: formData,
        })
        .then(response => {
            childClicked2(props.monitor_seleccionado)
        })
        .catch(error => {
            console.log("siii")
        });
    }

    const quitar_usuario_monitor = (e) =>{
        let formData = new FormData();
        formData.append("llamada", "eliminar");
        formData.append("id_usuario", props.item.id);
        formData.append("id_jefe", props.practicante_seleccionado);
        formData.append("id_sede",desencriptarInt(sessionStorage.getItem('sede_id')));

      axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`,
      method: "POST",
      headers: config2,
      data: formData,
        })
        .then((res)=>{
        childClicked(props.practicante_seleccionado)
        })
        .catch(err=>{
            console.log("sdafw")
        })

    }

    const quitar_usuario = (e) =>{
        let formData = new FormData();
        formData.append("llamada", "eliminar");
        formData.append("id_usuario", props.item.id);
        formData.append("id_jefe", props.profesional_seleccionado);
        formData.append("id_sede",desencriptarInt(sessionStorage.getItem('sede_id')));

      axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`,
      method: "POST",
      headers: config2,
      data: formData,
        })
        .then((res)=>{
        console.log(res)
        })
        .catch(err=>{
            console.log("sdara")
        })

    }

    if(props.rol === "practicante"){
        return (
            <Row className="row_opcion">
            {
                props.profesional_seleccionado === '' ?
                (
                <Col onClick={()=>childClicked(props.item.id)}>
                    <Row className="asignaciones_hover1">
                        <Col  xs={"10"} md={"4"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                )
                :
                (
                <Col  onClick={()=>childClicked(props.item.id)}>
                    <Row className="asignaciones_hover1">
                        <Col xs={"2"} md={"2"}  className="center_asignacion"> 
                            <button onClick={()=>quitar_usuario()} className="asignaciones_icons_quitar">
                                <i class="bi bi-x"></i>                                                    
                            </button>
                        </Col>

                        <Col  xs={"10"} md={"8"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
{/*
                        <Col  xs={"2"} md={"2"}  className="center_asignacion"> 
                            <button className="asignaciones_icons">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                        </Col>
*/}
                    </Row>
                        
                </Col>
                )
            }
                    
            </Row> 
        )
    }else if(props.rol === "monitor") {
        return (
            <Row className="row_opcion">
            {
                props.practicante_seleccionado === '' ?
                (
                <Col onClick={()=>childClicked2(props.item.id)}>
                    <Row className="asignaciones_hover1">

                        <Col  xs={"10"} md={"4"}> 
                            <Row className="nombres_asignacion">
                                {props.item.username}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.first_name}
                                {props.item.last_name}
                            </Row>
                        </Col>
                        
                    </Row>
                </Col>
                    
                )
                :
                (
                    <Col onClick={()=>childClicked2(props.item.id)}>
                        <Row className="asignaciones_hover1">
                            <Col  xs={"2"} md={"2"}  className="center_asignacion"> 
                                <button onClick={()=>quitar_usuario_monitor()} className="asignaciones_icons_quitar">
                                    <i class="bi bi-x"></i>                                                    
                                </button>
                            </Col>


                            <Col  xs={"10"} md={"8"}> 
                                <Row className="nombres_asignacion">
                                    {props.item.username}
                                </Row>
                                <Row className="nombres_asignacion">
                                    {props.item.first_name}
                                    {props.item.last_name}
                                </Row>
                            </Col>

{/*
                            <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                            <button className="asignaciones_icons">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                            </Col>
*/}
                        </Row>                  
                    </Col>
                )
            }
            </Row>
        )
    }
    else if (props.rol === "estudiante"){
        return (
        <Row className="row_opcion">
        {
                props.monitor_seleccionado === '' ?
                (
            <Col >
                <Row className="asignaciones_hover1">
                    <Col  xs={"10"} md={"8"}> 
                        <Row className="nombres_asignacion">
                            {props.item.cod_univalle}
                        </Row>
                        <Row className="nombres_asignacion">
                            {props.item.nombre}
                            {props.item.apellido}
                        </Row>
                    </Col>
                </Row>
            </Col>
            )
            :
            (
                <Col >
                    <Row className="asignaciones_hover1">
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                            <button onClick={handleShow} className="asignaciones_icons_quitar">
                                <i class="bi bi-x"></i>                                                    
                            </button>
                        </Col>


                        <Col  xs={"10"} md={"8"}> 
                            <Row className="nombres_asignacion">
                                {props.item.cod_univalle}
                            </Row>
                            <Row className="nombres_asignacion">
                                {props.item.nombre}
                                {props.item.apellido}
                            </Row>
                        </Col>

{/*
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                        <button className="asignaciones_icons">
                            <i class="bi bi-arrow-left-right"></i>
                        </button>
                        </Col>
*/}
                    </Row>
            </Col>
            )
            }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body > 
                        <h6>
                            Seleccione una acción: 
                        </h6>
                        <Col  xs={"10"} md={"8"}> 
                        <Row><Button onClick={()=>quitar_estudiante()} >Quitar del monitor</Button></Row>
                        <Row><Button onClick={handleShow2} >Retirar estudiante</Button></Row>
                        </Col>
                            

                    </Modal.Body>                    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Retiros</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="g-2">
                            <h6>
                            Causa del retiro: 
                            </h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control as="textarea"  rows={3} name="detalle" onChange={handleForm} />
                        </Row>
                        <br/>
                    </Modal.Body>                    
                    <Modal.Footer>
                        <Button onClick={() => {retirar_estudiante()}} >aceptar</Button>
                        <Button variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show3} onHide={handleClose3}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        Causa de retiro agregada correctamente
                    </Modal.Body>                    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {handleClose3();handleClose2();handleClose();quitar_estudiante()}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </Row>
        )
    }
    

    
}

export default Listas
