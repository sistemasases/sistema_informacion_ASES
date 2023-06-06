import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Desplegable from "./desplegable";
import  {useEffect} from 'react';

/*
Tabla Conteo de Seguimientos:
- codigo
- Nombres
- Apellidos
- documento
- Conteos
--- Fichas normales
--- Fichas de inasistencias
----Total conteos
- Profesional
- Practicante
- Monitor

*/



const Informacion_rol = (props) =>{

    const la_lista_de_practicantes = []
    const la_lista_de_monitores = []
    const la_lista_de_estudiantes = []

    const [state,set_state] = useState({
        periodo : '',
  
        usuario : '',
        data_user : [],
        data_periodo : [],
        data_rol : [],
  
        seleccionado:'',
  
        id_usuario:'',
        nombres:'',
        apellidos: '',
        cedula:'',
        correo:'',
        telefono:'',
  
        reportes_estudiante : [],
        ids_estudiantes_del_monitor : [],
        ids_monitores_del_practicante : [],
        ids_practicantes_del_profesional : [],

        reportes_estudiante2 : [],
        ids_estudiantes_del_monitor2 : [],
        ids_monitores_del_practicante2 : [],
        ids_practicantes_del_profesional2 : [],

        lista : [],
        lista1 : [],
        lista2 : [],
        lista1_1 : [],
        lista2_1 : [],

      })
  


  
      useEffect(()=>{
      //   const hacer_los_practicantes = async (e) =>{
      //     //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar
      //     for(var i = 0; i < props.ids_practicantes_del_profesional[0].length; i++){
      //         const temporal = state.ids_monitores_del_practicante[i]
      //         const id_temporal = props.ids_practicantes_del_profesional[0][i]['id']
      //         const nombres_temporal = props.ids_practicantes_del_profesional[0][i]['first_name']
      //         const apellidos_temporal = props.ids_practicantes_del_profesional[0][i]['last_name']
  
      //         try {
      //             const respuesta = await axios.get("http://localhost:8000/usuario_rol/monitor/" + props.ids_practicantes_del_profesional[0][i]['id'] + "/");
      //             const monitor = {
      //               ...temporal,
      //               tipo_usuario: 'practicante',
      //               id_usuario: id_temporal,
      //               nombres_usuario: nombres_temporal,
      //               apellidos_usuario: apellidos_temporal,
      //               cantidad_estudiantes: 0,
      //               cantidad_reportes: {
      //                 "count_inasistencias":0,"count_seguimientos":0,
      //                 'count_inasistencias_pendientes_practicante': 0, 'count_inasistencias_pendientes_profesional': 0,
      //                 'count_seguimientos_pendientes_practicante': 0, 'count_seguimientos_pendientes_profesional': 0,
      //               },
      //               monitores: respuesta.data[0],
      //             };
      //             state.ids_monitores_del_practicante.push(monitor)
      //           } catch (err) {
      //             console.log('errrrrrrrrrrrooooooooorrrrrrrr');
      //             console.log(err);
      //           }
      //     }
      //     state.ids_practicantes_del_profesional.push(state.ids_monitores_del_practicante)
          
      //         console.log('acabo practicantes, va a mostrar')
      //         // set_state(prevState => ({
      //         //   ...prevState,
      //         //   lista: state.ids_monitores_del_practicante,
      //         //   lista1: state.ids_monitores_del_practicante,
      //         // }));
  
      //         mostrar();
  
            
      // }
      //     hacer_los_practicantes()

      },[]);
  
  
  
  


    // const hacer_los_practicantes = async (e) =>{
    //     //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar
    //     for(var i = 0; i < props.ids_practicantes_del_profesional[0].length; i++){
    //         const temporal = state.ids_monitores_del_practicante[i]
    //         const id_temporal = props.ids_practicantes_del_profesional[0][i]['id']
    //         const nombres_temporal = props.ids_practicantes_del_profesional[0][i]['first_name']
    //         const apellidos_temporal = props.ids_practicantes_del_profesional[0][i]['last_name']

    //         try {
    //             const respuesta = await axios.get("http://localhost:8000/usuario_rol/monitor/" + props.ids_practicantes_del_profesional[0][i]['id'] + "/");
    //             const monitor = {
    //               ...temporal,
    //               tipo_usuario: 'practicante',
    //               id_usuario: id_temporal,
    //               nombres_usuario: nombres_temporal,
    //               apellidos_usuario: apellidos_temporal,
    //               cantidad_estudiantes: 0,
    //               cantidad_reportes: {
    //                 "count_inasistencias":0,"count_seguimientos":0,
    //                 'count_inasistencias_pendientes_practicante': 0, 'count_inasistencias_pendientes_profesional': 0,
    //                 'count_seguimientos_pendientes_practicante': 0, 'count_seguimientos_pendientes_profesional': 0,
    //               },
    //               monitores: respuesta.data[0],
    //             };
    //             state.ids_monitores_del_practicante.push(monitor)
    //           } catch (err) {
    //             console.log('errrrrrrrrrrrooooooooorrrrrrrr');
    //             console.log(err);
    //           }
    //     }
    //     state.ids_practicantes_del_profesional.push(state.ids_monitores_del_practicante)
        
    //     setTimeout(() => {
    //         console.log('acabo practicantes, va a mostrar')
    //         // set_state(prevState => ({
    //         //   ...prevState,
    //         //   lista: state.ids_monitores_del_practicante,
    //         //   lista1: state.ids_monitores_del_practicante,
    //         // }));

    //         mostrar();

    //       }, 1000);
          
    // }


  //   const  mostrar = (e) =>{

  //       for(var i = 0; i < state.ids_monitores_del_practicante.length; i++) {
  //         state.lista.push(state.ids_monitores_del_practicante[i])
  //       }

  //           console.log('acabo mostrar, va a hacer_los_monitores');
  //           paso_para_asegurarme_que_actualizo();
          
  //   }

  //   const  paso_para_asegurarme_que_actualizo = (e) =>{
  //     console.log('esta mondaaaaaaaaaa mide : ' + state.lista.length)
  //     console.log('esta mide : ' + state.ids_monitores_del_practicante.length)
      
  //         console.log('acabo mostrar, va a hacer_los_monitores');
  //         if(state.lista.length > 0)
  //           {hacer_los_monitores();}
  //         else   
  //         {
  //           console.log('esta mondaaaaaaaaaa mide22222 : ' + state.lista.length)
  //           console.log('esta mide22222 : ' + state.ids_monitores_del_practicante.length)
  //           mostrar()
  //         }
        
  // }






  //   const hacer_los_monitores = async (e) =>{
  //       //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar

  //       for(var i = 0; i < state.lista.length; i++){
  //         console.log('entra a vaerav')

  //           for(var j = 0; j < state.lista[i]['monitores'].length; j++){
  //               const temporal = state.lista[i]['monitores'][j]
  //               const temporal2 = state.lista[i]['monitores'][j]['id']
  //               console.log('entra a estudinates_selected')

  //               try {
  //                   const respuesta = await axios.get("http://localhost:8000/usuario_rol/estudiante_selected/" + temporal2 + "/");
  //                   const estudiante = {
  //                     ...temporal,
  //                     tipo_usuario: 'monitor',
  //                     cantidad_reportes: {
  //                       "count_inasistencias":0,"count_seguimientos":0,
  //                       'count_inasistencias_pendientes_practicante': 0, 'count_inasistencias_pendientes_profesional': 0,
  //                       'count_seguimientos_pendientes_practicante': 0, 'count_seguimientos_pendientes_profesional': 0,
  //                     },
  //                     estudiantes: respuesta.data[0],
  //                   };
  //                   state.lista[i]['monitores'][j]=estudiante
                    
  //                       // set_state(prevState => ({
  //                       //     ...prevState,
  //                       //     lista: [...prevState.lista],
  //                       //   }));

  //                   } catch (err) { 
  //                       console.log('errrrrrrrrrrrooooooooorrrrrrrr');
  //                       console.log(err);
  //                       }
  //           }
  //       }

  //         console.log('acabo monitores, va a mostrar1');
  //         mostrar1();
  //    }




  //   const  mostrar1 = (e) =>{
  //       set_state(prevState => ({
  //           ...prevState,
  //           lista2: 'si lo pone sapo',
  //         }));
        
  //           console.log('acabo mostrar1, va a hacer_reportes');
  //           hacer_reportes();
  //   }




  //   const hacer_reportes = async (e) =>{
  //       //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar
  //       for(var i = 0; i < state.lista.length; i++){

  //           for(var j = 0; j < state.lista[i]['monitores'].length; j++){

  //               for(var k = 0; k < state.lista[i]['monitores'][j]['estudiantes'].length; k++){

  //                   const temporal = state.lista[i]['monitores'][j]['estudiantes'][k]
  //                   const temporal2 = state.lista[i]['monitores'][j]['estudiantes'][k]['id']

  //                   try {
  //                       const respuesta = await axios.get("http://localhost:8000/seguimiento/conteo_seguimientos_estudiante/" + temporal2 + "/");
                
  //                       const reportes = {
  //                         ...temporal,
  //                         cantidad_reportes: respuesta.data,
  //                       };

  //                       state.lista[i]['monitores'][j]['estudiantes'][k] = reportes
                        
  //                           set_state(prevState => ({
  //                               ...prevState,
  //                               lista: [...prevState.lista],
  //                             }));

  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias'] += respuesta.data.count_inasistencias
  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos'] += respuesta.data.count_seguimientos

  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias_pendientes_practicante'] += respuesta.data.count_inasistencias_pendientes_practicante
  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias_pendientes_profesional'] += respuesta.data.count_inasistencias_pendientes_profesional
  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos_pendientes_practicante'] += respuesta.data.count_seguimientos_pendientes_practicante
  //                             state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos_pendientes_profesional'] += respuesta.data.count_seguimientos_pendientes_profesional
  //                       }
  //                   catch (err) { 
  //                       console.log('errrrrrrrrrrrooooooooorrrrrrrr');
  //                       console.log(err);
  //                       }
  //               }
  //               state.lista[i]['cantidad_reportes']['count_inasistencias'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias']
  //               state.lista[i]['cantidad_reportes']['count_seguimientos'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos']
                
  //               state.lista[i]['cantidad_reportes']['count_inasistencias_pendientes_practicante'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias_pendientes_practicante']
  //               state.lista[i]['cantidad_reportes']['count_inasistencias_pendientes_profesional'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_inasistencias_pendientes_profesional']
  //               state.lista[i]['cantidad_reportes']['count_seguimientos_pendientes_practicante'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos_pendientes_practicante']
  //               state.lista[i]['cantidad_reportes']['count_seguimientos_pendientes_profesional'] += state.lista[i]['monitores'][j]['cantidad_reportes']['count_seguimientos_pendientes_profesional']
                
  //               state.lista[i]['cantidad_estudiantes'] += state.lista[i]['monitores'][j]['estudiantes'].length
  //             }
  //       }
  //       console.log('acabo reportes, va a mostrar 2')

  //           console.log('acabo reportes, va a mostrar2');
  //           mostrar2();
  //   }



  //   const  mostrar2 = (e) =>{
  //       set_state(prevState => ({
  //           ...prevState,
  //           lista2: props.ids_practicantes_del_profesional,
  //           fin:'acabo'
  //         }));
  //         console.log('acabo')
  //   }

    return (
        <Container className="container_reportes_seguimientos2">
            <Row>
              {/* <Button onClick={hacer_los_practicantes}>
                click para mostrar la lista ids_estudiantes_del_monitor
              </Button> */}
              {/* <Button onClick={mostrar2}>
                click para mostrar la lista ids_monitores_del_practicante
              </Button> */}

            </Row>
        
            <Row className="row_contenido_reportes_seguimientos">
            <div class="d-none d-md-inline"> <br/></div>

                        <Col className="subrow_card_content_flex" xs={"12"} sm={"12"}>
                            {
                              //<li>{JSON.stringify(props.ids_practicantes_del_profesional)}</li>
                            }

                            <Row>
                                <Col  xs={"12"} md={"3"}>
                                <b>Informacion:</b>
                                </Col>
                                <Col xs={"12"} md={"3"}>
                                Profesional
                                </Col>
                            </Row> 
                            <Row lassName="margin_top_info_rol"> 
                                <Col xs={"12"} md={"3"} c>
                                <b>Fichás:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: 1
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 1
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                                <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado: 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado: 0
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 0
                                </Col>          
                            </Row>
                        </Col>





                        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
 
                            <Row>
                                <Col xs={"12"} md={"3"}>
                                <b>Practicante:</b>
                                </Col>
                                <Col xs={"12"} md={"3"}>
                                nombre
                                </Col>
                            </Row>
                            <Row className="margin_top_info_rol">

                                <Col  xs={"12"} md={"3"}>
                                <b>Fichás:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : 1
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 1
                                </Col>
                                               
                            </Row>
                            <Row className="margin_top_info_rol">
                            <Col xs={"12"} md={"3"} >
                                <b>Inasistencías:</b>
                                </Col>
                                <Col xs={"5"} md={"3"}>
                                Révisado : 0
                                </Col>
                                <Col xs={"6"} md={"3"}>
                                No révisado : 0
                                </Col>
                                <Col xs={"8"} md={"3"}>
                                Total : 0
                                </Col>           
                            </Row>
                        </Col>
                        <div class="d-none d-md-inline"> <br/></div>

            </Row>
                <Desplegable pintar={props.ids_practicantes_del_profesional}></Desplegable>
        </Container>
    )
}

export default Informacion_rol 



