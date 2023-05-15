import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import  {useEffect} from 'react';
import {FaRegChartBar, FaThList, FaBars} from "react-icons/fa";

import Logos from './LOGO BLANCORecurso 1.png';


const navbar = (props) =>{

    const [url, setUrl] = useState('');

    useEffect(() => {
        const currentUrl = window.location.href;
        const subUrl = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        setUrl(subUrl);
    }, []);

    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    const handleSalir = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('email')
        localStorage.removeItem('first_name')
        localStorage.removeItem('instancia')
        localStorage.removeItem('last_name')
        localStorage.removeItem('nombre_completo')
        localStorage.removeItem('instancia_id')
        localStorage.removeItem('rol')
        localStorage.removeItem('semestre_actual')
        localStorage.removeItem('username')
        localStorage.removeItem('message')
        window.location.replace('');
    }    

    const menuOptions=[
        {
            id:1,
            path:"/",
            name:"Analitics",
            icon:<FaRegChartBar />,
        },
        {
            id:2,
            path:"/ficha_estudiante",
            name:"fichaDeEstudiante aiiiiiiiiiiiiiiii",
            icon:<FaThList />,
            thisIsOpen:true,
        }
    ]
    return (
    <Container  >
        <Row className="nav">

            <Col xs={"4"} md={"3"}>
                <img src={Logos} className="logo"></img>
            </Col>


            <Col className="ulDropdown" xs={"5"} md={"4"}>            
                <Row >
                    <div class="d-none d-md-inline">
                        <Col xs={"12"} md={"7"} className="row_modulo_activo">
                            <label>{url}</label>
                        </Col>
                    </div>
                    <div class="d-inline d-md-none">
                        <Col xs={"12"} md={"5"} className="row_modulo_activo_pequeño">
                            {props.path_actual}
                        </Col>
                    </div>
                </Row>
            </Col>


            <Col className="boton_perfil" xs={"2"} md={"5"}>
                <Row>
                        <div class="d-none d-md-inline col-md-9" >

                            <Col xs={"1"} sm={"1"} md={"9"} className="info_perfil">
                                <Row>{localStorage.nombre_completo} </Row>
                                <Row>Enlace del documento de aceptación t.d.p</Row>
                            </Col>
                        </div>

                    
                    <Col xs={"12"} sm={"12"} md={"3"} className="desplegable_usuario">
                         <Row onClick={toggle}>
                                <Col xs={"7"} md={"4"} >
                                    <label className="boton_usuario">
                                        <i class="bi bi-person-fill"/>
                                    </label>
                                </Col>
                                {
                                    isOpen ?
                                    (
                                        <div class="d-none d-lg-inline col-md-3"> 
                                            <Col className="flecha_usuario">
                                                <i class="bi bi-chevron-up"></i>
                                            </Col>
                                        </div>
                                    )
                                    :
                                    (
                                        <div class="d-none d-lg-inline col-md-3"> 
                                            <Col  xs={"2"}  md={"3"} className="flecha_usuario">
                                                <i class="bi bi-chevron-down"></i>
                                            </Col>
                                        </div>
                                    )
                                }  
                        </Row>  

                        {
                            isOpen ?
                            (
                                <Row className="opciones_usuario">
                                    <Col xs={"12"}>
                                        PERFIL
                                    </Col>
                                    <Col xs={"12"} onClick={handleSalir}>
                                        SALIR
                                    </Col>
                                </Row>
                            )
                            :
                            (
                                <Row></Row>
                            )
                        }       
                    </Col>
                </Row>    
            </Col>

        </Row>
            
            
    </Container>
    )
}

export default navbar 