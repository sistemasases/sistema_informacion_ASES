import React, {useMemo, useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable_item from "./desplegable_Item";
import Desplegable_item_listas_materias from "./desplegable_Item_listas_materias";
import Modal from 'react-bootstrap/Modal';
import Estudiantes from './estudiantes';

const Academico_desplegable = () =>{

  
  const[switchChecked, setChecked] = useState(false);
  const handleChange = () => setChecked(!switchChecked);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const tabs=[
  [
      {
          "nombre": "20231",
          "Actual": true
      }
  ],
  [
      {
          "nombre": "2022-2",
          "Actual": false
      },
      {
          "id": 1,
          "fecha": "2023-01-04",
          "observaciones": "esto es una prueba",
          "revisado_profesional": false,
          "revisado_practicante": false,
          "creacion": "2023-01-04T15:49:28.811996Z",
          "modificacion": "2023-01-04T00:00:00Z",
          "id_creador": 2,
          "id_modificador": 2,
          "id_estudiante": 18
      },
      {
          "id": 4,
          "fecha": "2023-01-04",
          "observaciones": "esto es una prueba",
          "revisado_profesional": false,
          "revisado_practicante": false,
          "creacion": "2023-01-04T15:59:36.300078Z",
          "modificacion": "2023-01-04T15:59:36.300078Z",
          "id_creador": 2,
          "id_modificador": 2,
          "id_estudiante": 18
      },
  ],
  [
      {
          "nombre": "2022-1",
          "Actual": false
      }
  ]
]

const tabs2 = [
    {
        "facultad": "ciencias",
        "materias":[
                        {
                            "asignatura": "ciencia 1",
                            "profesores": [
                                            {
                                                "profesor" : "profesor 1",
                                                "alumnos" : [
                                                                {
                                                                    "alumno": "alumno 1.1"
                                                                },
                                                                {
                                                                    "alumno": "alumno 1.2"
                                                                },
                                                            ]
                                            },
                                            {
                                                "profesor" : "profesor 2",
                                                "alumnos" : [
                                                                {
                                                                    "alumno": "alumno 2.1"
                                                                },
                                                                {
                                                                    "alumno": "alumno 2.2"
                                                                },
                                                            ]
                                            }
                                        ]
                        },
                        {
                            "asignatura": "ciencia 2",
                            "profesores": [
                                {
                                    "profesor" : "profesor 1",
                                    "alumnos" : [
                                                    {
                                                        "alumno": "alumno 1.1"
                                                    },
                                                    {
                                                        "alumno": "alumno 1.2"
                                                    },
                                                ]
                                },
                                {
                                    "profesor" : "profesor 2",
                                    "alumnos" : [
                                                    {
                                                        "alumno": "alumno 2.1"
                                                    },
                                                    {
                                                        "alumno": "alumno 2.2"
                                                    },
                                                ]
                                }
                            ]
                        }
                    ]
    },   
    {
        "facultad": "matematicas",
        "materias":[
                        {
                            "asignatura": "calculo 1",
                            "profesores": [
                                            {
                                                "profesor" : "profesor 1",
                                                "alumnos" : [
                                                                {
                                                                    "alumno": "alumno 1.1"
                                                                },
                                                                {
                                                                    "alumno": "alumno 1.2"
                                                                },
                                                            ]
                                            },
                                            {
                                                "profesor" : "profesor 2",
                                                "alumnos" : [
                                                                {
                                                                    "alumno": "alumno 2.1"
                                                                },
                                                                {
                                                                    "alumno": "alumno 2.2"
                                                                },
                                                            ]
                                            }
                                        ]
                        },
                        {
                            "asignatura": "calculo 2",
                            "profesores": [
                                {
                                    "profesor" : "profesor 1",
                                    "alumnos" : [
                                                    {
                                                        "alumno": "alumno 1.1"
                                                    },
                                                    {
                                                        "alumno": "alumno 1.2"
                                                    },
                                                ]
                                },
                                {
                                    "profesor" : "profesor 2",
                                    "alumnos" : [
                                                    {
                                                        "alumno": "alumno 2.1"
                                                    },
                                                    {
                                                        "alumno": "alumno 2.2"
                                                    },
                                                ]
                                }
                            ]
                        }
                    ]
    },   
]



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

const[activeTabIndex, setActiveTabIndex] = useState("0");
const activeTab = (index)=> 
{
  index === activeTabIndex ?
  (setActiveTabIndex(0))
  :
  setActiveTabIndex(index)
}

    return (
        
      <Container className="academico_container">
            <Row className="academico_seguimientos_pares">Academico</Row>
                <Row className="academico_fondo">
                            <Col className={"facultades" === activeTabIndex ? "academico_deplegable open" : "academico_deplegable"}>
                                <Row className="academico_deplegable_seleccionar" onClick={() => activeTab("facultades")}>
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
                                    <Row className="academico_deplegable_contenido">
                                        {tabs2.map((item, index) => <Desplegable_item_listas_materias key={index} item={item} /> )}
                                    </Row>

                            </Col>
                </Row>
                <Row className="academico_fondo">
                            <Col className={"estudiantes" === activeTabIndex ? "academico_deplegable open" : "academico_deplegable"}>
                                <Row className="academico_deplegable_seleccionar" onClick={() => activeTab("estudiantes")}>
                                    <Col className="academico_deplegable_seleccionar_text" >
                                                        <Row className="academico_deplegable_seleccionar_hover">
                                                            <Col  className="col_academico_deplegable_seleccionar_text" > 
                                                                    Estudiantes
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
                                    <Row className="academico_deplegable_contenido">
                                        {estudiantes_prueba.map((item, index) => <Estudiantes key={index} item={item} /> )}
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