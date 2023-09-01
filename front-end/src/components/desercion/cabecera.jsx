import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
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
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/cohortes_lista/`,
          method: "GET",
          headers: config,
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
        if(bandera_option_user === true){
    
          for (var i = 0; i < state.data_user['length'] ; i++) {
            const dato = { value: state.data_user[i]['nombre'], 
            label:state.data_user[i]['id']+" "+state.data_user[i]['nombre'],
            id:state.data_user[i]['id']}
            datos_option_user.push(dato)
          }
          bandera_option_user = false;
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
                        <Col xs={"12"} md={"12"}>
                            Información del estado del estudiante : 
                        </Col>
                        <br></br>
                        <br></br>

                        <Col xs={"12"} md={"2"}>
                             Activo :  
                             <label className="info_desercion_activo"></label>
                        </Col>
                        <Col xs={"12"} md={"2"}>
                            Inactivo :  
                            <label className="info_desercion_inactivo"></label>
                        </Col>
                        <Col xs={"12"} md={"2"}>
                            Egresado :  
                            <label className="info_desercion_egresado"></label>
                        </Col>
                    </Row>
                </Col>

            </Row>          
        </Container>
    )
}

export default Cabecera 