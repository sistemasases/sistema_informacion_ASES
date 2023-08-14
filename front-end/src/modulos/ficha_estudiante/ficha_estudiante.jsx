import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';

import Info_basica from "../../components/ficha_estudiante/info_basica";
import {Container, Row, Col, Dropdown, Button} from "styled-bootstrap-grid";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";



const Ficha_estudiante = (props) =>{

  const config = {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const [state,set_state] = useState({
        data_user : [],
      })

    const userRole = sessionStorage.getItem('permisos');


    useEffect(() => {
        axios({
            // Endpoint to send files
            url:  `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/`,
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
            console.log("el error asfa:"+err)
          })
  
      }, []);
    

    return (
        <>{userRole.includes('view_ficha_estudiantes') ? <Row>
            <Col className="contenido_children">
                <Info_basica usuario={props.nombreUsuario} rolUsuario={props.rolUsuario} 
                                area={props.area} periodo={props.periodo} data_user={state.data_user}/>
            </Col>
        </Row> : <Acceso_denegado/>}</>
    )
}

export default Ficha_estudiante 