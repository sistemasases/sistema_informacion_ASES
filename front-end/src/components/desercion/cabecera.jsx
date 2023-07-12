import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;


const Cabecera = (props) =>{
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
  
      })


    useEffect(()=>{
  
        axios({
          // Endpoint to send files
          url:  "http://localhost:8000/usuario_rol/cohortes_lista/",
          method: "GET",
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            data_user : respuesta.data
          })
        })
        .catch(err=>{
          console.log("estos son los pr:"+state.data_user)
        })

      },[]);


      const handle_users = (e) => {
        // Getting the files from the input
        if(bandera_option_user==true){
    
          for (var i = 0; i < state.data_user['length'] ; i++) {
            const dato = { value: state.data_user[i]['nombre'], 
            label:state.data_user[i]['id']+" "+state.data_user[i]['nombre'],
            id:state.data_user[i]['id']}
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
                    Reporte de estudiantes activos en SRA por semestre
                </Col>
                <Col xs={"12"} md={"4"} className="texto_pequeño">
                    Seleccione la cohorte
                    <Select 
                    options={datos_option_user} 
                    onMenuOpen={handle_users} 
                    onChange={handle_option_user} 
                    />
                </Col>
            </Row>


            <Row>
                <Col>
                    <Row>
                        <Col xs={"12"} md={"6"}>
                            mostrando el registro del 1 al 10 de un total de # registros
                        </Col>
                        <Col xs={"12"} md={"6"}>
                            Buscar
                            <select/>
                        </Col>
                    </Row>
                </Col>

            </Row>          
        </Container>
    )
}

export default Cabecera 