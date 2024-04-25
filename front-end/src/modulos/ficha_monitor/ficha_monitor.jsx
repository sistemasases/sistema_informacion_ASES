/**
  * @file ficha_monitor.jsx
  * @version 1.0.0
  * @description modulo para visualizar la ficha del monitor.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../utilidades_seguridad/utilidades_seguridad';
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import Info_basica from "../../components/ficha_monitor/info_basica";
import {Col} from "styled-bootstrap-grid";
import React, {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';


const Ficha_monitor = (props) =>{
  // Constante para guardar el token
  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
  };
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(sessionStorage.getItem('permisos'));
  // Constante para el valor del estado
  const[switchChecked, setChecked] = useState(false);
  // Función para el manejo del estado
  const handleChange = () => setChecked(!switchChecked);
  // Constante para guardar la información del estudiante
  const [state,set_state] = useState({
    data_user : [],
  })
  // Conexión con el back
  useEffect(() => {
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
      console.log("el error asfa:"+err)
    })
  }, []);

  return (
    <>{userRole.includes('view_ficha_monitores') ? <Col className="contenido_children">
      <Info_basica usuario={props.nombreUsuario} rolUsuario={props.rolUsuario} 
                   area={props.area} periodo={props.periodo} data_user={state.data_user}/>
    </Col> : <Acceso_denegado/>}</>
  )
}

export default Ficha_monitor
