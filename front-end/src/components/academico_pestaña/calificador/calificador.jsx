import React, {useState} from 'react';
import {Container, Row, Col, } from "react-bootstrap";
import Select from 'react-select'  ;
import Tabla_de_notas from './tabla_de_notas'
import {useEffect} from 'react';
import axios from 'axios';
const Cabecera = () =>{

    const [state,set_state] = useState({
        facultades : [],
        estudiantes_a_consultar : [{'estudiantes':''}],
        tiene_estudiantes: false,
        tiene_facultades: false,
        filtro : '',

      })
      const[activeTabIndex, setActiveTabIndex] = useState("0");
      const activeTab = (index)=> 
      {
          index === activeTabIndex ?
          (
              setActiveTabIndex(0)
          )
          :
          (
              setActiveTabIndex(index)
          )
      }


    const traer_facultades = async (index)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/lista_de_facultades/",);
          set_state({
            facultades : response.data,
            tiene_facultades: true
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }
    return (
        
        <Container >
            <Row >
                <Col xs={"12"} md={"8"} className="texto_titulo_bold">
                    Reporte de estudiantes activos en SRA por semestre
                </Col>
                <Col xs={"12"} md={"4"} className="texto_pequeño">
                    Seleccione la cohorte
                    <Select></Select>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Row>
                        <h4>Mostrar <select className="select_tabla_cantidad_seguimientos"/> estudiantes</h4>
                    </Row>
                    <Row>
                        <Col xs={"12"} md={"6"}>
                            mostrando el registro del 1 al 10 de un total de # registros
                        </Col>
                        <Col xs={"12"} md={"6"}>
                            Buscar
                            <select/>
                        </Col>
                    </Row>
                </Col>
            </Row>   
            
            <Row className="academico_fondo">
                            <Col className={"facultades" === activeTabIndex ? "academico_deplegable open" : "academico_deplegable"}>
                                <Row className="academico_deplegable_seleccionar" onClick={() => {activeTab("facultades"); traer_facultades()}}>
                                    <Col className="academico_deplegable_seleccionar_text" >
                                        <Row className="academico_deplegable_seleccionar_hover">
                                            <Col  className="col_academico_deplegable_seleccionar_text" > 
                                                    Separación por asignaturas
                                                    {
                                                        "facultades" === activeTabIndex ?
                                                        (
                                                          <i class="bi bi-chevron-up"></i>
                                                        )
                                                        :
                                                        (
                                                          <i class="bi bi-chevron-down"></i>
                                                        )
                                                    }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {state.tiene_facultades ?
                                (
                                  <Row className="academico_deplegable_contenido">
                                    {state.facultades.map((item, index) => 
                                    <Tabla_de_notas key={index} item={item} /> )}
                                </Row>
                                )
                                :
                                (<Row></Row>)
                                }
                                
                            </Col>
                </Row>   
        </Container>
    )
}

export default Cabecera 