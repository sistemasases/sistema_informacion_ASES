import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col} from "styled-bootstrap-grid";
import {Dropdown, Button} from "react-bootstrap";
import Seguimiento_individual from '../seguimiento_forms/form_seguimiento_individual';
import {useEffect} from 'react';
import axios from 'axios';
import Selector from "../../components/ficha_estudiante/selector";
import Ficha_footer from "./ficha_footer";
import Info_registros from './info_registros';
import Programas_academicos from './programas_academicos'
import Inasistencia from '../seguimiento_forms/form_inasistencia';



const Info_basica = (props) =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleModal = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showIn, setShowIn] = useState(false);
    const handleModalIn = () => setShowIn(true);
    const handleCloseIn = () => setShowIn(false);

    const datos_option_user = []
    const [isLoading, setIsLoading] = useState(true);

    var bandera_option_user = true;
    const [state,set_state] = useState({

      total_datos_estudiante_seleccionado:[],
      editar : false,
      usuario : '',
      data_user : [],
      data_rol : [],
      total_datos_estudiantes : [],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      codigo:'',
      tipo_doc:'',
      cedula:'',
      correo:'',
      telefono:'',
      ptogramas:[],

      nueva_cedula:'',
      edad:'',
    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/estudiante/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_user : respuesta.data
        })
        console.log("estos son los primeros datos :"+state.data_user)
      })
      .catch(err=>{
        console.log("estos son los primeros datos :"+state.data_user)
      })
      console.log("estos son los primeros datos :"+state.data_user)
      
    },[]);
   


    const handle_upload = (e) => {
      // Getting the files from the input
      console.log([state.rol])
      console.log([state.usuario])
    }





    const fetchData = async (index)=>{
      try{
        const response = await axios.get("http://localhost:8000/usuario_rol/estudiante/"+state.data_user[index]['id']+"/");
        state.total_datos_estudiantes.push(response.data)
        console.log("entra aqui ssisisisiisj")
      }
      catch (error){
        console.log("no capto el dato")
        fetchData(index);
      }
    }


    const handle_users = (e) => {
      console.log("estos son los segundos datos :"+state.data_user)
      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['id'], 
          label:state.data_user[i]['cod_univalle']+" "+state.data_user[i]['nombre']+" "+state.data_user[i]['apellido'],
          id:i }
          datos_option_user.push(dato)
        }
        bandera_option_user = false;
      }
      else{
        console.log("bandera off");
      }

    }



    useEffect(() => {
      console.log('entra al useeffct xd')
      if (state.total_datos_estudiantes['nombre'] && isLoading) {
        set_state({
          ...state,
          seleccionado:state.total_datos_estudiantes['id'],
          id_usuario:state.total_datos_estudiantes['id'],
          nombres : state.total_datos_estudiantes['nombre'],
          apellidos : state.total_datos_estudiantes['apellido'],
          codigo :state.total_datos_estudiantes['cod_univalle'],
          correo :state.total_datos_estudiantes['email'],
          tipo_doc : state.total_datos_estudiantes['tipo_doc'],
          cedula :state.total_datos_estudiantes['num_doc'],
          telefono :state.total_datos_estudiantes['telefono_res'],
          edad : '1',
          programas : state.total_datos_estudiantes['programas'],
          total_datos_estudiante_seleccionado : state.total_datos_estudiantes
        })
      }
      else{
      console.log(state.total_datos_estudiantes.length)
    }
    }, [state.total_datos_estudiantes]);



    const handle_option_user = (e) => {
      // Getting the files from the input

      const url_axios = "http://localhost:8000/usuario_rol/estudiante/"+e.value+"/";
      axios({
        // Endpoint to send files
        url:  url_axios,
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          total_datos_estudiantes : respuesta.data
        })
      })
      .catch(err=>{
          console.log("no tomo el dato")
        })

      console.log(e)
      
      console.log("este es el")
      console.log(datos_option_user)
      console.log("este es el id seleccionado")
      console.log(e.id)
      sessionStorage.setItem("id_estudiante_seleccionado", e.id)
      console.log("id estudiante seleccionado")
      console.log(sessionStorage.getItem("id_estudiante_seleccionado"))
      console.log("total datos estudiantes seleccionado")
      console.log(state.total_datos_estudiantes)
      console.log(state.total_datos_estudiantes['nombre'])

    }












    return (
      <Row className="row_prueba">
        <Seguimiento_individual show={show} onHide={handleClose} handleClose={handleClose} handleModalIn={handleModalIn} size="lg"/>
        <Inasistencia show={showIn} onHide={handleCloseIn} handleCloseIn={handleCloseIn} handleModal={handleModal} size="lg"/>
        <Col xs={"12"} lg={"9"} >

          <div class="d-none d-md-block">
          <Row className="info_basica_borde">
                  <Col className="col1" xs={"12"} md={"9"}>
                    <Row>
                      <Select className="bold_select"
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
                                            <Col className="info_texto" xs={"5"} md={"3"}>
                                              <h4 className="texto_mas_pequeño">{state.tipo_doc}
                                                cédula
                                              </h4>
                                            </Col>
                                            <Col className="info_texto" md={"5"}>
                                              <h4 className="texto_mas_pequeño">
                                                correo
                                              </h4>
                                            </Col>
                                            <Col className="info_texto" xs={"3"} md={"2"}>
                                              <h4 className="texto_mas_pequeño">
                                                edad
                                              </h4>
                                            </Col>
                                            <Col className="info_texto" xs={"3"} md={"2"}>
                                              <h4 className="texto_mas_pequeño">
                                                Teléfono
                                              </h4>
                                            </Col>
                                        </Row>
                                      )
                                      :
                                      (
                                        <Row className="info"> 
                                          <Col className="info_texto" xs={"12"} md={"3"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.tipo_doc}   {state.cedula}
                                            </h4>
                                          </Col>
                                          <Col className="info_texto" xs={"12"} md={"5"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.correo}
                                            </h4>
                                          </Col>
                                          <Col className="info_texto" xs={"12"} md={"2"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.edad} años
                                            </h4>
                                          </Col>
                                          <Col className="info_texto" xs={"12"} md={"2"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.telefono}
                                            </h4>
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
                                          <h4 className="bold">
                                            Programas académicos 
                                          </h4>
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
                                        <Row> 
                                          <h4 className="texto_mas_pequeño">
                                            <br/>
                                            Profesional: 
                                            <br/>
                                            Practicante: 
                                            <br/>
                                            Monitor: 
                                            <br/> 
                                            Ultima actualización:
                                            <br/> 
                                          </h4>
                                        </Row>
                                      </Col>

                                      <div class="d-none d-md-block col-md-3">
                                      <Col xs={"12"} md={"12"} className="col_2017">
                                          <button className="boton_editar_info_basica">
                                            <i>TRAYECTORIA</i>
                                          </button> 
                                          <button className="boton_editar_info_basica">
                                            <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                          </button>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">Condición de excepcion <br/>2017-C.A</h4>
                                          </Row>
                                        </Col> 
                                      </div>
                                    </Row>
                                  )
                                  :
                                  (
                                    <Row className="infoRow2">
                                      <Col md={"9"}>
                                        <Row>
                                          <h4 className="texto_pequeño">Programas académicos </h4>
                                        </Row>
                                          { state.programas.map((item, index) => <Programas_academicos 
                                            rolUsuario={props.rolUsuario}
                                            item={item}/>) 
                                          }
                                        <Row> 
                                          <h4 className="texto_mas_pequeño">
                                            <br/> 
                                            <a href="https://campusvirtual.univalle.edu.co/" target="_blank" rel="noonpener noreferrer">
                                              Documento de Autorización de Tratamiento de Datos
                                            </a>
                                          </h4>
                                        </Row>
                                      </Col>

                                      <div class="d-none d-md-block col-md-3">
                                        <Col xs={"12"} md={"12"} className="col_2017">
                                          <button className="boton_editar_info_basica">
                                            <i>TRAYECTORIA</i>
                                          </button> 
                                          <button className="boton_editar_info_basica">
                                            <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                          </button>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">
                                            Condición de excepcion 
                                              <br/>
                                              2017-C.A
                                            </h4>
                                          </Row>
                                        </Col>  
                                      </div>                                    
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
                                        options={datos_option_user} 
                                        onMenuOpen={handle_users} 
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

                            
                            <Col xs={"7"} sm={"4"}>
                                  <Row className="botones_info_basica_pequeña">

                                    <button className="boton_editar_info_basica">
                                      <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                    </button>
                                  </Row>
                                  
                                  <Row className="texto_estatico_pequeño">
                                    <h4 className="texto_mas_pequeño">Condición de excepción</h4>
                                      <h4 className="texto_mas_pequeño">2017-C.A</h4>
                                  </Row>

                                      <Row className="botones_info_basica_pequeña">
                                    <button className="boton_editar_info_basica">
                                      <i>TRAYECTORIA</i>
                                    </button>
                                  </Row>
                              </Col>

                                  <Button className="boton_nuevo_registro_pequeño" onClick={handleModal}>NUEVO SEGUIMIENTO</Button>
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

                            
                            <Col xs={"7"} sm={"4"}>
                            <Row className="botones_info_basica_pequeña">

                                <button className="boton_editar_info_basica">
                                  <i class="bi bi-whatsapp"> + 57 {state.telefono}</i>
                                </button>
                                </Row>

                                <Row className="texto_estatico_pequeño">
                                <h4 className="texto_mas_pequeño">Condición de excepción</h4>
                                  <h4 className="texto_mas_pequeño">2017-C.A</h4>
                                </Row>

                                  <Row className="botones_info_basica_pequeña">
                                <button className="boton_editar_info_basica">
                                  <i>TRAYECTORIA</i>
                                </button>
                                </Row>
                            </Col>

                                  <Button className="boton_nuevo_registro_pequeño" onClick={handleModal}>NUEVO SEGUIMIENTO</Button>

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
                                    <Col xs={"5"} sm={"1"} className="info_texto_cedula_pequeño"  md={"2"}>
                                      <h4 className="texto_mas_pequeño"> cédula</h4>
                                    </Col>
                                    <Col className="info_texto" xs={"3"} md={"12"}>
                                      <h4 className="texto_mas_pequeño">edad</h4>
                                    </Col>
                                    <Col className="info_texto" xs={"3"} md={"2"}>
                                      <h4 className="texto_mas_pequeño">teléfono</h4>
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
                                    <Col className="info_texto" xs={"3"} md={"2"}>
                                      <h4 className="texto_mas_pequeño">{state.edad} años</h4>
                                    </Col>
                                    <Col className="info_texto" xs={"3"} md={"2"}>
                                      <h4 className="texto_mas_pequeño">{state.telefono}</h4>
                                    </Col>
                                  </Row>
                                )
                              } 
                              <Row className="ficha_footer_pequeña">
                                <Col xs={"12"} className="texto_estatico">
                                  <h4 className="texto_mas_pequeño">Monitor</h4>
                                </Col>
                                <Col xs={"6"} className="texto_estatico">
                                  <h4 className="texto_mas_pequeño">Profesional</h4>
                                </Col>
                                <Col xs={"6"} className="texto_estatico">
                                  <h4 className="texto_mas_pequeño">Practicante</h4>
                                </Col>
                              </Row>
                                {
                                  (state.seleccionado) === '' ?
                                  (
                                    <Row className="infoRow2_pequeño">
                                      <Col xs={"12"} md={"9"}>
                                        <Row className="texto_estatico">
                                          <h4 className="bold">Programas académicos </h4>
                                        </Row>
                                        <Row className="infoRow23_inactivo"> 
                                          <Col xs={"6"} md={"6"}>
                                            <h4 className="texto_pequeño">{state.codigo} </h4>
                                          </Col>
                                          {
                                            props.rolUsuario==='superSistemas' ?
                                            (
                                              <Col xs={"3"} md={"2"}>
                                                <Switch onClick={handleChange}/>
                                              </Col>
                                            )
                                            :
                                            (
                                              <Col xs={"1"} md={"1"}>
                                              </Col>
                                            )
                                          }
                                          <Col xs={"3"} md={"4"}> 
                                            <select/>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  )
                                  :
                                  (
                                    <Row className="infoRow2_pequeño">
                                      <Col xs={"12"} md={"9"}>
                                        <Row className="texto_estatico">
                                          <h4 className="texto_pequeño">Programas académicos </h4>
                                        </Row>
                                        { state.programas.map((item, index) => <Programas_academicos 
                                            rolUsuario={props.rolUsuario}
                                            item={item}/>) }
                                      </Col>      
                                    </Row>
                                  )
                                }
                            </Col>
                        </Row>
                  </Col>
          </Row>
          </div>

















        <div class="d-none d-md-block col-12">
          <Row>
            <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} datos={state.total_datos_estudiante_seleccionado} seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario}/>
          </Row>
          <Row>
            <Ficha_footer></Ficha_footer>
          </Row>
        </div>
        </Col>



        <Col xs={"12"} lg={"3"} className="prueba1">
          <Info_registros></Info_registros>
        </Col>
        


        <div class="d-block d-md-none col-12">
          <Col>
          <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} datos={state.total_datos_estudiante_seleccionado} seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario}/>
          </Col>
        </div>
      
        


      </Row>
    )
}

export default Info_basica 