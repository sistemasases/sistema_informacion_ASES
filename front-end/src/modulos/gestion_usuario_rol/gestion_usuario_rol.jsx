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
import CryptoJS from 'crypto-js';
//Llave secreta para desencriptar.
const secretKey = process.env.REACT_APP_SECRET_KEY;


const Gestion_usuario_rol = () =>{
    //Función para desencriptar el rol del usuario desde el sessionStorage
    const decryptPermissionsFromSessionStorage = () => {
        const encryptedPermissions = sessionStorage.getItem('permisos');
        if (!encryptedPermissions) {
          return null; // No hay permisos en sessionStorage
        }
      
        // Desencriptar los permisos usando la clave secreta
        const bytes = CryptoJS.AES.decrypt(encryptedPermissions, secretKey);
        const decryptedPermissions = bytes.toString(CryptoJS.enc.Utf8);
      
        return decryptedPermissions;
      };
    const userRole = decryptPermissionsFromSessionStorage();

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