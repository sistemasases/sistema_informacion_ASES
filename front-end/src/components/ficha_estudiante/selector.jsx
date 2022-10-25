import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import Info_general from "./tabs/info_general"
import Academico from "./tabs/academico"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Selector = (props) =>{
    
    const[activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = (index)=> 
    {
        index === activeTabIndex ?
        (setActiveTabIndex(0))
        :
        setActiveTabIndex(index)
    }

    const tabs=[
        {
            id:1,
            name:"General",
            contnido:"2siiiiiii",
            component:<Info_general id={props.id} nombres={props.nombres}/>,
        },
        {
            id:2,
            name:"Socieducativo",
            contnido:"hola",
            component:<Info_general />,
        },
        {
            id:3,
            name:"Academico",
            contnido:"hola",
            component:<Academico />,
        },
        {
            id:4,
            name:"Geografico",
            contnido:"hola",
            component:<Info_general />,
        }
    ]



    return (
        <Container className="containerSelector">

                {Object.keys(tabs).length === 0 ? (
                    <Row>no tabs</Row>
                ) : (
                        <Row className="tabs" >
                            {tabs.map((tab, index)=>(
                                <Row className={tab.id === activeTabIndex ? "tab_separador" : "tab"} >
                                    <Row onClick={() => activeTab(tab.id)}>
                                        <label key={index} className={tab.id === activeTabIndex ? "activeTab" : "tab"}>
                                            {tab.name}
                                        </label>
                                    </Row>
                                    
                                    {
                                        (tab.id === activeTabIndex)?
                                        (
                                        
                                        <Row>
                                            <Col xs={"0"} md={"1"}></Col>
                                            <Col className="contentTab" xs={"12"} md={"10"}>{tabs[activeTabIndex-1].component}</Col>
                                            <Col xs={"0"} md={"1"}></Col>

                                        </Row>)
                                        :
                                        (<Row></Row>)
                                    }
                                
                                </Row>
                                
                                ))
                            }
                        </Row>

                )}
                
        </Container>
    )
}

export default Selector 