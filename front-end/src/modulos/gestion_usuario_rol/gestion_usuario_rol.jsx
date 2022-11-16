import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import Selector_usuarios from "../../components/componentes_generales/selector_usuarios"
import Selector_usuarios_copy from "../../components/componentes_generales/selector_usuarios copy"
import Formulario_asginacion_rol from "../../components/gestion_usuario_rol/formulario_asignacion_rol"
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Gestion_usuario_rol = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container className="containerRow">
            <Row className="rowJustFlex_usuario_rol">
                <h1>Usuario Rol</h1>
            </Row>
            <Row className="rowJustFlex_usuario_rol2">

                <Selector_usuarios/>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}

export default Gestion_usuario_rol