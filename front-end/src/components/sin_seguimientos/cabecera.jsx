/**
 * @file cabecera.jsx
 * @version 1.0.0
 * @description Realiza la consulta de los periodos y usuarios para mostrarlos en el select de la cabecera de la tabla de seguimientos.
 * @author Componente Sistemas Ases 
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */
import React, { useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import {decryptTokenFromSessionStorage, desencriptar} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Componente funcional que representa la cabecera de la tabla de seguimientos.
 * @param {Object} props - Propiedades pasadas al componente.
 * @returns {JSX.Element} Elemento JSX que representa la cabecera de la tabla de seguimientos.
 */
const Cabecera = (props) =>{
  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
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

/**
 * Hook de efecto que se ejecuta al montar el componente y realiza una consulta al servidor para obtener los periodos.
 */
useEffect(()=>{
  
        axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/wizard/semestre/`,
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
          console.log("estos son los primeros datos :"+state.data_user)
        })
        
      },[]);
/**
 * Función que maneja la apertura del menú de selección de usuarios.
 * @param {Event} e - Evento de apertura del menú.
 */
      const handle_users = (e) => {
 
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
      }
/**
 * Función que maneja la selección de un usuario en el menú de selección.
 * @param {Object} e - Objeto que representa la opción seleccionada.
 */
      const handle_option_user = (e) => {
        // Getting the files from the input
        childClicked(e.id)
      }

    return (
        
        <Container >
            <Row >
                <Col xs={"12"} md={"8"} className="texto_titulo_bold">
                Conteo Total de Seguimientos
                </Col>
                {
                  desencriptar(sessionStorage.rol)=== '' || desencriptar(sessionStorage.rol) === '' ?
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
                  (<Col className="texto_titulo_bold">{desencriptar(sessionStorage.semestre_actual)}</Col>)
                }

            </Row>
      
        </Container>
    )
}

export default Cabecera 