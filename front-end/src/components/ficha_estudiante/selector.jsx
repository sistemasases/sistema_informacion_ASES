import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Info_general from "./tabs/info_general"
import Academico from "./tabs/academico"
import Socieducativa from "./tabs/socieducativa"
import Modal from 'react-bootstrap/Modal';
import {Dropdown, Button} from "react-bootstrap";
import {useEffect} from 'react';

import axios from 'axios';

const Selector = (props) =>{

    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state,set_state] = useState({
      usuario : '',
      data_user : [],
      data_user_socioedu : [],
      data_rol : [],
      tab_abierto : '',
      id_usuario :'',
      nombres :'',
      apellidos : '',
      cedula : '',
      correo:'',
      telefono:'',

      data_user_academico: [[]],
      tiene_datos_cargados : false

    })


    useEffect(() => {
        console.log('entra al useeffct xd : ' + props.tab_abierto)
        setActiveTabIndex(props.tab_abierto)

      }, [props.tab_abierto]);

    const[activeTabIndex, setActiveTabIndex] = useState(state.tab_abierto);
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

      const loadInfo = (e) => {

        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/seguimientos_estudiante/`+props.id+"/";
            axios({
            // Endpoint to send files
            url:  url_axios,
            method: "GET",
            headers: config,
            })
            .then((respuesta)=>{
            state.data_user_socioedu.push(respuesta.data)
            })
            .catch(err=>{
                return (err)
            })

    }


    const tabs=[
        {
            id:1,
            name:"GENERAL",
            contenido:"2siiiiiii",
            permitidos: ["sistemas","super_ases","socioeducativo","profesional","practicante","monitor"],
            component:<Info_general 
                        id={props.id} 
                        seleccionado={props.seleccionado} 
                        datos={props.datos} 
                        rolUsuario={props.rolUsuario} 
                        editar={props.editar} 
                        codigo={props.codigo}
                        handleOptionUser={props.handleOptionUser}
                        />,
        },
        {
            id:2,
            name:"socioeducativo",
            contenido:"hola",
            permitidos: ["sistemas","super_ases","socioeducativo","profesional","practicante","monitor"],
            component:<Socieducativa 
                        id={props.id} 
                        data_user_socioedu={state.data_user_socioedu} 
                        seleccionado={props.seleccionado} datos={props.datos} 
                        rolUsuario={props.rolUsuario} editar={props.editar} 
                        codigo={props.codigo}/>,
        },
        {
            id:3,
            name:"ACADEMICO",
            contenido:"hola",
            permitidos: ["sistemas","super_ases","socioeducativo","profesional","practicante"],
            component:<Academico data_user_academico={state.data_user_academico}
                        id={props.id}/>,
        },
        {
            id:4,
            name:"GEOGRAFICO",
            contenido:"bloqueado",
            permitidos: ["sistemas","super_ases","socioeducativo","profesional","practicante","monitor"],
            component:<Info_general />,
        },

    ]



    return (
        <Container className="containerSelector">
                
                <Row className="tabs" >
                    {
                        tabs.map((tab, index)=>(

                            <Col xs={12}>
                            {
                                ( props.seleccionado !== '' && tab.contenido !== 'bloqueado' && tab.permitidos.includes(sessionStorage.getItem('rol')) ) ?

                                (<Col xs={"12"} className={tab.id === activeTabIndex ? "tab_separador" : "tabs_border"} >
                                    <Row onClick={() => activeTab(tab.id)} onMouseEnter={()=>loadInfo()}>
                                        <label key={index} className={tab.id === activeTabIndex ? "activeTab" : "tab"}>
                                            {tab.name}
                                        </label>
                                    </Row>
                                    {
                                        (tab.id === activeTabIndex)?
                                        (
                                        <Row>
                                            
                                            <Col className="contentTab" xs={"12"} md={"12"}>{tabs[activeTabIndex-1].component}</Col>

                                        </Row>)
                                        :
                                        (<Row></Row>)
                                    }
                                </Col>)
                                :
                                (<Row className={tab.id === activeTabIndex ? "tab_separador" : "tab_bloqueado_externo"} >
                                    <Row onClick={handleShow}>
                                        <label key={index}>
                                            {tab.name}
                                        </label>
                                    </Row>
                                </Row>)
                            }
                            </Col>
                        ))
                    }
                </Row>







                

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    {props.seleccionado === '' ?
                    (<Modal.Body>Seleccione un estudiante.</Modal.Body>)
                    :
                    (<Modal.Body>Opción bloqueada.</Modal.Body>)
                    }
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
        </Container>
    )
}

export default Selector 