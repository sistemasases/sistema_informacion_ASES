import React from 'react';
import {useState } from "react";
import {Row, Col} from "react-bootstrap";
import Seguimiento_individual from '../../seguimiento_forms/form_seguimiento_individual_sin_boton';
import Seguimiento_individual_edit_v2 from '../../seguimiento_forms/form_seguimiento_individual_edit_v2';
import Seguimiento_individual_edit_v3 from '../../seguimiento_forms/form_seguimiento_individual_edit_v3';
import Seguimiento_inasistencia from '../../seguimiento_forms/form_inasistencia_sin_boton';
import { desencriptar } from '../../../modulos/utilidades_seguridad/utilidades_seguridad';

const Desplegable_item = ({item, updateDataUserSocioedu}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleCloseIn = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const fechaReferencia = new Date('2024-07-10'); // Fecha desde que corre la versión 2 de la ficha
    const fechaReferenciaV3 = new Date('2025-08-15'); // Fecha desde que corre la versión 3 de la ficha

    // Convierte la fecha de item a un objeto Date si es necesario
    const itemFecha = new Date(item.fecha);

    const userRole = desencriptar(sessionStorage.getItem('rol'));
    const isMonitorOrPracticante = userRole === 'monitor' || userRole === 'practicante';
    const isIndividualSeguimiento = Boolean(item.hora_inicio);
    // Sólo ocultar si el seguimiento es individual Y fue creado por un profesional (id_rol_creador === 3)
    const hideIndividualForRole = isMonitorOrPracticante && isIndividualSeguimiento && item.id_rol_creador === 3;

      const enviar_datos = (e) => {
        // Actualiza state.data_user_socioedu con los nuevos datos
                updateDataUserSocioedu(e);
      };

    if(item.nombre){
        return (
            <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
            <Row className="periodo_activo_o_no">
                        {item.Actual ? 
                        (<Col>El periodo se encuentra en curso</Col>)
                            :
                        (<Col>El periodo esta finalizado</Col>)}
            </Row>
            }</>
        )
    } else{
        return (
            <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
            <Row>

                <Col className="col_reportes" >
                { !hideIndividualForRole && (
                    item.revisado_profesional === true ?
                    (
                        <Row className={
                            item.id_rol_creador === 3
                            ? "col_reportes_hover_profesional_block" :
                            "col_reportes_hover_block"
                        }>

                        {
                            item.hora_inicio ?
                            (
                            <Col onClick={handleShow}>
                                Seguimiento individual : {item.fecha} 
                                { item.revisado_practicante === true ? 
                                <b>✔</b>: <b></b>}
                            </Col>
                            )
                            :
                            (
                            <Col onClick={handleShow2}>
                                Inasistencia : {item.fecha}
                                { item.revisado_practicante === true ? 
                                <b>✔</b>: <b></b>}
                            </Col>
                            )
                        }
                        </Row>
                    ):
                    (
                        <Row className={
                            item.id_rol_creador === 3
                            ? "col_reportes_profesional"
                            : "col_reportes_hover"
                        }>

                        {
                            item.hora_inicio ?
                            (
                            <Col onClick={handleShow}>
                                Seguimiento individual : {item.fecha} 
                                { item.revisado_practicante === true ? 
                                <b>✔</b>: <b></b>}
                            </Col>
                            )
                            :
                            (
                            <Col onClick={handleShow2}>
                                Inasistencia : {item.fecha}
                                { item.revisado_practicante === true ? 
                                <b>✔</b>: <b></b>}
                            </Col>
                            )
                        }
                        </Row>
                    )
                )}
                </Col>
                
               {itemFecha < fechaReferencia ? (
                    <>
                        <Seguimiento_inasistencia 
                            recarga_ficha_estudiante={true} 
                            show={show2} 
                            onHide={handleCloseIn} 
                            handleCloseIn={handleCloseIn} 
                            item={item} 
                            size="lg" 
                        />
                        <Seguimiento_individual 
                            recarga_ficha_estudiante={true} 
                            show={show} 
                            onHide={handleClose} 
                            handleClose={handleClose} 
                            item={item} 
                            size="lg" 
                        />
                    </>
                ) : itemFecha < fechaReferenciaV3 ? (
                    <>
                        <Seguimiento_inasistencia  
                            recarga_ficha_estudiante={true} 
                            show={show2} 
                            onHide={handleCloseIn} 
                            handleCloseIn={handleCloseIn} 
                            item={item} 
                            size="lg" 
                        />
                        <Seguimiento_individual_edit_v2 
                            recarga_ficha_estudiante={true} 
                            show={show} 
                            onHide={handleClose} 
                            handleClose={handleClose} 
                            item={item} 
                            size="lg" 
                        />
                    </>
                ) : (
                    <>
                        <Seguimiento_inasistencia  
                            recarga_ficha_estudiante={true} 
                            show={show2} 
                            onHide={handleCloseIn} 
                            handleCloseIn={handleCloseIn} 
                            item={item} 
                            size="lg" 
                        />
                        <Seguimiento_individual_edit_v3  
                            recarga_ficha_estudiante={true} 
                            show={show} 
                            onHide={handleClose} 
                            handleClose={handleClose} 
                            item={item} 
                            size="lg" 
                        />
                    </>
                )}
            </Row>
            }</>
        )
    }
    
    
}

export default Desplegable_item


