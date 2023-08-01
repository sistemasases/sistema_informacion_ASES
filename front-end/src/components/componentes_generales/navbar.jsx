import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import  {useEffect} from 'react';
import Logos from './LOGO BLANCORecurso 1.png';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { useNavigate  } from 'react-router-dom';
import { AES } from 'crypto-js';
=======
>>>>>>> Desarrollo

const Navbar = (props) =>{

    const location = useLocation();
    const [lastVisitedRoutes, setLastVisitedRoutes] = useState([]);
  
    useEffect(() => {
      const currentUrl = window.location.href;
      const storedRoutes = AES.decrypt(sessionStorage.getItem('lastVisitedRoutes'),'lastVisitedRoute');
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
  
      sessionStorage.setItem('lastVisitedRoutes',  AES.encrypt(JSON.stringify(updatedRoutes),'lastVisitedRoute'));
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

        <Col xs={"5"} md={"2"} href={"/"}>
            <img src={Logos} className="logo" alt='/'></img>
        </Col>

        <div class="d-none d-md-inline col-md-6" >
            <Col className="ulDropdown">
                <Row>
                {/* Aquí se mostrarían las últimas rutas visitadas en orden inverso */}
            {lastVisitedRoutes.reverse().map((url, index) => (    
                <Col md={"4"} className="row_modulo_activo" href={url}>
                    <a href={url}>
                        {getSegmentsFromUrl(url).join('/')}
                    </a>
                </Col>
            ))}
                </Row>

            </Col>
        </div>


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


            <Col className="boton_perfil" xs={"7"} md={"4"}>
                <Row >

                    <Col xs={"7"} md={"7"} className="info_perfil">
                        <Row>{sessionStorage.nombre_completo} </Row>
                        <Row>{sessionStorage.rol}</Row>
                        <Row>{sessionStorage.sede}</Row>
                    </Col>

                    
                    <Col xs={"5"} md={"3"}>
                         <Row onClick={toggle} className="desplegable_usuario">
                                <Col xs={"10"} md={"6"} className="boton_usuario">
                                    <i class="bi bi-person-circle"></i>
                                </Col>
                                {
                                    isOpen ?
                                    (
                                        <div class="d-none d-md-inline col-md-5" >
                                            <Col className="flecha_usuario">
                                                <i class="bi bi-caret-up-fill"></i>
                                            </Col>
                                        </div>
                                    )
                                    :
                                    (
                                        <div class="d-none d-md-inline col-md-5" >
                                            <Col className="flecha_usuario">
                                                <i class="bi bi-caret-down-fill"></i>
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

export default Navbar 