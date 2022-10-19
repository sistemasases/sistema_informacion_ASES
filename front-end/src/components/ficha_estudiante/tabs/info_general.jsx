import React, {useState} from 'react';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";
import {DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  {useEffect, componentDidUpdate} from 'react';
import axios from 'axios';


const Info_general = (props) =>{

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
    ]

    const[switchChecked, setChecked] = useState(false);
    const handleChange = () => setChecked(!switchChecked);


    const datos_option_user = []
    const datos_option_rol = []
    var bandera_option_user = true;
    var bandera_option_rol = true;
    var bandera = true;
    const [state,set_state] = useState({
      usuario : '',
      data_user : [],
      data_rol : [],

      seleccionado:'',

      id_usuario:'',
      nombres:'',
      apellidos: '',
      cedula:'',
      correo:'',
      telefono:'',
      sexo:'',
      telefono_res:'',
      dir_res:'',
      barrio_res:'',
      hijos:'',
    })

    useEffect(()=>{
      axios({
        // Endpoint to send files
        url:  "http://127.0.0.1:8000/usuario_rol/all_estudiante/",
        method: "GET",
      })
      .then((respuesta)=>{
        set_state({
          ...state,
          data_user : respuesta.data
        })
      })
      .catch(err=>{
          return (err)
      })

      /*window.addEventListener('mousemove', handle_option_user)*/
      
    },[]);
    

    const handle_option_user = () => {
        set_state({
          ...state,
          id_usuario:state.data_user[props.seleccionado]['id'],
          nombres : state.data_user[props.seleccionado]['nombre'],
          apellidos : state.data_user[props.seleccionado]['apellido'],
          correo : state.data_user[props.seleccionado]['email'],
          cedula : state.data_user[props.seleccionado]['num_doc'],
          telefono : state.data_user[props.seleccionado]['telefono_res'],
          sexo : state.data_user[props.seleccionado]['sexo'],
          telefono_res : state.data_user[props.seleccionado]['telefono_res'],
          dir_res : state.data_user[props.seleccionado]['dir_res'],
          barrio_res : state.data_user[props.seleccionado]['barrio_res'],
          hijos : state.data_user[props.seleccionado]['hijos'],
        })
    }


    return (
      
        (props.seleccionado) === '' ?
        (<Row>Selecciones un {props.editar}</Row>)
        :
        (
          <Container className="container_informacion_general" xs={"12"} sm={"6"} 
                    onMouseEnter={handle_option_user} >
            <Col className="columna_informacion_general">
                <Row>
                    <h1 className="texto_subtitulo">INFORMACIÓN DEL ESTUDIANTE : {state.nombres}</h1>
                    <Row className="row_flex">
                      <Row>
                          <Col xs={"12"} md={"6"}>
                            <h4 className="texto_pequeño">Puntaje Icfes</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                            <h4 className="texto_pequeño" ></h4>
                          </Col>
                      </Row>
                    </Row>


                    <Row className="row_flex">
                        <Col xs={"12"} md={"6"}>
                        <h4 className="texto_pequeño">Año ingreso Univalle</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                        
                    </Row>


                    <Row className="row_flex">
                        <Col xs={"12"} md={"6"}>
                        <h4 className="texto_pequeño">Estrato</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                        <Col xs={"12"} md={"6"}>
                        <h4 className="texto_pequeño">Teléfono residencia</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" >{state.telefono_res}</h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Celular</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Email alternativo</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Dirección residencia</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" >{state.dir_res}</h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Barrio</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" >{state.barrio_res}</h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Municipio actual</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex"> 
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">País de origen</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>               
                    </Row>


                    <Row className="row_flex"> 
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Grupo étnico</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>           
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Actividad simultánea</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>

                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Identidad de género</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>                                        
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Sexo</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          {state.sexo}
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Estado civil</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>
                        
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Cantidad hijo/s</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" >{state.hijos}</h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Actividades que realiza en su tiempo libre</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Deportes que practica</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <h4 className="texto_pequeño" ></h4>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                    <Col xs={"12"} md={"6"}>
                    <h4 className="texto_pequeño">Condiciòn de excepciòn</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>
                    </Row>


                    <Row className="row_flex">
                        <Col xs={"12"} md={"6"}>
                            <h4 className="texto_pequeño">Otros acompañamientos</h4>
                          </Col>
                          <Col xs={"12"} md={"6"}>
                          <Select></Select>
                          </Col>
                    </Row>
                </Row>
            </Col>

            <Col className="columna_informacion_general" xs={"12"} sm={"6"}>
            <Row>
                    <h1 className="texto_subtitulo">PERSONAS CON QUIEN VIVE</h1>
                    <h3 className="texto_pequeño">Nombre Completo</h3><h3 className="texto_pequeño">Parentesco</h3>
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">INFORMACIÓN DEL ACUDIENTE O CONTACTO DE EMERGENCIA</h1>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                    <h4 className="texto_pequeño">texto</h4><h4 className="texto_pequeño">texto</h4>
                </Row>
                <Row>
                    <h1 className="texto_subtitulo">Observaciones</h1>
                    <h4 className="texto_pequeño">texto</h4>
                </Row>
            </Col>
            
        </Container>
        )
      
      
        
    )
}

export default Info_general 