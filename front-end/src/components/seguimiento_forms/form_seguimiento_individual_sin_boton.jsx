import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const Seguimiento_individual = (props) =>{

    const set_info = (e) => {
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
    
    useEffect(() => {
        if (props.item.riesgo_individual === 0){
            setState({...state, riesgo_individual_bajo: true})
        } else if (props.item.riesgo_individual === 1){
            setState({...state, riesgo_individual_medio: true})
        } else if (props.item.riesgo_individual === 2){
            setState({...state, riesgo_individual_alto: true})
        }
        if (props.item.riesgo_familiar === 0){
            setState({...state, riesgo_familiar_bajo: true})
        } else if (props.item.riesgo_familiar === 1){
            setState({...state, riesgo_familiar_medio: true})
        } else if (props.item.riesgo_familiar === 2){
            setState({...state, riesgo_familiar_alto: true})
        }
        if (props.item.riesgo_academico === 0){
            setState({...state, riesgo_academico_bajo: true})
        } else if (props.item.riesgo_academico === 1){
            setState({...state, riesgo_academico_medio: true})
        } else if (props.item.riesgo_academico === 2){
            setState({...state, riesgo_academico_alto: true})
        }
        if (props.item.riesgo_economico === 0){
            setState({...state, riesgo_economico_bajo: true})
        } else if (props.item.riesgo_economico === 1){
            setState({...state, riesgo_economico_medio: true})
        } else if (props.item.riesgo_economico === 2){
            setState({...state, riesgo_economico_alto: true})
        }
        if (props.item.riesgo_vida_universitaria_ciudad === 0){
            setState({...state, riesgo_vida_universitaria_ciudad_bajo: true})
        } else if (props.item.riesgo_vida_universitaria_ciudad === 1){
            setState({...state, riesgo_vida_universitaria_ciudad_medio: true})
        } else if (props.item.riesgo_vida_universitaria_ciudad === 2){
            setState({...state, riesgo_vida_universitaria_ciudad_alto: true})
        }
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
                            <Form.Control type="date" defaultValue={props.item.fecha}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Lugar*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="text" defaultValue={props.item.lugar}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Inicio*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" defaultValue={props.item.hora_inicio}/>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="g-2">
                            <h6>Hora de Finalización*:</h6>
                        </Row>
                        <Row className="g-2">
                            <Form.Control type="time" defaultValue={props.item.hora_finalización}/>
                        </Row>
                    </Col>
                </Row>
                <Row className="g-2">
                    <h6>Objetivos*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.objetivos}/>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Individual:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.individual}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_individual_bajo}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_individual_medio}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_individual_alto}/>
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
                        <Form.Check type="checkbox" label="Autoconocimiento" checked={props.item.autoconocimiento}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Proyecto de vida" checked={props.item.proyecto_de_vida}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Historia de vida" checked={props.item.historia_de_vida}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rasgos de personalidad" checked={props.item.rasgos_de_personalidad}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Salud" checked={props.item.salud}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Relación eriótico-afectivas" checked={props.item.relación_eriótico_afectivas}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Identificación" checked={props.item.identificación}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Aspectos motivacionales" checked={props.item.aspectos_motivacionales}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Diversidad sexual" checked={props.item.diversidad_sexual}/>      
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Red de apoyo" checked={props.item.red_de_apoyo}/> 
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Familiar:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.familiar}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_familiar_bajo}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_familiar_medio}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_familiar_alto}/>
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
                        <Form.Check type="checkbox" label="Dinámica Familiar" checked={props.item.dinamica_familiar}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Academico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.academico}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_academico_bajo}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_academico_medio}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_academico_alto}/>
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
                        <Form.Check type="checkbox" label="Desempeño académico" checked={props.item.desempeño_académico}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Elección vocacional" checked={props.item.elección_vocacional}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo del tiempo" checked={props.item.manejo_del_tiempo}/>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Económico:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.economico}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_economico_bajo}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_economico_medio}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_economico_alto}/>
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
                        <Form.Check type="checkbox" label="Apoyos económicos institucionales" checked={props.item.apoyos_económicos_institucionales}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Manejo de sus finanzas" checked={props.item.manejo_finanzas}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo económico familiar" checked={props.item.apoyo_económico_familiar}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Situación laboral y ocupacional" checked={props.item.situación_laboral_ocupacional}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Vida universitaria y ciudad*:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.vida_universitaria_ciudad}/>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Bajo" checked={state.riesgo_vida_universitaria_ciudad_bajo}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Medio" checked={state.riesgo_vida_universitaria_ciudad_medio}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Alto" checked={state.riesgo_vida_universitaria_ciudad_alto}/>
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
                        <Form.Check type="checkbox" label="Motivación para el acompañamiento" checked={props.item.motivación_compañamiento}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Referencia geográfica" checked={props.item.referencia_geográfica}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Adaptación a la ciudad y Universidad" checked={props.item.adaptación_ciudad_Universidad}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Oferta de servicios" checked={props.item.oferta_servicios}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vivienda" checked={props.item.vivienda}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Vinculación a grupos y realización de actividades extracurriculares" checked={props.item.vinculación_grupos_actividades_extracurriculares}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <h6><b>Acciones (Ubique el cursor sobre la acción para obtener más información)</b></h6>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Apoyo académico" checked={props.item.apoyo_académico}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Actividades grupales" checked={props.item.rem_actividades_grupales}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Matrícula financiera" checked={props.item.rem_matrícula_financiera}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Taller par-par" checked={props.item.taller_par_par}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Monitorías académicas" checked={props.item.rem_monitorías_académicas}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Desarrollo humano y promoción SE" checked={props.item.rem_desarrollo_humano_promoción_SE}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Reconocimiento ciudad y U." checked={props.item.reconocimiento_ciudad_U}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Proyectos de la Universidad" checked={props.item.rem_proyectos_Universidad}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Directores de programa" checked={props.item.rem_directores_programa}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Profesional SE" checked={props.item.rem_profesional_SE}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Servicio de salud" checked={props.item.rem_servicio_salud}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Grupos de la Universidad" checked={props.item.rem_grupos_universidad}/>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Practicante SE" checked={props.item.rem_racticante_SE}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Registro académico" checked={props.item.rem_registro_académico}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Rem. Externa" checked={props.item.rem_externa}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Ninguna acción realizada" checked={props.item.Ninguna_acción_realizada}/>        
                    </Col>
                </Row>
                <hr></hr>
                <Row className="g-2">
                    <h6>Observaciones:</h6>
                </Row>
                <Row className="g-2">
                    <Form.Control as="textarea"  rows={3} defaultValue={props.item.observaciones}/>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado profesional" checked={props.item.revisado_profesional} disabled={!(userRole === 'profesional')}/>        
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Revisado practicante" checked={props.item.revisado_practicante} disabled={!(userRole === 'practicante' || userRole === 'profesional')}/>        
                    </Col>
                </Row>
            </Modal.Body>
          <Modal.Footer>
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