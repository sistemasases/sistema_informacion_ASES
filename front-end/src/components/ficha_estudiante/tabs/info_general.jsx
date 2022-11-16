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



/*

                                          <h4 className="texto_pequeño">Puntaje Icfes</h4>

                                          <h4 className="texto_pequeño">Año ingreso Univalle</h4>

                                          <h4 className="texto_pequeño">Estrato</h4>

                                          <h4 className="texto_pequeño">Teléfono residencia</h4>

                                          <h4 className="texto_pequeño">Celular</h4>
                              
                                          <h4 className="texto_pequeño">Email alternativo</h4>
                                                
                                          <h4 className="texto_pequeño">Dirección residencia</h4>

                                          <h4 className="texto_pequeño">Barrio</h4>
            
                                          <h4 className="texto_pequeño">Municipio actual</h4>
            
                                          <h4 className="texto_pequeño">País de origen</h4>

                                          <h4 className="texto_pequeño">Grupo étnico</h4>

                                          <h4 className="texto_pequeño">Actividad simultánea</h4>
            
                                          <h4 className="texto_pequeño">Identidad de género</h4>
                                          
                                          <h4 className="texto_pequeño">Sexo</h4>
      
                                          <h4 className="texto_pequeño">Estado civil</h4>
                                          
                                          <h4 className="texto_pequeño">Cantidad hijo/s</h4>
                                                
                                          <h4 className="texto_pequeño">Actividades que realiza en su tiempo libre</h4>
                                          
                                          <h4 className="texto_pequeño">Deportes que practica</h4>
            
                                          <h4 className="texto_pequeño">Condiciòn de excepciòn</h4>
    
                                          <h4 className="texto_pequeño">Otros acompañamientos</h4>
                                          
*/

var today = new Date();
var now = today.toLocaleString();

