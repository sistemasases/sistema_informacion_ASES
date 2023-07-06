import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import  {useEffect} from 'react';
import Logos from './LOGO BLANCORecurso 1.png';
import { useLocation } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const navbar = (props) =>{

    const location = useLocation();
    const navigate = useNavigate();
    const [lastVisitedRoutes, setLastVisitedRoutes] = useState([]);
  
    useEffect(() => {
      const currentPath = location.pathname;
      const currentUrl = window.location.href;
      const storedRoutes = sessionStorage.getItem('lastVisitedRoutes');
      let updatedRoutes = [];
  
      if (storedRoutes) {
        updatedRoutes = JSON.parse(storedRoutes);
  
        if (updatedRoutes.includes(currentUrl)) {
          const index = updatedRoutes.indexOf(currentUrl);
          updatedRoutes.splice(index, 1);
        }
  
        updatedRoutes.unshift(currentUrl);
        if (updatedRoutes.length > 3) {
          updatedRoutes.pop();
        }
      } else {
        updatedRoutes = [currentUrl];
      }
  
      sessionStorage.setItem('lastVisitedRoutes', JSON.stringify(updatedRoutes));
      setLastVisitedRoutes(updatedRoutes.reverse());
    }, [location]);
  

  
    const getSegmentsFromUrl = (url) => {
        const segments = url.split('/');
        return segments.slice(3, 4); // Obtener el cuarto segmento (índice 3)
      };

    const handleSalir = () => {
        sessionStorage.clear();
        window.location.replace('');
      };





    const[isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);

    // const handleSalir = () =>{
    //     sessionStorage.removeItem('token')
    //     sessionStorage.removeItem('refresh-token')
    //     sessionStorage.removeItem('email')
    //     sessionStorage.removeItem('first_name')
    //     sessionStorage.removeItem('instancia')
    //     sessionStorage.removeItem('last_name')
    //     sessionStorage.removeItem('nombre_completo')
    //     sessionStorage.removeItem('instancia_id')
    //     sessionStorage.removeItem('rol')
    //     sessionStorage.removeItem('semestre_actual')
    //     sessionStorage.removeItem('username')
    //     sessionStorage.removeItem('message')
    //     window.location.replace('');
    // }    

    return (
    <Container  >
        <Row className="nav">

            <Col xs={"4"} md={"2"}>
                <img src={Logos} className="logo" alt='/'></img>
            </Col>

            <Col className="ulDropdown" xs="5" md="4">
          {/* Aquí se mostrarían las últimas rutas visitadas en orden inverso */}
          {lastVisitedRoutes.reverse().map((url, index) => (
            <span key={index}>
                <a href={url} >
                    {getSegmentsFromUrl(url).join('/')} ---
                </a>
            </span>
            
          ))}
        </Col>


{/* 
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
            </Col> */}


            <Col className="boton_perfil" xs={"2"} md={"5"}>
                <Row>
                        <div class="d-none d-md-inline col-md-9" >

                            <Col xs={"1"} sm={"1"} md={"9"} className="info_perfil">
                                <Row>{sessionStorage.nombre_completo} </Row>
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