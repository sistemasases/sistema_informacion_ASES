import React, {useState} from 'react';
import {Row, Col } from "react-bootstrap";
import Tabla_sin_seguimientos from "../../components/sin_seguimientos/tabla_sin_seguimientos";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import  {useEffect} from 'react';
import axios from 'axios';

const Sin_seguimientos = () =>{

  const config = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const userRole = sessionStorage.getItem('permisos');
    const [state,set_state] = useState({
        semestre_Seleccionado : '',
        semestre_activo : [],
    })


        useEffect(()=>{
        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/semestre/`+14+"/",
          method: "GET",
          headers: config,
        })
        .then((respuesta)=>{
          set_state({
            ...state,
            semestre_activo : respuesta.data
          })
        })
        .catch(err=>{
            console.log("no llega :"+err)
        })
        
      },[]);

    return (
        
        <>{ userRole.includes('view_estudiantes_sin_segui') ? <Col className="contenido_children">
            <Row className="containerRow">
                <Tabla_sin_seguimientos semestre_activo={state.semestre_activo['id']}></Tabla_sin_seguimientos>
            </Row>

        </Col> : <Acceso_denegado/>}</>
    )
}

export default Sin_seguimientos 