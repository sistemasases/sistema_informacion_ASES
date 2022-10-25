import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";


const Sidebar_item_closed = ({item},{toggled}) => {

    const [open, setOpen] = useState(false)
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span onClick={() => setOpen(!open)} className="tamaño_icon">
                        { item.icon && <i className={item.icon}></i> }
                    </span> 
                    
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <Sidebar_item_closed key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"} className="sidebar-item">
                <span className="tamaño_icon">{ item.icon && <i className={item.icon}></i> }</span>
            </a>
        )
    }
}


export default Sidebar_item_closed