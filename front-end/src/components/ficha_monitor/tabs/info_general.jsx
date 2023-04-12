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

import actualizar_estudiante from '../../../service/actualizar_estudiante';



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

    const pk = props.codigo;

    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const temporal = false;

    const [state,set_state] = useState({

      editar : false,

      usuario : '',
      data_user : [],
      data_rol : [],

      seleccionado:props.codigo,

      id_usuario:'',
      nombres:'',
      apellidos: '',

      cedula:'',
      correo:'',
      sexo:'',
      telefono_res:'',
      dir_res:'',
      barrio_res:'',
      hijos:'',


      puntaje_icfes:'sin dato',
      año_ingreso_univalle:'sin dato',
      estrato:'sin dato',
      celular:'sin dato',
      email_alternativo:'sin dato',
      direccion_residencia:'sin dato',
      barrio:'sin dato',
      municipio_actual:'sin dato',
      pais_de_origen:'sin dato',
      grupo_etnico:'sin dato',
      actividad_simultánea:'sin dato',
      identidad_de_genero:'sin dato',
      sexo:'sin dato',
      estado_civil:'sin dato',
      cantidad_hijo:'sin dato',     
      actividades_tiempo_libre:'sin dato',
      deportes_que_practica:'sin dato',
      condicion_de_excepcion:'sin dato',
      otros_acompañamientos:'sin dato',
      ultima_actualizacion:'sin dato',


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

    useEffect((pk)=>{
      
      set_state({
             ...state,
            id_usuario:props.datos['id'],
            nombres : props.datos['nombre'],
            apellidos : props.datos['apellido'],
            correo : props.datos['email'],
            cedula : props.datos['num_doc'],
            telefono : props.datos['telefono_res'],
            sexo : props.datos['sexo'],
            telefono_res : props.datos['telefono_res'],
            celular : props.datos['celular'],
            dir_res : props.datos['dir_ini'],
            barrio_res : props.datos['barrio_res'],
            hijos : props.datos['hijos'],
            email_alternativo : props.datos['email'],
            direccion_residencia : props.datos['dir_res'],
            barrio : props.datos['barrio_res'] 
          })
          console.log("estos son los datos generales")
          console.log(props.datos)
      
    },[]
    );
    

    const handle_option_user = () => {
      console.log("este es data user")
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


          puntaje_icfes:'sin dato',
      año_ingreso_univalle:'sin dato',
      estrato:'sin dato',
      municipio_actual:'sin dato',
      pais_de_origen:'sin dato',
      grupo_etnico:'sin dato',
      actividad_simultánea:'sin dato',
      identidad_de_genero:'sin dato',
      estado_civil:'sin dato',
      actividades_tiempo_libre:'sin dato',
      deportes_que_practica:'sin dato',
      condicion_de_excepcion:'sin dato',
      otros_acompañamientos:'sin dato',
      ultima_actualizacion:'sin dato',


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





























  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow(false);






  const handle_upload_estudiante = (e) => {
    // Getting the files from the input

    let formData = new FormData();
  
    //Adding files to the formdata
    formData.append('id_nuevo_celular', state.nuevo_celular);
    formData.append('id_nuevo_telefono_res', state.nuevo_telefono_res);
    try {
      actualizar_estudiante.actualizar_estudiante(formData);
      set_state({
        ...state,
        info_modal: "El estudiante se asignó correctamente"
      })
    } catch (error) {
      set_state({
        ...state,
        info_modal: "ocurrio un error"
      })
    }
      setShow(true);
  }











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
          <Container className="container_informacion_general" xs={"12"} sm={"6"} 
                     onMouseEnter={handle_option_user}>
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
                              <h1 className="texto_subtitulo">Información del estudiante :{props.datos['nombre']}</h1>
                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Nombres</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                <h4 className="texto_pequeño" >{props.datos['nombre']}</h4>
                                          </Col>
                                    </Row>

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Apellidos</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{props.datos['apellido']}</h4>
                                          </Col>
                                    </Row>
                                    
                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Puntaje Icfes</h4>
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
                                          <h4 className="texto_pequeño_gris">Año ingreso Univalle</h4>
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
                                          <h4 className="texto_pequeño_gris">Estrato</h4>
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
                                          <h4 className="texto_pequeño_gris">Teléfono residencia</h4>
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
                                                      <h4 className="texto_pequeño" >{state.telefono_res}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Celular</h4>
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
                                          <h4 className="texto_pequeño_gris">Email alternativo</h4>
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
                                          <h4 className="texto_pequeño_gris">Dirección residencia</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.dir_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Barrio</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.barrio_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Municipio actual</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.municipio_actual}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general"> 
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">País de origen</h4>
                                          </Col>
                                          {
                                                      state.editar ?
                                                      (
                                                      <Col xs={"12"} md={"6"}>
                                                            {state.pais_de_origen}
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
                                          <h4 className="texto_pequeño_gris">Grupo étnico</h4>
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
                                                      <Select></Select>
                                                </Col>      
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Actividad simultánea</h4>
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
                                                      {state.actividad_simultánea}
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Identidad de género</h4>
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
                                          <h4 className="texto_pequeño_gris">Sexo</h4>
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
                                                      <h4 className="texto_pequeño" >{state.sexo}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Estado civil</h4>
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
                                          <h4 className="texto_pequeño_gris">Cantidad hijo/s</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input></input>
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
                                          <h4 className="texto_pequeño_gris">Actividades que realiza en su tiempo libre</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input></input>
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
                                          <h4 className="texto_pequeño_gris">Deportes que practica</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input></input>
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
                                          <h4 className="texto_pequeño_gris">Condiciòn de excepciòn</h4>
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
                                          <h4 className="texto_pequeño_gris">Otros acompañamientos</h4>
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
                    <h1 className="texto_subtitulo">Personas con quien vive</h1>

                    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Nombre Completo</Col>
                    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Parentesco</Col>

                    {state.editar ?
                    (
                        <Row className="row_flex_general">
                              <Col xs={"6"} md={"6"} className="texto_pequeño"><input className="texto_pequeño"></input></Col>
                              <Col xs={"6"} md={"6"} className="texto_pequeño"><input className="texto_pequeño"></input></Col>                            
                        </Row>
                        
                    )
                        :
                        (
                        <Row className="row_flex_general">
                              <Col xs={"6"} md={"6"} className="texto_pequeño">Ejemplo1</Col>
                              <Col xs={"6"} md={"6"} className="texto_pequeño">Parentesco1</Col>
                              <Col xs={"12"} className="col_adicionar_parentesco"><Button className="adicionar_parentesco"><i class="bi bi-plus-circle"></i></Button></Col>
                          </Row>
                        )
                        }
                </Row>
                
                <Row>
                        <h1 className="texto_subtitulo">Información general del acudiente de emergencia</h1>
                        <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Nombre Completo</Col>
                        <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Parentesco y Telefono</Col>
                        {state.editar ?
                              (
                              <Row className="row_flex_general">
                                    <Col xs={"6"} md={"6"}className="texto_pequeño"><input className="texto_pequeño"></input></Col>
                                    <Col xs={"6"} md={"6"}className="texto_pequeño"><input className="texto_pequeño"></input>
                                                                                    <br></br>
                                                                                    <input></input>
                                    </Col>  
                                                              
                        </Row>
                        
                        )
                      :
                      (
                      <Row className="row_flex_general">
                            <Col xs={"6"} md={"6"}className="texto_pequeño">{props.datos['acudiente']}</Col>
                            <Col xs={"6"} md={"6"}className="texto_pequeño"> falta parentesco <br></br> {props.datos['telefono_acudiente']} </Col>
                        </Row>
                      )
                      }
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">Observaciones</h1>
                    <h4 className="texto_pequeño">texto</h4>
                </Row>

            </Col>    
            
            <Modal show={show} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> {state.info_modal} el : {state.ultima_actualizacion}</Modal.Body>
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