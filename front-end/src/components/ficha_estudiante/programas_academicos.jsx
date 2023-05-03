import React, {useState} from 'react';
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";



/*

<Col xs={"12"} md={"9"}>
                                        <Row>
                                          <h4 className="texto_pequeño">Programas academicos </h4>
                                        </Row>
                                        <Row className="infoRow23_activo"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{state.codigo} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch checked={true} />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"2"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <select></select>
                                              </Col>
                                              
                                        </Row>
                                        <Row className="infoRow23_inactivo"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{state.codigo} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch checked={true} />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"2"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"6"} md={"4"}> 
                                              <select/>
                                              </Col>
                                              
                                        </Row>
                                        <Row className="infoRow23_finalizado"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{state.codigo} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch disabled={true} />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"6"} md={"4"}> 
                                                <select/>
                                              </Col>
                                              
                                        </Row>
                                      </Col>

*/

const Programas_academicos = (props) => {

    const [open, setOpen] = useState(false)

    if(props.item.estado){
        return (
            <Row className="infoRow23_activo"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch checked={true} />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"2"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <select></select>
                                              </Col>
                                              
                                        </Row>
        )
    }else if(props.item.estado === 'inactivo') {
        return (
            <Row className="infoRow23_inactivo"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"2"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"6"} md={"4"}> 
                                              <select/>
                                              </Col>
                                              
                                        </Row>
        )
    }
    else{
        return (
            <Row className="infoRow23_finalizado"> 
                                              <Col xs={"6"} md={"6"}>
                                                <h4 className="texto_pequeño">{props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                                              </Col>
                                              {
                                                props.rolUsuario==='superSistemas' ?
                                                (
                                                  <Col xs={"3"} md={"2"}>
                                                    <Switch disabled={true} />
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"6"} md={"4"}> 
                                                <select/>
                                              </Col>
                                              
                                        </Row>
        )
    }
    
    
}

export default Programas_academicos






