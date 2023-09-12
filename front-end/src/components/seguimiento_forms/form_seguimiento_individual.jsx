import React, {useState,useEffect} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Create_Seguimiento from '../../service/create_seguimiento';
import { CSVLink } from 'react-csv';



const Seguimiento_individual = (props) =>{

    const recargarPagina = () => {
        
            // Cambiar la URL a la página con el ID del estudiante seleccionado
            window.location.href = `/ficha_estudiante/${state.id_estudiante}`;

    };




    const [state, set_state] = useState({
            fecha: null,
            lugar: "",
            hora_inicio: null,
            hora_finalización: null,
            objetivos: "",
            individual: "",
            riesgo_individual: null,
            autoconocimiento: false,
            rasgos_de_personalidad: false,
            identificación: false,
            red_de_apoyo: false,
            proyecto_de_vida: false,
            salud: false,
            aspectos_motivacionales: false,
            historia_de_vida: false,
            relación_eriótico_afectivas: false,
            diversidad_sexual: false,
            familiar: "",
            riesgo_familiar: null,
            dinamica_familiar: false,
            academico: "",
            riesgo_academico: null,
            desempeño_académico: false,
            elección_vocacional: false,
            manejo_del_tiempo: false,
            economico: "",
            riesgo_economico: null,
            apoyos_económicos_institucionales: false,
            manejo_finanzas: false,
            apoyo_económico_familiar: false,
            situación_laboral_ocupacional: false,
            vida_universitaria_ciudad: "",
            riesgo_vida_universitaria_ciudad: null,
            motivación_compañamiento: false,
            referencia_geográfica: false,
            adaptación_ciudad_Universidad: false,
            oferta_servicios: false,
            vivienda: false,
            vinculación_grupos_actividades_extracurriculares: false,
            apoyo_académico: false,
            taller_par_par: false,
            reconocimiento_ciudad_U: false,
            rem_profesional_SE: false,
            rem_racticante_SE: false,
            rem_actividades_grupales: false,
            rem_monitorías_académicas: false,
            rem_proyectos_Universidad: false,
            rem_servicio_salud: false,
            rem_registro_académico: false,
            rem_matrícula_financiera: false,
            rem_desarrollo_humano_promoción_SE: false,
            rem_directores_programa: false,
            rem_grupos_universidad: false,
            rem_externa: false,
            Ninguna_acción_realizada: false,
            observaciones: "",
            revisado_profesional: false,
            revisado_practicante: false,
            primer_acercamiento: false,
            cierre: false,
            id_estudiante: props.estudiante_seleccionado,
            id_creador: parseInt(sessionStorage.getItem("id_usuario")),
            id_modificador: null,
        }
    )
    useEffect(()=>{
        set_state({
            ...state,
            id_estudiante : props.estudiante_seleccionado

        })
    }, [state.fecha]);

    const set_info = () => {
        Create_Seguimiento.create_seguimiento(state).then(res=>{
            if(res){
                recargarPagina();
                props.handleClose();
            } else {
                window.confirm("Hubo un error al momento de crear el seguimiento, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria.")
            }
        })
    }

    const handleChange = () => {
        props.handleClose()
        props.handleModalIn()
    }

    const [form, set_form] = useState({
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
    })

    const handleForm = (e) => {
        if(e.target.name === "riesgo_individual_bajo"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_individual"]: 0
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: true,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_individual"]: null
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_individual_medio"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_individual"]: 1
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: true,
                    riesgo_individual_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_individual"]: null
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_individual_alto"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_individual"]: 2
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: true,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_individual"]: null
                })
                set_form({
                    ...form,
                    riesgo_individual_bajo: false,
                    riesgo_individual_medio: false,
                    riesgo_individual_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_bajo"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_familiar"]: 0
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: true,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_familiar"]: null
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_medio"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_familiar"]: 1
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: true,
                    riesgo_familiar_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_familiar"]: null
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_familiar_alto"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_familiar"]: 2
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: true,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_familiar"]: null
                })
                set_form({
                    ...form,
                    riesgo_familiar_bajo: false,
                    riesgo_familiar_medio: false,
                    riesgo_familiar_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_bajo"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_academico"]: 0
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: true,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_academico"]: null
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_medio"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_academico"]: 1
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: true,
                    riesgo_academico_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_academico"]: null
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_academico_alto"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_academico"]: 2
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: true,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_academico"]: null
                })
                set_form({
                    ...form,
                    riesgo_academico_bajo: false,
                    riesgo_academico_medio: false,
                    riesgo_academico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_bajo"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_economico"]: 0
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: true,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_economico"]: null
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_medio"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_economico"]: 1
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: true,
                    riesgo_economico_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_economico"]: null
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_economico_alto"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_economico"]: 2
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: true,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_economico"]: null
                })
                set_form({
                    ...form,
                    riesgo_economico_bajo: false,
                    riesgo_economico_medio: false,
                    riesgo_economico_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_bajo"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: 0
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: true,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_medio"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: 1
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: true,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else if(e.target.name === "riesgo_vida_universitaria_ciudad_alto"){
            if(e.target.checked === true){
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: 2
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: true,
                })
            } else {
                set_state({
                    ...state,
                    ["riesgo_vida_universitaria_ciudad"]: null
                })
                set_form({
                    ...form,
                    riesgo_vida_universitaria_ciudad_bajo: false,
                    riesgo_vida_universitaria_ciudad_medio: false,
                    riesgo_vida_universitaria_ciudad_alto: false,
                })
            }
        } else {
            set_state({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }

    const userRole = sessionStorage.getItem('rol');

    return (
        
        <Modal {...props}
        size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Seguimiento Individual</Modal.Title>
                <Button onClick={handleChange}>Registrar Inasistencia</Button>
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
                            <Form.Control type="date" name="fecha" onChange={handleForm}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Lugar*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="text" name="lugar" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Inicio*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" name="hora_inicio" onChange={handleForm}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Finalización*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" name="hora_finalización" onChange={handleForm}/>
                        </Row>
                    </Col>
                </Row>
                <Row className="g-2">
                    <h6>Objetivos*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="objetivos" onChange={handleForm}/>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Individual:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="individual" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={form.riesgo_individual_bajo}  name="riesgo_individual_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={form.riesgo_individual_medio} name="riesgo_individual_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={form.riesgo_individual_alto} name="riesgo_individual_alto" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Autoconocimiento" name="autoconocimiento" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Proyecto de vida" name="proyecto_de_vida" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Historia de vida" name="historia_de_vida" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rasgos de personalidad" name="rasgos_de_personalidad" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Salud" name="salud" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Relación eriótico-afectivas" name="relación_eriótico_afectivas" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Identificación" name="identificación" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Aspectos motivacionales" name="aspectos_motivacionales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Diversidad sexual" name="diversidad_sexual" onChange={handleForm}/>      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Red de apoyo" name="red_de_apoyo" onChange={handleForm}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Familiar:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="familiar" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={form.riesgo_familiar_bajo} name="riesgo_familiar_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={form.riesgo_familiar_medio} name="riesgo_familiar_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={form.riesgo_familiar_alto} name="riesgo_familiar_alto" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Dinámica Familiar" name="dinamica_familiar" onChange={handleForm}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Academico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="academico" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={form.riesgo_academico_bajo} name="riesgo_academico_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={form.riesgo_academico_medio} name="riesgo_academico_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={form.riesgo_academico_alto} name="riesgo_academico_alto" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Desempeño académico" name="desempeño_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Elección vocacional" name="elección_vocacional" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo del tiempo" name="manejo_del_tiempo" onChange={handleForm}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Económico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="economico" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={form.riesgo_economico_bajo} name="riesgo_economico_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={form.riesgo_economico_medio} name="riesgo_economico_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={form.riesgo_economico_alto} name="riesgo_economico_alto" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Apoyos económicos institucionales" name="apoyos_económicos_institucionales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo de sus finanzas" name="manejo_finanzas" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo económico familiar" name="apoyo_económico_familiar" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Situación laboral y ocupacional" name="situación_laboral_ocupacional" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Vida universitaria y ciudad*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="vida_universitaria_ciudad" onChange={handleForm}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={form.riesgo_vida_universitaria_ciudad_bajo} name="riesgo_vida_universitaria_ciudad_bajo" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={form.riesgo_vida_universitaria_ciudad_medio} name="riesgo_vida_universitaria_ciudad_medio" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={form.riesgo_vida_universitaria_ciudad_alto} name="riesgo_vida_universitaria_ciudad_alto" onChange={handleForm}/>
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
                        <Form.Check type="checkbox" label="Motivación para el acompañamiento" name="motivación_compañamiento" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Referencia geográfica" name="referencia_geográfica" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Adaptación a la ciudad y Universidad" name="adaptación_ciudad_Universidad" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Oferta de servicios" name="oferta_servicios" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vivienda" name="vivienda" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vinculación a grupos y realización de actividades extracurriculares" name="vinculación_grupos_actividades_extracurriculare" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <h6><b>Acciones (Ubique el cursor sobre la acción para obtener más información)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo académico" name="apoyo_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Actividades grupales" name="rem_actividades_grupales" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Matrícula financiera" name="rem_matrícula_financiera" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Taller par-par" name="taller_par_par" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Monitorías académicas" name="rem_monitorías_académicas" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Desarrollo humano y promoción SE" name="rem_desarrollo_humano_promoción_SE" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Reconocimiento ciudad y U." name="reconocimiento_ciudad_U" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Proyectos de la Universidad" name="rem_proyectos_Universidad" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Directores de programa" name="rem_directores_programa" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Profesional SE" name="rem_profesional_SE" onChange={handleForm}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Servicio de salud" name="rem_servicio_salud" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Grupos de la Universidad" name="rem_grupos_universidad" onChange={handleForm}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Practicante SE" name="rem_racticante_SE" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Registro académico" name="rem_registro_académico" onChange={handleForm}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Externa" name="rem_externa" onChange={handleForm}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Ninguna acción realizada" name="Ninguna_acción_realizada" onChange={handleForm}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Observaciones:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} name="observaciones" onChange={handleForm}/>
                </Row>
                <hr></hr>
            </Modal.Body>
          <Modal.Footer>

            <CSVLink
                    data={[state]}
                    filename={"Seguimiento Individual " + state.fecha}
                >
                <Button variant="secondary" onClick={() => { set_info() }}>
                    Registrar
                </Button>
            </CSVLink>

            <Button variant="secondary" onClick={() => { props.handleClose() }}>
                Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default Seguimiento_individual 