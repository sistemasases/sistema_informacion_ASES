import React, {useState} from 'react';
import {Container, Row, Col, } from "react-bootstrap";
import Select from 'react-select'  ;
import Tabla_de_notas from './tabla_de_notas'
import {useEffect} from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const Cabecera = () =>{

    const [profesor, setProfesor] = useState('');
    const [curso, setCurso] = useState('');


    const [state,set_state] = useState({
        alumnos_del_profesor : [],
        tiene_alumnos_del_profesor : false,
        filtro : '',

      })
  
    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const profesorParam = urlParts[4]; // Obtiene el valor del profesor
        const cursoParam = urlParts[5]; // Obtiene el valor del curso
        setProfesor(profesorParam);
        setCurso(cursoParam);
  
    }, []);



    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/academico/alumnos_del_profesor/", 
                                        {params: { curso : curso, profesor : profesor}});
          set_state({
            alumnos_del_profesor : response.data,
            tiene_alumnos_del_profesor: true
          })
          console.log("Datos capturados correctamente");
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      };
  
      fetchData();
  
    }, [profesor, curso]);


    const traer_facultades = async (index)=>{
        try{
          const response = await axios.get("http://localhost:8000/academico/lista_de_facultades/",);
          set_state({
            facultades : response.data,
            tiene_facultades: true
          })
          console.log("entra aqui ssisisisiisj")
        }
        catch (error){
          console.log("no capto el dato")
        }
      }
    return (
        
        <Container >
            <Row >
                <Col xs={"12"} md={"8"} className="texto_titulo_bold">
                    Reporte de estudiantes activos en SRA por semestre
                </Col>
                <Col xs={"12"} md={"4"} className="texto_pequeño">
                    Seleccione la cohorte
                    <Select></Select>
                </Col>
            </Row>


                    {state.tiene_alumnos_del_profesor ?
                    (
                    <Row>
                        {state.alumnos_del_profesor.map((item, index) => 
                        <Tabla_de_notas key={index} item={item} /> )}
                    </Row>
                    )
                    :
                    (<Row>
                        Tiene : {state.tiene_alumnos_del_profesor} -- {profesor} -- {curso}
                        <li>{JSON.stringify(state.alumnos_del_profesor)}</li>
                    </Row>)
                    }
                    

        </Container>
    )
}

export default Cabecera 