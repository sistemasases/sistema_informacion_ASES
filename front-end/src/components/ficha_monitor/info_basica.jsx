import React, {useState} from 'react';
import Select from 'react-select'  ;
// import Switch from 'react-switch'
import { Row, Col} from "styled-bootstrap-grid";
import Programas_academicos from './programas_academicos'

import  {useEffect} from 'react';
import axios from 'axios';
import Selector from "./selector";
import { decryptTokenFromSessionStorage, desencriptarInt } from '../../modulos/utilidades_seguridad/utilidades_seguridad';




const Info_basica_monitor = (props) =>{

  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
  };
    const id_usuario_desencriptada = desencriptarInt(sessionStorage.getItem('id_usuario'));
    const id_sede_desencriptada = desencriptarInt(sessionStorage.getItem('sede_id'));

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
      monitor_datos_extra: [],
      programas:[],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      codigo:'',
      correo:'',
      profesional:'',
      practicante:''
    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
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
          let formData = new FormData();
          formData.append('id_sede', sessionStorage.getItem('sede_id'));
          const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(state.data_user[i]['id'])+"/";
            axios({
              // Endpoint to send files
              url:  url_axios,
              method: "PUT",
              headers: config,
              data: formData,
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

    }






    const handle_option_user = (e) => {
        const paramsget = {
        
        id_sede: id_sede_desencriptada,
        };
        //console.log(e.id)
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/monitor_info_extra/`+desencriptarInt(state.data_user[e.id]['id'])+"/";
        axios({
          // Endpoint to send files
          url:  url_axios,
          params : paramsget,
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
           set_state({
          ...state,
          monitor_datos_extra : respuesta.data,
          seleccionado:e.id,
          id_usuario:state.data_user[e.id]['id'],
          nombres : state.data_user[e.id]['first_name'],
          apellidos : state.data_user[e.id]['last_name'],
          codigo : state.data_user[e.id]['username'],
          correo : state.data_user[e.id]['email_address'],
          data_a_enviar: state.data_user[e.id],
          programas: respuesta.data.programas,
          profseional: respuesta.data.profesional,
          practicante: respuesta.data.practicante
          })
        })
        .catch(err=>{
            return (err)
        })


      // Getting the files from the input
/*      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['first_name'],
        apellidos : state.data_user[e.id]['last_name'],
        codigo : state.data_user[e.id]['username'],
        correo : state.data_user[e.id]['email_address'],
        data_a_enviar: state.data_user[e.id],
        programas: state.monitor_datos_extra.programas
      })
*/
    }

    const handleWhatsapp = (e) =>{
      if (state.telefono) {
        const url = `https://api.whatsapp.com/send?phone=${state.telefono}`;
        window.open(url, "_blank");
      }
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
                            {/*   <li>{JSON.stringify(state.monitor_datos_extra)}</li>*/}
                        </Row>

                        <Row className="rowJustFlex" >
                            <Col className="colInfo1" xs={"12"}>
                                <Row className="infoRow1">
                                    <Col md={"12"}>
                                        {
                                          (state.seleccionado) === '' ?
                                          (
                                           <Row className="infoRow2">
                                            <Col xs={"12"} md={"9"}>
                                              <Row>
                                                <h4 className="bold">
                                                  Programas académicos 
                                                </h4>
                                              </Row>
                                              <Row>
                                                <label className='info_programa_academico_egresado'>Egresado</label>
                                                <label className='info_programa_academico_en_curso'>En curso</label>
                                                <label className='info_programa_academico_desertor'>Desertor</label>
                                              </Row>
                                              <Row className="infoRow23_inactivo"> 
                                                <Col xs={"6"} md={"6"}>
                                                  <h4 className="texto_pequeño">
                                                    {state.codigo} 
                                                  </h4>
                                                </Col>
                                                <Col xs={"3"} md={"4"}> 
                                                  <select></select>
                                                </Col>
                                              </Row>
                                             
                                            </Col>

                                            <div class="d-none d-md-block col-md-3">
                                            <Col xs={"12"} md={"12"} className="col_2017">
                                                <button className="boton_editar_info_basica" onClick={handleWhatsapp}>
                                                  <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                                </button>
                                              </Col> 
                                            </div>
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
                                                  <Col md={"9"}>
                                                    <Row>
                                                      <h4 className="texto_pequeño">Programas académicos </h4>
                                                    </Row>
                                                    <Row>
                                                      <label className='info_programa_academico_egresado'>Egresado</label>
                                                      <label className='info_programa_academico_en_curso'>En curso</label>
                                                      <label className='info_programa_academico_desertor'>Desertor</label>
                                                    </Row>
                                                       {state.programas ? (
                                                            state.programas.map((item, index) => <Programas_academicos rolUsuario={props.rolUsuario} item={item} />)
                                                          ) : (
                                                            <p>Cargando programas...</p>
                                                          )}

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
                                                  profesional: {state.profesional['first_name']}
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

                                        <Row className="infoRow2">
                                          <Col xs={"12"} md={"9"}>

                                            <Row> 
                                                  <h4 className="texto_mas_pequeño">
                                                  <br/>
                                                      profesional:  {state.profesional['first_name']}
                                                      <br/>
                                                      Practicante: {state.profesional.first_name}kk
                                                  <br/> 
                                                  Ultima astualización:
                                                  <br/> 
                                                  </h4>
                                            </Row>
                                          </Col>
                                          
                                        </Row>


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
            <Selector id={state.id_usuario} 
                    datos={state.data_a_enviar} seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario}/>
          </Row>
        </div>


        </Col>

      </Row>
    )
}

export default Info_basica_monitor