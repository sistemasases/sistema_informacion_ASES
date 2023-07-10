import React from 'react';
import {useState } from "react";
import {Row, Col,} from "react-bootstrap";


const Sidebar_item_closed = (props) => {

    const [open, setOpen] = useState(false)
    
    if(props.item.childrens){
        return (
            <Row className={open ? "sidebar-item-closed open" : "sidebar-item-closed"}>
                <Col xs={12} n>
                    <span onClick={() => setOpen(!open)} className="tamaño_super_icon">
                        { props.item.icon && <i className={props.item.icon} title={props.item.name}></i> }
                    </span> 
                </Col>
                <Col xs={12} className="sidebar-content-closed">
                    { props.item.childrens.map((child, index) => <Sidebar_item_closed key={index} item={child} sub_item={true}/>) }
                </Col>
            </Row>
        )
    }else if(props.sub_item){
        return (
            <a href={props.item.path || "#"} className="sidebar-item-closed-final">
                <span className="tamaño_icon">{ props.item.icon && <i className={props.item.icon} title={props.item.name}></i> }</span>
            </a>
        )
    }else{
        return (
            <a href={props.item.path || "#"} className="sidebar-item-closed-final-con-margen">
                <span className="tamaño_icon">{ props.item.icon && <i className={props.item.icon} title={props.item.name}></i> }</span>
            </a>
        )
    }
}


export default Sidebar_item_closed