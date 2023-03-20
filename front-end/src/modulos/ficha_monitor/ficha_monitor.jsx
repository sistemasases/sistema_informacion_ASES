import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_monitor/info_basica";
import Selector from "../../components/ficha_monitor/selector";
import {Container, Row, Col, Dropdown, Button} from "styled-bootstrap-grid";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/componentes_generales/footer';
import Info_registros from '../../components/ficha_monitor/info_registros';
import Ficha_footer from '../../components/ficha_monitor/ficha_footer';



const Ficha_monitor = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container>
            <Info_basica usuario={props.nombreUsuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>
        </Container>
    )
}

export default Ficha_monitor