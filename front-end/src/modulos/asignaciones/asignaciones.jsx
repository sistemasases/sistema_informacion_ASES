/**
  * @file asignaciones.jsx
  * @version 1.0.0
  * @description modulo para visualizar las asignaciones.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import {decryptTokenFromSessionStorage, desencriptar, desencriptarInt} from '../utilidades_seguridad/utilidades_seguridad';
import Asignaciones_component from "../../components/asignaciones/asignaciones_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import React, {useState, useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import axios from 'axios';


const Carga_masiva = () => {
  // Constante para guardar el token
  const config = {
    headers: {
          Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    }
  };
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(sessionStorage.getItem('permisos'));
  // Constante para guardar la data.
  const [state, set_state] = useState({
    data1: [],
    data2: [],
    data3: [],
    data4: []
  });
  // Constante para saber si está cargando la consultado
  const [isLoading, setIsLoading] = useState(true);
  // Llamada al back
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/profesional/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/", config)
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data1: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/practicante/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/", config)
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data2: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/", config)
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data3: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

      axios.get(`${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_sede/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/", config)
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data4: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  //Setea la info
  useEffect(() => {
    if (state.data1.length > 0 && state.data2.length > 0 && state.data3.length > 0 && state.data4.length > 0 && isLoading) {
      setIsLoading(false);
    }
  }, [state.data1, state.data2, state.data3, state.data4]);

  return (
    <>{userRole.includes('view_gestion_asignaciones') ? <Col className="contenido_children">
        <Row>
          <Col>
            <Row className="justify-content-md-center">
              <h1>ASIGNACIONES</h1>
            </Row>
            {isLoading ? (
              <Row>Cargando</Row>
            ) : (
              <Row className="containerRow">
                <Asignaciones_component
                  dataProfesionales={state.data1}
                  dataPracticantes={state.data2}
                  dataMonitores={state.data3}
                  dataEstudiantes={state.data4}
                />
              </Row>
            )}
          </Col>
        </Row>
    </Col> : <Acceso_denegado/>}</>
  )
}

export default Carga_masiva 