import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';


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
      sexo:'',
      telefono_res:'',
      dir_res:'',
      barrio_res:'',
      hijos:'',




      puntaje_icfes:'0',
      año_ingreso_univalle:'0',
      estrato:'0',
      telefono_residencia:'0',
      celular:'0',
      email_alternativo:'0',
      direccion_residencia:'0',
      barrio:'0',
      municipio_actual:'0',
      pais_de_origen:'0',
      grupo_etnico:'0',
      actividad_simultánea:'0',
      identidad_de_genero:'0',
      sexo:'0',
      estado_civil:'0',
      cantidad_hijo:'0',     
      actividades_tiempo_libre:'0',
      deportes_que_practica:'0',
      condicion_de_excepcion:'0',
      otros_acompañamientos:'0',

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

      if(props.seleccionado === '')
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
        })
      }
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
                                <Button className="boton_editar_info_basica" onClick={esta_editando}>
                                  ACEPTAR
                                </Button>
                              </Col>
                              <Col xs={"6"} sm={"6"}>
                                <Button className="boton_editar_info_basica" onClick={esta_editando}>
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
                                    <Row className="row_flex">
                                    <Row>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Puntaje Icfes</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.puntaje_icfes}</h4>
                                          </Col>
                                    </Row>
                                    </Row>

                                    <Row className="row_flex">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Año ingreso Univalle</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.año_ingreso_univalle}</h4>
                                          </Col>
                                          
                                    </Row>


                                    <Row className="row_flex">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Estrato</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.estrato}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Teléfono residencia</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.telefono_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Celular</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.celular}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Email alternativo</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.email_alternativo}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Dirección residencia</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.dir_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Barrio</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.barrio_res}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Municipio actual</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.municipio_actual}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex"> 
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">País de origen</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.pais_de_origen}
                                          <Select></Select>
                                          </Col>               
                                    </Row>


                                    <Row className="row_flex"> 
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Grupo étnico</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.grupo_etnico}
                                          <Select></Select>
                                          </Col>           
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Actividad simultánea</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.actividad_simultánea}
                                          <Select></Select>

                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Identidad de género</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.identidad_de_genero}
                                          <Select></Select>
                                          </Col>                                        
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Sexo</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          {state.sexo}
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Estado civil</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.estado_civil}
                                          <Select></Select>
                                          </Col>
                                          
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Cantidad hijo/s</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.hijos}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Actividades que realiza en su tiempo libre</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state.actividades_tiempo_libre}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Deportes que practica</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño" >{state. deportes_que_practica}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                    <Col xs={"12"} md={"6"}>
                                    <h4 className="texto_pequeño">Condiciòn de excepciòn</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.condicion_de_excepcion}
                                          <Select></Select>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño">Otros acompañamientos</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                {state.otros_acompañamientos}
                                          <Select></Select>
                                          </Col>
                                    </Row>  
                              </Row>
                        </Col>
                  </Row>




                  <Row>
                    <h1 className="texto_subtitulo">PERSONAS CON QUIEN VIVE</h1>
                    <h3 className="texto_pequeño">Nombre Completo</h3><h3 className="texto_pequeño">Parentesco</h3>
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
            
        </Container>
        )
      
      
        
    )
}

export default Info_general 