import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



var today = new Date();
var now = today.toLocaleString();

const Info_general = (props) =>{

      const config = {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
      };

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const pk = props.codigo;

    const temporal = false;

    const [state,set_state] = useState({

      editar : false,
      usuario : '',
      data_user : [],


      nombres:'sin dato',
      apellidos:'sin dato',
      correo:'sin dato',


      nuevo_nombres:'',
      nuevo_apellidos:'',
      nuevo_correo:'',

    })

    useEffect((pk)=>{
      
      set_state({
             ...state,
            id_usuario : props.datos['id'],
            nombres : props.datos['first_name'],
            apellidos : props.datos['last_name'],
            correo : props.datos['email_address'],
            
            nuevo_nombres:props.datos['first_name'],
            nuevo_apellidos:props.datos['last_name'],
            nuevo_correo:'',
          })
      
    },[]
    );
    


    const esta_editando = (e) => set_state({
      ...state,
      editar : true,
    });

    const esta_editando_cancelar = (e) => set_state({
      ...state,
      editar : false,

      nuevo_nombres:state.nombres,
      nuevo_apellidos:state.apellidos,
      nuevo_correo:state.correo,
          
    });




  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow(false);




  const handle_upload_estudiante = (e) => {

      let formData = new FormData();
      formData.append('first_name', state.nuevo_nombres);
      formData.append('last_name', state.nuevo_apellidos);
        
        axios({
        url: `${process.env.REACT_APP_API_URL}/usuario_rol/user_actualizacion/`+props.datos.id+'/',
        method: "PUT", // O "PATCH"
        data: formData,
        headers: config,
        })
        .then((res)=>{
              console.log("este es el response : " + res)
              set_state({
              ...state,
              nombres:state.nuevo_nombres,
              apellidos:state.nuevo_apellidos,
              correo:state.nuevo_correo,
  
              editar : false,
              })
              alert("el monitor fue editado correctamente")
        })
        .catch(err=>{
              
              set_state({
                    ...state,
                    puntaje_icfes:state.nuevo_puntaje_icfes,
                    año_ingreso_univalle:state.nuevo_año_ingreso_univalle,
                    telefono_res:state.nuevo_telefono_res,
        
                    editar : false,
                    })
                    console.log("pero que esta pasando ??? :  "  +  err)
                    alert("el monitor no fue editado correctamente")
                    
              //console.log("entra al malo")
              //alert("error al editar el estudiante : " + props.datos.id);
        })
  
    }





    const cambiar_dato = (e) =>{
          set_state({
                ...state,
                [e.target.name] : e.target.value
          })
          console.log(e.target.value)
    }

    const handleClose = () => {
          set_state({
                ...state
          })
    }


    

    return (
      
        temporal?
        (<Row></Row>)
        :
        (
          <Container className="container_informacion_general" xs={"12"} sm={"6"} >
            <Col xs={"12"}>
            {
                          state.editar ?
                          (
                            <Row>
                            
                              <Col xs={"6"} sm={"6"}>
                                <Button className="boton_editar_info_basica" onClick={handle_upload_estudiante}>
                                  ACEPTAR
                                </Button>
                              </Col>
                              <Col xs={"6"} sm={"6"}>
                                <Button className="boton_editar_info_basica" onClick={esta_editando_cancelar}>
                                  CANCELAR
                                </Button>
                              </Col>
                            </Row>
                          )
                          :
                          (
                            <Row>

                              <Col xs={"12"} sm={"12"}>
                                <Button className="boton_editar_info_basica" onClick={esta_editando}>
                                  EDITAR INFORMACIÓN
                                </Button>
                              </Col>
                            </Row>
                          )
                        }
                        

                  <Row>
                        <Col xs={"12"}>
                              <Row>
                              <h1 className="texto_subtitulo">Información del estudiante :{props.datos['nombre']}</h1>

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Nombres</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input name="nuevo_nombres"
                                                            onChange={cambiar_dato} 
                                                            defaultValue={state.nombres}>
                                                      </input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4  className="texto_pequeño" >{state.nombres}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Apellidos</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input name="nuevo_apellidos"
                                                            onChange={cambiar_dato} 
                                                            defaultValue={state.apellidos}>
                                                      </input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4  className="texto_pequeño" >{state.apellidos}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>
                                    
                                    
                              </Row>
                        </Col>
                  </Row>


            </Col>    
            
            <Modal show={show} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> {state.info_modal} el : {state.correo}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
        )
      
      
        
    )
}

export default Info_general 