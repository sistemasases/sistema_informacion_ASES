import React, {useState, useEffect} from 'react';
import Select from 'react-select'  ;
import {Container, Row, Col, Button} from "react-bootstrap";
import Listas from './listas'
import Listas_no_seleccion from './listas_no_seleccion';
import axios from 'axios';

import profecionales from "./profecionales";
import {Scrollbars} from 'react-custom-scrollbars'; 


const asignaciones_component = (props) =>{

  const[rol] = useState("practicante");
  const[rol2] = useState("monitor");
  const[rol3] = useState("estudiante");


  const [state,set_state] = useState({

    profecional_seleccionado : '',
    practicante_seleccionado : '',
    monitor_seleccionado : '',
    estudiante_seleccion : '',

    practicante_filtro : '',
    monitor_filtro : '',
    estudiante_filtro : '',

    option : '',
    mensaje : [],
    respuesta : 'Cargando...',

    data_profesionales : props.dataProfesionales,
    data_practicantes : props.dataPracticantes,
    data_monitores : props.dataMonitores,
    data_estudiantes: props.dataEstudiantes,

    separacion_practicantes : [],
    separacion_monitores : [],
    separacion_estudiantes : [],

    opciones_profecionales : [],
  })


//  console.log("primero : "+ state.data_profesionales)
//  console.log("segundo : "+ state.data_profesionales[0])
//  console.log("tercero : "+ state.data_profesionales[0]['username'])
//  console.log("primero : "+ state.data_profesionales)

    const opciones_profecionales2 =[
    {value : state.data_profesionales['0']['id'], label : state.data_profesionales['0']['username']},
    {value : state.data_profesionales['1']['id'], label : state.data_profesionales['1']['username']},
    {value : state.data_profesionales['2']['id'], label : state.data_profesionales['2']['username']}
    ]

    
  useEffect(()=>{

    if(state.data_profesionales.length > state.opciones_profecionales.length)
    {
      console.log("entra una vez")
      for (var i = 0; i < state.data_profesionales.length ; i++) {
          const dato = 
          { value: state.data_profesionales[i]['id'], 
          //label:state.data_profesionales[i]['username']+" "+state.data_profesionales[i]['first_name']+" "+state.data_profesionales[i]['last_name'],
          label:state.data_profesionales[i]['username'],
          id:state.data_profesionales[i]['id'] }

          state.opciones_profecionales.push(dato)
          console.log("entra 1")
          console.log(state.opciones_profecionales[i])
        }
        console.log("entra2")
        console.log(state.opciones_profecionales)
    }
    {
      console.log("entra dos veces")
    }

        
    },[]);


  const [isLoading_practicantes_separados, setIsLoading_practicantes_separados] = useState(true);
  useEffect(() => {
    if (state.separacion_practicantes.length > 0 && isLoading_practicantes_separados) {
      setIsLoading_practicantes_separados(false);
    }
  }, [state.separacion_practicantes]);



  const [isLoading_monitores_separados, setIsLoading_monitores_separados] = useState(true);
  useEffect(() => {
    if (state.separacion_monitores.length > 0 && isLoading_monitores_separados) {
      setIsLoading_monitores_separados(false);
    }
  }, [state.separacion_monitores]);



  const [isLoading_estudiantes_separados, setIsLoading_estudiantes_separados] = useState(true);
  useEffect(() => {
    if (state.separacion_estudiantes.length > 0 && isLoading_estudiantes_separados) {
      setIsLoading_estudiantes_separados(false);
    }
  }, [state.separacion_estudiantes]);





  const cambiar_dato_select = (e) =>{

      axios.get('http://localhost:8000/usuario_rol/practicante/'+e.id+'/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          separacion_practicantes : response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

      set_state({
            ...state,
              profecional_seleccionado: e.value
      })
    }


   const cambiar_dato = (e) =>{
          set_state({
                ...state,
                [e.target.name] : e.target.value
          })
          console.log(e.target.value)
    }




  function practicante_seleccion(name){

    axios.get('http://localhost:8000/usuario_rol/monitor/'+name+'/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          separacion_monitores : response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    set_state({
      ...state,
      practicante_seleccionado : name
    })

    alert(name)

    console.log("estos son los monitores separados : " + state.separacion_monitores)
  }



  function monitor_seleccion(name){

    //poner el de los estudiantes

    axios.get('http://localhost:8000/usuario_rol/estudiante_selected/'+name+'/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          separacion_estudiantes : response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    set_state({
      ...state,
      monitor_seleccionado : name
    })
        alert(name)

    console.log("estos son los monitores separados : " + state.separacion_estudiantes)
  }


  
  function estudiante_seleccion(name){
    set_state({
      ...state,
      estudiante_seleccionado : name
    })
        alert(name)

  }


  const limpiar_practicantes = () => {
    set_state({
                ...state,
                practicante_filtro : ''
          })
  }
  const limpiar_monitores = () => {
    set_state({
                ...state,
                monitor_filtro : ''
          })
  }
  const limpiar_estudiantes = () => {
    set_state({
                ...state,
                estudiante_filtro : ''
          })
  }


  return (
        <Container className="container_asignaciones">

          <Row className="row_listas">

            <Col xs={"12"} md={"4"}>

              <Row  className="row_asignaciones_titulos">     
                <Col xs={"12"} className="col_asignaciones_titulos">
                Practicantes
                </Col> 
                <Col xs={"12"} className="col_asignaciones_titulos">
                Total estudiantes acompañados 
                </Col> 
                <Col xs={"12"} className="col_asignaciones_titulos">
                Profecional
                </Col>   
                <Select options={state.opciones_profecionales} onChange={cambiar_dato_select} ></Select>
              </Row>
              <Row >

                {
                    isLoading_practicantes_separados ?
                    (
                      <Col className="scroll_listas">
                        <Row className="asignaciones_no_seleccion">
                          Profecional no seleccionado 
                        </Row>
                      <Scrollbars>
                          { state.data_practicantes.filter((item)=>{
                          return state.practicante_filtro.toLowerCase() === '' ? item 
                          : 
                          item.username.toLowerCase().includes(state.practicante_filtro) ||
                          item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                          item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                        }).map((item, index) => <Listas 
                        key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}
                        childClicked={(name)=>practicante_seleccion(name)}/>) }
                      </Scrollbars>

                      </Col>
                    )
                    :
                    (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_seleccion_profecional">
                        profecional: {state.profecional_seleccionado}
                        </Row>
                      { state.separacion_practicantes['0'].filter((item)=>{
                        return state.practicante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.practicante_filtro) ||
                        item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                        item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                      }).map((item, index) => <Listas 
                    key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}
                    childClicked={(name)=>practicante_seleccion(name)}/>) }


                    <Row className="separador_asignaciones"></Row>
                      { state.separacion_practicantes['1'].filter((item)=>{
                        return state.practicante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.practicante_filtro) ||
                        item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                        item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                      }).map((item, index) => <Listas_no_seleccion 
                    key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}/>) }
                    </Col>
                    )
                  }

              </Row>

            </Col>







            <Col xs={"12"} md={"4"}>
              <Row  className="row_asignaciones_titulos">  
                <Col xs={"12"} className="col_asignaciones_titulos">
                Monitores         
                </Col>     
                <Col xs={"12"} md={"9"}>
                  <input name="monitor_filtro" onChange={cambiar_dato}></input>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button onClick={limpiar_monitores}>Limpiar</Button>
                </Col>
              </Row>
              <Row>

                {
                   isLoading_monitores_separados ?
                  (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_no_seleccion">
                        Practicante no seleccionado 
                        </Row>
                    <Scrollbars>

                        { state.data_monitores.filter((item)=>{
                        return state.monitor_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.monitor_filtro) ||
                        item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                        item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                      }).map((item, index) => <Listas 
                      key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}
                      childClicked2={(name)=>monitor_seleccion(name)}/>) }
                     </Scrollbars>
                    </Col>
                  )
                  :
                  (
                  <Col className="scroll_listas">
                    <Row className="asignaciones_seleccion">
                      Practicante seleccionado : {state.monitor_seleccionado }
                    </Row>
                    <Scrollbars>
                    { state.separacion_monitores['0'].filter((item)=>{
                      return state.monitor_filtro.toLowerCase() === '' ? item 
                      : 
                      item.username.toLowerCase().includes(state.monitor_filtro) ||
                      item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                      item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                    }).map((item, index) => <Listas 
                  key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}
                  childClicked2={(name)=>monitor_seleccion(name)}/>) }
                    <Row className="separador_asignaciones"></Row>

                    { state.separacion_monitores['1'].filter((item)=>{
                      return state.monitor_filtro.toLowerCase() === '' ? item 
                      : 
                      item.username.toLowerCase().includes(state.monitor_filtro) ||
                      item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                      item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                    }).map((item, index) => <Listas_no_seleccion 
                  key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}/>) }
                  </Scrollbars>
                  </Col>
                  )
                }

                
              </Row>
            </Col>







            

            <Col xs={"12"} md={"4"}>
              <Row className="row_asignaciones_titulos">
                <Col xs={"12"} className="col_asignaciones_titulos">
                Estudiantes
                </Col>
                <Col xs={"12"} md={"9"}>
                  <input name="estudiante_filtro" onChange={cambiar_dato}></input>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button  onClick={limpiar_estudiantes}>Limpiar</Button>
                </Col>
              </Row>
              <Row>
                {
                   isLoading_estudiantes_separados ?
                  (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_no_seleccion">
                        Monitor no seleccionado 
                      </Row>
                    <Scrollbars>
                      { state.data_estudiantes.filter((item)=>{
                        return state.estudiante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.nombre.toLowerCase().includes(state.estudiante_filtro) ||
                        item.apellido.toLowerCase().includes(state.estudiante_filtro) ||
                        item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                      }).map((item, index) => 
                      
                      <Listas 
                      key={index} item={item} rol={rol3} 
                      monitor_seleccionado={state.monitor_seleccionado}
                      filtro={state.estudiante_filtro}
                      childClicked3={(name)=>estudiante_seleccion(name)}/>) }
                    </Scrollbars>
                    </Col>
                  )
                  :
                  (
                  <Col className="scroll_listas">
                    <Row className="asignaciones_seleccion">
                      Monitor seleccionado : {state.monitor_seleccionado }
                    </Row>
                  <Scrollbars>
                  { state.separacion_estudiantes['0'].filter((item)=>{
                      return state.estudiante_filtro.toLowerCase() === '' ? item 
                      : 
                      item.nombre.toLowerCase().includes(state.estudiante_filtro) || 
                      item.apellido.toLowerCase().includes(state.estudiante_filtro) ||
                      item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                    }).map((item, index) => <Listas 
                  key={index} item={item} rol={rol3} 
                  filtro={state.estudiante_filtro}
                  monitor_seleccionado={state.monitor_seleccionado}
                  childClicked3={(name)=>estudiante_seleccion(name)}/>) }
                    <Row className="separador_asignaciones"></Row>

                    { state.separacion_estudiantes['1'].filter((item)=>{
                      return state.estudiante_filtro.toLowerCase() === '' ? item 
                      : 
                      item.nombre.toLowerCase().includes(state.estudiante_filtro), 
                      item.apellido.toLowerCase().includes(state.estudiante_filtro),
                      item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                    }).map((item, index) => <Listas_no_seleccion 
                  key={index} item={item} rol={rol3} 
                  filtro={state.estudiante_filtro}
                  monitor_seleccionado={state.monitor_seleccionado}/>) }
                  </Scrollbars>
                  </Col>
                  )
                }

                
                
              </Row>
            </Col>

          </Row>


          <Row>
            <Button>abajo</Button>
          </Row>






            
        </Container>
  )
}

export default asignaciones_component


  
  
  
