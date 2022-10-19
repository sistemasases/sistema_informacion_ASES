import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col} from "styled-bootstrap-grid";
import {Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Selector_estudiantes from "../componentes_generales/selector_estudiantes";
import  {useEffect} from 'react';
import axios from 'axios';
import Selector from "../../components/ficha_estudiante/selector";
import Ficha_footer from "./ficha_footer";



const Info_basica = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

   

    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      editar : false,
      usuario : '',
      data_user : [],
      data_rol : [],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      cedula:'',
      correo:'',
      telefono:'',

    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/all_estudiante/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_user : respuesta.data
        })
      })
      .catch(err=>{
          return (err)
      })
      
    },[]);
  
    const estaEditando = () => set_state({
      ...state,
      editar : (!state.editar)
    });

  
   
  
  
    const handle_option_user = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['nombre'],
        apellidos : state.data_user[e.id]['apellido'],
        correo : state.data_user[e.id]['email'],
        cedula : state.data_user[e.id]['num_doc'],
        telefono : state.data_user[e.id]['telefono_res'],
      })
    }

    const handle_users = (e) => {
      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['id'], label: state.data_user[i]['nombre']+" "+state.data_user[i]['apellido'],id:[i] }
          datos_option_user.push(dato)
        }
        console.log([datos_option_user]);
        bandera_option_user = false;
      }
      else{
        console.log([datos_option_user]);
      }
    }
    const handle_upload = (e) => {
      // Getting the files from the input
      console.log([state.rol])
      console.log([state.usuario])
    }







    return (
      <Container>
        <Row className="info_basica_borde">
                  <Col className="col1" xs={"12"} md={"8"}>
                        <Row>
                          <Col xs={"12"}>
                            <Select  
                                        options={datos_option_user} onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  />
                          </Col>
                            
                        </Row>

                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"} md={"10"}>
                                <Row className="infoRow1">
                                    <Col className="info_basica_selector" md={"4"}>
                                        <Select options={datos_option_user} onMouseEnter={handle_users} 
                                        onChange={handle_option_user}  className="justMargin1" />
                                    </Col>
                                    <Col md={"8"}>
                                        {
                                          state.editar?
                                          (
                                            <Row className="info"> 
                                                <Col className="info_texto" xs={"12"} md={"6"}>
                                                    <input
                                                    type="text"
                                                    className="form-control mt-1"
                                                    placeholder={state.cedula}
                                                    ></input>
                                                </Col>
                                                <Col className="info_texto" xs={"12"} md={"6"}>
                                                <input
                                                    type="text"
                                                    className="form-control mt-1"
                                                    placeholder={state.telefono}
                                                    ></input>
                                                </Col>
                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info"> 
                                                <Col className="info_texto" xs={"12"} md={"6"}>
                                                    <h4 className="texto_pequeño">{state.cedula}</h4>
                                                </Col>
                                                <Col className="info_texto" xs={"12"} md={"6"}>
                                                    <h4 className="texto_pequeño">{state.telefono}</h4>
                                                </Col>
                                            </Row>
                                          )
                                        } 
                                        {
                                          state.editar?
                                          (
                                            <Row className="info">
                                                <Col className="info_texto" xs={"12"}>
                                                    <h4 className="texto_pequeño">{state.correo}</h4>
                                                </Col>

                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info">
                                                <Col className="info_texto" xs={"12"}>
                                                    <h4 className="texto_pequeño">{state.correo}{state.editar}</h4>
                                                </Col>
                                            </Row>
                                          )
                                        } 
                                      
                                      
                                      
                                    </Col>
                                </Row>

                                <Row className="infoRow2">
                                  <Row>
                                    <h4 className="texto_pequeño">Programas academicos </h4>
                                  </Row>
                                  <Row className="infoRow23"> 
                                        <Col xs={"12"} md={"7"}>
                                          <h4 className="texto_pequeño">van los cuadros verdes </h4>
                                        </Col>
                                        <Col xs={"12"} md={"4"}> 
                                          <Select  />
                                        </Col>
                                        <Col xs={"12"} md={"1"}>
                                          <Switch onClick={handleChange}/>
                                        </Col>
                                  </Row>
                                </Row>
                            </Col>




                            <Col className="colInfo2" xs={"12"} md={"2"}>
                                <Row className="infoRow3">
                                    <h4 className="texto_subtitulo">ICETEX </h4>
                                    <Select  />
                                </Row>
                                <Row className="infoRow3">
                                    <h4 className="texto_pequeño">Cohortes </h4>
                                    <h4 className="texto_pequeño">Cohortes </h4>
                                </Row>
                            </Col>
                        </Row>
                  </Col>




                  <Col xs={"12"} md={"4"}>
                  
                    <Row>
                      <Col className="col2" md={"3"}>
                        {
                          state.editar ?
                          (<Row>
                            <Col>
                              <Button onClick={estaEditando}>Cancelar</Button>
                            </Col>
                            <Col>
                              <Button onClick={estaEditando}>Aceptar</Button>
                            </Col>
                          </Row>)
                          :
                          (
                            <Row>
                            <Col>
                              <h4 className="texto_pequeño">ASES</h4>
                            </Col>
                            <Col>
                              <Button onClick={estaEditando}>editar</Button>
                            </Col>
                          </Row>
                          )
                        }
                          
                      </Col>

                      <Col className="col3" md={"9"}>
                          <img src={"./imag12.jpg"}></img>
                          <h1>COL DE FOTO</h1>
                      </Col>
                    </Row>
                  </Col>
        </Row>
        <Row>
          <Selector id={state.id_usuario} seleccionado={state.seleccionado} editar={state.editar}/>
        </Row>

        
      </Container>
    )
}

export default Info_basica 