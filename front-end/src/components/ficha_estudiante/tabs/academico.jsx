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


const Academico = () =>{

    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const menuItem=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
            cursos:false,
            subNav:[
                {
                    path:"/ficha_estudiante",
                    name:"fichaDeEstudiante",
                    icon:<FaThList />,
                }
            ]
        },
        {
            id:2,
            path:"/ficha_estudiante",
            name:"fichaDeEstudiante",
            icon:<FaThList />,
            cursos:true,
            subNav:[
                {   
                    path:"/",
                    name:"Analitics",
                    icon:<FaRegChartBar />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"fichaDeEstudiante siiiiiiiiiiiiiii",
                    icon:<FaThList />,
                },
                {   
                    path:"/",
                    name:"Analitics",
                    icon:<FaRegChartBar />,
                },
                {
                    path:"/ficha_estudiante",
                    name:"fichaDeEstudiante",
                    icon:<FaThList />,
                }
            ]
        }
    ]


    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container className="container_academico">

                <Row className="row_flex_full_line">
                    <Row className="row_titulo">
                        Resumen
                    </Row>
                    <Row className="row_flex">
                        <Col className="width_col">
                            Elemento cualificable
                        </Col>
                        <Col>
                            Cantidad
                        </Col>
                    </Row>
                    <Row className="row_flex">
                        <Col className="width_col">
                            Estud. con uno o más items perdidos
                        </Col>
                        <Col>
                            0
                        </Col >
                    </Row>
                    <Row className="row_flex"> 
                        <Col className="width_col">
                            Estud. con más items perdidos que ganados
                        </Col>
                        <Col>
                            0
                        </Col>
                    </Row>
                    <Row className="row_flex">
                        <Col className="width_col">
                            Total estudiantes ASES matriculados en cursos con calificaciones
                        </Col>
                        <Col>
                            0
                        </Col>
                    </Row>                   
                </Row>












                <Row className="row_flex_full_line">
                        <Row className="row_flex">
                            <Col className="row_flex_academico">
                                mostar
                                <Select>
                                    10
                                </Select> 
                                Registros
                            </Col>
                            <Col className="width_col">
                                Buscar
                            </Col>
                        </Row>
                      					
                        <Row className="row_flex_academico2" >
                            <Col className="width_col2">
                                Número de documento
                            </Col>
                            <Col className="width_col2">
                                Código
                            </Col >
                            <Col className="width_col2">
                                Apellidos
                            </Col>
                            <Col className="width_col2">
                                Nombres
                            </Col >
                            <Col className="width_col2">
                                # Items perdidos
                            </Col>
                            <Col className="width_col2" > 
                                # Items ganados
                            </Col >
                        </Row>
                        
                        <Row className="row_flex_academico2" > 
                            <Col className="width_col">
                                otro mapeo
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Row>






















                <Row className="row_flex" activeClassName="row_academico_card">
                    <Col className="col_contenido_Academico">
                        <h4>
                            Promedio Ponderado: 
                        </h4>
                        <h4>
                            Cantidad
                        </h4>
                    </Col>
                    <Col className="col_contenido_Academico">
                        <h4>
                            Estimulos academicos: 
                        </h4>
                        <h4>
                            Cantidad
                        </h4>
                    </Col>
                    <Col className="col_contenido_Academico">
                        <h4>
                            Bajos rendimientos: 
                        </h4>
                        <h4>
                            Cantidad
                        </h4>
                    </Col>
                </Row>

                <Row className="row_contenido_periodos_Academico">
                {
                        menuItem.map((item, index)=>(
                    <Row className="separador_academico">
                        <DropdownMenu  key={index} className="link_academico" activeclassName="active_academico" 
                                    onMouseLeave ={() => activeTab(0)} onMouseEnter ={() => activeTab(item.id)}>
                            <Row className="link_text_academico" >{item.name}</Row>
                            <Row className="row_contenido_periodos_Academico"  activeclassName="active_academico">
                                {!(item.cursos) ?
                                    (<Row className="row_academico_card">EL ESTUDIANTE NO REGISTRA CURSOS EN EL SEMESTRE ACTUAL</Row>)
                                : (
                                    (item.id === activeTabIndex) ?
                                    
                                        (
                                        <Row className="row_academico_card" activeclassName="active_academico">
                                            <Row>
                                                <Row className="row_flex_academico">
                                                    <Col className="col_contenido_Academico2">tecto 1</Col>
                                                    <Col className="col_contenido_Academico2">texto 2</Col>
                                                    <Col className="col_contenido_Academico2">texto 3</Col>
                                                </Row>
                                                <Row className="border_box">
                                                    <Row className="col_contenido_Academico3">
                                                        Texto de abajo
                                                    </Row>
                                                </Row>

                                            </Row>


                                            <Row>
                                                <Row className="row_flex_academico">
                                                    <Col className="col_contenido_Academico4">Materia</Col>
                                                    <Col className="col_contenido_Academico4">Codigo</Col>
                                                    <Col className="col_contenido_Academico4">Nota</Col>
                                                    <Col className="col_contenido_Academico4">Creditos</Col>
                                                    <Col className="col_contenido_Academico4">Cancela</Col>
                                                </Row>
                                                { item.subNav.map((item, index)=>(
                                                <Row className="row_flex_academico">
                                                    <Col className="col_contenido_Academico5">{item.icon}</Col>
                                                    <Col className="col_contenido_Academico5">{item.icon}</Col>
                                                    <Col className="col_contenido_Academico5">{item.icon}</Col>
                                                    <Col className="col_contenido_Academico5">{item.icon}</Col>
                                                    <Col className="col_contenido_Academico5">{item.icon}</Col>
                                                </Row>
                                                ))
                                                }
                                            </Row>
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
           
        </Container>
    )
}

export default Academico 