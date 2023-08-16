import React, {useState} from 'react';
import Select from 'react-select'  ;
import {Container, Row, Col, Button} from "react-bootstrap";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

//import DatePicker from 'react-datepicker';



const Info_general = (props) =>{

      const config = {
            headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
      };

      const config2 = {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
      };


    // Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ Set valores ------------------ 


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
      agregarPariente: false,
      
      id_usuario:props.datos['id'],

      nombres:props.datos['nombre'],
      apellidos: props.datos['apellido'],
      estrato:props.datos['estrato'],                                         
      direccion_residencia:props.datos['dir_res'],                            
      barrio:props.datos['barrio_res'],
      municipio_actual:props.datos['ciudad_res'],     
      pais_de_origen:props.datos['pais_origen'],
      personas_con_quien_vive : props.datos['vive_con'],                                        
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

            grupo_etnico:props.datos['el_id_de_etnia'],                             // Tabla etnia
            actividad_simultanea:props.datos['el_id_de_act_simultanea'],            // Tabla act_simultanea
            identidad_de_genero:props.datos['el_id_de_identidad_gen'],              // Tabla identidad_gen
            estado_civil:props.datos['el_id_de_estado_civil'],                      // Tabla estado_civil
            condicion_de_excepcion:props.datos['el_id_de_cond_excepcion'],    // Tabla cond_excepcion


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

      nuevo_personas_con_quien_vive : props.datos['vive_con'],                                      

    })

    const opciones_lista_Etico = ()=>{
      
      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/grupos_etnicos/`, config)
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
      
      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/actividad_simultanea/`, config)
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
      
      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/identidad_gen/`, config)
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
      
      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/estado_civil/`, config)
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
      
      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/condicion_de_excepcion/`, config)
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
      nuevo_grupo_etnico_id:props.datos['id_etnia'],
      nuevo_actividad_simultanea_id:props.datos['id_act_simultanea'],
      nuevo_identidad_de_genero_id:props.datos['id_identidad_gen'],
      nuevo_sexo:props.datos['sexo'],
      nuevo_estado_civil_id:props.datos['id_estado_civil'],
      nuevo_cantidad_hijo:props.datos['cantidad_hijos'],  
      nuevo_actividades_tiempo_libre:props.datos['actividades_tiempo_libre'],
      nuevo_deportes_que_practica:props.datos['actividades_ocio_deporte'],
      nuevo_condicion_de_excepcion_id:props.datos['id_cond_excepcion'],
      nuevo_otros_acompañamientos:props.datos['otros_acompañamientos'],
    });



const agregarPariente = () => {
  if (!Array.isArray(state.nuevo_personas_con_quien_vive)) {
    set_state({
      ...state,
      nuevo_personas_con_quien_vive: [{
        pariente: "",
        nombre: "",
      }],
      agregarPariente: true,
    });
  } else {
    set_state({
      ...state,
      nuevo_personas_con_quien_vive: state.nuevo_personas_con_quien_vive.concat({
        pariente: "",
        nombre: "",
      }),
      agregarPariente: true,
    });
  }
};


    
    const guardarPariente = () => {
      set_state({
            ...state,
      personas_con_quien_vive: state.nuevo_personas_con_quien_vive,
      agregarPariente: false,
      })

      handle_upload_estudiante()
    };


  const cancelarPariente = () => {
      set_state({
            ...state,
      nuevo_personas_con_quien_vive: state.personas_con_quien_vive,
      agregarPariente: false,
      })
    };

      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 
      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 
      // zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ zona para Activar/Desactivar cosas ------------------ 

      // const cambiar_datos = (e) => {
      //       set_state({
      //             ...state,
      //             [e.target.name] : e.target.value
      //       })
      // }
      const cambiar_datos = (e) => {
      if (e.target.name.startsWith("nuevo_personas_con_quien_vive")) {
      // Si el campo está relacionado con personas con quien vive, actualiza el estado
      const [indexStr, field] = e.target.name.match(/\[(\d+)\]\.(.*)/).slice(1);
      const index = parseInt(indexStr);
      set_state((prevState) => {
            const newPersonasConQuienVive = [...prevState.nuevo_personas_con_quien_vive];
            newPersonasConQuienVive[index] = {
            ...newPersonasConQuienVive[index],
            [field]: e.target.value,
            };
            return {
            ...prevState,
            nuevo_personas_con_quien_vive: newPersonasConQuienVive,
            };
      });
      console.log("este esl personas con quie viv :  " + state.nuevo_personas_con_quien_vive)
      } else {
      // Si no, actualiza los demás campos normalmente
      set_state({
            ...state,
            [e.target.name]: e.target.value,
      });
      }
      };


      const cambiar_datos_select_etnia = (e) => {
            set_state({
              ...state,
              nuevo_grupo_etnico: e.value,
              nuevo_grupo_etnico_id: e.label
            });     
      }
      const cambiar_datos_select_actividad_simultanea = (e) => {
            set_state({
              ...state,
              nuevo_actividad_simultanea: e.value,
              nuevo_actividad_simultanea_id: e.label
            });     
      }
      const cambiar_datos_select_identidad_de_genero = (e) => {
            set_state({
              ...state,
              nuevo_identidad_de_genero: e.value,
              nuevo_identidad_de_genero_id: e.label
            });     
      }
      const cambiar_datos_select_estado_civil = (e) => {
            set_state({
              ...state,
              nuevo_estado_civil: e.value,
              nuevo_estado_civil_id: e.label
            });     
      }
      const cambiar_datos_select_condicion_de_excepcion = (e) => {
            set_state({
              ...state,
              nuevo_condicion_de_excepcion: e.value,
              nuevo_condicion_de_excepcion_id: e.label
            });     
      }
      const [show, setShow] = useState(false);
      const handleClose2 = () => setShow(false);



    // llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ llamados ------------------ 


  const handle_upload_estudiante = (e) => {
      const fechaHoraActual = new Date().toISOString();

    let formData = new FormData();
      formData.append('puntaje_icfes', state.nuevo_puntaje_icfes !== null ? state.nuevo_puntaje_icfes : [null])
      formData.append('telefono_res', state.nuevo_telefono_res)
      formData.append('celular', state.nuevo_celular)
      formData.append('email', state.nuevo_email_alternativo)
      formData.append('sexo', state.nuevo_sexo)      
      formData.append('hijos', state.nuevo_cantidad_hijo)
      formData.append('actividades_ocio_deporte', state.nuevo_deportes_que_practica)
      formData.append('acudiente', state.nuevo_acudiente_emergencia)
      formData.append('telefono_acudiente', state.nuevo_tel_acudiente_emergencia !== null ? [state.nuevo_tel_acudiente_emergencia] : [null])

      formData.append('id_etnia', state.nuevo_grupo_etnico !== null ? state.nuevo_grupo_etnico : [null]);
      formData.append('id_act_simultanea', state.nuevo_actividad_simultanea !== null ? state.nuevo_actividad_simultanea : [null]);
      formData.append('id_identidad_gen', state.nuevo_identidad_de_genero !== null ? state.nuevo_identidad_de_genero : [null]);
      formData.append('id_estado_civil', state.nuevo_estado_civil !== null ? state.nuevo_estado_civil : [null]);
      formData.append('id_cond_excepcion', state.nuevo_condicion_de_excepcion !== null ? state.nuevo_condicion_de_excepcion : [null]);
      
      formData.append("vive_con", JSON.stringify(state.nuevo_personas_con_quien_vive));
      formData.append("ult_modificacion", fechaHoraActual);


      axios({
      url: `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_actualizacion/`+props.datos.id+'/',
      method: "POST",
      data: formData,
      headers: config2,
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

            grupo_etnico:state.nuevo_grupo_etnico_id,
            actividad_simultanea:state.nuevo_actividad_simultanea_id,
            identidad_de_genero:state.nuevo_identidad_de_genero_id,
            estado_civil:state.nuevo_estado_civil_id,
            condicion_de_excepcion:state.nuevo_condicion_de_excepcion_id,
            personas_con_quien_vive:state.nuevo_personas_con_quien_vive,

            editar : false,
            })
            console.log("pero que esta pasando ???" )
            alert("estudiante fue editado correctamente a :" + props.datos.id)
      })
      .catch(err=>{
            
            set_state({
                  ...state,
                  puntaje_icfes:state.puntaje_icfes,
                  año_ingreso_univalle:state.año_ingreso_univalle,
                  telefono_res:state.telefono_res,
                  celular:state.celular,
                  email_alternativo:state.email_alternativo,
                  sexo:state.sexo,
                  cantidad_hijo:state.cantidad_hijo,  
                  actividades_tiempo_libre:state.actividades_tiempo_libre,
                  deportes_que_practica:state.deportes_que_practica,
                  otros_acompañamientos:state.otros_acompañamientos,
      
                  grupo_etnico:state.grupo_etnico,
                  actividad_simultanea:state.actividad_simultanea,
                  identidad_de_genero:state.identidad_de_genero,
                  estado_civil:state.estado_civil,
                  condicion_de_excepcion:state.condicion_de_excepcion,
                  personas_con_quien_vive:state.personas_con_quien_vive,

                  editar : true,
                  })
                  console.log("pero que esta pasando ???" )
                  alert("error al editar el estudiante :" + err)
                  
            //console.log("entra al malo")
            //alert("error al editar el estudiante : " + props.datos.id);
      })


       //props.handleOptionUser({ value: props.datos['id'] });

  }


    return (
          <Container className="container_informacion_general" xs={"12"} sm={"6"} >
            <Col xs={"12"}>
            {/*
            <li >{JSON.stringify(state.nuevo_personas_con_quien_vive)}</li>
            <li >{JSON.stringify(state.personas_con_quien_vive)}</li>
            */}

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
                                  props.rolUsuario === 'superSistemas' ?
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

                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Nombres</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_12pt" >{props.datos['nombre']}</h4>
                                    </Col>



                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Apellidos</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_12pt" >{props.datos['apellido']}</h4>
                                    </Col>
                                    


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Puntaje Icfes</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <input name="nuevo_puntaje_icfes"
                                                      onChange={cambiar_datos} 
                                                      defaultValue={state.puntaje_icfes}>
                                                </input>
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4  className="texto_pequeño_12pt" >{state.puntaje_icfes}</h4>
                                          </Col>
                                          )
                                    }



                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Año ingreso Univalle</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.año_ingreso_univalle}</h4>
                                          </Col>
                                          )
                                    }



                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Teléfono residencia</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <input name="nuevo_telefono_res" defaultValue={state.telefono_res}
                                                      onChange={cambiar_datos}></input>
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.telefono_res}</h4>
                                          </Col>
                                          )
                                    }


                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Celular</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"3"} className="row_flex_general">
                                                      <input name="nuevo_celular" defaultValue={state.celular}
                                                      onChange={cambiar_datos}
                                                      ></input>
                                                      
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"3"} className="row_flex_general">
                                                      <h4 className="texto_pequeño_12pt" >{state.celular}</h4>
                                                </Col>
                                                )
                                          }


                                          <Col xs={"12"} md={"6"} className="row_flex_general">
                                                <h4 className="texto_pequeño_gris">Email alternativo</h4>
                                          </Col>
                                          {
                                                state.editar ?
                                                (
                                                <Col xs={"12"} md={"6"} className="row_flex_general">
                                                      <input name="nuevo_email_alternativo" 
                                                            onChange={cambiar_datos} 
                                                            defaultValue={state.email_alternativo}>
                                                      </input>
                                                </Col>
                                                ):
                                                (
                                                <Col xs={"12"} md={"6"} className="row_flex_general">
                                                      <h4 className="texto_pequeño_12pt" >{state.email_alternativo}</h4>
                                                </Col>
                                                )
                                          }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Estrato</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.estrato}</h4>
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.estrato}</h4>
                                          </Col>
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Dirección residencia</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_12pt" >{state.direccion_residencia}</h4>
                                    </Col>


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Barrio</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_12pt" >{state.barrio}</h4>
                                    </Col>

                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Municipio actual</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_12pt" >{state.municipio_actual}</h4>
                                    </Col>

                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">País de origen</h4>
                                    </Col>
                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          {state.pais_de_origen}
                                    </Col>  

                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                    <h4 className="texto_pequeño_gris">Grupo étnico</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <Select
                                                      name="nuevo_grupo_etnico"
                                                      className="bold_select"
                                                      options={state.lista_etnico}
                                                      onMenuOpen={opciones_lista_Etico}
                                                      onChange={cambiar_datos_select_etnia}
                                                />
                                          </Col>      
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                {state.nuevo_grupo_etnico_id}
                                          </Col>      
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Actividad simultánea</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <Select
                                                className="bold_select"
                                                options={state.lista_actividad_simultanea}
                                                onMenuOpen={opciones_lista_Actividad_simultanea}
                                                onChange={cambiar_datos_select_actividad_simultanea}
                                                />
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                {state.actividad_simultanea}
                                          </Col>
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Identidad de género</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <Select
                                                className="bold_select"
                                                options={state.lista_identidad_de_genero}
                                                onMenuOpen={opciones_lista_identidad_de_genero}
                                                onChange={cambiar_datos_select_identidad_de_genero}
                                                />
                                          </Col>   
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                {state.identidad_de_genero}
                                          </Col>   
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Sexo</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <input name="nuevo_sexo" 
                                                      onChange={cambiar_datos} 
                                                      defaultValue={state.sexo}>
                                                </input>
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.sexo}</h4>
                                          </Col>
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Estado civil</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <Select
                                                className="bold_select"
                                                options={state.lista_estado_civil}
                                                onMenuOpen={opciones_lista_estado_civil}
                                                onChange={cambiar_datos_select_estado_civil}
                                                />
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                {state.estado_civil}
                                          </Col>
                                          )
                                    }


                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Cantidad hijo(s)</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <input name="nuevo_cantidad_hijo" 
                                                      onChange={cambiar_datos} 
                                                      defaultValue={state.cantidad_hijo}>
                                                </input>
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.cantidad_hijo}</h4>
                                          </Col>
                                          )
                                    }

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
                                                      <h4 className="texto_pequeño_12pt" >{state.actividades_tiempo_libre}</h4>
                                                </Col>
                                                )
                                          }
                                    </Row>
                                    */
                                    }

                                    <Col xs={"12"} md={"3"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Deportes que practica</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <input name="nuevo_deportes_que_practica" 
                                                      onChange={cambiar_datos} 
                                                      defaultValue={state.deportes_que_practica}>
                                                </input>
                                          </Col>
                                          ):
                                          ( 
                                          <Col xs={"12"} md={"3"} className="row_flex_general">
                                                <h4 className="texto_pequeño_12pt" >{state.deportes_que_practica}</h4>
                                          </Col>
                                          )
                                    }


                                    <Col xs={"12"} md={"6"} className="row_flex_general">
                                          <h4 className="texto_pequeño_gris">Condición de excepciòn</h4>
                                    </Col>
                                    {
                                          state.editar ?
                                          (
                                          <Col xs={"12"} md={"6"} className="row_flex_general">
                                                <Select
                                                className="bold_select"
                                                options={state.lista_condicion_de_excepcion}
                                                onMenuOpen={opciones_lista_condicion_de_excepcion}
                                                onChange={cambiar_datos_select_condicion_de_excepcion}
                                                />
                                          </Col>
                                          ):
                                          (
                                          <Col xs={"12"} md={"6"} className="row_flex_general">
                                                {state.condicion_de_excepcion}
                                          </Col>
                                          )
                                    }


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

{state.personas_con_quien_vive !== null ? (
  <Row>
    <h1 className="texto_subtitulo">Personas con quién vive</h1>
    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">
      Nombre Completo
    </Col>
    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">
      Parentesco
    </Col>

    {state.editar || state.agregarPariente ? (
      <Row>
      {
        state.personas_con_quien_vive.length > 0 ?
        (
          <Row>
              {state.nuevo_personas_con_quien_vive.map((item, index) => (
                <Row className="row_flex_general">
                  <Col xs={"6"} md={"6"} className="texto_pequeño_12pt">
                    <input
                      className="texto_pequeño_12pt"
                      name={`nuevo_personas_con_quien_vive[${index}].nombre`}
                      onChange={cambiar_datos}
                      defaultValue={item.nombre}
                    ></input>
                  </Col>
                  <Col xs={"6"} md={"6"} className="texto_pequeño_12pt">
                    <input
                      className="texto_pequeño_12pt"
                      name={`nuevo_personas_con_quien_vive[${index}].pariente`}
                      onChange={cambiar_datos}
                      defaultValue={item.pariente}
                    ></input>
                  </Col>

                  <Col xs={"12"} className="col_adicionar_parentesco">
                        <Button className="adicionar_parentesco" onClick={guardarPariente}>
                              Guardar
                        </Button>
                        <Button className="adicionar_parentesco" onClick={cancelarPariente}>
                              Cancelar
                        </Button>
                  </Col>
                </Row>
            ))}
          </Row>
          )
        :
        (<Row>
          <Col xs={"12"} className="col_adicionar_parentesco">
                <Button className="adicionar_parentesco" onClick={agregarPariente}>
                <i class="bi bi-plus-circle"></i>
                </Button>
          </Col>
        </Row>)
      }
        

      </Row>
    ) : (
      <Row>


      {
        state.personas_con_quien_vive.length > 0 ?
        (
          <Row>
              {state.personas_con_quien_vive.map((item, index) => (
                <Row>
                  <Col xs={"12"} md={"6"} className="texto_pequeño">
                    {item.nombre}
                  </Col>
                  <Col xs={"12"} md={"6"} className="texto_pequeño">
                    {item.pariente}
                  </Col>
                </Row>
              ))}
          </Row>
          )
        :
        (<Row></Row>)
      }



      <Col xs={"12"} className="col_adicionar_parentesco">
            <Button className="adicionar_parentesco" onClick={agregarPariente}>
            <i class="bi bi-plus-circle"></i>
            </Button>
      </Col>
      </Row>
    )}
  </Row>
) : 





(
  <Row>
      <h1 className="texto_subtitulo">Personas con quién vive</h1>
    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">
      Nombre Completo
    </Col>
    <Col xs={"6"} md={"6"} className="texto_pequeño_gris">
      Parentesco
    </Col>
  {state.agregarPariente ? (
      <Row>
        {state.nuevo_personas_con_quien_vive.map((item, index) => (
          <Row className="row_flex_general">
            <Col xs={"6"} md={"6"} className="texto_pequeño_12pt">
              <input
                className="texto_pequeño_12pt"
                name={`nuevo_personas_con_quien_vive[${index}].nombre`}
                onChange={cambiar_datos}
                defaultValue={item.nombre}
              ></input>
            </Col>
            <Col xs={"6"} md={"6"} className="texto_pequeño_12pt">
              <input
                className="texto_pequeño_12pt"
                name={`nuevo_personas_con_quien_vive[${index}].pariente`}
                onChange={cambiar_datos}
                defaultValue={item.pariente}
              ></input>
            </Col>
          </Row>
        ))}
      <Col xs={"12"} className="col_adicionar_parentesco">
            <Button className="adicionar_parentesco" onClick={guardarPariente}>
                  Guardar
            </Button>
            <Button className="adicionar_parentesco" onClick={cancelarPariente}>
                  Cancelar
            </Button>
      </Col>
      </Row>
    ) : (
      <Row>
          <Col xs={"12"} className="col_adicionar_parentesco">
                <Button className="adicionar_parentesco" onClick={agregarPariente}>
                <i class="bi bi-plus-circle"></i>
                </Button>
          </Col>
      </Row>
    )}
  </Row>
)}

                
                <Row>
                        <h1 className="texto_subtitulo">Información general del acudiente de emergencia</h1>
                        <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Nombre Completo</Col>
                        <Col xs={"6"} md={"6"} className="texto_pequeño_gris">Parentesco y Teléfono</Col>
                        {state.editar ?
                              (
                        <Row className="row_flex_general">
                              <Col xs={"12"} md={"6"}className="texto_pequeño_12pt">
                                    <input className="texto_pequeño_12pt"
                                          name="nuevo_deportes_que_practica" 
                                          onChange={cambiar_datos} 
                                          defaultValue={state.deportes_que_practica}></input>
                              </Col>
                              <Col xs={"12"} md={"6"}className="texto_pequeño_12pt">
                                    <input className="texto_pequeño_12pt"
                                          name="nuevo_deportes_que_practica" 
                                          onChange={cambiar_datos} 
                                          defaultValue={state.deportes_que_practica}></input>
                              </Col>  
                        </Row>
                        
                        )
                      :
                      (
                      <Row className="row_flex_general">
                            <Col xs={"12"} md={"6"}className="texto_pequeño_12pt">{props.datos['acudiente']}</Col>
                            <Col xs={"12"} md={"6"}className="texto_pequeño_12pt">{props.datos['telefono_acudiente']} </Col>
                        </Row>
                      )
                      }
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">Observaciones</h1>
                    <h4 className="texto_pequeño_12pt">texto</h4>
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