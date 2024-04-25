/**
  * @file ficha_estudiante.jsx
  * @version 1.0.0
  * @description modulo para visualizar la ficha del estudiante.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import {desencriptar, decryptTokenFromSessionStorage, desencriptarInt, desencriptarBigInt} from '../utilidades_seguridad/utilidades_seguridad';
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import Info_basica from "../../components/ficha_estudiante/info_basica";
import React, {useState, useEffect} from 'react';
import {Row, Col} from "styled-bootstrap-grid";
import axios from 'axios';


const Ficha_estudiante = (props) =>{
  // Constante para guardar el token
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  // Constante para guardar la información del estudiante
  const [state,set_state] = useState({
    data_user : [],
  })
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(sessionStorage.getItem('permisos'));
  // Conexión con el back
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));  
    let id_usuario = desencriptarBigInt(sessionStorage.getItem("id_usuario"));
    axios({
      // Endpoint to send files
      url:  `${process.env.REACT_APP_API_URL}/reportes/estudiante_por_rol/` +
      id_usuario.toString() +"/",
      method: "GET",
      params: { usuario_rol: rol, sede: sede },
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
