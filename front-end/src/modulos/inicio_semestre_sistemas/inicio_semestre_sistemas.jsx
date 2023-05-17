/**
  * @file inicio_semestre_sistemas.jsx
  * @version 1.0.0
  * @description modulo para la inicialización del semestre. Donde se traen diferentes componentes para este fin.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import React, {useState} from 'react';
import Semestre_sistemas_component from "../../components/inicio_semestre_sistemas/semestre_sistemas_component";
import Tabla_sistemas_component from "../../components/inicio_semestre_sistemas/tabla_semestre";
import Carga_estudiantes_component from "../../components/inicio_semestre_sistemas/carga_estudiantes";
import Carga_monitores_component from "../../components/inicio_semestre_sistemas/carga_monitores";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {Container, Row, Accordion, Button, useAccordionButton, Col} from "react-bootstrap";

const Inicio_semestre_sistemas = () =>{

    const userRole = localStorage.getItem('rol');

    // Constante para cerrar el acordión.
    const [show, setShow] = useState(true);

    /**
        * Función para cerrar el acordión.
        * @param {Event} children Información del texto del botón.
        * @param {String} eventKey Indica a cuál evento hace referencia.
        * @returns {Props} - Botón que cierra la sección del evente que hace referencia.
    */
    const CustomToggle = ({ children, eventKey }) => {
        const handle_upload = useAccordionButton(eventKey, () =>{
          setShow(false);
        });
      
        return (<>
          <Row><p></p></Row><Row>
          <Col><Button variant="primary" onClick={handle_upload}>{children}</Button></Col>
          <Col/><Col/><Col/><Col/><Col/></Row>
          </>);
    }

    return (
    <>{userRole === 'superAses' || userRole === 'sistemas' ? <Container>
        <Row className="rowJustFlex">
            <h1>INICIO DE SEMESTRE</h1>
        </Row>
        <Row className="containerRow">
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Paso uno: Roles que continúan</Accordion.Header>
                    <Accordion.Body>
                        <div hidden={!show}>
                            <Semestre_sistemas_component />
                            <Row>
                                <CustomToggle eventKey="1">Continuar</CustomToggle>
                            </Row>
                        </div>
                        <div hidden={show}>
                            <h2>Usuarios guardados exitosamente.</h2>
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
                            <CustomToggle eventKey="2">Continuar</CustomToggle>
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
    </Container> : <Acceso_denegado/>}</>
    )
}

export default Inicio_semestre_sistemas