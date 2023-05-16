import React, {useState} from 'react';
import Select from 'react-select'  ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


var today = new Date();
var now = today.toLocaleString();


const Info_general = (props) =>{

    const temporal = false;

    // Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ 

    const [state,set_state] = useState({

      editar : false,

      usuario : '',
      data_user : [],
      data_rol : [],

      seleccionado:props.codigo,

      id_usuario:props.datos['id'],

      nombres:props.datos['nombre'],
      apellidos: props.datos['apellido'],
            puntaje_icfes:props.datos['puntaje_icfes'],
            año_ingreso_univalle:props.datos['año_ingreso'],
      estrato:props.datos['estrato'],
            telefono_res:props.datos['telefono_res'],
            celular:props.datos['celular'],
            email_alternativo:props.datos['email'],
      direccion_residencia:props.datos['dir_res'],
      barrio:props.datos['barrio_res'],
      municipio_actual:props.datos['municipio_actual'],
      pais_de_origen:props.datos['pais_origen'],
            grupo_etnico:props.datos['grupo_etnico'],
            actividad_simultánea:props.datos['actividad_simultanea'],
            identidad_de_genero:props.datos['identidad_De_genero'],
            sexo:props.datos['sexo'],
            estado_civil:props.datos['estado_civil'],
            cantidad_hijo:props.datos['hijos'],  
            actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
            deportes_que_practica:props.datos['deportes_que_practica'],
            condicion_de_excepcion:props.datos['condicion_excepcion'],
            otros_acompañamientos:props.datos['otros_acompañamientos'],

      ultima_actualizacion:'sin dato',


      nuevo_puntaje_icfes:props.datos['puntaje_icfes'],
      nuevo_año_ingreso_univalle:props.datos['año_ingreso'],
      nuevo_telefono_res:props.datos['telefono_res'],
      nuevo_celular:props.datos['celular'],
      nuevo_email_alternativo:props.datos['email'],
      nuevo_nuevo_grupo_etnico:props.datos['grupo_etnico'],
      nuevo_actividad_simultánea:props.datos['actividad_simultanea'],
      nuevo_identidad_de_genero:props.datos['identidad_De_genero'],
      nuevo_sexo:props.datos['sexo'],
      nuevo_estado_civil:props.datos['estado_civil'],
      nuevo_cantidad_hijo:props.datos['cantidad_hijos'],  
      nuevo_actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
      nuevo_deportes_que_practica:props.datos['deportes_que_practica'],
      nuevo_condicion_de_excepcion:props.datos['condicion_excepcion'],
      nuevo_otros_acompañamientos:props.datos['otros_acompañamientos'],
    })

    useEffect(()=>{

      alert("estos son los dato que ahi : " + props.datos['estrato'])

    },[]
    );





    // Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ 
    
    const esta_editando = (e) => set_state({
      ...state,
      editar : true,
    });

    const esta_editando_cancelar = (e) => set_state({
      ...state,
      editar : false,
      nuevo_puntaje_icfes:props.datos['puntaje_icfes'],
      nuevo_año_ingreso_univalle:props.datos['año_ingreso'],
      nuevo_telefono_res:props.datos['telefono_res'],
      nuevo_celular:props.datos['celular'],
      nuevo_email_alternativo:props.datos['email'],
      nuevo_nuevo_grupo_etnico:props.datos['grupo_etnico'],
      nuevo_actividad_simultánea:props.datos['actividad_simultanea'],
      nuevo_identidad_de_genero:props.datos['identidad_De_genero'],
      nuevo_sexo:props.datos['sexo'],
      nuevo_estado_civil:props.datos['estado_civil'],
      nuevo_cantidad_hijo:props.datos['cantidad_hijos'],  
      nuevo_actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
      nuevo_deportes_que_practica:props.datos['deportes_que_practica'],
      nuevo_condicion_de_excepcion:props.datos['condicion_excepcion'],
      nuevo_otros_acompañamientos:props.datos['otros_acompañamientos'],
    });






    // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 

      const cambiarDatos = (e) => {

            set_state({
                  ...state,
                  [e.target.name] : e.target.value
            })

      }
      
      const [show, setShow] = useState(false);
      const handleClose2 = () => setShow(false);



    // llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ 


  const handle_upload_estudiante = (e) => {

    let formData = new FormData();

      alert("primer"+ state.nuevo_email_alternativo)

      formData.append('email', state.nuevo_email_alternativo)

      axios({
      url: 'http://localhost:8000/usuario_rol/estudiante_actualizacion/'+props.datos.id+'/',
      method: "POST",
      data: formData,
        })
        .then((res)=>{
        console.log(res)
        set_state({
             ...state,

             puntaje_icfes:state.nuevo_puntaje_icfes,
             año_ingreso_univalle:state.nuevo_año_ingreso_univalle,
             telefono_res:state.nuevo_telefono_res,
             celular:state.nuevo_celular,
             email_alternativo:state.nuevo_email_alternativo,
             grupo_etnico:state.nuevo_state.nuevo_grupo_etnico,
             actividad_simultánea:state.nuevo_actividad_simultánea,
             identidad_de_genero:state.nuevo_identidad_de_genero,
             sexo:state.nuevo_sexo,
             estado_civil:state.nuevo_estado_civil,
             cantidad_hijo:state.nuevo_cantidad_hijo,  
             actividades_tiempo_libre:state.nuevo_actividades_tiempo_libre,
             deportes_que_practica:state.nuevo_deportes_que_practica,
             condicion_de_excepcion:state.nuevo_condicion_de_excepcion,
             otros_acompañamientos:state.nuevo_otros_acompañamientos,

            editar : false,
          })
            alert("estudiante fue editado correctamente a :" + props.datos.id)
        })
        .catch(err=>{
            alert("error al editar el estudiante : " + props.datos.id);
        })

  }




    

    return (
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
                                                      <input onChange={cambiarDatos} defaultValue={state.puntaje_icfes}></input>
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
                                                      <input name="nuevo_telefono_res" defaultValue={state.telefono_res}
                                                            onChange={cambiarDatos}></input>
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
                                                      onChange={cambiarDatos}
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
                                                      <input name="nuevo_email_alternativo" onChange={cambiarDatos} defaultValue={state.email_alternativo}></input>
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
                                                <h4 className="texto_pequeño" >{state.direccion_residencia}</h4>
                                          </Col>
                                    </Row>


                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                                <h4 className="texto_pequeño_gris">Barrio</h4>
                                          </Col>
                                          <Col xs={"12"} md={"6"}>
                                                <h4 className="texto_pequeño" >{state.barrio}</h4>
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
                                          <h4 className="texto_pequeño_gris">Cantidad hijo(s)</h4>
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
                                                      <h4 className="texto_pequeño" >{state.cantidad_hijo}</h4>
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
                                          <h4 className="texto_pequeño_gris">Condición de excepciòn</h4>
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
                    <h1 className="texto_subtitulo">Personas con quién vive</h1>

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
                        <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Parentesco y Teléfono</Col>
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
}

export default Info_general 