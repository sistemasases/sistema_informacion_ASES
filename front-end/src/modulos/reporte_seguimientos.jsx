import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../components/reporte_seguimientos/cabecera";
import Informacion_rol from "../components/reporte_seguimientos/informacion_rol";


const Reporte_seguimientos = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        
        <Container className="container_reportes_seguimientos">
            <Row className="containerRow">
                <Cabecera></Cabecera>
                <Informacion_rol></Informacion_rol>
            </Row>

        </Container>
    )
}

export default Reporte_seguimientos 