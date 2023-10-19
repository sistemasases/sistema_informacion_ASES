import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown, Button, Modal} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaBars} from "react-icons/fa";
import NavBar from './navbar';
import Menu from './menus/sistemas.json';
import Menu2 from './menus/socioeducativa.json';
import Menu3 from './menus/academico.json';
import Menu4 from './menus/monitor.json';
import Menu5 from './menus/dir_investigacion.json';
import Menu6 from './menus/ente_academico.json';
import Menu7 from './menus/sin_rol.json';
import Menu8 from './menus/practicante.json';
import Menu9 from './menus/profesor.json';
import Ficha_estudiante from "../../modulos/ficha_estudiante/ficha_estudiante.jsx";
import SidebarItem from './sidebarItem';
import Footer from './footer';
import Sidebar_item_closed from './sidebar_item_closed';
import {Scrollbars} from 'react-custom-scrollbars'; 
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import close_session from '../../service/close_session';


const SideBar = (props) =>{

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);


    const outSideClick=(e)=>{
        if(isOpen==true){
            setIsOpen(false)
        }
    }

    const [state,set_state] = useState({
        desplegable : desencriptar(sessionStorage.rol) === 'sistemas' || desencriptar(sessionStorage.rol) === 'super_ases' ? Menu : 
        desencriptar(sessionStorage.rol) === 'socioeducativo_reg' || desencriptar(sessionStorage.rol) === 'profesional' || desencriptar(sessionStorage.rol) === 'socioeducativo' ? Menu2 :
        desencriptar(sessionStorage.rol) === 'dir_academico' ? Menu3 : 
        desencriptar(sessionStorage.rol) === 'monitor' ? Menu4 :
        desencriptar(sessionStorage.rol) === 'dir_investigacion' ? Menu5 : 
        desencriptar(sessionStorage.rol) === 'practicante' ? Menu8 : 
        desencriptar(sessionStorage.rol) === 'dir_programa' || desencriptar(sessionStorage.rol) === 'vcd_academico' ? Menu6 :
        desencriptar(sessionStorage.rol) === 'profesor' ? Menu9 : Menu7
      })

    function path_actual(name){
        set_state({
          ...state,
          path_actual : name,
        })
      }

    const [data, setData] = useState(
        {refreshtoken: desencriptar(sessionStorage.getItem('refresh-token'))}
    )
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        close_session.close_session()
        setShow(false);
    }

    const handleContinue = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/refresh`, data)
        .then(res => {
            sessionStorage.setItem('token', res.data.token);
            setShow(false);
        })
        .catch(err => {
            window.alert('Ocurrió un error, debes ingresar nuevamente');
            handleClose();
        })
    }

    const config = {
        headers: {
              Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        }
    };

    const tiempoEspera = 1 * 1 * 60 * 1000;

    const token = {
        "token": sessionStorage.getItem('token')
    }

    setTimeout(async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/validate`, token, config)
        .then(res=>{
            if (res.data['hours'] < 1) {
                handleShow()
            }
        })
        .catch(err => {
            window.alert('Ocurrió un error, debes ingresar nuevamente');
            close_session.close_session()
        })
    }, tiempoEspera);

    return (
        <Container className="containerSidebar">
                <Row className="top_selection">
                    <FaBars onClick={toggle}/>
                </Row>
                {
                    isOpen ?
                    (
                        <Row style={{width: isOpen ? "250px" : "70px"}} className="sideBar">
                            <Scrollbars className="scrollbar_sidebar">
                                <div className="sidebar_item">
                                    { state.desplegable.map((item, index) => <SidebarItem key={index} item={item}
                                    />) }
                                </div>
                            </Scrollbars>
                        </Row>
                    )
                    :
                    (
                    <div  class="d-none d-md-block">
                        <Row style={{width: isOpen ? "250px" : "70px"}} className="sideBar">
                            <Scrollbars className="scrollbar_sidebar">
                                <div className="sidebar_item">
                                    { state.desplegable.map((item, index) => <Sidebar_item_closed key={index} item={item}
                                    />) }
                                </div>
                            </Scrollbars>
                        </Row>
                    </div>
                    )
                }
                
                
                
                <Row className="row_navbar">
                    <NavBar tamaño={isOpen} nombre={props.usuario} rol={props.rolUsuario} ></NavBar>
                </Row>
                <div  class="d-none d-md-block">
                    <Row className="inf_der">
                        <main style={{marginLeft: isOpen ? "230px" : "50px", marginTop: "5rem",}} onClick={outSideClick}>
                            {props.children}
                        </main>
                    </Row>
                </div>

                <div  class="d-block d-md-none">
                    <Row className="inf_der">
                        <main style={ {marginTop: "4rem"}}>
                            {props.children}
                        </main>
                    </Row>
                </div>

                <div>
                    <Modal show={show}>
                        <Modal.Header>
                        <Modal.Title>Tiempo de sesión expirada</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        Su tiempo en la sesión ya expiró
                        <br/>
                        ¿Desea continuar con la sesión?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={handleContinue}>
                            Sí
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
                <Footer></Footer>
        </Container>
    )
}

export default SideBar 