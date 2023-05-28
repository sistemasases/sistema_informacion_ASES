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
  


  
    //   useEffect(async()=>{

    //     const temporal = state.ids_monitores_del_practicante[i]
    //     const id_temporal = props.ids_practicantes_del_profesional[0][i]['id']
    //     const nombres_temporal = props.ids_practicantes_del_profesional[0][i]['first_name']
    //     const apellidos_temporal = props.ids_practicantes_del_profesional[0][i]['last_name']

    //     for(var i = 0; i < props.ids_practicantes_del_profesional[0].length; i++){

    //         try {
    //             const respuesta = await axios.get("http://localhost:8000/usuario_rol/monitor/"+props.ids_practicantes_del_profesional[0][i]['id']+"/");
        
    //             const monitor = {
    //                 ...temporal,
    //                 tipo_usuario: 'practicante',
    //                 id_usuario: id_temporal,
    //                 nombres_usuario: nombres_temporal,
    //                 apellidos_usuario: apellidos_temporal,
    //                 monitores: respuesta.data[0],
    //                 };
    //                 state.ids_monitores_del_practicante.push(monitor)
    
    //             } catch (err) { 
    //                 console.log('errrrrrrrrrrrooooooooorrrrrrrr');
    //                 console.log(err);
    //                 }

    //     }
    //     state.ids_practicantes_del_profesional.push(state.ids_monitores_del_practicante)

    //   },[props.ids_practicantes_del_profesional]);
  
  
  
  


    const hacer_los_practicantes = async (e) =>{
        //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar
        for(var i = 0; i < props.ids_practicantes_del_profesional[0].length; i++){
            const temporal = state.ids_monitores_del_practicante[i]
            const id_temporal = props.ids_practicantes_del_profesional[0][i]['id']
            const nombres_temporal = props.ids_practicantes_del_profesional[0][i]['first_name']
            const apellidos_temporal = props.ids_practicantes_del_profesional[0][i]['last_name']

            try {
                const respuesta = await axios.get("http://localhost:8000/usuario_rol/monitor/" + props.ids_practicantes_del_profesional[0][i]['id'] + "/");
                const monitor = {
                  ...temporal,
                  tipo_usuario: 'practicante',
                  id_usuario: id_temporal,
                  nombres_usuario: nombres_temporal,
                  apellidos_usuario: apellidos_temporal,
                  monitores: respuesta.data[0],
                };
                state.ids_monitores_del_practicante.push(monitor)
              } catch (err) {
                console.log('errrrrrrrrrrrooooooooorrrrrrrr');
                console.log(err);
              }
        }
        state.ids_practicantes_del_profesional.push(state.ids_monitores_del_practicante)
        
        setTimeout(() => {
            console.log('acabo practicantes, va a mostrar')
            mostrar();
          }, 7000);
          
    }


    const  mostrar = (e) =>{

        set_state(prevState => ({
            ...prevState,
            lista: state.ids_monitores_del_practicante,
            lista1: state.ids_monitores_del_practicante,
          }));
        
        //   setTimeout(() => {
        //     console.log('acabo mostrar, va a hacer_los_monitores');
        //     hacer_los_monitores();
        //   }, 7000);
          
    }





    const hacer_los_monitores = async (e) =>{
        //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar

        for(var i = 0; i < state.lista.length; i++){

            for(var j = 0; j < state.lista[i]['monitores'].length; j++){
                const temporal = state.lista[i]['monitores'][j]
                const temporal2 = state.lista[i]['monitores'][j]['id']

                try {
                    const respuesta = await axios.get("http://localhost:8000/usuario_rol/estudiante_selected/" + temporal2 + "/");
            
                    const estudiante = {
                      ...temporal,
                      tipo_usuario: 'monitor',
                      estudiantes: respuesta.data[0],
                    };
                    state.lista[i]['monitores'][j]=estudiante
                    
                        // set_state(prevState => ({
                        //     ...prevState,
                        //     lista: [...prevState.lista],
                        //   }));

                    } catch (err) { 
                        console.log('errrrrrrrrrrrooooooooorrrrrrrr');
                        console.log(err);
                        }
            }
        }

        setTimeout(() => {
            console.log('acabo monitores, va a mostrar1');
            mostrar1();
          }, 7000);
     }


    const  mostrar1 = (e) =>{
        set_state(prevState => ({
            ...prevState,
            lista1: state.ids_practicantes_del_profesional,
            lista2: 'si lo pone sapo',
          }));
        
          setTimeout(() => {
            console.log('acabo mostrar1, va a hacer_reportes');
            hacer_reportes();
          }, 7000);
    }




    const hacer_reportes = async (e) =>{
        //props.ids_practicantes_del_profesional.length       cantidad de practicantes a pintar
        for(var i = 0; i < state.lista.length; i++){

            for(var j = 0; j < state.lista[i]['monitores'].length; j++){

                for(var k = 0; k < state.lista[i]['monitores'][j]['estudiantes'].length; k++){

                    const temporal = state.lista[i]['monitores'][j]['estudiantes'][k]
                    const temporal2 = state.lista[i]['monitores'][j]['estudiantes'][k]['id']

                    try {
                        const respuesta = await axios.get("http://localhost:8000/seguimiento/conteo_seguimientos_estudiante/" + temporal2 + "/");
                
                        const reportes = {
                          ...temporal,
                          cantidad_reportes: respuesta.data,
                        };

                        state.lista[i]['monitores'][j]['estudiantes'][k] = reportes
                        
                            set_state(prevState => ({
                                ...prevState,
                                lista: [...prevState.lista],
                              }));
                        }
                    catch (err) { 
                        console.log('errrrrrrrrrrrooooooooorrrrrrrr');
                        console.log(err);
                        }
                }
            }
        }
        console.log('acabo reportes, va a mostrar 2')

        // setTimeout(() => {
        //     console.log('acabo reportes, va a mostrar2');
        //     mostrar2();
        //   }, 5000);
    }



    const  mostrar2 = (e) =>{
        set_state(prevState => ({
            ...prevState,
            lista2: state.lista,
            fin:'acabo'
          }));
          console.log('acabo')
    }

    return (
        <Container className="container_reportes_seguimientos2">
            <Row>
              <Button onClick={hacer_los_practicantes}>
                click para mostrar la lista ids_estudiantes_del_monitor
              </Button>
              <Button onClick={hacer_los_monitores}>
              click para mostrar la lista ids_monitores_del_practicante
              </Button>
              <Button onClick={hacer_reportes}>
              boton final
              </Button>
              <Button onClick={mostrar}>
                mostrar y llamar funcion
              </Button>
              <Button onClick={mostrar1}>
                mostrar
              </Button>
              <Button onClick={mostrar2}>
                mostrar final
              </Button>
            </Row>
        
            <Row className="row_contenido_reportes_seguimientos">
            <div class="d-none d-md-inline"> <br/></div>

                        <Col className="subrow_card_content_flex" xs={"12"} sm={"12"}>
                            <li>{JSON.stringify(state.lista)}</li>

                            <li>{JSON.stringify(state.lista1)}</li>

                            <li>{JSON.stringify(state.lista2)}</li>
                            
                            <li>{JSON.stringify(state.fin)}</li>

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
                <Desplegable pintar={state.lista}></Desplegable>
        </Container>
    )
}

export default Informacion_rol 



