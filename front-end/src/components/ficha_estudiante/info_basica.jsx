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
import Form from 'react-bootstrap/Form';
import Info_registros from './info_registros';



const Info_basica = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);
    
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
        ]
   

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
      codigo:'',
      tipo_doc:'',
      cedula:'',
      correo:'',
      telefono:'',

      nueva_cedula:'',
    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/estudiante/",
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
  


  
   
  
  
    const handle_option_user = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['nombre'],
        apellidos : state.data_user[e.id]['apellido'],
        codigo : state.data_user[e.id]['cod_univalle'],
        correo : state.data_user[e.id]['email'],
        tipo_doc : state.data_user[e.id]['tipo_doc'],
        cedula : state.data_user[e.id]['num_doc'],
        telefono : state.data_user[e.id]['telefono_res'],
      })
    }

    const handle_users = (e) => {
      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['id'], label:state.data_user[i]['cod_univalle']+" "+state.data_user[i]['nombre']+" "+state.data_user[i]['apellido'],id:[i] }
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






















    const esta_editando = (e) => set_state({
      ...state,
      editar : (!state.editar)
    });
    const esta_editando_aceptar = (e) => {
      set_state({
        ...state,
        cedula : state.nueva_cedula,
        editar : (!state.editar),
      })
      console.log(state.cedula)
    }



    const handle_change_info_cedula = (e) => {
      console.log(e.value)
      set_state({
        ...state,
        nueva_cedula : [e.value],
      })
    }



    const handle_upload_info_estudiante = (e) => {
      // Getting the files from the input
      console.log([state.nueva_cedula])
      console.log([state.id_usuario])
      let formData = new FormData();
    
      //Adding files to the formdata
      formData.append('num_doc', state.nueva_cedula);
      formData.append('id', state.id_usuario);
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/estudiante_actualizacion/",
        method: "POST",
        data: formData,
      })
      .then(res=>{set_state({
        ...state,
        info_modal: "El rol se asignó correctamente"
        
      })})
      .catch(err=>{
        set_state({
          ...state,
          info_modal: "ocurrio un error"
      })})
    }

























    return (
      <Row>
        <Col xs={"12"} lg={"9"} >


          <div class="d-none d-md-block">
          <Row className="info_basica_borde">
                  <Col className="col1" xs={"12"} md={"9"}>
                        <Row>
                          <Col xs={"12"} >
                            <Select  className="bold"
                                        options={datos_option_user} onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  />
                          </Col>
                        </Row>

                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"}>
                                <Row className="infoRow1">
                                    <Col md={"12"}>
                                        {
                                          (state.seleccionado) === '' ?
                                          (
                                            <Row className="info"> 
                                                <Col className="info_basica_selector" xs={"1"} sm={"1"}>
                                                  <label className="texto_mas_pequeño">
                                                    {state.tipo_doc}
                                                  </label>
                                                </Col>
                                                <Col className="info_texto" xs={"4"} md={"2"}>
                                                  <h4 className="texto_mas_pequeño">cedula</h4>
                                                </Col>
                                                  <Col className="info_texto" md={"5"}>
                                                    <h4 className="texto_mas_pequeño">correo</h4>
                                                  </Col>

                                                  <Col className="info_texto" xs={"3"} md={"2"}>
                                                    <h4 className="texto_mas_pequeño">edad</h4>
                                                  </Col>
                                                
                                                <Col className="info_texto" xs={"3"} md={"2"}>
                                                  <h4 className="texto_mas_pequeño">ICETEX</h4>
                                                </Col>
                                                
                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info"> 
                                                    <Col className="info_texto" xs={"12"} md={"2"}>
                                                        <h4 className="texto_mas_pequeño">{state.cedula}</h4>
                                                    </Col>

                                                  <Col className="info_texto" xs={"12"} md={"6"}>
                                                        <h4 className="texto_mas_pequeño">{state.correo}</h4>
                                                  </Col>

                                                <Col className="info_texto" xs={"12"} md={"2"}>
                                                      <h4 className="texto_mas_pequeño">{state.telefono}</h4>
                                                    </Col>
                                                <Col className="info_texto" xs={"12"} md={"2"}>
                                                      <h4 className="texto_mas_pequeño">ICETEX</h4>
                                                    </Col>
                                            </Row>
                                          )
                                        } 
                                      
                                      
                                      
                                    </Col>
                                </Row>
                                {
                                  (state.seleccionado) === '' ?
                                  (
                                    <Row className="infoRow2">
                                      <Col xs={"12"} md={"9"}>
                                        <Row>
                                          <h4 className="bold">Programas academicos </h4>
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
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                                <label>label1</label>
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
                                                    <Switch onClick={handleChange}/>
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <label>label1</label>
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
                                                    <Switch disabled={true}/>
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <label>label1</label>
                                              </Col>
                                              
                                        </Row>
                                      </Col>

                                      <div class="d-none d-md-block col-md-3">
                                        <Col xs={"12"} md={"12"}>
                                          <Row>
                                          <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                          </Row>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">Condicion de excepcion</h4>
                                          </Row>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">2017-C.A</h4>
                                          </Row>
                                        </Col>
                                      </div>
                                      
                                      
                                    </Row>
                                  )
                                  :
                                  (
                                    <Row className="infoRow2">
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
                                              <label>label1</label>
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
                                              <label>label1</label>
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
                                                <label>label1</label>
                                              </Col>
                                              
                                        </Row>
                                      </Col>

                                        <Col xs={"12"} md={"3"}>
                                          <Row>
                                          <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                          </Row>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">Condicion de excepcion</h4>
                                          </Row>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">2017-C.A</h4>
                                          </Row>
                                        </Col>                                      
                                      
                                    </Row>
                                  )

                                }

                                
                            </Col>

                        </Row>
                  </Col>


                  {
                    (state.seleccionado) === '' ?
                    (
                      <Col  xs={"12"} md={"3"}>
                          <Row className="col3">
                            <i class="bi bi-person-fill"></i>
                          </Row>
                      </Col>
                    )
                    :
                    (
                      <Col  xs={"12"} md={"3"}>
                        <Row className="col3">
                        <i class="bi bi-person-fill"></i>

                          <img src={"./imag1.jpg"}></img>
                        </Row>
                        
                      </Col>
                    )
                  }
          </Row>
          </div>










          <div class="d-block d-md-none">
          <Row className="info_basica_borde_pequeño">
                      <Col xs={"12"} >
                            <Select  className="bold"
                                        options={datos_option_user} onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  />
                          </Col>
          {
                      (state.seleccionado) === '' ?
                      (
                        
                          <Col xs={"12"} sm={"12"} className="primera_row_pequeña">

                            <Row>
                              <Col  xs={"4"} sm={"4"}>
                                <Row className="col3_pequeño">
                                  <i class="bi bi-person-fill"></i>
                                </Row>
                            </Col>

                            
                            <Col xs={"6"} sm={"4"}>
                              <Row className="botones_info_basica_pequeña">
                                <button className="boton_editar_info_basica">
                                  <i>TRAYECTORIA</i>
                                </button>
                                <button className="boton_editar_info_basica">
                                  <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                </button>
                              </Row>
                            </Col>


                              <Col xs={"2"} sm={"4"}>
                                <Row className="texto_estatico_pequeño">
                                  <h4 className="texto_mas_pequeño">Condicion de excepcion</h4>
                                </Row>
                                <Row className="texto_estatico_pequeño">
                                    <h4 className="texto_mas_pequeño">2017-C.A</h4>
                                </Row>
                              </Col>


                              <Col className="generar_nuevo_reporte" xs={"12"}>
                                  <Button className="boton_nuevo_registro_pequeño">NUEVO SEGUIMIENTO</Button>
                              </Col>
                            </Row>
                            
                          </Col>
                            
                      )
                      :
                      (
                        <Col xs={"12"} sm={"12"} className="primera_row_pequeña">

                            <Row>
                              <Col  xs={"4"} sm={"4"}>
                                <Row className="col3_pequeño">
                                  <i class="bi bi-person-fill"></i>
                                  <img src={"./imag1.jpg"}></img>

                                </Row>
                            </Col>

                            
                            <Col xs={"6"} sm={"4"}>
                              <Row className="botones_info_basica_pequeña">
                                <button className="boton_editar_info_basica">
                                  <i>TRAYECTORIA</i>
                                </button>
                                <button className="boton_editar_info_basica">
                                  <i> EDITAR INFORMACIÓN</i>
                                </button>
                                <button className="boton_editar_info_basica">
                                  <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                </button>
                              </Row>
                            </Col>


                            <Col xs={"2"} sm={"4"}>
                              <Row className="texto_estatico_pequeño">
                                 <h4 className="texto_mas_pequeño">Condicion de excepcion</h4>
                              </Row>
                              <Row className="texto_estatico_pequeño">
                                  <h4 className="texto_mas_pequeño">2017-C.A</h4>
                              </Row>
                            </Col>
                              
                              <Col className="generar_nuevo_reporte" xs={"12"}>
                                  <Button className="boton_nuevo_registro_pequeño">NUEVO SEGUIMIENTO</Button>
                              </Col>
                            </Row>
                            
                          </Col>
                      )
                  }
                  <Col className="col1" xs={"12"} md={"9"}>


                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"}>
                                <Row className="infoRow1">
                                    <Col md={"12"}>
                                        {
                                          (state.seleccionado) === '' ?
                                          (
                                            <Row className="info"> 
                                                  <Col className="info_texto_pequeño" md={"12"}>
                                                    <h4 className="texto_mas_pequeño">correo</h4>
                                                  </Col>

                                                <Col className="info_basica_selector" xs={"1"} sm={"1"}>
                                                  <label className="texto_mas_pequeño">
                                                    {state.tipo_doc}
                                                  </label>
                                                </Col>
                                                <Col className="info_texto" xs={"4"} md={"2"}>
                                                  <h4 className="texto_mas_pequeño">cedula</h4>
                                                </Col>

                                                  <Col className="info_texto" xs={"3"} md={"12"}>
                                                    <h4 className="texto_mas_pequeño">edad</h4>
                                                  </Col>
                                                
                                                <Col className="info_texto" xs={"3"} md={"2"}>
                                                  <h4 className="texto_mas_pequeño">ICETEX</h4>
                                                </Col>
                                                
                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info"> 

                                                  <Col className="info_texto" xs={"12"} md={"12"}>
                                                  <h4 className="texto_mas_pequeño">{state.correo}</h4>
                                                  </Col>
                                                  <Col className="info_basica_selector" xs={"1"} sm={"1"}>
                                                  <label className="texto_mas_pequeño">
                                                    {state.tipo_doc}
                                                  </label>
                                                </Col>
                                                    <Col className="info_texto" xs={"4"} md={"2"}>
                                                        <h4 className="texto_mas_pequeño">{state.cedula}</h4>
                                                    </Col>
                                                <Col className="info_texto" xs={"3"} md={"2"}>
                                                      <h4 className="texto_mas_pequeño">{state.telefono}</h4>
                                                    </Col>
                                                <Col className="info_texto" xs={"3"} md={"2"}>
                                                      <h4 className="texto_mas_pequeño">ICETEX</h4>
                                                    </Col>
                                            </Row>
                                          )
                                        } 
                                      
                                      
                                      
                                    </Col>
                                </Row>
                                  <Row className="ficha_footer_pequeña">
                                    <Col xs={"6"}>
                                        <h4 className="texto_mas_pequeño">Monitor</h4>
                                        <h4 className="texto_mas_pequeño">Ultima actualización</h4>
                                    </Col>
                                    <Col xs={"6"}>
                                        <h4 className="texto_mas_pequeño">Profecional</h4>
                                        <h4 className="texto_mas_pequeño">Practicante</h4>
                                    </Col>
                                  </Row>

                                {
                                  (state.seleccionado) === '' ?
                                  (
                                    <Row className="infoRow2_pequeño">
                                      <Col xs={"12"} md={"9"}>
                                        <Row>
                                          <h4 className="bold">Programas academicos </h4>
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
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                                <label>label1</label>
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
                                                    <Switch onClick={handleChange}/>
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <label>label1</label>
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
                                                    <Switch disabled={true}/>
                                                  </Col>
                                                )
                                                :
                                                (
                                                  <Col xs={"1"} md={"1"}>
                                                  </Col>
                                                )
                                              }
                                              <Col xs={"3"} md={"4"}> 
                                              <label>label1</label>
                                              </Col>
                                              
                                        </Row>
                                      </Col>
                                      
                                    </Row>
                                  )
                                  :
                                  (
                                    <Row className="infoRow2">
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
                                              <label>label1</label>
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
                                              <label>label1</label>
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
                                                <label>label1</label>
                                              </Col>
                                              
                                        </Row>
                                      </Col>      
                                      
                                    </Row>
                                  )

                                }

                                
                            </Col>

                        </Row>
                  </Col>

          </Row>
          </div>






















































          <div class="d-none d-md-block col-12">
          <Row>
            <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} seleccionado={state.seleccionado} editar={state.editar}/>
          </Row>
        </div>


        </Col>


        


        <Col xs={"12"} lg={"3"} className="prueba1">
          <Info_registros></Info_registros>
        </Col>
        

        <div class="d-block d-md-none col-12">
          <Col>
            <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} seleccionado={state.seleccionado} editar={state.editar}/>
          </Col>
        </div>

        <div class="d-none d-md-block col-12">
          <Col xs={"12"}>
            <Ficha_footer></Ficha_footer>
          </Col>
        </div>
        



        
        

        
      </Row>
    )
}

export default Info_basica 