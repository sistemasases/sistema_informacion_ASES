import React, {useState} from 'react';
import Select from 'react-select';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {FaBars} from "react-icons/fa";
import NavBar from './navbar';
import Menu from './sistemas.json';
import Menu2 from './socioeducativa.json';
import Menu3 from './academico.json';
import Menu4 from './icetex.json';
import Menu5 from './discapacidad.json';

import SidebarItem from './sidebarItem';
import Footer from './footer';
import Sidebar_item_closed from './sidebar_item_closed';
import {Scrollbars} from 'react-custom-scrollbars'; 


/*
<Row style={{width: isOpen ? "300px" : "70px"}} className="sideBar">
                    <Row className="top_selection">
                        <Row  className="bars">
                            <FaBars onClick={toggle}/>
                        </Row>
                    </Row>
                <Scrollbars className="scrollbar_sidebar">
                    {
                        isOpen ?
                        (<div className="sidebar_item">
                            { Menu.map((item, index) => <SidebarItem key={index} item={item}/>) }
                        </div>)
                        :
                        (<div className="sidebar_item">
                        { Menu.map((item, index) => <Sidebar_item_closed key={index} item={item} />) }
                        </div>)
                    }
                </Scrollbars>

                </Row>
                
                
                <Row>
                    <NavBar tamaño={isOpen} nombre={props.usuario} rol={props.rolUsuario}></NavBar>
                </Row>

                <main style={{marginLeft: isOpen ? "300px" : "50px"}}>
                    {props.children}
                    <Footer></Footer>
                </main>
*/

const SideBar = (props) =>{

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);



    const [state,set_state] = useState({
        desplegable : localStorage.rol === 'superAses' ? Menu : Menu2
      })

    function path_actual(name){
        set_state({
          ...state,
          path_actual : name,
        })
      }
      
    

 

        if(localStorage.rol == 'superAses'){
            set_state({
                ...state,
                desplegable : Menu2,
              })
        }else if(localStorage.rol == 'socioeducativa'){
            set_state({
                ...state,
                desplegable : Menu2,
              })

            }
        


    return (
        <Container className="containerSidebar">
                <Row className="top_selection">
                    <FaBars onClick={toggle}/>
                </Row>
                {
                    isOpen ?
                    (
                        <Row style={{width: isOpen ? "250px" : "70px"}} className="sideBar">
                            
                            <Scrollbars className="scrollbar_sidebar">
                                {
                                    isOpen ?
                                    (<div className="sidebar_item">
                                        { state.desplegable.map((item, index) => <SidebarItem key={index} item={item}
                                        childClicked2={(name)=>path_actual(name)}/>) }
                                    </div>)
                                    :
                                    (<div className="sidebar_item">
                                        { state.desplegable.map((item, index) => <Sidebar_item_closed key={index} item={item} 
                                        childClicked2={(name)=>path_actual(name)}/>) }
                                    </div>)
                                }
                            </Scrollbars>

                        </Row>
                    )
                    :
                    (
                    <div  class="d-none d-md-block">
                        <Row style={{width: isOpen ? "250px" : "70px"}} className="sideBar">
                            
                            <Scrollbars className="scrollbar_sidebar">
                                {
                                    isOpen ?
                                    (<div className="sidebar_item">
                                        { state.desplegable.map((item, index) => <SidebarItem key={index} item={item}
                                        childClicked2={(name)=>path_actual(name)}/>) }
                                    </div>)
                                    :
                                    (<div className="sidebar_item">
                                    { state.desplegable.map((item, index) => <Sidebar_item_closed key={index} item={item}
                                    childClicked2={(name)=>path_actual(name)}/>) }
                                    </div>)
                                }
                            </Scrollbars>

                        </Row>
                    </div>
                    )
                }
                
                
                
                <Row className="row_navbar">
                    <NavBar tamaño={isOpen} nombre={props.usuario} rol={props.rolUsuario}  path_actual={state.path_actual}></NavBar>
                </Row>
                <div  class="d-none d-md-block">
                    <Row className="inf_der">
                        <main style={{marginLeft: isOpen ? "280px" : "50px", marginTop: "5rem"}}>
                            {props.children}
                        </main>
                    </Row>
                </div>

                <div  class="d-block d-md-none">
                    <Row className="inf_der">
                        <main style={ {marginTop: "4rem"}}>
                            {props.children}
                        </main>
                    </Row>
                </div>
                
                <Footer></Footer>
        </Container>
    )
}

export default SideBar 