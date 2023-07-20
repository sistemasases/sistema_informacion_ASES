import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;


const Cabecera = (props) =>{
  const config = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };
  
  const{childClicked} = props

    
    const datos_option_user = [];
    var bandera_option_user = true;
    const total_datos_estudiantes = []

    const [state,set_state] = useState({
        periodo : '',
  
        usuario : '',
        data_user : [],
        data_periodo : [],
        data_rol : [],
        data_cohorte:[],
        seleccionado:'',
  
        id_usuario:'',
        nombres:'',
        apellidos: '',
        cedula:'',
        correo:'',
        telefono:'',
  
      })


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
            data_user : respuesta.data
          })
          console.log("estos son los primeros datos :"+state.data_user)
        })
        .catch(err=>{
          console.log("estos son los primeros datos :"+state.data_user)
        })
        
      },[]);

      const handle_users = (e) => {
        console.log("estos son los segundos datos :"+state.data_user)  
        // Getting the files from the input
        if(bandera_option_user==true){
    
          for (var i = 0; i < state.data_user['length'] ; i++) {
            const dato = { value: state.data_user[i]['nombre'], 
            label:state.data_user[i]['nombre'],
            id:state.data_user[i]['id'] }
            datos_option_user.push(dato)
          }
          bandera_option_user = false;
        }
        else{
          console.log("bandera off");
        }
      }

      const handle_option_user = (e) => {
        // Getting the files from the input
        childClicked(e.id)
      }

    return (
        
        <Container >
            <Row >
                <Col xs={"12"} md={"8"} className="texto_titulo_bold">
                Reporte estudiantes sin seguimientos
                </Col>
                {
                  sessionStorage.rol === 'superAses' || sessionStorage.rol === 'sistemas' ?
                  (
                    <Col xs={"12"} md={"4"} className="texto_pequeño">
                      Seleccione el semestre
                      <Select 
                      options={datos_option_user} 
                      onMenuOpen={handle_users} 
                      onChange={handle_option_user} 
                      />
                    </Col>
                  ):
                  (<Col>{sessionStorage.semestre_actual}</Col>)
                }

            </Row>
      
        </Container>
    )
}

export default Cabecera 