/**
 * @file sidebarItem.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de abrir los menus que se encuentran cerrados en la barra lateral
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */
import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { encriptar } from '../../../modulos/utilidades_seguridad/utilidades_seguridad';
import '../../../Scss/campus_diverso/sidebarCampus.css';

/**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
  */
const cambiar_ruta = (e) => {
  if (e){
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  } else {
    sessionStorage.setItem("path", encriptar("/"));
    window.location.reload();
  }
};

/**
 * Abre los menus que se encuentran cerrados
 * @param {Diccionario} props Contiene los menus que son visibles para cada rol
 * @returns renderizado de los menus y apertura de los mismos
 */
const SidebarItemCampus = (props) => {
  // Variable de estado que se encarga de abrir y cerrar los menus
  const [open, setOpen] = useState(false);

  if (props.item.childrens) {
    return (
      <Row className={open ? "sidebar-item open" : "sidebar-item"}>
        <Col xs={12} className="sidebar-title_varios">
          <span onClick={() => setOpen(!open)} className="tamaño_icon">
            {props.item.icon && <i className={props.item.icon}></i>}
          </span>
          <span onClick={() => setOpen(!open)}>{props.item.name}</span>
        </Col>
        <Col xs={12} className="sidebar-content">
          {props.item.childrens.map((child, index) => (
            <SidebarItemCampus key={index} item={child} />
          ))}
        </Col>
      </Row>
    );
  } else {
    return (
      <a onClick={() => cambiar_ruta(props.item.path)} className="sidebar-item">
        <span className="tamaño_icon">
          {props.item.icon && <i className={props.item.icon}></i>}
        </span>
        <span className="tamaño_font">{props.item.name}</span>
      </a>
    );
  }
};

export default SidebarItemCampus;
