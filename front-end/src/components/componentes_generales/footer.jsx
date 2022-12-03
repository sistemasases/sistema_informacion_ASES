import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaThList, FaBars, FaFontAwesome} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Footer = () =>{

    return (
        <Col className="container_footer">

            <Row className="footer_links">
                Información de contacto
            </Row>
            <Row className="footer_links_bajo">
                <h4>Estrategias ASES</h4>
                <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">
                   estrategia.ases@correounivalle.edu.co</a>
                <h4>Tel : +57 (2) 3212100 Ext:3319</h4>
                <h4> Bajos de Biblioteca Mario Carvajal</h4>
                <h4> Universidad del Valle</h4>
                <h4> Cali, Colombia 2016-2017</h4>
            </Row>
            <Row className="footer_links_bajo">
                <i class="bi-instagram"></i>
            </Row>
        </Col>
    )
}

export default Footer 