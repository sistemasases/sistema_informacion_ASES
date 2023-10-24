import React, {useState} from 'react';

import {Dropdown, Button} from "react-bootstrap";
import {Container, Row, Col} from "styled-bootstrap-grid";

import Seguimiento_individual from '../seguimiento_forms/form_seguimiento_individual';
import Inasistencia from '../seguimiento_forms/form_inasistencia';
import {useEffect} from 'react';
import axios from 'axios';
import {desencriptar, desencriptarInt, decryptTokenFromSessionStorage} from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import { id } from 'date-fns/locale';

const Info_registros = (props) =>{

    const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    };
    const userRole = desencriptar(sessionStorage.getItem('rol'));
    const [show, setShow] = useState(false);
    const handleModal = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showIn, setShowIn] = useState(false);
    const handleModalIn = () => setShowIn(true);
    const handleCloseIn = () => setShowIn(false);

    const [state,set_state] = useState({

        data_user:[]

      })

      useEffect(()=>{
       
      axios({
          // Endpoint to send files
          url:  `${process.env.REACT_APP_API_URL}/usuario_rol/ultimo_seguimiento_individual/` + props.id_estudiante+ "/",
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
        
      },[props.id_estudiante]);



    return (
        <Row className="container_info_registro">
            <Seguimiento_individual estudiante_seleccionado={props.id_estudiante} recarga_ficha_estudiante={true} show={show} onHide={handleClose} handleClose={handleClose} handleModalIn={handleModalIn}  size="lg"/>
            <Inasistencia estudiante_seleccionado={props.id_estudiante} recarga_ficha_estudiante={true}  show={showIn} onHide={handleCloseIn} handleCloseIn={handleCloseIn} handleModal={handleModal} size="lg"/>
            {}
            <div class="d-none d-lg-block col-1">
                <Col>
                </Col>
            </div>
            <Col xs={12} lg={11}>
                
                <div class="d-none d-md-block l-20px">
                
                {(userRole === "super_ases" || userRole === "sistemas"|| userRole === "socioeducativo_reg"
                ||userRole === "socioeducativo" || userRole === "profesional"|| userRole === "practicante"
                ||userRole === "monitor")&&(
                    <Row className="generar_nuevo_reporte">
                        <Button className="boton_nuevo_registro" onClick={handleModal}>NUEVO SEGUIMIENTO</Button>
                    </Row>
                )}
                    
                <Row className="riesgos">
                    <Col>
                        <Row xs={"12"} className="titulo_riesgos">
                            <Col xs={"12"}>
                                <h3 className="texto_subtitulo" activeClassName="text_center">RIESGOS</h3>
                            </Col>
                        </Row>


                        <Row xs={"12"} className="tipos_riesgos">
                            <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos">
                                    <label className="button_tipo_riesgo_alto">A</label>
                                    <h1 className="texto_alto">ALTO</h1>
                                </Row> 
                            </Col>
                            <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos">
                                    <label className="button_tipo_riesgo_medio">M</label>
                                    <h3 className="texto_medio">MEDIO</h3>
                                </Row>
                            </Col>
                            <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                                <Row className="center_tipos_riesgos"> 
                                    <label className="button_tipo_riesgo_bajo">B</label>
                                    <h3 className="texto_bajo">BAJO</h3>
                                </Row>
                            </Col>
                        </Row>




                        <Row className="riesgos_fondo_claro">
                            <Col>

                            {state.data_user['riesgo_individual'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">INDIVIDUAL</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_individual'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">INDIVIDUAL</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_individual'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">INDIVIDUAL</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_individual'] !== 0 && state.data_user['riesgo_individual'] !== 1 && state.data_user['riesgo_individual'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">INDIVIDUAL</label>
                                        </Col>
                                    </Row>
                                    )}









                                {state.data_user['riesgo_familiar'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">FAMILIAR</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_familiar'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">FAMILIAR</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_familiar'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">FAMILIAR</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_familiar'] !== 0 && state.data_user['riesgo_familiar'] !== 1 && state.data_user['riesgo_familiar'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">FAMILIAR</label>
                                        </Col>
                                    </Row>
                                    )}








                                {state.data_user['riesgo_academico'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">ACADEMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_academico'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">ACADEMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_academico'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">ACADEMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_academico'] !== 0 && state.data_user['riesgo_academico'] !== 1 && state.data_user['riesgo_academico'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">ACADEMICO</label>
                                        </Col>
                                    </Row>
                                    )}







                                {state.data_user['riesgo_economico'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">ECONOMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_economico'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">ECONOMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_economico'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">ECONOMICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_economico'] !== 0 && state.data_user['riesgo_economico'] !== 1 && state.data_user['riesgo_economico'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">ECONOMICO</label>
                                        </Col>
                                    </Row>
                                    )}





                                {state.data_user['riesgo_vida_universitaria_ciudad'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">VIDA UNIVERSITARIA</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_vida_universitaria_ciudad'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">VIDA UNIVERSITARIA</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_vida_universitaria_ciudad'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">VIDA UNIVERSITARIA</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_vida_universitaria_ciudad'] !== 0 && state.data_user['riesgo_vida_universitaria_ciudad'] !== 1 && state.data_user['riesgo_vida_universitaria_ciudad'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">VIDA UNIVERSITARIA</label>
                                        </Col>
                                    </Row>
                                    )}



                                {state.data_user['riesgo_geografico'] === 0 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_bajo">
                                            <label className="button_tipo_riesgo_bajo_2">B</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_bajo_texto">GEOGRAFICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_geografico'] === 1 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_medio">
                                            <label className="button_tipo_riesgo_medio_2">M</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_medio_texto">GEOGRAFICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_geografico'] === 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_alto">
                                            <label className="button_tipo_riesgo_alto_2">A</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_alto_texto">GEOGRAFICO</label>
                                        </Col>
                                    </Row>
                                    )}

                                    {state.data_user['riesgo_geografico'] !== 0 && state.data_user['riesgo_geografico'] !== 1 && state.data_user['riesgo_geografico'] !== 2 && (
                                    <Row className="row_riesgo">
                                        <Col xs={"2"} sm={"2"} className="z_index_2">
                                        <label className="borde_riesgos_ninguno">
                                            <label className="button_tipo_riesgo_ninguno_2">N</label>
                                        </label>
                                        </Col>
                                        <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                                        <label className="button_tipo_riesgo_ninguno_texto">GEOGRAFICO</label>
                                        </Col>
                                    </Row>
                                    )}





                            </Col>
                            

                        </Row>
                    </Col>
                        

                        
                            
                </Row>
                </div>














                <div class="d-block d-md-none">
                <Row className="riesgos_pequeño">
                    <Col>
                        <Row xs={"12"} className="titulo_riesgos_pequeño">
                            <Col xs={"12"}>
                                <h3 className="texto_subtitulo" activeClassName="text_center">RIESGOS</h3>
                            </Col>

                        </Row>




                        <Row className="riesgos_fondo_claro">

                        {state.data_user['riesgo_individual'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">INDIVIDUAL</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_individual'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">INDIVIDUAL</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_individual'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">INDIVIDUAL</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_individual'] !== 0 && state.data_user['riesgo_individual'] !== 1 && state.data_user['riesgo_individual'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">INDIVIDUAL</label>
                            </Col>
                        )}


                        {state.data_user['riesgo_familiar'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">FAMILIAR</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_familiar'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">FAMILIAR</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_familiar'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">FAMILIAR</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_familiar'] !== 0 && state.data_user['riesgo_familiar'] !== 1 && state.data_user['riesgo_familiar'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">FAMILIAR</label>
                            </Col>
                        )}



                        {state.data_user['riesgo_academico'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">ACADEMICO</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_academico'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">ACADEMICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_academico'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">ACADEMICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_academico'] !== 0 && state.data_user['riesgo_academico'] !== 1 && state.data_user['riesgo_academico'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">ACADEMICO</label>
                            </Col>
                        )}




                        {state.data_user['riesgo_economico'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">ECONOMICO</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_economico'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">ECONOMICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_economico'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">ECONOMICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_economico'] !== 0 && state.data_user['riesgo_economico'] !== 1 && state.data_user['riesgo_economico'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">ECONOMICO</label>
                            </Col>
                        )}



                        {state.data_user['riesgo_vida_universitaria_ciudad'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">VIDA UNIV..</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_vida_universitaria_ciudad'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">VIDA UNIV..</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_vida_universitaria_ciudad'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">VIDA UNIV..</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_vida_universitaria_ciudad'] !== 0 && state.data_user['riesgo_vida_universitaria_ciudad'] !== 1 && state.data_user['riesgo_vida_universitaria_ciudad'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">VIDA UNIV..</label>
                            </Col>
                        )}




                    {state.data_user['riesgo_geografico'] === 0 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_bajo_texto_pequeño">GEOGRAFICO</label>
                            </Col>
                        )}
                        {state.data_user['riesgo_geografico'] === 1 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_medio_texto_pequeño">GEOGRAFICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_geografico'] === 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_alto_texto_pequeño">GEOGRAFICO</label>
                            </Col>
                        )}

                        {state.data_user['riesgo_geografico'] !== 0 && state.data_user['riesgo_geografico'] !== 1 && state.data_user['riesgo_geografico'] !== 2 && (
                            <Col   xs={"6"}  className="center_tipos_riesgos">
                                <label  className="button_tipo_riesgo_ninguno_texto_pequeño">GEOGRAFICO</label>
                            </Col>
                        )}


                            
                        </Row>
                    </Col>
                        
                            
                </Row>
                </div>

                
            </Col>
        </Row>
    )
}

export default Info_registros 