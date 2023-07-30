import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect} from 'react';
import axios from 'axios';
import Informacion_rol from "../../components/reporte_seguimientos/informacion_rol";


  

const Cabecera = (props) =>{

  const config = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const datos_option_user = []
    const datos_option_periodo = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_periodo = true;
    var bandera_option_rol = true;
    var bandera = true;
    const total_datos_estudiantes = []

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

      tiene_datos:false,

      
      fichas_profesional_total:0,
      fichas_profesional_revisado:0,
      fichas_profesional_no_revisado:0,
      total_inasistencias_profesional:0,
      inasistencias_profesional_revisado:0,
      inasistencias_profesional_no_revisado:0,

      fichas_practicante_total:0,
      fichas_practicante_revisado:0,
      fichas_practicante_no_revisado:0,
      total_inasistencias_practicante:0,
      inasistencias_practicante_revisado:0,
      inasistencias_practicante_no_revisado:0,
    })

   
    const conteo_datos =()=>{
      set_state({
        fichas_profesional_total:0,
        fichas_profesional_revisado:0,
        fichas_profesional_no_revisado:0,
        total_inasistencias_profesional:0,
        inasistencias_profesional_revisado:0,
        inasistencias_profesional_no_revisado:0,
  
        fichas_practicante_total:0,
        fichas_practicante_revisado:0,
        fichas_practicante_no_revisado:0,
        total_inasistencias_practicante:0,
        inasistencias_practicante_revisado:0,
        inasistencias_practicante_no_revisado:0,
      });

      for(var i=0; i < props.ids_practicantes_del_profesional; i++)
      {
        set_state({
          
          fichas_profesional_total:state.fichas_profesional_total + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_seguimientos,
          fichas_profesional_no_revisado:state.fichas_profesional_no_revisado + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_seguimientos_pendientes_profesional,
          total_inasistencias_profesional:state.total_inasistencias_profesional + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_inasistencias,
          inasistencias_profesional_no_revisado:state.fichas_profesional_no_revisado + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_inasistencias_pendientes_profesional,
    
          fichas_practicante_total:state.fichas_profesional_total + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_seguimientos,
          total_inasistencias_practicante:state.total_inasistencias_profesional + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_inasistencias,
          fichas_practicante_no_revisado:state.fichas_practicante_no_revisado + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_seguimientos_pendientes_practicante,
          inasistencias_practicante_no_revisado:state.fichas_profesional_no_revisado + state.ids_practicantes_del_profesional[i].cantidad_reportes.count_inasistencias_pendientes_practicante,
          
          
        });
      }
      set_state({
        fichas_profesional_revisado:state.fichas_profesional_total - state.fichas_profesional_no_revisado,
        fichas_practicante_revisado:state.fichas_profesional_total - state.fichas_practicante_no_revisado,

        inasistencias_profesional_revisado:state.total_inasistencias_profesional - state.inasistencias_profesional_no_revisado,
        inasistencias_practicante_revisado:state.total_inasistencias_practicante - state.inasistencias_practicante_no_revisado,
      })
    }


  
    useEffect(()=>{

      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/wizard/semestre/",
        method: "GET",
        headers: config,
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_periodo : respuesta.data
        })
      })
      .catch(err=>{
          return (err)
      })





      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/reporte_seguimientos/"+41+"/",
        method: "GET",
        headers: config,
      })
      .then((respuesta)=>{
        set_state({
          ids_practicantes_del_profesional: respuesta.data,
          tiene_datos:true
        })
        
        // conteo_datos();
        
      })
      .catch(err=>{
          return (err)
      })


    },[]);





    const handle_users = (e) => {

      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['id_rol'], 
          label:state.data_user[i]['id_rol']+" "+state.data_user[i]['id_usuario']+" "+state.data_user[i]['estado'],
          id:i }
          datos_option_user.push(dato)

          const url_axios = "http://localhost:8000/usuario_rol/profesional/"+state.data_user[i]['id_rol']+"/";
            axios({
              // Endpoint to send files
              url:  url_axios,
              method: "GET",
              headers: config,
            })
            .then((respuesta)=>{
              total_datos_estudiantes.push(respuesta.data)
            })
            .catch(err=>{
            })
        }
        bandera_option_user = false;
      }
      else{
        console.log("bandera off");
      }
    }

    const handle_users_persona = (e) => {

      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < props.data_user['length'] ; i++) {
          const dato = { value: props.data_user[i]['id'], 
          label:props.data_user[i]['username']+" "+props.data_user[i]['first_name']+" "+props.data_user[i]['last_name'],
          id:i }
          datos_option_user.push(dato)

          const url_axios = "http://localhost:8000/usuario_rol/profesional/"+props.data_user[i]['id_rol']+"/";
            axios({
              // Endpoint to send files
              url:  url_axios,
              method: "GET",
              headers: config,
            })
            .then((respuesta)=>{
              total_datos_estudiantes.push(respuesta.data)
            })
            .catch(err=>{
            })
        }
        bandera_option_user = false;
      }
      else{
        console.log("bandera off");
      }
    }



    const handle_option_user = (e) => {
      // Getting the files from the input

      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:props.data_user[e.id]['id'],
        total_datos_estudiante_seleccionado : total_datos_estudiantes[e.id]
      })
      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/reporte_seguimientos/"+props.data_user[e.id]['id']+"/",
        method: "GET",
        headers: config,
      })
      .then((respuesta)=>{
        set_state({
          ids_practicantes_del_profesional: respuesta.data,
          tiene_datos:true
        });
        // conteo_datos()
      })
      .catch(err=>{
          return (err)
      })

    }



  
    const handle_option_periodo = (e) => {
      // Getting the files from the input
      set_state({
        ...state,
        seleccionado:e.id,
      })
    }


    const handle_periodo = (e) => {
      // Getting the files from the input
      if(bandera_option_periodo==true){
        for (var i = 0; i < state.data_periodo['length'] ; i++) {
          const dato = { value: state.data_periodo[i]['nombre'], label: state.data_periodo[i]['nombre'],id:['id_instancia'] }
          datos_option_periodo.push(dato)
      }
        bandera_option_periodo = false;
      }
      else{
      }
    }
    const handle_upload = (e) => {
      // Getting the files from the input
    
    }




    
    return (
        <Container>
            <Row className="row_presentacion_reportes_seguimientos">
              <Col className="col_selectores_reportes_seguimientos" xs={"12"} md={"4"}>
                  <h1>Séguimientos</h1>
              </Col>
              {
                  props.rolUsuario === 'superSistemas' ?
                  (<Col className="col_selectores_reportes_seguimientos"  xs={"12"} md={"4"}>
                      período actual
                      <Select  
                        options={datos_option_periodo} onMenuOpen={handle_periodo} 
                        onChange={handle_option_periodo}  
                        defaultInputValue={props.periodo}
                        defaultValue={props.periodo}
                          />
                  </Col>
                  )
                  :
                  (<Col className="col_label_reportes_seguimientos"  xs={"12"} md={"4"}> 
                      <label>{props.periodo}</label>
                  </Col>
                  )
              }
              
              <Col className="col_selectores_reportes_seguimientos"  xs={"12"} md={"4"}>
                <Row>
                  <h4 className="texto_subtitulo2">Selector persona</h4>
                </Row>
                <Row>
                  <Select 
                    options={datos_option_user} 
                    onMenuOpen={handle_users_persona} 
                    onChange={handle_option_user} 
                    />
                </Row>
                  
              </Col>
            </Row>

            <Row className="prueba_seguimintos">
                            <li>{JSON.stringify(state.data_user)}</li>

              {state.tiene_datos ?
                (<Informacion_rol total_fichas_profesional={state.fichas_profesional_total}
                                  fichas_profesional_revisado={state.fichas_profesional_revisado}
                                  fichas_profesional_no_revisado={state.fichas_profesional_no_revisado}
                                  total_inasistencias_profesional={state.fichas_profesional_total}
                                  inasistencias_profesional_revisado={state.fichas_profesional_revisado}
                                  inasistencias_profesional_no_revisado={state.fichas_profesional_no_revisado}

                                  total_inasistencias_practicante={state.fichas_profesional_total}
                                  fichas_practicantel_revisado={state.fichas_profesional_revisado}
                                  fichas_practicante_no_revisado={state.fichas_profesional_no_revisado}
                                  total_inasistencias_profesiona={state.total_inasistencias_profesiona}
                                  inasistencias_practicante_revisado={state.inasistencias_practicante_revisado}
                                  inasistencias_practicante_no_revisado={state.inasistencias_practicante_no_revisado}

                                ids_practicantes_del_profesional={state.ids_practicantes_del_profesional}>
                </Informacion_rol>):
                (
                  <Row></Row>
                )
              }
            </Row>
        </Container>
    )
}

export default Cabecera 


















