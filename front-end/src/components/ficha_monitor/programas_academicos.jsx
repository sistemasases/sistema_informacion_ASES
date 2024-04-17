import React, {useState} from 'react';
// import Switch from 'react-switch'
import {Row, Col} from "react-bootstrap";
// import {FaRegChartBar, FaThList, FaGraduationCap, FaUser} from "react-icons/fa";

const Programas_academicos = (props) => {

    const [open, setOpen] = useState(false)

    if(props.item.id_estado_id === 1){
        return (
            <Row className="infoRow23_activo"> 
                  <Col xs={"12"} md={"12"}>
                    <h4 className="texto_pequeño">{props.item.codigo_monitor} - {props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                  </Col>
                  {/* {
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
                  </Col> */}
                  
            </Row>
        )
    }else if(props.item.id_estado_id === 2) {
        return (
            <Row className="infoRow23_inactivo"> 
                <Col xs={"12"} md={"12"}>
                  <h4 className="texto_pequeño">{props.item.codigo_monitor} - {props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                </Col>
                {/* {
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
                </Col> */}
                
          </Row>
        )
    }
    else if(props.item.id_estado_id === 4){
        return (
            <Row className="infoRow23_finalizado"> 
                <Col xs={"12"} md={"12"}>
                  <h4 className="texto_pequeño">{props.item.codigo_monitor} - {props.item.cod_univalle} - {props.item.nombre_programa} </h4>
                </Col>
                {/* {
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
                </Col> */}
                
          </Row>
        )
    }
    else{
        return (
            <Row className="infoRow23_inactivo"> 
                <Col xs={"12"} md={"12"}>
                  <h4 className="texto_pequeño">error en la coincidencia de programa </h4>
                </Col>
          </Row>
        )
    }
    
    
}

export default Programas_academicos






