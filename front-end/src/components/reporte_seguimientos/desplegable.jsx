/**
 * @file desplegable.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de renderizar los seguimientos de un usuario socioeducativo en un desplegable invocando
 * a Desplegable_item
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import { Container } from "react-bootstrap";
import Desplegable_item from "./desplegable_Item";

/**
 * Renderiza los seguimientos de un usuario socioeducativo en un desplegable invocando a Desplegable_item
 * @param {Diccionario} props Diccionario qué contiene datos del practicantes
 * @returns Renderizado de desplegable
 */
const Desplegable2 = (props) => {
  return (
    <Container className="fichas_no_aplicado">
      {props.pintar.map((item, index) => (
        <Desplegable_item key={index} item={item} />
      ))}
    </Container>
  );
};

export default Desplegable2;
