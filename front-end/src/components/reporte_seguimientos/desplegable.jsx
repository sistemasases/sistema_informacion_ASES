import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";

import Desplegable_item from "./desplegable_item";
import items from "./seleccionado.json";



const Desplegable2 = () =>{

    return (
        <Container className="fichas">
          { items.map((item, index) => <Desplegable_item key={index} item={item} />) }
        </Container>
    )
}

export default Desplegable2 


















