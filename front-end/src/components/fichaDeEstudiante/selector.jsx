import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import InfoBasica from "./infoBasica"
import InformacionGeneral from "./tabs/informacionGeneral"


import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Selector = () =>{
    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> setActiveTabIndex(index);

    const tabs=[
        {
            name:"Analitics",
            contnido:"2siiiiiii",
            component:"ssssssss",
        },
        {
            name:"fichaDeEstudiante",
            contnido:"hola",
            component:<InfoBasica />,
        },
        {
            name:"Informacion General",
            contnido:"hola",
            component:<InformacionGeneral />,
        }
    ]



    return (
        <Container className="containerSelector">

            <Row className="bodyTab">
                {Object.keys(tabs).length === 0 ? (
                    <Row>no tabs</Row>
                ) : (
                    <Row className="containerTabs">
                        <Col className="tabs">
                            {tabs.map((tab, index)=>(
                                <label key={index} className={index === activeTabIndex ? "activeTab" : "tab"}
                                onClick={() => activeTab(index)}>
                                {tab.name}
                                </label>
                                ))
                            }
                        </Col>
                        <Row className="contentTab">{tabs[activeTabIndex].component}</Row>
                    </Row>

                )}
            </Row>
                
        </Container>
    )
}

export default Selector 