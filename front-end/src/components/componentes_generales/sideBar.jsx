import React, {useState} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from './navbar';
import Menu from './socioeducativa.json';
import SidebarItem from './sidebarItem';
import Footer from './footer';
import Sidebar_item_closed from './sidebar_item_closed';
import {Scrollbars} from 'react-custom-scrollbars'; 


/*
<Row style={{width: isOpen ? "300px" : "70px"}} className="sideBar">
                    <Row className="top_selection">
                        <Row  className="bars">
                            <FaBars onClick={toggle}/>
                        </Row>
                    </Row>
                <Scrollbars className="scrollbar_sidebar">
                    {
                        isOpen ?
                        (<div className="sidebar_item">
                            { Menu.map((item, index) => <SidebarItem key={index} item={item}/>) }
                        </div>)
                        :
                        (<div className="sidebar_item">
                        { Menu.map((item, index) => <Sidebar_item_closed key={index} item={item} />) }
                        </div>)
                    }
                </Scrollbars>

                </Row>
                
                
                <Row>
                    <NavBar tamaño={isOpen} nombre={props.usuario} rol={props.rolUsuario}></NavBar>
                </Row>

                <main style={{marginLeft: isOpen ? "300px" : "50px"}}>
                    {props.children}
                    <Footer></Footer>
                </main>
*/

const SideBar = (props) =>{




    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    let location = useLocation();

    console.log("childre : ")
    console.log(props.children)

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
                                {
                                    isOpen ?
                                    (<div className="sidebar_item">
                                        { Menu.map((item, index) => <SidebarItem key={index} item={item}/>) }
                                    </div>)
                                    :
                                    (<div className="sidebar_item">
                                    { Menu.map((item, index) => <Sidebar_item_closed key={index} item={item} />) }
                                    </div>)
                                }
                            </Scrollbars>

                        </Row>
                    )
                    :
                    (
                    <div  class="d-none d-md-block">
                        <Row style={{width: isOpen ? "250px" : "70px"}} className="sideBar">
                            
                            <Scrollbars className="scrollbar_sidebar">
                                {
                                    isOpen ?
                                    (<div className="sidebar_item">
                                        { Menu.map((item, index) => <SidebarItem key={index} item={item}/>) }
                                    </div>)
                                    :
                                    (<div className="sidebar_item">
                                    { Menu.map((item, index) => <Sidebar_item_closed key={index} item={item} />) }
                                    </div>)
                                }
                            </Scrollbars>

                        </Row>
                    </div>
                    )
                }
                
                
                
                <Row className="row_navbar">
                    <NavBar tamaño={isOpen} nombre={props.usuario} rol={props.rolUsuario}></NavBar>
                </Row>
                <div  class="d-none d-md-block">
                    <Col className="inf_der">
                        <main style={{marginLeft: isOpen ? "280px" : "50px"}, {marginTop: "5rem"}}>
                            {props.children}
                        </main>
                    </Col>
                </div>

                <div  class="d-block d-md-none">
                    <Col className="inf_der">
                        <main style={ {marginTop: "4rem"}}>
                            {props.children}
                        </main>
                    </Col>
                </div>
                <Col className="row_footer">
                    <Footer></Footer>
                </Col>
        </Container>
    )
}

export default SideBar 