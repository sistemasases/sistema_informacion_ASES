import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch';
import InfoBasica from "../../components/ficha_estudiante/info_basica"
import Selector from "../../components/ficha_estudiante/selector"
import Login_component from "../../components/login/login_component"
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Login = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
            <Login_component/>
    )
}

export default Login 