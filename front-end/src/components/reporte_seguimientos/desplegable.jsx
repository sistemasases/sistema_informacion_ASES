import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';

/*
Tabla Conteo de Seguimientos:
- codigo
- Nombres
- Apellidos
- documento
- Conteos
--- Fichas normales
--- Fichas de inasistencias
----Total conteos
- Profesional
- Practicante
- Monitor
*/



const Desplegable = () =>{

    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const[activeSubTabIndex, setSubActiveTabIndex] = useState(0);
    const activeSubTab = (index)=> setSubActiveTabIndex(index);

    const[activeSubSubTabIndex, setSubSubActiveTabIndex] = useState(0);
    const activeSubSubTab = (index)=> setSubSubActiveTabIndex(index);

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const menuItem=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
            cursos:true,
            subItem:[
                {
                    id:1,
                    subSubItem:[
                        {
                            id:1,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id:2,
            path:"/ficha_estudiante",
            name:"fichaDeEstudiante",
            icon:<FaThList />,
            cursos:true,
            subItem:[
                {   
                    id:1,
                    subSubItem:[
                        {   
                            id:1,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                            
                        },
                        {
                            id:2,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                        }
                    ]
                },
                {
                    id:2,
                    subSubItem:[
                        {   
                            id:1,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                        },
                        {
                            id:2,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id:3,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
            cursos:false,
            subItem:[
                {
                    id:1,
                    subSubItem:[
                        {
                            id:1,
                            datos:[
                                {
                                path:"/ficha_estudiante",
                                name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                                icon:<FaThList />,}
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <Container >

                <Row className="row_fondo_gris">
                    <Row>
                    <Row className="row_contenido_periodos_reporte_seguimientos">
                    {
                        menuItem.map((item, index)=>(
                        <Row className="row_contenido_periodos_reporte_seguimientos2">
                            <DropdownMenu  key={index} className="link_reporte_seguimientos"
                                    onClick ={() => activeTab(item.id)}>
                                <Row className="link_text_reporte_seguimientos" >
                                    <Col className="col_link_text_reporte_seguimientos_nombre"> NOMBRE
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_spans"> 
                                        <Row className="row_card_content_flex">
                                            Span 
                                        </Row>
                                        <Row className="row_card_content_flex">
                                            Span 
                                        </Row>
                                    </Col>
                                    <Col className="col_link_text_reporte_seguimientos_info"> DESPLEGAR
                                    </Col>
                                </Row>
                                <Row className="row_contenido_periodos_reporte_seguimientos2" >
                                    {!(item.subItem) ?
                                        (<Row></Row>)
                                    : (
                                        (item.id === activeTabIndex) ?
                                        
                                            (
                                                <Row>
                                                    {item.subItem.map((item, index) => (
                                                    <DropdownMenu key={index} className="link_reporte_seguimientos"
                                                        onClick ={() => activeSubTab(item.id)}>
                                                        <Row className="link_text_reporte_seguimientos" >
                                                            <Col className="col_link_text_reporte_seguimientos_nombre"> NOMBRE
                                                            </Col>
                                                            <Col className="col_link_text_reporte_seguimientos_spans"> 
                                                                <Row className="row_card_content_flex">
                                                                    Span 
                                                                </Row>
                                                                <Row className="row_card_content_flex">
                                                                    Span 
                                                                </Row>
                                                            </Col>
                                                            <Col className="col_link_text_reporte_seguimientos_info"> DESPLEGAR
                                                            </Col>
                                                        </Row>

                                                        <Row className="row_contenido_periodos_reporte_seguimientos2"  >
                                                            {item.subSubItem ? 
                                                            (
                                                                (item.id === activeSubTabIndex) ? 
                                                                (<Row>
                                                                    {item.subSubItem.map((item, index) => 
        
                                                                        (<DropdownMenu key={index} className="link_reporte_seguimientos" 
                                                                                onClick ={() => activeSubSubTab(item.id)}>
                                                                            <Row className="link_text_reporte_seguimientos" >
                                                                                <Col className="col_link_text_reporte_seguimientos_nombre"> NOMBRE
                                                                                </Col>
                                                                                <Col className="col_link_text_reporte_seguimientos_spans"> 
                                                                                    <Row className="row_card_content_flex">
                                                                                        Span 
                                                                                    </Row>
                                                                                    <Row className="row_card_content_flex">
                                                                                        Span 
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col className="col_link_text_reporte_seguimientos_info"> DESPLEGAR
                                                                                </Col>
                                                                            </Row>

                                                                            <Row>
                                                                                {item.id === activeSubSubTabIndex ?
                                                                                    (<Row>
                                                                                        <Row className="row_flex_reporte_seguimientos">
                                                                                            <Col className="col_contenido_reporte_seguimientos1">Materia</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos1">Codigo</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos1">Nota</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos1">Creditos</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos1">Cancela</Col>
                                                                                        </Row>
                                                                                        { item.datos.map((item, index)=>(
                                                                                        <Row className="row_flex_reporte_seguimientos">
                                                                                            <Col className="col_contenido_reporte_seguimientos2">{item.icon}</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos2">{item.icon}</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos2">{item.icon}</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos2">{item.icon}</Col>
                                                                                            <Col className="col_contenido_reporte_seguimientos2">{item.icon}</Col>
                                                                                        </Row>
                                                                                        ))
                                                                                        }
                                                                                    </Row>)
                                                                                    :
                                                                                    (<Row></Row>)
                                                                                } 
                                                                            </Row>

                                                                        </DropdownMenu>
                                                                        )
        
                                                                    )}
                                                                </Row>
                                                                )
                                                                :
                                                                (<Row></Row>)
                                                            ) 
                                                            : 
                                                            (<Row></Row>)
                                                            }
                                                        </Row>

                                                    </DropdownMenu>
                                                    ))
                                                    }
                                                </Row>
                                        
                                            )

                                            : (<Row></Row>)
                                    )
                                    }
                                </Row>
                            </DropdownMenu>
                        </Row>
                            ))
                        }
                    </Row>
                    </Row>
                </Row>


        </Container>
    )
}

export default Desplegable 


















