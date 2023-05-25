import React, {useState} from 'react';
import Select from 'react-select'  ;
import {Container, Row, Col, Button} from "react-bootstrap";
import  {useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

//import DatePicker from 'react-datepicker';


var today = new Date();
var now = today.toLocaleString();


const Info_general = (props) =>{

    const temporal = false;

    // Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ 

    const lista_etnico = [];

    const [state,set_state] = useState({

      editar : false,

      usuario : '',
      data_user : [],
      data_rol : [],
      lista_etnico:[],                             // Tabla etnia
      lista_actividad_simultanea:[],            // Tabla act_simultanea
      lista_identidad_de_genero:[],              // Tabla identidad_gen
      lista_estado_civil:[],                      // Tabla estado_civil
      lista_condicion_de_excepcion:[],    // Tabla cond_excepcion
      seleccionado:props.codigo,

      id_usuario:props.datos['id'],

      nombres:props.datos['nombre'],
      apellidos: props.datos['apellido'],
      estrato:props.datos['estrato'],                                         
      direccion_residencia:props.datos['dir_res'],                            
      barrio:props.datos['barrio_res'],
      municipio_actual:props.datos['ciudad_res'],     
      pais_de_origen:props.datos['pais_origen'],
      personas_con_quien_vive : 'none',                                        
      acudiente_emergencia : props.datos['acudiente'], 
      tel_acudiente_emergencia : props.datos['telefono_acudiente'],                                                                           
      observaciones : 'none',     
            puntaje_icfes:props.datos['puntaje_icfes'],                       // Integer
            telefono_res:props.datos['telefono_res'],                         // BigIntegerField
            celular:props.datos['celular'],                                   // BigIntegerField
            email_alternativo:props.datos['email'],                           // CharField 
            sexo:props.datos['sexo'],                                         // CharField
            cantidad_hijo:props.datos['hijos'],                               // IntegerField
            actividades_tiempo_libre:props.datos['actividades_tiempo_libre'], // jajaj no se, la quire por ahora
            otros_acompañamientos:props.datos['otros_acompañamientos'],       // jajaj no se, la quire por ahora
            año_ingreso_univalle:props.datos['anio_ingreso'],                 // DateTimeField
            deportes_que_practica:props.datos['actividades_ocio_deporte'],

            grupo_etnico:props.datos['id_etnia'],                             // Tabla etnia
            actividad_simultanea:props.datos['id_act_simultanea'],            // Tabla act_simultanea
            identidad_de_genero:props.datos['id_identidad_gen'],              // Tabla identidad_gen
            estado_civil:props.datos['id_estado_civil'],                      // Tabla estado_civil
            condicion_de_excepcion:props.datos['id_cond_excepcion'],    // Tabla cond_excepcion


      ultima_actualizacion:'sin dato',                                         


      nuevo_puntaje_icfes:props.datos['puntaje_icfes'],
      nuevo_año_ingreso_univalle:props.datos['anio_ingreso'],
      nuevo_telefono_res:props.datos['telefono_res'],
      nuevo_celular:props.datos['celular'],
      nuevo_email_alternativo:props.datos['email'],
      nuevo_sexo:props.datos['sexo'],
      nuevo_cantidad_hijo:props.datos['hijos'],  
      nuevo_deportes_que_practica:props.datos['actividades_ocio_deporte'],
      nuevo_acudiente_emergencia : props.datos['acudiente'], 
      nuevo_tel_acudiente_emergencia : props.datos['telefono_acudiente'],

      nuevo_grupo_etnico:props.datos['id_etnia'],
      nuevo_actividad_simultanea:props.datos['id_act_simultanea'],
      nuevo_identidad_de_genero:props.datos['id_identidad_gen'],
      nuevo_estado_civil:props.datos['id_estado_civil'],
      nuevo_condicion_de_excepcion:props.datos['id_cond_excepcion'],

      nuevo_grupo_etnico_id:props.datos['el_id_de_etnia'],
      nuevo_actividad_simultanea_id:props.datos['el_id_de_act_simultanea'],
      nuevo_identidad_de_genero_id:props.datos['el_id_de_identidad_gen'],
      nuevo_estado_civil_id:props.datos['el_id_de_estado_civil'],
      nuevo_condicion_de_excepcion_id:props.datos['el_id_de_cond_excepcion'],
      //no estan por ahora
      nuevo_actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
      nuevo_otros_acompañamientos:props.datos['otros_acompañamientos'],
    })

/*
    useEffect(()=>{
      
      axios.get('http://localhost:8000/usuario_rol/grupos_etnicos/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.opcion_general,
              label: grupo.etnia, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_etnico : opciones
            })
            console.error('Entro a los grupos étnicos:');
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

      
      axios.get('http://localhost:8000/usuario_rol/grupos_etnicos/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.opcion_general,
              label: grupo.etnia, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_actividad_simultanea : opciones
            })
            console.error('Entro a act simul:');
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });      
      


    },[]
    );

    */
    const opciones_lista_Etico = ()=>{
      
      axios.get('http://localhost:8000/usuario_rol/grupos_etnicos/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.opcion_general,
              label: grupo.etnia, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_etnico : opciones
            })
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

    };

    const opciones_lista_Actividad_simultanea = ()=>{
      
      axios.get('http://localhost:8000/usuario_rol/actividad_simultanea/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.opcion_general,
              label: grupo.actividad, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_actividad_simultanea : opciones
            })
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

    };

    const opciones_lista_identidad_de_genero = ()=>{
      
      axios.get('http://localhost:8000/usuario_rol/identidad_gen/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.opcion_general,
              label: grupo.genero, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_identidad_de_genero : opciones
            })
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

    };

    const opciones_lista_estado_civil = ()=>{
      
      axios.get('http://localhost:8000/usuario_rol/estado_civil/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.id,
              label: grupo.estado_civil, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_estado_civil : opciones
            })
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

    };

    const opciones_lista_condicion_de_excepcion = ()=>{
      
      axios.get('http://localhost:8000/usuario_rol/condicion_de_excepcion/')
      .then((response) => {
            const grupos = response.data;
            const opciones = grupos.map((grupo) => ({
              value: grupo.id,
              label: grupo.alias, // Reemplaza 'nombre' con el campo correspondiente
              id: grupo.id
            }));
            set_state({
                  ...state,
                  lista_condicion_de_excepcion : opciones
            })
      })
      .catch((error) => {
        console.error('Error al obtener los grupos étnicos:');
      });

    };


      // Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ 
      // Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ Funciones de edicion ------------------ 
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
      nuevo_grupo_etnico:props.datos['id_etnia'],
      nuevo_actividad_simultanea:props.datos['id_act_simultanea'],
      nuevo_identidad_de_genero:props.datos['id_identidad_gen'],
      nuevo_sexo:props.datos['sexo'],
      nuevo_estado_civil:props.datos['id_estado_civil'],
      nuevo_cantidad_hijo:props.datos['cantidad_hijos'],  
      nuevo_actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
      nuevo_deportes_que_practica:props.datos['actividades_ocio_deporte'],
      nuevo_condicion_de_excepcion:props.datos['id_cond_excepcion'],
      nuevo_otros_acompañamientos:props.datos['otros_acompañamientos'],
    });






      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 
      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 
      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 

      const cambiar_datos = (e) => {
            set_state({
                  ...state,
                  [e.target.name] : e.target.value
            })
      }

      const cambiar_datos_select_etnia = (e) => {
            set_state({
              ...state,
              nuevo_grupo_etnico: e.label,
              nuevo_grupo_etnico_id: e.value
            });     
      }
      const cambiar_datos_select_actividad_simultanea = (e) => {
            set_state({
              ...state,
              nuevo_actividad_simultanea: e.label,
              nuevo_actividad_simultanea_id: e.value
            });     
      }
      const cambiar_datos_select_identidad_de_genero = (e) => {
            set_state({
              ...state,
              nuevo_identidad_de_genero: e.label,
              nuevo_identidad_de_genero_id: e.value
            });     
      }
      const cambiar_datos_select_estado_civil = (e) => {
            set_state({
              ...state,
              nuevo_estado_civil: e.label,
              nuevo_estado_civil_id: e.value
            });     
      }
      const cambiar_datos_select_condicion_de_excepcion = (e) => {
            set_state({
              ...state,
              nuevo_condicion_de_excepcion: e.label,
              nuevo_condicion_de_excepcion_id: e.value
            });     
      }
      const [show, setShow] = useState(false);
      const handleClose2 = () => setShow(false);



    // llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ 


  const handle_upload_estudiante = (e) => {

    let formData = new FormData();
      formData.append('puntaje_icfes', state.nuevo_puntaje_icfes)
      formData.append('telefono_res', state.nuevo_telefono_res)
      formData.append('celular', state.nuevo_celular)
      formData.append('email', state.nuevo_email_alternativo)
      formData.append('sexo', state.nuevo_sexo)      
      formData.append('cantidad_hijo', state.nuevo_cantidad_hijo)
      formData.append('actividades_ocio_deporte', state.nuevo_deportes_que_practica)
      formData.append('acudiente_emergencia', state.nuevo_acudiente_emergencia)
      formData.append('tel_acudiente_emergencia', state.nuevo_tel_acudiente_emergencia)

      formData.append('etnia', state.nuevo_grupo_etnico_id)
      formData.append('act_simultanea', state.nuevo_actividad_simultanea_id)
      formData.append('identidad_gen', state.nuevo_identidad_de_genero_id)
      formData.append('estado_civil', state.nuevo_estado_civil_id)
      formData.append('cond_excepcion', state.nuevo_condicion_de_excepcion_id)

      axios({
      url: 'http://localhost:8000/usuario_rol/estudiante_actualizacion/'+props.datos.id+'/',
      method: "POST",
      data: formData,
      })
      .then((res)=>{
            console.log("este es el response : " + res)
            set_state({
            ...state,
            puntaje_icfes:state.nuevo_puntaje_icfes,
            año_ingreso_univalle:state.nuevo_año_ingreso_univalle,
            telefono_res:state.nuevo_telefono_res,
            celular:state.nuevo_celular,
            email_alternativo:state.nuevo_email_alternativo,
            sexo:state.nuevo_sexo,
            cantidad_hijo:state.nuevo_cantidad_hijo,  
            actividades_tiempo_libre:state.nuevo_actividades_tiempo_libre,
            deportes_que_practica:state.nuevo_deportes_que_practica,
            otros_acompañamientos:state.nuevo_otros_acompañamientos,

            grupo_etnico:state.nuevo_grupo_etnico,
            actividad_simultanea:state.nuevo_actividad_simultanea,
            identidad_de_genero:state.nuevo_identidad_de_genero,
            estado_civil:state.nuevo_estado_civil,
            condicion_de_excepcion:state.nuevo_condicion_de_excepcion,

            editar : false,
            })
            console.log("pero que esta pasando ???" )
            alert("estudiante fue editado correctamente a :" + props.datos.id)
      })
      .catch(err=>{
            
            set_state({
                  ...state,
                  puntaje_icfes:state.nuevo_puntaje_icfes,
                  año_ingreso_univalle:state.nuevo_año_ingreso_univalle,
                  telefono_res:state.nuevo_telefono_res,
                  celular:state.nuevo_celular,
                  email_alternativo:state.nuevo_email_alternativo,
                  sexo:state.nuevo_sexo,
                  cantidad_hijo:state.nuevo_cantidad_hijo,  
                  actividades_tiempo_libre:state.nuevo_actividades_tiempo_libre,
                  deportes_que_practica:state.nuevo_deportes_que_practica,
                  otros_acompañamientos:state.nuevo_otros_acompañamientos,
      
                  grupo_etnico:state.nuevo_grupo_etnico,
                  actividad_simultanea:state.nuevo_actividad_simultanea,
                  identidad_de_genero:state.nuevo_identidad_de_genero,
                  estado_civil:state.nuevo_estado_civil,
                  condicion_de_excepcion:state.nuevo_condicion_de_excepcion,
      
                  editar : false,
                  })
                  console.log("pero que esta pasando ???" )
                  alert("estudiante fue editado correctamente a :" + props.datos.id)
                  
            //console.log("entra al malo")
            //alert("error al editar el estudiante : " + props.datos.id);
      })

  }


  const handle_upload_estudiante2 = (e) => {

      let formData = new FormData();
  
        formData.append('id_usuario', props.datos.id)
  
        formData.append('puntaje_icfes', state.nuevo_puntaje_icfes)
  //      formData.append('anio_ingreso', state.nuevo_año_ingreso_univalle)
        formData.append('telefono_res', state.nuevo_telefono_res)
        formData.append('celular', state.nuevo_celular)
        formData.append('email', state.nuevo_email_alternativo)
  
        formData.append('id_etnia', state.nuevo_grupo_etnico)      
        formData.append('id_act_simultanea', state.nuevo_actividad_simultanea)
        formData.append('id_identidad_gen', state.nuevo_identidad_de_genero)
        formData.append('sexo', state.nuevo_sexo)      
        formData.append('id_estado_civil', state.nuevo_estado_civil)
  
        formData.append('cantidad_hijos', state.nuevo_cantidad_hijo)
  //      formData.append('actividades_tiempo_libre', state.nuevo_actividades_tiempo_libre)
        formData.append('actividades_ocio_deporte', state.nuevo_deportes_que_practica)
        formData.append('otros_acompañamientos', state.nuevo_condicion_de_excepcion)
  //      formData.append('otros_acompañamientos', state.nuevo_otros_acompañamientos)
  
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
               actividad_simultanea:state.nuevo_actividad_simultanea,
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
  
    const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



    

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
                                                      <input name="nuevo_puntaje_icfes"
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.puntaje_icfes}>
                                                      </input>
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
                                                            onChange={cambiar_datos}></input>
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
                                                      onChange={cambiar_datos}
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
                                                      <input name="nuevo_email_alternativo" 
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.email_alternativo}>
                                                      </input>
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
                                          <Col xs={"12"} md={"6"}>
                                                {state.pais_de_origen}
                                          </Col>  
                                    </Row>

                                    <Row className="row_flex_general"> 
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Grupo étnico</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <Select
                                                            name="nuevo_grupo_etnico"
                                                            className="bold_select"
                                                            options={state.lista_etnico}
                                                            onMenuOpen={opciones_lista_Etico}
                                                            onChange={cambiar_datos_select_etnia}
                                                      />
                                                      {state.nuevo_grupo_etnico}
                                                      {state.nuevo_grupo_etnico_id}
                                                </Col>      
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.nuevo_grupo_etnico}
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
                                                      <Select
                                                      className="bold_select"
                                                      options={state.lista_actividad_simultanea}
                                                      onMenuOpen={opciones_lista_Actividad_simultanea}
                                                      onChange={cambiar_datos_select_actividad_simultanea}
                                                      />
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.actividad_simultanea}
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
                                                      <Select
                                                      className="bold_select"
                                                      options={state.lista_identidad_de_genero}
                                                      onMenuOpen={opciones_lista_identidad_de_genero}
                                                      onChange={cambiar_datos_select_identidad_de_genero}
                                                      />
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
                                                      <input name="nuevo_sexo" 
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.sexo}>
                                                      </input>
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
                                                      <Select
                                                      className="bold_select"
                                                      options={state.lista_estado_civil}
                                                      onMenuOpen={opciones_lista_estado_civil}
                                                      onChange={cambiar_datos_select_estado_civil}
                                                      />
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
                                                      <input name="nuevo_cantidad_hijo" 
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.cantidad_hijo}>
                                                      </input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <h4 className="texto_pequeño" >{state.cantidad_hijo}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>

                                    {
                                    /*
                                    
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
                                    */
                                    }

                                    <Row className="row_flex_general">
                                          <Col xs={"12"} md={"6"}>
                                          <h4 className="texto_pequeño_gris">Deportes que practica</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      <input name="nuevo_deportes_que_practica" 
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.deportes_que_practica}>
                                                      </input>
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
                                                      <Select
                                                      className="bold_select"
                                                      options={state.lista_condicion_de_excepcion}
                                                      onMenuOpen={opciones_lista_condicion_de_excepcion}
                                                      onChange={cambiar_datos_select_condicion_de_excepcion}
                                                      />
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"}>
                                                      {state.condicion_de_excepcion}
                                                </Col>
                                                )
                                          }
                                    </Row>


                                    {
                                    /*
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
                                    */
                                    }
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
                              <Col xs={"12"} className="col_adicionar_parentesco">
                                    <Button className="adicionar_parentesco">
                                          <i class="bi bi-plus-circle"></i>
                                    </Button>
                              </Col>
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
                              <Col xs={"12"} md={"6"}className="texto_pequeño">
                                    <input className="texto_pequeño"
                                          name="nuevo_deportes_que_practica" 
                                          onChange={cambiar_datos} 
                                          defaultValue={state.deportes_que_practica}></input>
                              </Col>
                              <Col xs={"12"} md={"6"}className="texto_pequeño">
                                    <input className="texto_pequeño"
                                          name="nuevo_deportes_que_practica" 
                                          onChange={cambiar_datos} 
                                          defaultValue={state.deportes_que_practica}></input>
                              </Col>  
                        </Row>
                        
                        )
                      :
                      (
                      <Row className="row_flex_general">
                            <Col xs={"12"} md={"6"}className="texto_pequeño">{props.datos['acudiente']}</Col>
                            <Col xs={"12"} md={"6"}className="texto_pequeño">{props.datos['telefono_acudiente']} </Col>
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