import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Update_seguimiento from '../../service/update_seguimiento';
import Delete_seguimiento from '../../service/delete_seguimiento';
import { CSVLink } from 'react-csv';



const Seguimiento_individual = (props) =>{

    const [form, set_form] = useState({
        id: props.item.id,
        fecha: props.item.fecha,
        lugar: props.item.lugar,
        hora_inicio: props.item.hora_inicio,
        hora_finalización: props.item.hora_finalización,
        objetivos: props.item.objetivos,
        individual: props.item.individual,
        riesgo_individual: props.item.riesgo_individual,
        autoconocimiento: props.item.autoconocimiento,
        rasgos_de_personalidad: props.item.rasgos_de_personalidad,
        identificación: props.item.identificación,
        red_de_apoyo: props.item.red_de_apoyo,
        proyecto_de_vida: props.item.proyecto_de_vida,
        salud: props.item.salud,
        aspectos_motivacionales: props.item.aspectos_motivacionales,
        historia_de_vida: props.item.historia_de_vida,
        relación_eriótico_afectivas: props.item.relación_eriótico_afectivas,
        diversidad_sexual: props.item.diversidad_sexual,
        familiar: props.item.familiar,
        riesgo_familiar: props.item.riesgo_familiar,
        dinamica_familiar: props.item.dinamica_familiar,
        academico: props.item.academico,
        riesgo_academico: props.item.riesgo_academico,
        desempeño_académico: props.item.desempeño_académico,
        elección_vocacional: props.item.elección_vocacional,
        manejo_del_tiempo: props.item.manejo_del_tiempo,
        economico: props.item.economico,
        riesgo_economico: props.item.riesgo_economico,
        apoyos_económicos_institucionales: props.item.apoyos_económicos_institucionales,
        manejo_finanzas: props.item.manejo_finanzas,
        apoyo_económico_familiar: props.item.apoyo_económico_familiar,
        situación_laboral_ocupacional: props.item.situación_laboral_ocupacional,
        vida_universitaria_ciudad: props.item.vida_universitaria_ciudad,
        riesgo_vida_universitaria_ciudad: props.item.riesgo_vida_universitaria_ciudad,
        motivación_compañamiento: props.item.motivación_compañamiento,
        referencia_geográfica: props.item.referencia_geográfica,
        adaptación_ciudad_Universidad: props.item.adaptación_ciudad_Universidad,
        oferta_servicios: props.item.oferta_servicios,
        vivienda: props.item.vivienda,
        vinculación_grupos_actividades_extracurriculares: props.item.vinculación_grupos_actividades_extracurriculares,
        apoyo_académico: props.item.apoyo_académico,
        taller_par_par: props.item.taller_par_par,
        reconocimiento_ciudad_U: props.item.reconocimiento_ciudad_U,
        rem_profesional_SE: props.item.rem_profesional_SE,
        rem_racticante_SE: props.item.rem_racticante_SE,
        rem_actividades_grupales: props.item.rem_actividades_grupales,
        rem_monitorías_académicas: props.item.rem_monitorías_académicas,
        rem_proyectos_Universidad: props.item.rem_proyectos_Universidad,
        rem_servicio_salud: props.item.rem_servicio_salud,
        rem_registro_académico: props.item.rem_registro_académico,
        rem_matrícula_financiera: props.item.rem_matrícula_financiera,
        rem_desarrollo_humano_promoción_SE: props.item.rem_desarrollo_humano_promoción_SE,
        rem_directores_programa: props.item.rem_directores_programa,
        rem_grupos_universidad: props.item.rem_grupos_universidad,
        rem_externa: props.item.rem_externa,
        Ninguna_acción_realizada: props.item.Ninguna_acción_realizada,
        observaciones: props.item.observaciones,
        revisado_profesional: props.item.revisado_profesional,
        revisado_practicante: props.item.revisado_practicante,
        primer_acercamiento: props.item.primer_acercamiento,
        cierre: props.item.cierre,
        id_creador: props.item.id_creador,
        id_modificador: parseInt(sessionStorage.getItem("id_usuario")),
        id_estudiante: parseInt(sessionStorage.getItem("id_estudiante_seleccionado"))
    })

    const set_info = (e) => {
        Update_seguimiento.Update_seguimiento(form).then(res=>{
            if(res){
                props.handleClose()
            } else {
                window.alert("Hubo un error al momento de actualizar el seguimiento, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria.")
            }
        })
    }

    const delete_info = (e) => {
        if(window.confirm("¿Está seguro que desea eliminar el seguimiento?")){
            Delete_seguimiento.Delete_seguimiento(form.id).then(res=>{
                if(res){
                    props.handleClose()
                } else {
                    window.alert("Hubo un error al momento de eliminar el seguimiento.")
                }
            })
        }
    }

    const handleForm = (e) => {
        if(e.target.name === "riesgo_individual_bajo"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_individual"]: 0
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: true,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_individual"]: null
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_individual_medio"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_individual"]: 1
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: true,
                    riesgo_individual_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_individual"]: null
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_individual_alto"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_individual"]: 2
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: true,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_individual"]: null
                })
                setState({
                    ...state,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_bajo"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_familiar"]: 0
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: true,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_familiar"]: null
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_medio"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_familiar"]: 1
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: true,
                    riesgo_familiar_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_familiar"]: null
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_alto"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_familiar"]: 2
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: true,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_familiar"]: null
                })
                setState({
                    ...state,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_bajo"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_academico"]: 0
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: true,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_academico"]: null
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_medio"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_academico"]: 1
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: true,
                    riesgo_academico_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_academico"]: null
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_alto"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_academico"]: 2
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: true,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_academico"]: null
                })
                setState({
                    ...state,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_bajo"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_economico"]: 0
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: true,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_economico"]: null
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_medio"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_economico"]: 1
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: true,
                    riesgo_economico_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_economico"]: null
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_alto"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_economico"]: 2
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: true,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_economico"]: null
                })
                setState({
                    ...state,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_bajo"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: 0
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: true,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_medio"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: 1
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: true,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_alto"){
            if(e.target.checked === true){
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: 2
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: true,
                })
            } else {
                set_form({
                    ...form,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                setState({
                    ...state,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else {
            set_form({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const userRole = sessionStorage.getItem('rol');

    const [state, setState] = useState({
        riesgo_individual_bajo: false,
        riesgo_individual_medio: false,
        riesgo_individual_alto: false,
        riesgo_familiar_bajo: false,
        riesgo_familiar_medio: false,
        riesgo_familiar_alto: false,
        riesgo_academico_bajo: false,
        riesgo_academico_medio: false,
        riesgo_academico_alto: false,
        riesgo_economico_bajo: false,
        riesgo_economico_medio: false,
        riesgo_economico_alto: false,
        riesgo_vida_universitaria_ciudad_bajo: false,
        riesgo_vida_universitaria_ciudad_medio: false,
        riesgo_vida_universitaria_ciudad_alto: false,
    });

    const actualizar_riesgo = (prop, value) => {
        setState(prevState => ({
            ...prevState,
            [prop]: value,
        }));
    };
    
    useEffect(() => {
        actualizar_riesgo('riesgo_individual_bajo', props.item.riesgo_individual === 0);
        actualizar_riesgo('riesgo_individual_medio', props.item.riesgo_individual === 1);
        actualizar_riesgo('riesgo_individual_alto', props.item.riesgo_individual === 2);
        actualizar_riesgo('riesgo_familiar_bajo', props.item.riesgo_familiar === 0);
        actualizar_riesgo('riesgo_familiar_medio', props.item.riesgo_familiar === 1);
        actualizar_riesgo('riesgo_familiar_alto', props.item.riesgo_familiar === 2);
        actualizar_riesgo('riesgo_academico_bajo', props.item.riesgo_academico === 0);
        actualizar_riesgo('riesgo_academico_medio', props.item.riesgo_academico === 1);
        actualizar_riesgo('riesgo_academico_alto', props.item.riesgo_academico === 2);
        actualizar_riesgo('riesgo_economico_bajo', props.item.riesgo_economico === 0);
        actualizar_riesgo('riesgo_economico_medio', props.item.riesgo_economico === 1);
        actualizar_riesgo('riesgo_economico_alto', props.item.riesgo_economico === 2);
        actualizar_riesgo('riesgo_vida_universitaria_ciudad_bajo', props.item.riesgo_vida_universitaria_ciudad === 0);
        actualizar_riesgo('riesgo_vida_universitaria_ciudad_medio', props.item.riesgo_vida_universitaria_ciudad === 1);
        actualizar_riesgo('riesgo_vida_universitaria_ciudad_alto', props.item.riesgo_vida_universitaria_ciudad === 2);
    }, []);

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
                            <Form.Control type="date" defaultValue={props.item.fecha} name="hora_inicio" onChange={handleForm}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Lugar*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="text" defaultValue={props.item.lugar} name="lugar" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Inicio*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" defaultValue={props.item.hora_inicio} name="hora_inicio" onChange={handleForm}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Finalización*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" defaultValue={props.item.hora_finalización} name="hora_finalización" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <Row className="g-2">
                    <h6>Objetivos*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.objetivos} name="objetivos" onChange={handleForm}/>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Individual:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.individual} name="individual" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_individual_bajo} name="riesgo_individual_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_individual_medio} name="riesgo_individual_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_individual_alto} name="riesgo_individual_alto" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (individual)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Autoconocimiento" defaultChecked={props.item.autoconocimiento} name="autoconocimiento" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Proyecto de vida" defaultChecked={props.item.proyecto_de_vida} name="proyecto_de_vida" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Historia de vida" defaultChecked={props.item.historia_de_vida} name="historia_de_vida" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rasgos de personalidad" defaultChecked={props.item.rasgos_de_personalidad} name="rasgos_de_personalidad" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Salud" defaultChecked={props.item.salud} name="salud" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Relación eriótico-afectivas" defaultChecked={props.item.relación_eriótico_afectivas} name="relación_eriótico_afectivas" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Identificación" defaultChecked={props.item.identificación} name="identificación" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Aspectos motivacionales" defaultChecked={props.item.aspectos_motivacionales} name="aspectos_motivacionales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Diversidad sexual" defaultChecked={props.item.diversidad_sexual} name="diversidad_sexual" onChange={handleForm}/>      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Red de apoyo" defaultChecked={props.item.red_de_apoyo} name="red_de_apoyo" onChange={handleForm}/> 
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Familiar:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.familiar} name="familiar" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_familiar_bajo} name="riesgo_familiar_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_familiar_medio} name="riesgo_familiar_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_familiar_alto} name="riesgo_familiar_alto" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (Familiar)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Dinámica Familiar" defaultChecked={props.item.dinamica_familiar} name="dinamica_familiar" onChange={handleForm}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Academico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.academico} name="academico" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_academico_bajo} name="riesgo_academico_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_academico_medio} name="riesgo_academico_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_academico_alto} name="riesgo_academico_alto" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (Academico)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Desempeño académico" defaultChecked={props.item.desempeño_académico} name="desempeño_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Elección vocacional" defaultChecked={props.item.elección_vocacional} name="elección_vocacional" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo del tiempo" defaultChecked={props.item.manejo_del_tiempo} name="manejo_del_tiempo" onChange={handleForm}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Económico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.economico} name="economico" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_economico_bajo} name="riesgo_economico_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_economico_medio} name="riesgo_economico_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_economico_alto} name="riesgo_economico_alto" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (Económico)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyos económicos institucionales" defaultChecked={props.item.apoyos_económicos_institucionales} name="apoyos_económicos_institucionales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo de sus finanzas" defaultChecked={props.item.manejo_finanzas} name="manejo_finanzas" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo económico familiar" defaultChecked={props.item.apoyo_económico_familiar} name="apoyo_económico_familiar" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Situación laboral y ocupacional" defaultChecked={props.item.situación_laboral_ocupacional} name="situación_laboral_ocupacional" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Vida universitaria y ciudad*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.vida_universitaria_ciudad} name="vida_universitaria_ciudad" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_vida_universitaria_ciudad_bajo} name="riesgo_vida_universitaria_ciudad_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_vida_universitaria_ciudad_medio} name="riesgo_vida_universitaria_ciudad_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_vida_universitaria_ciudad_alto} name="riesgo_vida_universitaria_ciudad_alto" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <h6><b>Temáticas (Vida universitaria y ciudad)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Motivación para el acompañamiento" defaultChecked={props.item.motivación_compañamiento} name="motivación_compañamiento" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Referencia geográfica" defaultChecked={props.item.referencia_geográfica} name="referencia_geográfica" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Adaptación a la ciudad y Universidad" defaultChecked={props.item.adaptación_ciudad_Universidad} name="adaptación_ciudad_Universidad" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Oferta de servicios" defaultChecked={props.item.oferta_servicios} name="oferta_servicios" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vivienda" defaultChecked={props.item.vivienda} name="vivienda" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vinculación a grupos y realización de actividades extracurriculares" defaultChecked={props.item.vinculación_grupos_actividades_extracurriculares} name="vinculación_grupos_actividades_extracurriculare" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <h6><b>Acciones (Ubique el cursor sobre la acción para obtener más información)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo académico" defaultChecked={props.item.apoyo_académico} name="apoyo_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Actividades grupales" defaultChecked={props.item.rem_actividades_grupales} name="rem_actividades_grupales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Matrícula financiera" defaultChecked={props.item.rem_matrícula_financiera} name="rem_matrícula_financiera" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Taller par-par" defaultChecked={props.item.taller_par_par} name="taller_par_par" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Monitorías académicas" defaultChecked={props.item.rem_monitorías_académicas} name="rem_monitorías_académicas" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Desarrollo humano y promoción SE" defaultChecked={props.item.rem_desarrollo_humano_promoción_SE} name="rem_desarrollo_humano_promoción_SE" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Reconocimiento ciudad y U." defaultChecked={props.item.reconocimiento_ciudad_U} name="reconocimiento_ciudad_U" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Proyectos de la Universidad" defaultChecked={props.item.rem_proyectos_Universidad} name="rem_proyectos_Universidad" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Directores de programa" defaultChecked={props.item.rem_directores_programa} name="rem_directores_programa" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Profesional SE" defaultChecked={props.item.rem_profesional_SE} name="rem_profesional_SE" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Servicio de salud" defaultChecked={props.item.rem_servicio_salud} name="rem_servicio_salud" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Grupos de la Universidad" defaultChecked={props.item.rem_grupos_universidad} name="rem_grupos_universidad" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Practicante SE" defaultChecked={props.item.rem_racticante_SE} name="rem_racticante_SE" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Registro académico" defaultChecked={props.item.rem_registro_académico} name="rem_registro_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Externa" defaultChecked={props.item.rem_externa} name="rem_externa" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Ninguna acción realizada" defaultChecked={props.item.Ninguna_acción_realizada} name="Ninguna_acción_realizada" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Observaciones:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.observaciones} name="observaciones" onChange={handleForm}/>
                </Row>
                <hr></hr>
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
                filename={"Seguimiento Individual " + props.item.fecha}
            >
                <Button variant="link">Descargar CSV</Button>
            </CSVLink>
            <Button variant="danger" onClick={delete_info} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={set_info} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
              Editar
            </Button>
            <Button variant="secondary" onClick={()=>props.handleClose()}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Seguimiento_individual 