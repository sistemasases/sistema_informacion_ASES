import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Info_basica = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container>
            <Row>
                <Row className="row1">
                    <Col className="col1">
                        
                        <Row>
                            <Select options={options} />
                        </Row>

                        <Row className="rowJustFlex">
                            <Col className="colInfo1">
                                <Row className="infoRow1">
                                    <Col className="info">
                                        <Select options={options} className="justMargin1" />
                                    </Col >  
                                    <Col className="info">
                                        <h4>cedula </h4>
                                        <h4>1007619729 </h4>
                                    </Col>
                                    <Col className="info">
                                        <h4>antiguedad </h4>
                                        <h4>1007619729 </h4>
                                    </Col>
                                    <Col className="info">
                                        <h4>correo </h4>
                                        <h4>1007619729 </h4>
                                    </Col>
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
                        <Row>
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
                        <Button className="buttonRiesgos">individual</Button> 
                        <Button className="buttonRiesgos">familiar</Button>
                        <Button className="buttonRiesgos">academico</Button> 
                        <Button className="buttonRiesgos">econocmico</Button>
                        <Button className="buttonRiesgos">vida Univ.</Button> 
                        <Button className="buttonRiesgos">Geografico</Button>
                    </Col>
                    <Col> <Button>Trayextoria</Button> </Col> 
                </Row>
            </Row>
        </Container>
    )
}

export default Info_basica 