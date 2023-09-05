import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import Carga_masiva_component from "../../components/carga_masiva/carga_masiva_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;



const Carga_masiva = () =>{


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
      

    //const userRole = sessionStorage.getItem('permisos');
      const userRole = decryptPermissionsFromSessionStorage();
    return (
        <>{ userRole.includes('view_carga_masiva') ? <Col className="contenido_children">
            <Row className="justify-content-md-center">
                <h1>CARGA MASIVA</h1>
            </Row>
            <Row className="containerRow">
                <Carga_masiva_component/>
            </Row>
            <Row>

            </Row>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Carga_masiva 