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
import Ficha_estudiante from "../../modulos/ficha_estudiante/ficha_estudiante.jsx";
import SidebarItem from './sidebarItem';
import Footer from './footer';
import Sidebar_item_closed from './sidebar_item_closed';
import {Scrollbars} from 'react-custom-scrollbars'; 
import axios from 'axios';



const SideBar = (props) =>{

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);


    const outSideClick=(e)=>{
        if(isOpen==true){
            setIsOpen(false)
        }
    }

    const [state,set_state] = useState({
        desplegable : sessionStorage.rol === 'sistemas' || sessionStorage.rol === 'super_ases' ? Menu : 
        sessionStorage.rol === 'socioeducativo_reg' || sessionStorage.rol === 'profesional' || sessionStorage.rol === 'socioeducativo' ? Menu2 :
        sessionStorage.rol === 'dir_academico' ? Menu3 : 
        sessionStorage.rol === 'monitor' ? Menu4 :
        sessionStorage.rol === 'dir_investigacion' ? Menu5 : 
        sessionStorage.rol === 'practicante' ? Menu8 : 
        sessionStorage.rol === 'dir_programa' || sessionStorage.rol === 'vcd_academico' ? Menu6 : Menu7
      })

    function path_actual(name){
        set_state({
          ...state,
          path_actual : name,
        })
      }

    const [data, setData] = useState(
        {refreshtoken: sessionStorage.getItem('refresh-token')}
    )
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh-token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('instancia');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('nombre_completo');
        sessionStorage.removeItem('instancia_id');
        sessionStorage.removeItem('rol');
        sessionStorage.removeItem('semestre_actual');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('message');
        sessionStorage.removeItem('sede_id');
        sessionStorage.removeItem('sede');
        sessionStorage.removeItem('lastVisitedRoutes');
        sessionStorage.removeItem('id_estudiante_seleccionado');
        setShow(false);
        window.location.reload();
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
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };

    const tiempoEspera = 1 * 1 * 60 * 1000;

    const timeoutId = setTimeout(async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/wizard/instancia/`, config).then(res=>{})
        .catch(err => {
            handleShow()
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