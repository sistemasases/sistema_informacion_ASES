import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";

import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const NavBar = (props) =>{
    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    const menuOptions=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
        },
        {
            id:2,
            path:"/ficha_estudiante",
            name:"fichaDeEstudiante aiiiiiiiiiiiiiiii",
            icon:<FaThList />,
            thisIsOpen:true,
        }
    ]
    return (
    <Container  >
        <Row className="nav">

            <Col xs={"0"} md={"3"} >
                <Row>site name</Row>
            </Col>


            <Col className="ulDropdown" xs={"4"} md={"6"}>            
                <ul>
                    <li>
                        <a >{props.nombre}</a>
                        <a >{props.rol}</a>
                    </li>

                </ul>
            </Col>


            <Col className="boton_perfil" xs={"8"} md={"3"}>
                <Row>
                    <Col xs={"8"} className="info_perfil">
                        <Row>primera linea</Row>
                        <Row>segunda linea</Row>
                    </Col>
                    <Col xs={"4"} className="desplegable_usuario">
                        <Dropdown isOpen={isOpen} onClick={toggle} className="dropdown">
                                <DropdownToggle className="boton_usuario"><i className="boton_usuario" class="bi bi-person-circle"/></DropdownToggle>
                                <DropdownMenu>
                                    <ul className="ulDropdown">
                                        <li>
                                            { isOpen && menuOptions.map((item, index)=>(
                                            <NavLink className="linkDropdown" activeclassName="active" to={item.path} key={index}>
                                                {item.name}
                                            </NavLink>
                                            ) )
                                            }
                                        </li>
                                    </ul>
                                </DropdownMenu>
                    </Dropdown>
                    </Col>
                </Row>    
            </Col>

        </Row>
            
            
    </Container>
    )
}

export default NavBar 