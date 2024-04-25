/**
  * @file reporte_seguimientos.jsx
  * @version 1.0.0
  * @description modulo para visualizar la ficha del monitor.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../utilidades_seguridad/utilidades_seguridad';
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import Cabecera from "../../components/reporte_seguimientos/cabecera";
import React, {useState, useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import axios from 'axios';

const Reporte_seguimientos = (props) =>{
  // Constante para guardar el token
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  // Constante para guardar la información del usuario y del periodo
  const [state,set_state] = useState({
      periodo : '',
      data_user : [],
  })
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(sessionStorage.getItem('permisos'));
  // Conexión con el back extraido según el rol
  useEffect(()=>{
    if (desencriptar(sessionStorage.getItem('rol')) === 'super_ases' || desencriptar(sessionStorage.getItem('rol')) === 'socioeducativo'|| desencriptar(sessionStorage.getItem('rol')) === 'socioeducativo_reg' )
    {
      axios({
        // Endpoint to send files
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/profesional/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
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
        console.log("error" + err)
      })
    }
    else if (desencriptar(sessionStorage.getItem('rol')) === 'profesional')
    {
      axios({
        // Endpoint to send files
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/practicante/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
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
        console.log("error" + err)
      })

    }
    else if (desencriptar(sessionStorage.getItem('rol')) === 'practicante')
    {
      axios({
        // Endpoint to send files
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/",
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
        console.log("error" + err)
      })
    }
  },[]);

  return (
    <>{userRole.includes('view_reporte_segui') ? <Col className="contenido_children">
        <Row className="containerRow">
            <Cabecera usuario={props.usuario} periodo={desencriptar(sessionStorage.getItem('semestre_actual'))} data_user={state.data_user}></Cabecera>
        </Row>
    </Col> : <Acceso_denegado/>}</>
  )
}

export default Reporte_seguimientos
