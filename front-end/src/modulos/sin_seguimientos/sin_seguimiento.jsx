import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import Component_reporte_seguimientos from "../../components/reporte_seguimientos/desplegable";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import Tabla_sin_seguimientos from "../../components/sin_seguimientos/tabla_sin_seguimientos";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import  {useEffect} from 'react';
import axios from 'axios';

const Sin_seguimientos = () =>{

    const userRole = localStorage.getItem('rol');
    const [state,set_state] = useState({
        semestre_Seleccionado : '',
        la_info_de_la_tabla : [],
    })

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

        useEffect(()=>{
        // axios({
        //   // Endpoint to send files
        //   url:  "http://localhost:8000/usuario_rol/info_estudiantes_sin_seguimientos/",
        //   method: "GET",
        // })
        // .then((respuesta)=>{
        //   set_state({
        //     ...state,
        //     la_info_de_la_tabla : respuesta.data
        //   })
        // })
        // .catch(err=>{
        //     console.log("no llega :"+err)
        // })

        
      },[]);

    return (
        
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
            <Row className="containerRow">
                <Tabla_sin_seguimientos la_info_de_la_tabla={state.la_info_de_la_tabla}></Tabla_sin_seguimientos>
            </Row>

        </Col> : <Acceso_denegado/>}</>
    )
}

export default Sin_seguimientos 