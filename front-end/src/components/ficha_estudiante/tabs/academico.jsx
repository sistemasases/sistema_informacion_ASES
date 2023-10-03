import React, {useState} from 'react';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable_item_academico from "./desplegable_Item_Academico";
import Modal from 'react-bootstrap/Modal';
import {useEffect} from 'react';
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

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
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
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
        if(props.data_user_academico[0][0]){
            setActiveTabIndex(props.data_user_academico[0][0]['nombre'])
        }
      }, [state.data_user_academico]);




    useEffect(() => {
        const paramsget = {
            id_sede: desencriptarInt(sessionStorage.getItem('sede_id')),
          };
        
        const url_axios = `${process.env.REACT_APP_API_URL}/academico/lista_historiales_academicos/`+props.id+"/";
        axios({
        // Endpoint to send files
        url:  url_axios,
        params : paramsget,
        method: "GET",
        headers: config,
        })
        .then((respuesta)=>{
            set_state({
                data_user_academico : respuesta.data,
                tiene_datos_cargados : true
            })
            setActiveTabIndex(respuesta.data[0][0]['nombre'])
            console.log('entra a la respuesta : ' + respuesta.data[0][0]['nombre'])
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

  const userRole = desencriptar(sessionStorage.getItem('rol'));
  console.log('userRole : ' + userRole)

    return (
        <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' ? <></> :
        <Container className="socioeducativa_container">
            <Row className="socioeducativa_seguimientos_pares">Academico</Row>
                {state.tiene_datos_cargados ? 
                    (
                        <Row className="socioeducativa_fondo" >
                        { state.data_user_academico.map((item, index) => 
                            <Row>
                                <Col className={item[0]['nombre'] === activeTabIndex ? "periodo_asignaciones open" : "periodo_asignaciones"}>
                                    <Row className="periodo_asignaciones_seleccionar" onClick={() => activeTab(item[0]['nombre'])}>
                                        <Col className="periodo_asignaciones_seleccionar_text" >
                                            <Row className="periodo_asignaciones_seleccionar_hover">
                                                <Col  className="col_periodo_asignaciones_seleccionar_text" > 
                                                    {item[0]['nombre']}
                                                    {
                                                        item[0]['nombre'] === activeTabIndex ?
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
                                    <Row className="periodo_asignaciones_contenido">
                                        <Desplegable_item_academico key={index} item={item} />
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
    }</>
    )
}

export default Academico 