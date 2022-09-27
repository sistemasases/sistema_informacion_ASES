import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../components/reporte_seguimientos/cabecera";
import Tabla_sin_seguimientos from "../components/sin_seguimientos/tabla_sin_seguimientos";


const Sin_seguimientos = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        
        <Container >
            <Row className="containerRow">
                <Tabla_sin_seguimientos></Tabla_sin_seguimientos>
            </Row>

        </Container>
    )
}

export default Sin_seguimientos 