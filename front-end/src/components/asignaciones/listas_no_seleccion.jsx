import React from 'react';
import { Row, Col, } from "react-bootstrap";
import axios from 'axios';
import {decryptTokenFromSessionStorage, desencriptarInt} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import { useState, useRef } from "react";
import { Spinner } from "react-bootstrap";


/*
Este es el componente de la lista de los estudiantes-monitores-practicantes no asignados

recive el profesional seleccionado 
*/




const Listas_no_seleccion = (props) => {
    const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    };

    const [loading, setLoading] = useState(false);

    const{childClicked, childClicked2} = props // desestructuracion de las props, 
    const [practicanteDisabled, setPracticanteDisabled] = useState(false);
    const [loadingMonitor, setLoadingMonitor] = useState(false); 
    const [loadingPracticante, setLoadingPracticante] = useState(false);  
    const [monitorDisabled, setMonitorDisabled] = useState(false);
    const [studentDisabled, setStudentDisabled] = useState(false);
    const isAssigningRef = useRef(false);


    const añadir_estudiante = async (e) => {
        if (isAssigningRef.current) return;
        isAssigningRef.current = true;

        setStudentDisabled(true);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("llamada", "asignar");
            formData.append("id_usuario", props.monitor_seleccionado);
            formData.append("id_estudiante", props.item.id);
            formData.append("id_sede", desencriptarInt(sessionStorage.getItem("sede_id")));
            formData.append("detalle", ".");

            await axios({
                url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante/`,
                method: "POST",
                headers: config,
                data: formData,
            });

            // Actualizar inmediatamente sin delay
            childClicked2(props.monitor_seleccionado);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setStudentDisabled(false);
            isAssigningRef.current = false;
        }
    };
    
    const añadir_usuario_monitor = async (e) => {
        
        if (monitorDisabled || loadingMonitor) return;
        
        setMonitorDisabled(true);
        setLoadingMonitor(true);
        
        
        let formData = new FormData();
        formData.append("llamada", "asignar");
        formData.append("id_jefe", props.practicante_seleccionado);
        formData.append("id_usuario", props.item.id);
        formData.append("id_sede", desencriptarInt(sessionStorage.getItem('sede_id')));

        try {
            await axios({
                url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`,
                method: "POST",
                headers: config,
                data: formData,
            });
            
            
            
            childClicked(props.practicante_seleccionado);
            
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMonitor(false);
            setMonitorDisabled(false);
        }
    }

    const añadir_usuario_practicante = async (e) => {
        if (practicanteDisabled || loadingPracticante) return;  

        setPracticanteDisabled(true);
        setLoadingPracticante(true); 
        
        let formData = new FormData();
        formData.append("llamada", "asignar");
        formData.append("id_jefe", props.profesional_seleccionado);
        formData.append("id_usuario", props.item.id);
        formData.append("id_sede", desencriptarInt(sessionStorage.getItem('sede_id')));

        try {
            await axios({
                url: `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`,
                method: "POST",
                headers: config,
                data: formData,
            });
            
            // Actualizar inmediatamente sin delay
            if (props.actualizarPracticantes) {
                props.actualizarPracticantes();
            }
            
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPracticante(false);  
            setPracticanteDisabled(false);
        }
    }



    if(props.rol === "practicante"){
        return (
            <Row className="row_opcion">
                {
                props.profesional_seleccionado === '' ?
                (
                <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.nombre)}>
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
                <Col className="listas_cuerpo" onClick={()=>childClicked(props.item.nombre)}>
                    <Row className="asignaciones_hover1">
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                            <button 
                                onClick={() => añadir_usuario_practicante()} 
                                className="asignaciones_icons_añadir" 
                                disabled={practicanteDisabled || loadingPracticante}
                                style={{
                                    opacity: loadingPracticante ? 0.5 : 1,
                                    backgroundColor: loadingPracticante ? '#cccccc' : '',
                                    cursor: loadingPracticante ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <i class="bi bi-chevron-left"></i>
                                {loadingPracticante && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </Col>
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
            }
            </Row>
        )
    }else if(props.rol === "monitor" ) {
        return (
            <Row className="row_opcion">
            {
                props.practicante_seleccionado === '' ?
                (
                    <Col></Col>
                )
                :
                (
                <Col className= "listas_cuerpo">
                    <Row className="asignaciones_hover1">
                        <Col  xs={"2"} md={"2"} className="center_asignacion"> 
                        <button 
                            onClick={() => añadir_usuario_monitor()} 
                            className="asignaciones_icons_añadir" 
                            disabled={monitorDisabled || loadingMonitor}
                            style={{
                                opacity: loadingMonitor ? 0.5 : 1,
                                backgroundColor: loadingMonitor ? '#cccccc' : '',
                                cursor: loadingMonitor ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <i class="bi bi-chevron-left"></i>
                            {loadingMonitor && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                        </Col>

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
                    <Col></Col>
                )
                :
                (
        <Col className="listas_cuerpo">
                                <Row className="asignaciones_hover1">
                                                <Col xs={"2"} md={"2"} className="center_asignacion"> 
                                                    {/* <button onClick={()=>añadir_estudiante()} className="asignaciones_icons_añadir" disabled={studentDisabled || loading}>
                                                    <i class="bi bi-chevron-left"></i>                                                    
                                                    </button> */}
                                                    <button
                                                        onClick={() => añadir_estudiante()}
                                                        className="asignaciones_icons_añadir"
                                                        disabled={studentDisabled || loading}
                                                        style={{
                                                            opacity: loading ? 0.5 : 1,
                                                            backgroundColor: loading ? '#cccccc' : '',
                                                            cursor: loading ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        <i class="bi bi-chevron-left"></i>
                                                        {loading && (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                        )}
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
            </Row>
        )
    }
    
    
    
}

export default Listas_no_seleccion