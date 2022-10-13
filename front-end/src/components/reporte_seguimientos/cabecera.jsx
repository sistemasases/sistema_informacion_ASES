import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'y', label: 'x' }
      ]
  

const Cabecera = (props) =>{

    return (
        <Container>
            <Row className="row_presentacion_reportes_seguimientos">
                <Row className="row_selectores_reportes_seguimientos">
                    <Col className="col_selectores_reportes_seguimientos">
                        <h1>Seguimientos   {props.usuario}</h1>
                    </Col>
                    {
                        props.area === '1' ?
                        (<Col className="col_selectores_reportes_seguimientos">
                            periodo actuals
                            <Select  defaultValue={props.area} defaultInputValue={"texto"} isDisabled={true}>
                            </Select>
                            <Select  defaultValue={props.area} defaultInputValue={props.area} opti>
                            </Select>
                        </Col>)
                        :
                        (<Col className="col_selectores_reportes_seguimientos"> 
                            <Select options={options}>
                                <label>siiiii</label>
                            </Select>
                        </Col>)
                    }
                    
                    <Col className="col_selectores_reportes_seguimientos">
                        Selector persona
                        <Select></Select>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Cabecera 


















