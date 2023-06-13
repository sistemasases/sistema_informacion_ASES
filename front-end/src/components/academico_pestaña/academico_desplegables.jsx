import React, {useMemo, useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable_item from "./desplegable_Item";
import Desplegable_item_listas_materias from "./desplegable_Item_listas_materias";
import Modal from 'react-bootstrap/Modal';
import Estudiantes from './estudiantes';
import MOCK_DATA from './MOCK_DATA.json';
import {useEffect} from 'react';
import axios from 'axios';

const Academico_desplegable = () =>{
  const estudiantes_prueba =
  [{'estudiantes':
          [{'nombre':'estudiante1'},
          {'nombre':'estudiante2'},
          {'nombre':'estudiante3'},
          {'nombre':'estudiante4'},
          {'nombre':'estudiante5'},
          ]
      }
  ]

  const[switchChecked, setChecked] = useState(false);
  const handleChange = () => setChecked(!switchChecked);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const [state,set_state] = useState({
        facultades : [],
        estudiantes_a_consultar : [{'estudiantes':''}],
        tiene_estudiantes: false,
        tiene_facultades: false
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



    useEffect(()=>{
        // axios({
        //   // Endpoint to send files
        //   url:  "http://localhost:8000/academico/lista_de_facultades/",
        //   method: "GET",
        // })
        // .then((respuesta)=>{
        //   set_state({
        //     ...state,
        //     facultades : respuesta.data
        //   })
        //   console.log("estos son los primeros datos :"+respuesta.data)
        // })
        // .catch(err=>{
        //     console.log("estos son los segundos datos :"+err.data)
        // })
        
        
      },[]);

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



      const traer_estudiantes = async (index)=>{
        try{
          const response = await axios.get("http://localhost:8000/usuario_rol/estudiante/",);
          set_state({
            estudiantes_a_consultar : [{'estudiantes' : response.data}],
            tiene_estudiantes: true
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }


    return (
        
      <Container className="academico_container">
            <Row className="academico_seguimientos_pares">Academico</Row>
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
                                    <Desplegable_item_listas_materias key={index} item={item} /> )}
                                </Row>
                                )
                                :
                                (<Row></Row>)
                                }
                                
                            </Col>
                </Row>
                <Row className="academico_fondo">
                            <Col className={"estudiantes" === activeTabIndex ? "academico_deplegable open" : "academico_deplegable"}>
                                <Row className="academico_deplegable_seleccionar" onClick={() => {traer_estudiantes();activeTab("estudiantes")}}>
                                    <Col className="academico_deplegable_seleccionar_text" >
                                                        <Row className="academico_deplegable_seleccionar_hover">
                                                            <Col  className="col_academico_deplegable_seleccionar_text" > 
                                                                    Estudiantes
                                                                    {
                                                                        "estudiantes" === activeTabIndex ?
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
                                    <Row className="academico_deplegable_contenido">
                                        {state.tiene_estudiantes && 
                                        state.estudiantes_a_consultar.map((item, index) => 
                                        <Estudiantes key={index} item={item} /> )}
                                    </Row>

                            </Col>
                </Row>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Seleccione un estudiante.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
        </Container>
    )
}

export default Academico_desplegable 