import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';  
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Inicio_semestre from '../../service/inicio_semestre';

const semestre_sistemas_component = () =>{

    return (
        <Container>
            <Row className="rowJustFlex">
                <p>Creación del semestre exitoso</p>
            </Row>
        </Container>
    )
}

export default semestre_sistemas_component