import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaThList, FaBars, FaFontAwesome} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Ficha_footer = () =>{

    const [state,set_state] = useState({
        ultima_actualizacion:'',
      })

    var today = new Date();
    var now = today.toLocaleString();
    const handle_time = (e) => {
        set_state({
            ...state,
            ultima_actualizacion:now,
          })
      }
  

    return (
        <Container className="container_ficha_footer">
            <Row >
                <Col >
                    <Button onClick={handle_time}>tiempo</Button>
                </Col>
            </Row>

                
            <Row className="ficha_footer">
                <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">
                    Links
                    </a>
                <h4> ultima actualizacion : {state.ultima_actualizacion}</h4>
                <h4> aqui va el monitor</h4>
            </Row>
        </Container>
    )
}

export default Ficha_footer 