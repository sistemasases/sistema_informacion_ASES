import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Info_general from "./tabs/info_general"
import Academico from "./tabs/academico"
import Socieducativa from "./tabs/socieducativa"
import Modal from 'react-bootstrap/Modal';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';

const Selector = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      usuario : '',
      data_user : [],
      data_rol : [],

      id_usuario:'',
      nombres:'',
      apellidos: '',
      cedula:'',
      correo:'',
      telefono:'',

    })



    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> 
    {
        index === activeTabIndex ?
        (setActiveTabIndex(0))
        :
        setActiveTabIndex(index)
        console.log("estos son los datos generales2")
                    console.log(props.datos)
    }


    const tabs=[
        {
            id:1,
            name:"GENERAL",
            contenido:"2siiiiiii",
            component:<Info_general id={props.id} seleccionado={props.seleccionado} datos={props.datos} rolUsuario={props.rolUsuario} editar={props.editar} codigo={props.codigo}/>,
        },
        {
            id:2,
            name:"HISTORIAL",
            contenido:"hola",
            component:<Socieducativa id={props.id} seleccionado={props.seleccionado} datos={props.datos} rolUsuario={props.rolUsuario} editar={props.editar} codigo={props.codigo}/>,
        },

    ]



    return (
        <Container className="containerSelector">

                {
                    props.seleccionado ==='' ?
                    (
                        <Row className="tabs" >
                                    {
                                    tabs.map((tab, index)=>(
                                        <Row className={tab.id === activeTabIndex ? "tab_separador" : "tab_bloqueado_externo"} >
                                            <Row onClick={handleShow}>
                                                <label key={index} classNmae="tab_bloqueado">
                                                    {tab.name}
                                                </label>
                                            </Row>
                                        </Row>
                                        
                                        ))
                                    }
                                </Row>
                    )
                    :
                    (
                        <Row className="tabs" >
                                    {
                                    tabs.map((tab, index)=>(
                                        <Col xs={"12"} className={tab.id === activeTabIndex ? "tab_separador" : "tabs_border"} >
                                            <Row onClick={() => activeTab(tab.id)}>
                                                <label key={index} className={tab.id === activeTabIndex ? "activeTab" : "tab"}>
                                                    {tab.name}
                                                </label>
                                            </Row>
                                            
                                            {
                                                (tab.id === activeTabIndex)?
                                                (
                                                
                                                <Row>
                                                    <div class="d-none d-md-block col-md-1">
                                                        <Col md={"1"}></Col>
                                                    </div>
                                                    <Col className="contentTab" xs={"12"} md={"10"}>{tabs[activeTabIndex-1].component}</Col>
                                                    <div class="d-none d-md-block col-md-1">
                                                        <Col md={"1"}></Col>
                                                    </div>
        
                                                </Row>)
                                                :
                                                (<Row></Row>)
                                            }
                                        
                                        </Col>
                                        
                                        ))
                                    }
                                    
                                </Row>
                    )
                    

                }

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Seleccione un monitor.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
        </Container>
    )
}

export default Selector 