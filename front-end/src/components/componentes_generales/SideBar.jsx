import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const SideBar = ({children}) =>{

    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    
    const[subNav, setSubNav] = useState(false);
    const showSubNav = () => setSubNav(!subNav);

    const menuItem=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
            thisIsOpen:false,
            subNav:[
                {
                    path:"/fichaDeEstudiante",
                    name:"fichaDeEstudiante",
                    icon:<FaThList />,
                },
                {
                    path:"/carga_masiva",
                    name:"Carga Masiva",
                    icon:<FaThList />,
                },
                {
                    path:"/gestion_usuario_rol",
                    name:"Gestion Usuario Rol",
                    icon:<FaThList />,
                },
            ]
        },
        {
            id:2,
            path:"/fichaDeEstudiante",
            name:"fichaDeEstudiante",
            icon:<FaThList />,
            thisIsOpen:false,
            subNav:[
                {   
                    path:"/",
                    name:"Analitics",
                    icon:<FaRegChartBar />,
                },
                {
                    path:"/fichaDeEstudiante",
                    name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                    icon:<FaThList />,
                },
                {   
                    path:"/",
                    name:"Analitics",
                    icon:<FaRegChartBar />,
                },
                {
                    path:"/fichaDeEstudiante",
                    name:"fichaDeEstudiante",
                    icon:<FaThList />,
                }
            ]
        }
    ]



    return (
        <Container className="containerSidebar">
                <Row style={{width: isOpen ? "300px" : "50px"}} className="sideBar">
                    <Row className="top_selection">
                        <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                        <Row style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                            <FaBars onClick={toggle}/>
                        </Row>
                    </Row>
                    {
                        menuItem.map((item, index)=>(
                            <DropdownItem  key={index} className="link" activeclassName="active" 
                                        onMouseLeave ={() => activeTab(0)} onMouseEnter ={() => activeTab(item.id)}>
                                <Row className="icon" >{item.icon} </Row>
                                <Row style={{display: isOpen ? "block" : "none"}}  className="link_text" >{item.name}</Row>
                                <Row>
                                    {isOpen && (item.id === activeTabIndex)  && item.subNav.map((item, index)=>(
                                        <NavLink to={item.path} key={index} className="subLink" activeclassName="active" >
                                            <Row className="link_text">{item.name}</Row>
                                        </NavLink>
                                    ) )
                                    }
                                </Row>
                            </DropdownItem>
                        ))
                    }
                </Row>

                <main style={{marginLeft: isOpen ? "300px" : "50px"}}>{children}</main>
            
        </Container>
    )
}

export default SideBar 