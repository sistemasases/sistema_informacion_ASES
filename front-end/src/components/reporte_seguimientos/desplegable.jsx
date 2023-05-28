import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";

import Desplegable_item from "./desplegable_Item";
import items from "./seleccionado.json";



const Desplegable2 = (props) =>{




    return (
        <Container className="fichas_no_aplicado">
          { props.pintar.map((item, index) => <Desplegable_item key={index} item={item} />) }
        </Container>
    )
}

export default Desplegable2 


















