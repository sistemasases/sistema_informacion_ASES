import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

const SidebarItem = (props) => {
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
            <SidebarItem key={index} item={child} />
          ))}
        </Col>
      </Row>
    );
  } else {
    return (
      <a href={props.item.path || "#"} className="sidebar-item">
        <span className="tamaño_icon">
          {props.item.icon && <i className={props.item.icon}></i>}
        </span>
        <span className="tamaño_font">{props.item.name}</span>
      </a>
    );
  }
};

export default SidebarItem;
