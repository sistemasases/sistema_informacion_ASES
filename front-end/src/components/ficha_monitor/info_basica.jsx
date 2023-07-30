import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col} from "styled-bootstrap-grid";

import  {useEffect} from 'react';
import axios from 'axios';
import Selector from "./selector";




const Info_basica_monitor = (props) =>{

  const config = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };
   

    const datos_option_user = []
    const total_datos_monitors = []

    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({

      total_datos_monitor_seleccionado:[],
      editar : false,
      usuario : '',
      data_user : [],
      data_a_enviar : [],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      codigo:'',
      correo:'',
    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/monitor/",
        method: "GET",
        headers: config,
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_user : respuesta.data
        })

        

        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['id'], 
                      label:state.data_user[i]['username']+" "+state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'],
                      id:[i] }
          datos_option_user.push(dato)

          const url_axios = "http://localhost:8000/usuario_rol/monitor/"+state.data_user[i]['id']+"/";
            axios({
              // Endpoint to send files
              url:  url_axios,
              method: "GET",
              headers: config,
            })
            .then((respuesta)=>{
              total_datos_monitors.push(respuesta.dato)
            })
            .catch(err=>{
                return (err)
            })

        }
        
      })
      .catch(err=>{
          return (err)
      })
      
    },[]);
   




    const handle_users = (e) => {
      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < props.data_user['length'] ; i++) {
          const dato = 
          { value: props.data_user[i]['id'], 
          label:props.data_user[i]['username']+" "+props.data_user[i]['first_name']+" "+props.data_user[i]['last_name'],
          id:i }
          datos_option_user.push(dato)

        }
        bandera_option_user = false;
      }
      else{
        console.log("bandera off");
      }

    }






    const handle_option_user = (e) => {
        
  //      const url_axios = "http://localhost:8000/usuario_rol/monitor_info_extra/"+state.data_user[i]['id']+"/";
  //      axios({
          // Endpoint to send files
  //        url:  url_axios,
  //        method: "GET",
  //        headers: config,
  //      })
  //      .then((respuesta)=>{
  //       total_datos_monitors.push(respuesta.dato)
  //      })
  //      .catch(err=>{
  //          return (err)
  //      })


      // Getting the files from the input
      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['first_name'],
        apellidos : state.data_user[e.id]['last_name'],
        codigo : state.data_user[e.id]['username'],
        correo : state.data_user[e.id]['email_address'],
        data_a_enviar: state.data_user[e.id]
      })
    }




    return (
      <Row>
        <Col xs={"12"} >


          <div class="d-none d-md-block">
          <Row className="info_basica_borde">
                  <Col className="col1" xs={"12"} md={"9"}>
                        <Row>
                            <Select  className="bold_select"
                                        options={datos_option_user} 
                                        onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  />
                        </Row>

                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"}>
                                <Row className="infoRow1">
                                    <Col md={"12"}>
                                        {
                                          (state.seleccionado) === '' ?
                                          (
                                            <Row className="info"> 
  
                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info"> 

                                                  <Col className="info_texto" xs={"12"} md={"3"}>
                                                        <h4 className="texto_mas_pequeño">{state.tipo_doc}   {state.cedula}</h4>
                                                  </Col>

                                                  <Col className="info_texto" xs={"12"} md={"12"}>
                                                        <h4 className="texto_grande">{state.nombres}</h4>
                                                        <h4 className="texto_grande">{state.apellidos}</h4>

                                                        <h4 className="texto_grande">{state.correo}</h4>
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
                                              <h4 className="texto_mas_pequeño">
                                              <br/>
                                                  profesional: 
                                                  <br/>
                                                  Practicante: 
                                              <br/> 
                                              Ultima astualización:
                                              <br/> 
                                              </h4>
                                        </Row>
                                      </Col>
                                      
                                    </Row>
                                  )
                                  :
                                  (
                                    

                                    <Row className="infoRow2">
                                      <Col md={"9"}>

                                        <Row> 
                                              <h4 className="texto_mas_pequeño">
                                              <br/> 
                                                  <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">
                                                  Documento de Autorización de Tratamiento de Datos
                                                  </a>
                                              </h4>
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
                            <Select  className="bold_select_pequeño"
                                        options={datos_option_user} onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  />
          {
                      (state.seleccionado) === '' ?
                      (
                          <Col xs={"12"} sm={"12"} >

                            <Row className="primera_row_pequeña">
                              <Col  xs={"5"} sm={"4"}>
                                <Row className="col3_pequeño">
                                  <i class="bi bi-person-fill"></i>
                                </Row>
                              </Col>

                            
                            
                            </Row>
                            
                          </Col>
                            
                      )
                      :
                      (
                        <Col xs={"12"} sm={"12"} >

                            <Row className="primera_row_pequeña">
                              <Col  xs={"5"} sm={"4"}>
                                <Row className="col3_pequeño">
                                  <i class="bi bi-person-fill"></i>
                                  <img src={"./imag1.jpg"}></img>

                                </Row>
                            </Col>
                            </Row>
                          
                          </Col>
                      )
                  }
                  <Col className="col1" xs={"12"} md={"9"}>
                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"}>
                                        {
                                          (state.seleccionado) === '' ?
                                          (
                                            <Row className="info_pequeño"> 
                                                  <Col className="info_texto_pequeño" md={"12"}>
                                                    <h4 className="texto_mas_pequeño">correo</h4>
                                                  </Col>

                                                <Col xs={"5"} sm={"1"} className="info_texto_cedula_pequeño" md={"2"}>
                                                <h4 className="texto_mas_pequeño"> cedula</h4>
                                                </Col>
                                                
                                            </Row>
                                          )
                                          :
                                          (
                                            <Row className="info_pequeño"> 

                                                  <Col className="info_texto_pequeño" xs={"12"} md={"12"}>
                                                    <h4 className="texto_mas_pequeño">{state.correo}</h4>
                                                  </Col>
                                                  <Col  xs={"5"} sm={"1"} className="info_texto_cedula_pequeño">
                                                      <h4 className="texto_mas_pequeño">{state.tipo_doc}
                                                      {state.cedula}
                                                      </h4>                                                    
                                                  </Col>
                                            </Row>
                                          )
                                        } 
                                      
                                      
                                      
                                  <Row className="ficha_footer_pequeña">
                                    <Col xs={"6"} className="texto_estatico">
                                        <h4 className="texto_mas_pequeño">Profesional</h4>
                                    </Col>
                                    <Col xs={"6"} className="texto_estatico">
                                        <h4 className="texto_mas_pequeño">Practicante</h4>
                                    </Col>
                                  </Row>

                            </Col>
                        </Row>
                  </Col>
          </Row>
          </div>



        <div class="col-12">
          <Row>
            <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} 
                    datos={state.data_a_enviar} seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario}/>
          </Row>
        </div>


        </Col>

      </Row>
    )
}

export default Info_basica_monitor