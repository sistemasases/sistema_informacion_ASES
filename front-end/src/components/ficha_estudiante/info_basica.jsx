import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Selector_estudiantes from "../componentes_generales/selector_estudiantes";
import  {useEffect} from 'react';
import axios from 'axios';


const Info_basica = () =>{

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);


    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      rol: '',
      usuario : '',
      data_user : [],
      data_rol : [],
    })
  
    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/alluser/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_user : respuesta.data
        })
      })
      .catch(err=>{
          return (err)
      })
      
    },[]);
  
    const aja = (e)=>{
      if(bandera=true){
        bandera = false
        axios({
          // Endpoint to send files
          url:  "http://127.0.0.1:8000/usuario_rol/allrol/",
          method: "GET",
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_rol : respuesta.data
          })
        })
        .catch(err=>{
            return (err)
        })
  
      }
  
      
    }
    const handle_all_rol = (e)=>{
      if(bandera_option_rol==true){
  
        for (var i = 0; i < state.data_rol['length'] ; i++) {
          const dato2 = { value: state.data_rol[i]['nombre'], label: state.data_rol[i]['nombre'],id:state.data_rol[i]['id'] }
          datos_option_rol.push(dato2)
        }
        console.log([datos_option_rol]);
        bandera_option_rol = false;
      }
      else{
        console.log([datos_option_rol]);
      }
    }
    
  
   
  
  
    const handle_option_user = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        usuario : [e.value],
      })
    }
    const handle_option_rol = (e) => {
      // Getting the files from the input
      console.log(e)
      set_state({
        ...state,
        rol : [e.value],
      })
    }
    const handle_users = (e) => {
      // Getting the files from the input
      if(bandera_option_user==true){
  
        for (var i = 0; i < state.data_user['length'] ; i++) {
          const dato = { value: state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'], label: state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'],id:state.data_user[i]['id'] }
          datos_option_user.push(dato)
        }
        console.log([datos_option_user]);
        bandera_option_user = false;
      }
      else{
        console.log([datos_option_user]);
      }
    }
    const handle_upload = (e) => {
      // Getting the files from the input
      console.log([state.rol])
      console.log([state.usuario])
    }







    return (
        <Container>
            <Row className="info_basica_borde">
                <Row className="row1">
                    <Col className="col1">
                        <Row>
                            <Select/>
                        </Row>

                        <Row className="rowJustFlex">
                            <Col className="colInfo1">
                                <Row className="infoRow1">
                                    <Col className="info_basica_selector">
                                        <Select onMouseEnter ={() => aja} 
                                        options={datos_option_user} onMenuOpen={handle_users} 
                                        onChange={handle_option_user}  className="justMargin1" />
                                    </Col>  
                                    <Row className="info"> 
                                        <Col className="info_texto">
                                            <h4>201742505 </h4>
                                        </Col>
                                        <Col className="info_texto">
                                            <h4>jose.david.erazo@correounivalle.edu.co </h4>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="info">
                                        <Col className="info_texto">
                                            <h4>1007619729 </h4>
                                        </Col>
                                        <Col className="info_texto">
                                            <h4>3023675777 </h4>
                                        </Col>
                                    </Row>
                                    
                                </Row>

                                <Row className="infoRow2">
                                    <h4>Programas academicos </h4>
                                    <Col className="inforow23">
                                        <Row className="infoRow23">
                                            <h4>van los cuadros verdes </h4>
                                            <Select  />
                                            <Switch onClick={handleChange}/>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="colInfo2">
                                <Row className="infoRow3">
                                    <h4>ICETEX </h4>
                                    <Select  />
                                </Row>
                                <Row className="infoRow3">
                                    <h4>Cohortes </h4>
                                    <h4>Cohortes </h4>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col className="col2">
                        <Row>
                            <h2 className="justMargin2">ASES</h2>
                            <h1 className="justMargin2"><FaThList /></h1>
                        </Row>
                    </Col>

                    <Col className="col3">
                        <img src={"./imag1.jpg"}></img>
                        <h1>COL DE FOTO</h1>
                    </Col>
                </Row>

                <Row className="row2">
                    <Col className="colMarcados">
                        <Col><h3>Riesgos</h3></Col>
                        <Col className="rowJustFlex_column" >
                            <Col className="rowJustFlex_to_right" >
                                individual<Button className="buttonRiesgos"></Button> 
                            </Col>
                            <Col className="rowJustFlex_to_right">
                                familiar<Button className="buttonRiesgos"></Button>
                            </Col>
                        </Col>
                        <Col className="rowJustFlex_column">
                            <Col className="rowJustFlex_to_right">
                                academico<Button className="buttonRiesgos"></Button>
                            </Col> 
                            <Col className="rowJustFlex_to_right">
                                econocmico<Button className="buttonRiesgos"></Button>
                            </Col> 
                        </Col>
                        <Col className="rowJustFlex_column">
                            <Col className="rowJustFlex_to_right">
                                vida Univ.<Button className="buttonRiesgos"></Button> 
                            </Col>
                            <Col className="rowJustFlex_to_right">
                                Geografico<Button className="buttonRiesgos"></Button>
                            </Col>
                        </Col>
                        
                        
                        
                    </Col>
                    <Col> 
                        <Button className="generar_nuevo_reporte">Generar Nuevo Reporte</Button>
                    </Col> 
                </Row>
            </Row>
        </Container>
    )
}

export default Info_basica 