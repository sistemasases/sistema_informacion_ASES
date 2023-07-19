import React, {useState} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaBars} from "react-icons/fa";
import NavBar from './navbar';
import Menu from './sistemas.json';
import Menu2 from './socioeducativa.json';
import Menu3 from './academico.json';
import Menu4 from './icetex.json';
import Menu5 from './discapacidad.json';
import Ficha_estudiante from "../../modulos/ficha_estudiante/ficha_estudiante.jsx";

import SidebarItem from './sidebarItem';
import Footer from './footer';
import Sidebar_item_closed from './sidebar_item_closed';
import {Scrollbars} from 'react-custom-scrollbars'; 




const SideBar = (props) =>{

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);


    const outSideClick=(e)=>{
        if(isOpen==true){
            setIsOpen(false)
        }
    }

    const [state,set_state] = useState({
        desplegable : sessionStorage.rol === 'superAses' ? Menu : Menu2
      })


        


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
                
                <Footer></Footer>
        </Container>
    )
}

export default SideBar 