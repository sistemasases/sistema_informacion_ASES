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
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { encriptar, desencriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad';


const Gestion_usuario_rol = () =>{
    //Desencriptar los permisos del usuario desde el sessionStorage
    const userRole = desencriptar(sessionStorage.getItem('permisos'));

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    return (
        <>{ userRole.includes('view_gestion_usuarios') ? <Col className="contenido_children">
            <Row className="rowJustFlex_usuario_rol">
                <h1>Usuario Rol</h1>
            </Row>
            <Row className="rowJustFlex_usuario_rol2">

                <Selector_usuarios/>
            </Row>
            <Row>

            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Gestion_usuario_rol