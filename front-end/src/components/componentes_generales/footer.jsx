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
        <Container className="container_footer">
            <Row className="footer_icons">
                <Button type="button" className="footer_facebook"><FontAwesomeIcon icon="fa-brands fa-facebook-f" /></Button>
                <Button type="button" className="footer_youtube"><i class="bi bi-youtube"/></Button>
                <Button type="button" className="footer_facebook"><i class="bi bi-facebook" ></i></Button>
                <Button type="button" className="footer_twitter"><i class="bi bi-twitter" ></i></Button>
                <Button type="button" className="footer_instagram"><i class="bi bi-instagram" ></i></Button>

            </Row>
            <Row className="footer_links">
            <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">http://dintev.univalle.edu.co</a>
            <h4> +57 2 318 2649 / 2653</h4>
            <h4> campusvirtual@correounivalle.edu.co</h4>
            </Row>
        </Container>
    )
}

export default Footer 