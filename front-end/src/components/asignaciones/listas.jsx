import React from 'react';
import {useState } from "react";
import { Row, Col, Button} from "react-bootstrap";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Detalles from "./opciones_retirar_estudiante.json";
import {decryptTokenFromSessionStorage, desencriptarInt} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Listas = (props) => {

    const config2 = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    };

    const{childClicked, childClicked2} = props

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
        setDetalleSubmenu([]);
        setMotivoSubmenu([]);
    };
    const handleShow2 = () => setShow2(true);

    const [detalleSubmenu, setDetalleSubmenu] = useState([]);
    const [motivoSubmenu, setMotivoSubmenu] = useState([]);

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
            handleClose2()
            handleClose()
        })
        .catch(error => {
            console.log(error)
        });
    }

    const detalle_option = async (item) => {
        await Detalles.map((item2)=> {
            if(item2.motivo === item){
                setDetalleSubmenu(item2.detalle)
                setMotivoSubmenu(item2)
            }
        })
        handleShow2()
    };

    const retirar_estudiante = (detalle) =>{
        let formData = new FormData();

        formData.append("llamada", "retiro");
        formData.append("id_usuario", props.monitor_seleccionado);
        formData.append("id_sede",desencriptarInt(sessionStorage.getItem('sede_id')));
        formData.append("id_estudiante", props.item.id);
        formData.append("id_motivo", motivoSubmenu.id);
        formData.append("detalle", detalle);
        
        axios({
            // Endpoint to send files
            url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante/`,
            method: "POST",
            headers: config2,
            data: formData,
        })
        .then(response => {
            axios({
                // Endpoint to send files
                url: `${process.env.REACT_APP_API_URL}/usuario_rol/retiro/`,
                method: "POST",
                headers: config2,
                data: formData,
            })
            .then(response => {
                childClicked2(props.monitor_seleccionado)
                handleClose2()
                handleClose()
            })
            .catch(error => {
                window.alert("Ocurrió un error a la hora de crear el retiro del estudiante")
            });
        })
        .catch(error => {
            window.alert("Ocurrió un error a la hora de desvincular al estudiante")
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
        handleClose2()
        handleClose()
        })
        .catch(err=>{
            console.log(err)
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
            handleClose2()
            handleClose()
        })
        .catch(err=>{
            console.log(err)
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
            { props.monitor_seleccionado === '' ?
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
                    <br/>
                    {props.opciones_retiro.map((item) => (
                        <Row key={item.id} style={{ marginBottom: '20px' }}>
                            <Button style={{ display: 'block', marginBottom: '10px' }} onClick={()=>detalle_option(item.descripcion)}>{item.descripcion}</Button>
                        </Row>
                    ))}
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
                    <Modal.Title>{motivoSubmenu.motivo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-2">
                        <h6>
                        Detalle del retiro: 
                        </h6>
                    </Row>
                    {detalleSubmenu.map((detalleItem, index) => (
                        <Row className="g-2">
                            <Button key={index} style={{ display: 'block', marginBottom: '5px' }} onClick={() => {retirar_estudiante(detalleItem.referencia)}}>
                                {detalleItem.nombre}
                            </Button>
                        </Row>
                    ))}
                    <br/>
                </Modal.Body>                    
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>)
    }
}

export default Listas