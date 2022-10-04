import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";


const SidebarItem = ({item}) => {

    const [open, setOpen] = useState(false)
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title_varios">
                    <span  onClick={() => setOpen(!open)} className="tamaño_icon">
                        { item.icon && <i className={item.icon}></i> }
                    </span> 
                    <span onClick={() => setOpen(!open)}>{item.name}</span>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"}  className="sidebar-item">
                <span className="tamaño_icon">{ item.icon && <i className={item.icon}></i> }</span>
                <span className="tamaño_font">{item.name}</span>
            </a>
        )
    }
}

export default SidebarItem