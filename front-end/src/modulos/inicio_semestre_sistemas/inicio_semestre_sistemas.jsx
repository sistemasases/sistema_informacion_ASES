import React, {useState} from 'react';
import Semestre_sistemas_component from "../../components/inicio_semestre_sistemas/semestre_sistemas_component"
import Tabla_sistemas_component from "../../components/inicio_semestre_sistemas/tabla_semestre"
import Carga_estudiantes_component from "../../components/inicio_semestre_sistemas/carga_estudiantes"
import Carga_monitores_component from "../../components/inicio_semestre_sistemas/carga_monitores"
import {Container, Row, Accordion, Button, useAccordionButton} from "react-bootstrap";

const Inicio_semestre_sistemas = () =>{

    const [show, setShow] = useState(true);

    const CustomToggle = ({ children, eventKey }) => {
        const handle_upload = useAccordionButton(eventKey, () =>{
          setShow(false);
        });
      
        return (
          <Button variant="primary" onClick={handle_upload}>{children}</Button>
        );
    }
    return (
        <Container>
            <Row className="rowJustFlex">
                <h1>INICIO DE SEMESTRE</h1>
            </Row>
            <Row className="containerRow">
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Paso uno: Roles que continúan</Accordion.Header>
                        <Accordion.Body>
                            <div hidden={!show}>
                                <Semestre_sistemas_component/>
                                <Row>
                                    <CustomToggle eventKey="1">Guardar y continuar</CustomToggle>
                                </Row>
                            </div>
                            <div hidden={show}>
                                Usuarios guardados exitosamente.
                                <Row>
                                    <Tabla_sistemas_component/>
                                </Row>
                            </div>
                        </Accordion.Body>                        
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Paso dos: Carga masiva de los estudiantes nuevos</Accordion.Header>
                        <Accordion.Body>
                            <Carga_estudiantes_component/>
                            <Row>
                                <CustomToggle eventKey="2">Guardar y continuar</CustomToggle>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Paso tres: Carga masiva de los monitores y practicantes nuevos</Accordion.Header>
                        <Accordion.Body>
                            <Carga_monitores_component/>
                            <Row>
                                <CustomToggle eventKey="0">Finalizar</CustomToggle>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    )
}

export default Inicio_semestre_sistemas