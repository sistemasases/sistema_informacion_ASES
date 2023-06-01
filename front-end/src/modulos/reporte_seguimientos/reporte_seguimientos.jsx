import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import Informacion_rol from "../../components/reporte_seguimientos/informacion_rol";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";


const Reporte_seguimientos = (props) =>{

    const userRole = sessionStorage.getItem('rol');

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    return (
        
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
            <Row className="containerRow">
                <Cabecera usuario={props.usuario} area={props.area} periodo={props.periodo}></Cabecera>
            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Reporte_seguimientos 