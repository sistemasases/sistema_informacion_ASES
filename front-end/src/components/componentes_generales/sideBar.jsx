import React, {useState} from 'react';
import Select from 'react-select';

import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import NavBar from './navbar';

const SideBar = ({children}) =>{

    const[nombreUsuario] = useState("nombre  ");
    const[rolUsuario] = useState("monitor");

    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    const sistemas=[
        {
            id:1,
            path:"/",
            name:"sistemas",
            icon:<FaRegChartBar />,
            subNav:[
                {
                    path:"/ficha_estudiante",
                    name:"carga de archivos",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"carga de historicos",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"carga masiva",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"carga masiva database",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gestion de incidencias",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gistion de instancia",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gestion de permiso",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gestion de periodos",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gestion de usuarios",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte backup",
                    icon:<FaThList />,
                }
            ]
        },
        {
            id:2,
            path1:"/ficha_estudiante",
            name:"socieducativo",
            icon:<FaThList />,
            subNav:[
                {
                    path:"/sin_seguimientos",
                    name:"estudiantes sin seguimeintos",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"ficha de estudiantes",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"ficha de monitores",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"gestion de asignaciones",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte geogradico Ases",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte formularios",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte de desercion",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte general",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte grafico ASES",
                    icon:<FaThList />,
                },
                {
                    path:"/reporte_seguimientos",
                    name:"reporte de seguimientos",
                    icon:<FaThList />,
                }
                ,
                {
                    path:"/ficha_estudiante",
                    name:"reporte grupal",
                    icon:<FaThList />,
                }
            ]
        },
        {
            id:3,
            path:"/",
            name:"academico",
            icon:<FaThList />,
            subNav:[
                {
                    path:"/ficha_estudiante",
                    name:"carga de notas",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"inscripcion a monitorias academicas",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"monitorias academicas",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"registro de notas",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reportes historicos academicos",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reportes notas por items",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reportes por docentes",
                    icon:<FaThList />,
                }
            ]
        },
        {
            id:4,
            path:"/",
            name:"ICETEX/MEN",
            icon:<FaThList />,
            subNav:[
                {
                    path:"/ficha_estudiante",
                    name:"reporte MEN",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reportes ICETEX",
                    icon:<FaThList />,
                }
            ]
        },
        {
            id:5,
            path:"/",
            name:"discapacidad",
            icon:<FaThList />,
            subNav:[
                {
                    path:"/ficha_estudiante",
                    name:"registrar nuevo estudiante",
                    icon:<FaThList />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"reporte discapacidad e inclusion",
                    icon:<FaThList />,
                }
            ]
        },
    ]

    const socieducativa=[
        {
            id:1,
            path:"/sin_seguimientos",
            name:"estudiantes sin seguimeintos",
            icon:<FaThList />,
        },
        {
            id:2,
            path:"/ficha_estudiante",
            name:"ficha de estudiantes",
            icon:<FaThList />,
        },
        {
            id:3,
            path:"/ficha_estudiante",
            name:"ficha de monitores",
            icon:<FaThList />,
        },
        {
            id:4,
            path:"/ficha_estudiante",
            name:"gestion de asignaciones",
            icon:<FaThList />,
        },
        {
            id:5,
            path:"/ficha_estudiante",
            name:"reporte geogradico Ases",
            icon:<FaThList />,
        },
        {
            id:6,
            path:"/ficha_estudiante",
            name:"reporte formularios",
            icon:<FaThList />,
        },
        {
            id:7,
            path:"/ficha_estudiante",
            name:"reporte de desercion",
            icon:<FaThList />,
        },
        {
            id:8,
            path:"/ficha_estudiante",
            name:"reporte general",
            icon:<FaThList />,
        },
        {
            id:9,
            path:"/ficha_estudiante",
            name:"reporte grafico ASES",
            icon:<FaThList />,
        },
        {
            id:10,
            path:"/ficha_estudiante",
            name:"reporte de seguimientos",
            icon:<FaThList />,
        }
        ,
        {
            id:11,
            path:"/ficha_estudiante",
            name:"reporte grupal",
            icon:<FaThList />,
        }
    ]


    return (
        <Container className="containerSidebar">
                <Row style={{width: isOpen ? "300px" : "50px"}} className="sideBar">
                    <Row className="top_selection">
                        <Row  className="bars">
                            <FaBars onClick={toggle}/>
                        </Row>
                    </Row>
                        {socieducativa.map((item, index)=>(
                        <Row>
                            {
                                item.subNav?
                                (<DropdownItem key={index} className="link" activeclassName="active" 
                                        onMouseLeave ={() => activeTab(0)} onMouseEnter ={() => activeTab(item.id)}>
                                    <Row key={index} >
                                        <Row className="icon">{item.icon} </Row>
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
                <Row>
                    <NavBar tamaño={isOpen} nombre={nombreUsuario} rol={rolUsuario}></NavBar>
                </Row>
                <main style={{marginLeft: isOpen ? "300px" : "50px"}}>{children}</main>
            
        </Container>
    )
}

export default SideBar 