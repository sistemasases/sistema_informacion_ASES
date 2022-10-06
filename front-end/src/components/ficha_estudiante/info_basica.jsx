import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Selector_estudiantes from "../componentes_generales/selector_estudiantes"


const Info_basica = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'y', label: 'x' }
    ]

    return (
        <Container>
            <Row className="info_basica_borde">
                <Row className="row1">
                    <Col className="col1">
                        <Row>
                            <Select options={options}/>
                        </Row>

                        <Row className="rowJustFlex">
                            <Col className="colInfo1">
                                <Row className="infoRow1">
                                    <Col className="info_basica_selector">
                                        <Select options={options} className="justMargin1" />
                                    </Col>  
                                    <Row className="info"> 
                                        <Col className="info_texto">
                                            <h4>201742505 </h4>
                                        </Col>
                                        <Col className="info_texto">
                                            <h4>jose.david.erazo@correounivalle.edu.co </h4>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="info">
                                        <Col className="info_texto">
                                            <h4>1007619729 </h4>
                                        </Col>
                                        <Col className="info_texto">
                                            <h4>3023675777 </h4>
                                        </Col>
                                    </Row>
                                    
                                </Row>

                                <Row className="infoRow2">
                                    <h4>Programas academicos </h4>
                                    <Col className="inforow23">
                                        <Row className="infoRow23">
                                            <h4>van los cuadros verdes </h4>
                                            <Select options={options} />
                                            <Switch onClick={handleChange}/>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="colInfo2">
                                <Row className="infoRow3">
                                    <h4>ICETEX </h4>
                                    <Select options={options} />
                                </Row>
                                <Row className="infoRow3">
                                    <h4>Cohortes </h4>
                                    <h4>Cohortes </h4>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col className="col2">
                        <Row>
                            <h2 className="justMargin2">ASES</h2>
                            <h1 className="justMargin2"><FaThList /></h1>
                        </Row>
                    </Col>

                    <Col className="col3">
                        <img src={"./imag1.jpg"}></img>
                        <h1>COL DE FOTO</h1>
                    </Col>
                </Row>

                <Row className="row2">
                    <Col className="colMarcados">
                        <Col><h3>Riesgos</h3></Col>
                        <Col className="rowJustFlex_column" >
                            <Col className="rowJustFlex_to_right" >
                                individual<Button className="buttonRiesgos"></Button> 
                            </Col>
                            <Col className="rowJustFlex_to_right">
                                familiar<Button className="buttonRiesgos"></Button>
                            </Col>
                        </Col>
                        <Col className="rowJustFlex_column">
                            <Col className="rowJustFlex_to_right">
                                academico<Button className="buttonRiesgos"></Button>
                            </Col> 
                            <Col className="rowJustFlex_to_right">
                                econocmico<Button className="buttonRiesgos"></Button>
                            </Col> 
                        </Col>
                        <Col className="rowJustFlex_column">
                            <Col className="rowJustFlex_to_right">
                                vida Univ.<Button className="buttonRiesgos"></Button> 
                            </Col>
                            <Col className="rowJustFlex_to_right">
                                Geografico<Button className="buttonRiesgos"></Button>
                            </Col>
                        </Col>
                        
                        
                        
                    </Col>
                    <Col> 
                        <Button className="generar_nuevo_reporte">Generar Nuevo Reporte</Button>
                    </Col> 
                </Row>
            </Row>
        </Container>
    )
}

export default Info_basica 