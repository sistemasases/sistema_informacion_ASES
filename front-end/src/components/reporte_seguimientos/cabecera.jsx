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

    })

   











  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/wizard/semestre/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_periodo : respuesta.data
        })
        console.log([datos_option_user]);
      })
      .catch(err=>{
          return (err)
      })


      axios({
        // Endpoint to send files
        url:  "http://localhost:8000/usuario_rol/profesional/",
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

      //const url_axios = "http://localhost:8000/seguimiento/seguimientos_estudiante/"+props.id+"/";
      const url_axios = "http://localhost:8000/seguimiento/conteo_seguimientos_estudiante/"+47+"/";

      axios({
        // Endpoint to send files
        url:  url_axios,
        method: "GET",
      })
      .then((respuesta)=>{
        state.reportes_estudiante.push(respuesta.data)
      })
      .catch(err=>{
          return (err)
      })








      
    },[]);





    













    const handle_users = (e) => {
      console.log("estos son los primeros datos :"+state.data_user)

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
            })
            .then((respuesta)=>{
              total_datos_estudiantes.push(respuesta.data)
            })
            .catch(err=>{
                console.log("no tomo el dato")
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

      console.log(e)
      set_state({
        ...state,
        seleccionado:e.id,
        id_usuario:state.data_user[e.id]['id'],
        nombres : state.data_user[e.id]['nombre'],
        apellidos : state.data_user[e.id]['apellido'],
        codigo : state.data_user[e.id]['cod_univalle'],
        correo : state.data_user[e.id]['email'],
        tipo_doc : state.data_user[e.id]['tipo_doc'],
        cedula : state.data_user[e.id]['num_doc'],
        telefono : state.data_user[e.id]['telefono_res'],
        edad : '1',
        programas : total_datos_estudiantes[e.id]['programas'],
        total_datos_estudiante_seleccionado : total_datos_estudiantes[e.id]
      })
      console.log("este es el")
      console.log(datos_option_user)
      console.log("este es el id seleccionado")
      console.log(e.id)
      console.log("total datos estudiantes seleccionado")
      console.log(total_datos_estudiantes)
    }



  
    const handle_option_periodo = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        seleccionado:e.id,
      })
    }


    const handle_periodo = (e) => {
      console.log("siiiii")
      // Getting the files from the input
      if(bandera_option_periodo==true){
        for (var i = 0; i < state.data_periodo['length'] ; i++) {
          const dato = { value: state.data_periodo[i]['nombre'], label: state.data_periodo[i]['nombre'],id:['id_instancia'] }
          datos_option_periodo.push(dato)
      }
        console.log([datos_option_periodo]);
        bandera_option_periodo = false;
      }
      else{
        console.log([datos_option_periodo]);
      }
    }
    const handle_upload = (e) => {
      // Getting the files from the input
      console.log([state.rol])
      console.log([state.usuario])
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
                    onMenuOpen={handle_users} 
                    onChange={handle_option_user} 
                    />
                </Row>
                  
              </Col>
            </Row>

            <Row className="prueba_seguimintos">
              <Informacion_rol reportes_estudiante={state.reportes_estudiante}></Informacion_rol>
            </Row>
        </Container>
    )
}

export default Cabecera 


















