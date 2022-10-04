import React, {useState} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
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
                        {Socioeducativa.map((item, index)=>(
                        <Row>
                            {
                                item.subNav?
                                (<DropdownItem key={index} className="link" activeclassName="active" 
                                        onMouseLeave ={() => activeTab(0)} onMouseEnter ={() => activeTab(item.id)}>
                                    <Row key={index} >
                                        <Row className="icon"><i Class="FaThList"></i></Row>
                                        <Row style={{display: isOpen ? "block" : "none"}}  className="link_text" >{item.name}</Row>
                                    </Row>
                                    <Row>
                                        {item.subNav && isOpen && (item.id === activeTabIndex)  && item.subNav.map((item, index)=>(
                                            <NavLink to={item.path} key={index} className="subLink" activeclassName="active" >
                                                <Row className="link_text">{item.name}</Row>
                                            </NavLink>
                                        ) )
                                        }
                                    </Row>
                                </DropdownItem>)
                                :
                                (<Row key={index} className="opcion_simple_separador">
                                    <NavLink to={item.path} className="opcion_simple" >{item.icon} 
                                    </NavLink>
                                    <NavLink to={item.path} style={{display: isOpen ? "block" : "none"}} className="opcion_simple" >{item.name}
                                    </NavLink>
                                </Row>)
                            }
                        </Row>
                        ))}
                </Row>
                
*/

const SideBar = ({children}) =>{

    const[nombreUsuario] = useState("nombre  ");
    const[rolUsuario] = useState("monitor");

    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    


    return (
        <Container className="containerSidebar">
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
                    <NavBar tamaño={isOpen} nombre={nombreUsuario} rol={rolUsuario}></NavBar>
                </Row>

                <main style={{marginLeft: isOpen ? "300px" : "50px"}}>{children}<Footer></Footer></main>

        </Container>
    )
}

export default SideBar 