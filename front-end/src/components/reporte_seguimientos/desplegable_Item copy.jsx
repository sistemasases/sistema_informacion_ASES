import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Seguimiento_individual from '../seguimiento_forms/form_seguimiento_individual_sin_boton';

const Desplegable_item = ({item}) => {

    const [open, setOpen] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log("item datos : "+item.datos)

    if(item.nombre){
        return (
            <Row className="periodo_activo_o_no">
                        {item.Actual ? 
                        (<Col>El periodo se encuentra en curso</Col>)
                            :
                        (<Col>El periodo esta finalizado</Col>)}
            </Row>
        )
    } else{
        return (
            <Row>
                <Col className="col_reportes" >
                    <Row className="col_reportes_hover">
                        <Col onClick={handleShow}>                            
                            {item.fecha}
                        </Col>
                    </Row>
                </Col>

<<<<<<< HEAD
                <Seguimiento_individual show={show} onHide={handleClose} handleClose={handleClose} size="lg" item={item}/>
=======
                <Seguimiento_individual item ={item} show={show} onHide={handleClose} handleClose={handleClose} size="lg"/>
>>>>>>> fdb736b8ba27ed665ac1a4435312c60fda64adee
            </Row>
        )
    }
    
    
}

export default Desplegable_item



