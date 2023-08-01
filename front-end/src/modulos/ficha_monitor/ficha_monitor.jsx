import React, {useState} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';

import Info_basica from "../../components/ficha_monitor/info_basica";
import Selector from "../../components/ficha_monitor/selector";
import {Container, Row, Col, Dropdown, Button} from "styled-bootstrap-grid";
import {useEffect} from 'react';
import axios from 'axios';
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";




const Ficha_monitor = (props) =>{

<<<<<<< HEAD
    const userRole = AES.decrypt(sessionStorage.getItem('rol'),'rol');
=======
  const config = {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
  };

    const userRole = sessionStorage.getItem('rol');
>>>>>>> Desarrollo

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);

    const [state,set_state] = useState({
        data_user : [],
      })

    useEffect(() => {
        axios({
            // Endpoint to send files
            url:  "http://localhost:8000/usuario_rol/monitor/",
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
        <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
            <Info_basica usuario={props.nombreUsuario} rolUsuario={props.rolUsuario} 
                                area={props.area} periodo={props.periodo} data_user={state.data_user}/>
        </Col> : <Acceso_denegado/>}</>
    )
}

export default Ficha_monitor