const Info_general = (props) =>{

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);


    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      
      show : false,

      editar : false,

      usuario : '',
      data_user : [],
      data_rol : [],

      seleccionado:props.seleccionado,

      id_usuario:'',
      nombres:'',
      apellidos: '',

      cedula:'',
      correo:'',
      telefono:'',
      sexo:'',
      telefono_res:'',
      dir_res:'',
      barrio_res:'',
      hijos:'',




      puntaje_icfes:'',
      año_ingreso_univalle:'',
      estrato:'',
      telefono_residencia:'',
      celular:'',
      email_alternativo:'',
      direccion_residencia:'',
      barrio:'',
      municipio_actual:'',
      pais_de_origen:'',
      grupo_etnico:'',
      actividad_simultánea:'',
      identidad_de_genero:'',
      sexo:'',
      estado_civil:'',
      cantidad_hijo:'',     
      actividades_tiempo_libre:'',
      deportes_que_practica:'',
      condicion_de_excepcion:'',
      otros_acompañamientos:'',
      ultima_actualizacion:'',


      nuevo_puntaje_icfes:'',
      nuevo_año_ingreso_univalle:'',
      nuevo_estrato:'',
      nuevo_telefono_res:'',
      nuevo_celular:'',
      nuevo_email_alternativo:'',
      nuevo_direccion_residencia:'',
      nuevo_barrio:'',
      nuevo_municipio_actual:'',
      nuevo_pais_de_origen:'',
      nuevo_grupo_etnico:'',
      nuevo_actividad_simultánea:'',
      nuevo_identidad_de_genero:'',
      nuevo_sexo:'',
      nuevo_estado_civil:'',
      nuevo_cantidad_hijo:'',     
      nuevo_actividades_tiempo_libre:'',
      nuevo_deportes_que_practica:'',
      nuevo_condicion_de_excepcion:'',
      nuevo_otros_acompañamientos:'',
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
      console.log(state.data_user)

      /*window.addEventListener('mousemove', handle_option_user)*/
      
    },[]
    );
    

    const handle_option_user = () => {
      console.log(state.data_user)

      if(state.data_user['length'] === 0)
      {
            set_state({
                  ...state,
                  id_usuario:state.id_usuario,
                  nombres : state.nombres,
                  apellidos : state.apellidos,
                  correo : state.correo,
                  cedula : state.cedula,
                  telefono : state.telefono,
                  sexo : state.sexo,
                  telefono_res : state.telefono_res,
                  dir_res : state.dir_res,
                  barrio_res : state.barrio_res,
                  hijos : state.hijos,
                })
      }
      else{
        set_state({
          ...state,
          id_usuario:state.data_user[props.seleccionado]['id'],
          nombres : state.data_user[props.seleccionado]['nombre'],
          apellidos : state.data_user[props.seleccionado]['apellido'],
          correo : state.data_user[props.seleccionado]['email'],
          cedula : state.data_user[props.seleccionado]['num_doc'],
          telefono : state.data_user[props.seleccionado]['telefono_res'],
          sexo : state.data_user[props.seleccionado]['sexo'],
          telefono_res : state.data_user[props.seleccionado]['telefono_res'],
          dir_res : state.data_user[props.seleccionado]['dir_res'],
          barrio_res : state.data_user[props.seleccionado]['barrio_res'],
          hijos : state.data_user[props.seleccionado]['hijos'],

          nuevo_puntaje_icfes:state.puntaje_icfes,
          nuevo_año_ingreso_univalle:state.año_ingreso_univalle,
          nuevo_estrato:state.estrato,
          nuevo_telefono_res:state.telefono_res,
          nuevo_celular:state.celular,
          nuevo_email_alternativo:state.email_alternativo,
          nuevo_direccion_residencia:state.direccion_residencia,
          nuevo_barrio:state.nuevo_barrio,
          nuevo_municipio_actual:state.municipio_actual,
          nuevo_pais_de_origen:state.pais_de_origen,
          nuevo_grupo_etnico:state.grupo_etnico,
          nuevo_actividad_simultánea:state.actividad_simultánea,
          nuevo_identidad_de_genero:state.identidad_de_genero,
          nuevo_sexo:state.sexo,
          nuevo_estado_civil:state.estado_civil,
          nuevo_cantidad_hijo:state.cantidad_hijo,     
          nuevo_actividades_tiempo_libre:state.actividades_tiempo_libre,
          nuevo_deportes_que_practica:state.deportes_que_practica,
          nuevo_condicion_de_excepcion:state.condicion_de_excepcion,
          nuevo_otros_acompañamientos:state.otros_acompañamientos,
        })
      }
    }

    const esta_editando = (e) => set_state({
      ...state,
      editar : true,
    });

    const esta_editando_cancelar = (e) => set_state({
      ...state,
      editar : false,

      nuevo_puntaje_icfes:state.puntaje_icfes,
          nuevo_año_ingreso_univalle:state.año_ingreso_univalle,
          nuevo_estrato:state.estrato,
          nuevo_telefono_res:state.telefono_res,
          nuevo_celular:state.celular,
          nuevo_email_alternativo:state.email_alternativo,
          nuevo_direccion_residencia:state.direccion_residencia,
          nuevo_barrio:state.nuevo_barrio,
          nuevo_municipio_actual:state.municipio_actual,
          nuevo_pais_de_origen:state.pais_de_origen,
          nuevo_grupo_etnico:state.grupo_etnico,
          nuevo_actividad_simultánea:state.actividad_simultánea,
          nuevo_identidad_de_genero:state.identidad_de_genero,
          nuevo_sexo:state.sexo,
          nuevo_estado_civil:state.estado_civil,
          nuevo_cantidad_hijo:state.cantidad_hijo,     
          nuevo_actividades_tiempo_libre:state.actividades_tiempo_libre,
          nuevo_deportes_que_practica:state.deportes_que_practica,
          nuevo_condicion_de_excepcion:state.condicion_de_excepcion,
          nuevo_otros_acompañamientos:state.otros_acompañamientos,
    });



    const handle_upload_info_estudiante = (e) => {


      set_state({
            ...state,
            editar : false,

            puntaje_icfes:state.nuevo_puntaje_icfes,
            año_ingreso_univalle:state.nuevo_año_ingreso_univalle,
            estrato:state.nuevo_estrato,
            telefono_res:state.nuevo_telefono_res, 
            celular:state.nuevo_celular,
            email_alternativo:state.nuevo_email_alternativo,
            direccion_residencia:state.nuevo_direccion_residencia,
            barrio:state.nuevo_nuevo_barrio,
            municipio_actual:state.nuevo_municipio_actual,
            pais_de_origen:state.nuevo_pais_de_origen,
            grupo_etnico:state.nuevo_grupo_etnico,
            actividad_simultánea:state.nuevo_actividad_simultánea,
            identidad_de_genero:state.nuevo_identidad_de_genero,
            sexo:state.nuevo_sexo,
            estado_civil:state.nuevo_estado_civil,
            cantidad_hijo:state.nuevo_cantidad_hijo,     
            actividades_tiempo_libre:state.nuevo_actividades_tiempo_libre,
            deportes_que_practica:state.nuevo_deportes_que_practica,
            condicion_de_excepcion:state.nuevo_condicion_de_excepcion,
            otros_acompañamientos:state.nuevo_otros_acompañamientos,
            ultima_actualizacion:now,
      })

      console.log("tel residencia")
      console.log(state.telefono_res)
      console.log("nuevo tel res")
      console.log(state.nuevo_telefono_res)

      // Getting the files from the input
      console.log(state.nuevo_telefono_res)
      let formData = new FormData();
    
      //Adding files to the formdata
      formData.append('id_nuevo_num_doc', state.cedula);
      formData.append('id_nuevo_telefono_res', state.nuevo_telefono_res);

      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/estudiante_actualizacion/",
        method: "POST",
        data: formData,
      })
      .then(res=>{set_state({
        ...state,
        info_modal: "El rol se asignó correctamente",

      })})
      .catch(err=>{
        set_state({
          ...state,
          info_modal: "ocurrio un error",
          editar : false,

      })})

      set_state({
            ...state,
            show:true,

            
      })


    }


    const cambiar_dato = (e) =>{
          set_state({
                ...state,
                [e.target.name] : e.target.value
          })
    }

    const handleClose = () => {
          set_state({
                ...state,
                show : false,
          })
    }


    

    return (
      
        (props.seleccionado) === '' ?
        (<Row></Row>)
        :
        (
          <Container className="container_informacion_general" xs={"12"} sm={"6"} 
                     onMouseEnter={handle_option_user}>
            <Col xs={"12"}>
            {
                          state.editar ?
                          (
                            <Row>
                              <Col xs={"6"} sm={"6"}>
                                <Button className="boton_editar_info_basica" onClick={handle_upload_info_estudiante}>
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

                              {
                                  props.rolUsuario == 'superSistemas' ?
                                  (
                                    <Col xs={"12"} sm={"12"}>
                                      <Button className="boton_editar_info_basica" onClick={esta_editando}>
                                        EDITAR INFORMACIÓN
                                      </Button>
                                    </Col>
                                  )
                                  :
                                  (
                                    <Col xs={"12"} sm={"12"}>
                                      <Button className="boton_editar_info_basica" >
                                        EDITAR INFORMACIÓN
                                      </Button>
                                    </Col>
                                  )
                                }
                              
                            </Row>
                          )
                        }
                        

                  <Row>
                        <Col xs={"12"}>
                              <Row>
                              <h1 className="texto_subtitulo">INFORMACIÓN DEL ESTUDIANTE : {state.nombres}</h1>
                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Nombres</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                <h4 className="texto_pequeño" >{state.nombres}</h4>
                                          </Col>
                                    </Row>

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Apellidos</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.apellidos}</h4>
                                          </Col>
                                    </Row>
                                    
                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Puntaje Icfes</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input defaultValue={state.puntaje_icfes}></input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4  className="texto_pequeño" >{state.puntaje_icfes}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Año ingreso Univalle</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input defaultValue={state.año_ingreso_univalle}></input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.año_ingreso_univalle}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Estrato</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.estrato}</h4>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.estrato}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Teléfono residencia</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input name="nuevo_telefono_res" defaultValue={state.nuevo_telefono_res}
                                                            onChange={cambiar_dato}></input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.nuevo_telefono_res}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Celular</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input name="nuevo_celular" defaultValue={state.celular}
                                                      onChange={cambiar_dato}
                                                      ></input>
                                                      
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.celular}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Email alternativo</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input defaultValue={state.email_alternativo}></input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.email_alternativo}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Dirección residencia</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.dir_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Barrio</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.barrio_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Municipio actual</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.municipio_actual}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general"> 
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">País de origen</h4>
                                          </Col>
                                          {
                                                      state.editar ?
                                                      (
                                                      <Col xs={"12"} md={"6"}>
                                                            <Select></Select>
                                                      </Col>  
                                                      )
                                                      :
                                                      (
                                                      <Col xs={"12"} md={"6"}>
                                                            {state.pais_de_origen}
                                                      </Col>  
                                                      )
                                          }
                                                       
                                    </Row>


                                    <Row className="row_flex_general"> 
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Grupo étnico</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                      <Col xs={"12"} md={"6"}>
                                                      {state.grupo_etnico}
                                                </Col>      
                                                ):
                                                (
                                                      <Col xs={"12"} md={"6"}>
                                                <Select></Select>
                                                </Col>      
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Actividad simultánea</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.actividad_simultánea}
      
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select></Select>
      
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Identidad de género</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select></Select>
                                                </Col>   
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.identidad_de_genero}
                                                </Col>   
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Sexo</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.sexo}</h4>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.sexo}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Estado civil</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select></Select>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.estado_civil}
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Cantidad hijo/s</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.hijos}</h4>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.hijos}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Actividades que realiza en su tiempo libre</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.actividades_tiempo_libre}</h4>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.actividades_tiempo_libre}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Deportes que practica</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.deportes_que_practica}</h4>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.deportes_que_practica}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Condiciòn de excepciòn</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select></Select>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.condicion_de_excepcion}
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Otros acompañamientos</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select></Select>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.otros_acompañamientos}
                                                </Col>
                                                )
                                          }
                                    </Row>  
                              </Row>
                        </Col>
                  </Row>




                  <Row>
                    <h1 className="texto_subtitulo">PERSONAS CON QUIEN VIVE</h1>
                    {state.editar ?
                    (
                        <Row className="row_flex_general">
                            <h3 className="texto_pequeño">Nombre Completo</h3>
                            <h3 className="texto_pequeño">Parentesco</h3>
                        </Row>
                    )
                        :
                        (
                        <Row className="row_flex_general">
                            <input className="texto_pequeño"></input>
                            <input className="texto_pequeño"></input>
                        </Row>
                        )
                        }
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">INFORMACIÓN DEL ACUDIENTE O CONTACTO DE EMERGENCIA</h1>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">Observaciones</h1>
                    <h4 className="texto_pequeño">texto</h4>
                </Row>

            </Col>    
            
            <Modal show={state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Actualizacion realizada el : {state.ultima_actualizacion}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
        )
      
      
        
    )
}

export default Info_general 