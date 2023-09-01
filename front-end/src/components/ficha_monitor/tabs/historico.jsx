import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable_item_academico from "./desplegable";
import Modal from 'react-bootstrap/Modal';
import {useEffect} from 'react';
import axios from 'axios';

/*
Tabla Conteo de Seguimientos:
- codigo
- Nombres
- Apellidos
- documento
- Conteos
--- Fichas normales
--- Fichas de inasistencias
----Total conteos
- Profesional
- Practicante
- Monitor
*/


const Academico = (props) =>{

    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    
    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state,set_state] = useState({
        data_user_academico : [],
        tiene_datos_cargados : false
    })

    useEffect(() => {

      }, []);




    useEffect(() => {
        
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/historial_monitor/`+props.id+"/";
        axios({
        // Endpoint to send files
        url:  url_axios,
        method: "GET",
        headers: config,
        })
        .then((respuesta)=>{
            set_state({
                data_user_academico : respuesta.data,
                tiene_datos_cargados : true
            })
            setActiveTabIndex(respuesta.data[0]['id_semestre'])
        })
        .catch(err=>{
            return ('entra al error : ' + err)
        })

      }, []);
  
  const[activeTabIndex, setActiveTabIndex] = useState('');
  const activeTab = (index)=> 
  {
    index === activeTabIndex ?
    (setActiveTabIndex(0))
    :
    setActiveTabIndex(index)
  }



    return (
        <Container className="socioeducativa_container">
            <Row className="socioeducativa_seguimientos_pares">Academico</Row>
                {state.tiene_datos_cargados ? 
                    (
                        <Row className="socioeducativa_fondo" >
                        { state.data_user_academico.map((item, index) => 
                            <Row>
                                <Col className={item['id_semestre'] === activeTabIndex ? "periodo_asignaciones open" : "periodo_asignaciones"}>
                                    <Row className="periodo_asignaciones_seleccionar" onClick={() => activeTab(item['id_semestre'])}>
                                        <Col className="periodo_asignaciones_seleccionar_text" >
                                            <Row className="periodo_asignaciones_seleccionar_hover">
                                                <Col  className="col_periodo_asignaciones_seleccionar_text" > 
                                                    {item.datos_semestre['nombre']}
  
                                                    {
                                                        item['id_semestre'] === activeTabIndex ?
                                                        (
                                                                <i class="bi bi-chevron-up"></i>
                                                        )   
                                                        :
                                                        (
                                                                <i class="bi bi-chevron-down"></i>
                                                        )
                                                    }
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Row>
                                            Profesional : {item.profesional['first_name']}
                                            <br/>
                                            Practicante : {item.practicante['first_name']}
                                            <br/>
                                            <br/>

                                        </Col>
                                    </Row>
                                    <Row className="periodo_asignaciones_contenido">
                                        {item.estudiantes.map((item, index) => <Desplegable_item_academico key={index} item={item} /> )}
                                    <br/>
                                    <br/>
                                    </Row>
                                </Col>
                            </Row>) 
                        }
                    </Row>
                    ):
                    (<Row>Cargando</Row>)
                }



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

export default Academico 