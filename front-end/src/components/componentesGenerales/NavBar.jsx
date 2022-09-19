import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const NavBar = () =>{
    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    const[menuOpen, setMenu] = useState(false);
    const showMenu = () => setMenu(!menuOpen);

    const menuOptions=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
        },
        {
            id:2,
            path:"/fichaDeEstudiante",
            name:"fichaDeEstudiante aiiiiiiiiiiiiiiii",
            icon:<FaThList />,
            thisIsOpen:true,
        }
    ]
    return (
    <Container className="nav">
            <Col>
                <a>Site name</a>
            </Col>
            <Col className="ulDropdown">            
                <ul>
                    <li>
                        <a >price 1</a>
                        <a >price 2</a>
                    </li>

                </ul>
            </Col>

            <Dropdown isOpen={isOpen} onClick={toggle} className="dropdown">
                        <DropdownToggle><FaBars/></DropdownToggle>
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
            
            
    </Container>
    )
}

export default NavBar 