import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Desplegable_item from "./desplegable_Item";
import { desencriptar } from '../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import { useEffect } from 'react';
import Semestre_por_sede from '../../../service/semestres_por_sede.js';
import { desencriptarInt } from '../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Socieducativa = (props) => {

    const [switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, set_state] = useState({
        data_user: props.data_user_socioedu,
    })

    const [fechaInicioSemestre, setFechaInicioSemestre] = useState("");
    const [fechaFinSemestre, setFechaFinSemestre] = useState("");

    useEffect(() => {
        const sedeId = desencriptarInt(sessionStorage.getItem("sede_id"));
        const idSemestreActual = desencriptarInt(sessionStorage.getItem("id_semestre_actual"));

        Semestre_por_sede.semestre_por_sede(sedeId).then((res) => {
            if (res && Array.isArray(res)) {
                const semestreActual = res.find(
                    (s) => s.id === idSemestreActual || s.semestre_actual === true
                );
                if (semestreActual) {
                    setFechaInicioSemestre(
                        semestreActual.fecha_inicio ? semestreActual.fecha_inicio.toString().substring(0, 10) : ""
                    );
                    setFechaFinSemestre(
                        semestreActual.fecha_fin ? semestreActual.fecha_fin.toString().substring(0, 10) : ""
                    );
                }
            }
        });
    }, []);

    const [activeTabIndex, setActiveTabIndex] = useState(
        state.data_user && state.data_user.length > 0 ? state.data_user[0]['nombre'] : ''
    );
    const activeTab = (index) => {
        index === activeTabIndex ?
            (setActiveTabIndex(0))
            :
            setActiveTabIndex(index)
    }

    const userRole = desencriptar(sessionStorage.getItem('rol'));

    return (
        <>{userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
            <Container className="socioeducativa_container">
                <Row className="socioeducativa_seguimientos_pares">Seguimientos de pares</Row>
                {props.tiene_datos_cargados ?
                    (
                        <Row className="socioeducativa_fondo" >

                            {state.data_user.map((item, index) =>
                                <Row>
                                    <Col className={item[0]['nombre'] === activeTabIndex ? "periodo_asignaciones open" : "periodo_asignaciones"}>
                                        <Row className="periodo_asignaciones_seleccionar" onClick={() => activeTab(item[0]['nombre'])}>
                                            <Col className="periodo_asignaciones_seleccionar_text" >
                                                <Row className="periodo_asignaciones_seleccionar_hover">
                                                    <Col className="col_periodo_asignaciones_seleccionar_text" >
                                                        {item[0]['nombre']}
                                                        {
                                                            item[0]['nombre'] === activeTabIndex ?
                                                                (
                                                                    <i class="bi bi-chevron-up"></i>
                                                                )
                                                                :
                                                                (
                                                                    <i class="bi bi-chevron-down"></i>
                                                                )
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="periodo_asignaciones_contenido">
                                            {item.map((item, index) => (
                                                <Desplegable_item
                                                    key={index}
                                                    item={item}
                                                    fecha_inicio_semestre={fechaInicioSemestre}
                                                    fecha_fin_semestre={fechaFinSemestre}
                                                />
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>

                            )}
                        </Row>
                    )
                    :
                    (
                        <Row></Row>
                    )
                }



                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Seleccione un estudiante.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        }</>
    )
}

export default Socieducativa 