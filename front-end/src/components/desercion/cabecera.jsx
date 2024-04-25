/**
  * @file Cabecera.jsx
  * @version 1.0.0
  * @description Componente de cabecera para el reporte de desersión.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import  {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import {decryptTokenFromSessionStorage} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * @description Componente de cabecera para el reporte de desersión.
 * @param {object} props - Propiedades pasadas al componente.
 * @returns {JSX.Element} Componente de cabecera.
 */
const Cabecera = (props) =>{
  // Se obtiene y desencripta el token de sesión  
  const config = {
      Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    };
      const{childClicked} = props

    const datos_option_user = [];
    var bandera_option_user = true;

    //Estado del Componente
    const [state,set_state] = useState({
        periodo : '',
        usuario : '',
        data_user : [],
        data_periodo : [],
        data_rol : [],
  
      })

    //Obtener las cohortes
    useEffect(()=>{
  
        axios({
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

      /**
      * Procesa los datos de data_user para crear objetos y los agrega a un array de estudiantes.
      * @param {Event} e
      * @returns {void}
      */
      const handle_users = (e) => {
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