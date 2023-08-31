import React, {useState} from 'react';
import Select from 'react-select'  ;
import {Row, Col} from "styled-bootstrap-grid";
import {Button, ListGroupItem} from "react-bootstrap";
import Seguimiento_individual from '../seguimiento_forms/form_seguimiento_individual';
import {useEffect} from 'react';
import axios from 'axios';
import Selector from "../../components/ficha_estudiante/selector";
import Ficha_footer from "./ficha_footer";
import Info_registros from './info_registros';
import Programas_academicos from './programas_academicos'
import Inasistencia from '../seguimiento_forms/form_inasistencia';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { differenceInYears } from 'date-fns';
import { parseISO } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import GraphComponent from './trayectoria.jsx';

const Info_basica = (props) =>{

  const config = {
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  };

  const config2 = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

  
    const [loading, setLoading2] = useState(false);
    const [fechas, setFechas] = useState([]);
    const [riesgos, setRiesgos] = useState({});

    const traer_graficos = () => {
      setLoading2(true);
    
      axios
        .get(`${process.env.REACT_APP_API_URL}/usuario_rol/trayectoria/` + state.id_usuario + '/')
        .then((response) => {
          setFechas(response.data[0].fechas);
          const riesgos = response.data.slice(1);
          const riesgosObj = {};
    
          riesgos.forEach((riesgo) => {
            const [key] = Object.keys(riesgo);
            const [values] = Object.values(riesgo);
            riesgosObj[key] = values;
          });
    
          setRiesgos(riesgosObj);
        })
        .catch((error) => {
          console.error('Error al obtener los riesgos:', error);
        })
        .finally(() => {
          setLoading2(false);
          handleShow();
        });
    };
    




    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    //ids de los tabs para cuando los requieran abrir apenas cargue la pestaña     General :1, Sociedu:2, Academico:3, Geografico:4
       
    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [show, setShow] = useState(false);
    const handleModal = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow2(true);

    const [showIn, setShowIn] = useState(false);
    const handleModalIn = () => setShowIn(true);
    const handleCloseIn = () => setShowIn(false);

    const datos_option_user = []
    const [isLoading, setIsLoading] = useState(true);

    const userRole = sessionStorage.getItem('rol');




    var bandera_option_user = true;
    const [state,set_state] = useState({

      actualizar:0,
      total_datos_estudiante_seleccionado:[],
      editar : false,
      usuario : '',
      data_user : [],
      data_rol : [],
      total_datos_estudiantes : [],
      tab_abierto : '',
      seleccionado:'',
      ya_selecciono_automatico : true ,

      id_usuario:'',
      nombres:'',
      apellidos: '',
      codigo:'',
      tipo_doc:'',
      cedula:'',
      correo:'',
      telefono:3122131542,
      celular:3023675789,
      ptogramas:[],
      monitor : [],
      practicante : [],
      profesional : [],
      nombre_cohorte : '',

      nueva_cedula:'',
      edad:'',
    })

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
          celular: state.total_datos_estudiantes['celular'],
          programas : state.total_datos_estudiantes['programas'],
          monitor : state.total_datos_estudiantes['info_monitor'],
          practicante : state.total_datos_estudiantes['practicante'],
          profesional : state.total_datos_estudiantes['profesional'],
          nombre_cohorte : state.total_datos_estudiantes['nombre_cohorte'],
          total_datos_estudiante_seleccionado : state.total_datos_estudiantes
        })
      }
      else{
      console.log(state.total_datos_estudiantes.length)
      }

    }, [state.total_datos_estudiantes]);


    const [selectedOption, setSelectedOption] = useState("");

    const { id } = useParams();

      function nuevo_actualizar(name){
        set_state({
          ...state,
          actualizar:state.actualizar+name
        })
      }


    useEffect(() => {
      handle_users()
    }, [props.data_user]);


    const [url_estudiante, setUrl] = useState('');


    useEffect(() => {
      const currentUrl = window.location.href;
      const subUrl = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      setUrl(subUrl);
    }, []);


    const fetchData = async (index)=>{
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/`+state.data_user[index]['id']+"/", config);
        state.total_datos_estudiantes.push(response.data)
        console.log("entra aqui ssisisisiisj")
      }
      catch (error){
        console.log("no capto el dato")
        fetchData(index);
      }
    }

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_parametros = searchParams.get('id');

    const handle_users = (e) => {
      // Getting the files from the input
      if(bandera_option_user === true){
  
        for (var i = 0; i < props.data_user['length'] ; i++) {
          const dato = 
          { value: props.data_user[i]['id'], 
          label:props.data_user[i]['cod_univalle']+" "+props.data_user[i]['nombre']+" "+props.data_user[i]['apellido'],
          id:i }
          datos_option_user.push(dato)
          //alert(dato.value+' '+url_estudiante+' '+state.ya_selecciono_automatico)

          //este if lo pongo para que abra academico de una
          if (url_estudiante == dato.value && state.ya_selecciono_automatico){
            setSelectedOption(dato)
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/`+dato.value+"/";
            axios({
              // Endpoint to send files
              url:  url_axios,
              method: "GET",
              headers: config2,
            })
            .then((respuesta)=>{
              set_state({
                ...state,
                total_datos_estudiantes : respuesta.data,
                tab_abierto : 3,
                ya_selecciono_automatico : false
              })
            })
            .catch(err=>{
                console.log("no tomo el dato")
              })
          }
        }
        bandera_option_user = false;
      }
      else{
        console.log("bandera off");
      }

    }


    const handle_option_user = (e) => {
      sessionStorage.setItem('id_estudiante_seleccionado', e.value)
      const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/` + e.value + "/";
      axios({
        url: url_axios,
        method: "GET",
        headers: config2,
      })
        .then((respuesta) => {
          const json = respuesta.data;
    
          // Obtener la fecha de nacimiento del JSON
          const fechaNacimiento = parseISO(json.fecha_nac);
    
          // Obtener la fecha actual
          const fechaActual = new Date();
    
          // Calcular la diferencia de años entre la fecha actual y la fecha de nacimiento
          const edad = differenceInYears(fechaActual, fechaNacimiento);

          // Actualizar el estado con los datos y la edad calculada
          set_state({
            ...state,
            total_datos_estudiantes: {
              ...json,
            },
            edad: edad
          });
        })
        .catch((err) => {
          console.log("Error al obtener el dato del estudiante: " + err);
        });
    
      setSelectedOption(e);
    };


    const handleWhatsapp = (e) =>{
      const celular_numerico = parseInt(state.celular)
      if (celular_numerico) {
        const url = `https://api.whatsapp.com/send?phone=${celular_numerico}`;
        window.open(url, "_blank");
      }
      else{alert("problema con el celular_numerico")}
    }



    return (
      <Row className="row_prueba">
        <Seguimiento_individual show={show} onHide={handleClose} handleClose={handleClose} handleModalIn={handleModalIn} size="lg"/>
        <Inasistencia show={showIn} onHide={handleCloseIn} handleCloseIn={handleCloseIn} handleModal={handleModal} size="lg"/>
        {/* {!loading && fechas.length > 0 && Object.keys(riesgos).length > 0 && (
          <GraphComponent fechas={fechas} riesgos={riesgos} />
        )} */}
        {/*<li >{JSON.stringify(state.total_datos_estudiantes)}</li>*/} 

        <Col xs={"12"} lg={"9"} >

          <div class="d-none d-md-block">
          <Row className="info_basica_borde">
                  <Col className="col1" xs={"12"} md={"9"}>
                    <Row>
                      <Select className="bold_select"
                              options={datos_option_user} 
                              onMenuOpen={handle_users} 
                              onChange={handle_option_user}  
                              value={selectedOption}
                              />
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
                                              <a href={`mailto:${state.correo}`}>{state.correo}</a>
                                            </h4>
                                          </Col>
                                          <Col className="info_texto" xs={"12"} md={"2"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.edad} años
                                            </h4>
                                          </Col>
                                          <Col className="info_texto" xs={"12"} md={"2"}>
                                            <h4 className="texto_mas_pequeño">
                                              {state.celular}
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
                                          <button className="boton_editar_info_basica" >
                                            <i>TRAYECTORIA</i>
                                          </button> 
                                          <button className="boton_editar_info_basica" onClick={handleWhatsapp}>
                                            <i class="bi bi-whatsapp"> + 57 {state.celular}</i>
                                          </button>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">{state.nombre_cohorte} <br/></h4>
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
                                        <Row>
                                          <label className='info_programa_academico_egresado'>Egresado</label>
                                          <label className='info_programa_academico_en_curso'>En curso</label>
                                          <label className='info_programa_academico_desertor'>Desertor</label>
                                        </Row>
                                          { state.programas.map((item, index) => <Programas_academicos 
                                            rolUsuario={props.rolUsuario}
                                            item={item}/>) 
                                          }
                                        <Row> 
                                          <h4 className="texto_mas_pequeño">
                                            <br/>
                                            Profesional: {state.profesional.first_name}
                                            <br/>
                                            Practicante: {state.practicante.first_name}
                                            <br/>
                                            Monitor: {state.monitor.first_name} 
                                            <br/> 
                                            Ultima actualización: {state.total_datos_estudiantes.ult_modificacion}
                                            <br/> 
                                          </h4>
                                        </Row>

                                      </Col>

                                      <div class="d-none d-md-block col-md-3">
                                        <Col xs={"12"} md={"12"} className="col_2017">
                                          <button className="boton_editar_info_basica"  onClick={traer_graficos}>
                                            <i>TRAYECTORIA</i>
                                          </button> 
                                          <button className="boton_editar_info_basica" onClick={handleWhatsapp}>
                                            <i class="bi bi-whatsapp"> + 57 {state.celular}</i>
                                          </button>
                                          <Row className="texto_estatico">
                                            <h4 className="texto_mas_pequeño">
                                            {state.nombre_cohorte} 
                                              <br/>
                                              
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
                                        onChange={handle_option_user}  
                                        value={selectedOption}
                                        />
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
                                    <button className="boton_editar_info_basica" onClick={handleWhatsapp}>
                                      <i class="bi bi-whatsapp"> + 57 {state.celular}</i>
                                    </button>
                                  </Row>
                                  <Row className="texto_estatico_pequeño">
                                    <h4 className="texto_mas_pequeño">Condición de excepción</h4>
                                      <h4 className="texto_mas_pequeño"></h4>
                                  </Row>
                                      <Row className="botones_info_basica_pequeña">
                                    <button className="boton_editar_info_basica" onClick={traer_graficos}>
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
                                  <i class="bi bi-whatsapp"> + 57 {state.celular}</i>
                                </button>
                                </Row>
                                <Row className="texto_estatico_pequeño">
                                  <h4 className="texto_mas_pequeño">Condición de excepción</h4>
                                  <h4 className="texto_mas_pequeño"></h4>
                                </Row>
                                  <Row className="botones_info_basica_pequeña">
                                <button className="boton_editar_info_basica" onClick={traer_graficos}>
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
                                    
                                      <h4 className="texto_mas_pequeño">
                                        <a href={`mailto:${state.correo}`}>{state.correo}</a>
                                      </h4>
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
                                      <h4 className="texto_mas_pequeño">{state.celular}</h4>
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
            <Selector id={state.id_usuario} rolUsuario={props.rolUsuario} datos={state.total_datos_estudiante_seleccionado} 
                      seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario} 
                      handleOptionUser={handle_option_user}/>
          </Row>

        </div>
        </Col>



        <Col xs={"12"} lg={"3"} className="prueba1">
          <Info_registros id_estudiante={state.total_datos_estudiantes['id']}></Info_registros>
        </Col>
        


        <div class="d-block d-md-none col-12">
          <Col>
          <Selector id={state.id_usuario} actualizar={state.actualizar} rolUsuario={props.rolUsuario} datos={state.total_datos_estudiante_seleccionado} 
                    seleccionado={state.seleccionado} editar={state.editar} codigo={state.id_usuario} tab_abierto={state.tab_abierto}
                    handleOptionUser={handle_option_user}/>
          </Col>
        </div>
      


        <Modal show={show2} onHide={handleClose2} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!loading && fechas.length > 0 && Object.keys(riesgos).length > 0 && (
              <GraphComponent fechas={fechas} riesgos={riesgos} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Row>
    )
}

export default Info_basica 