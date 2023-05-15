import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import axios from 'axios';
import Asignaciones_component from "../../components/asignaciones/asignaciones_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaRegChartBar, FaThList, FaBars } from "react-icons/fa";
import { DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Carga_masiva = () => {

  const userRole = localStorage.getItem('rol');

  const [state, set_state] = useState({
    data1: [],
    data2: [],
    data3: [],
    data4: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/usuario_rol/profesional/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data1: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:8000/usuario_rol/practicante/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data2: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:8000/usuario_rol/monitor/')
      .then(response => {
        set_state(prevState => ({
          ...prevState,
          data3: response.data
        }));
      })
      .catch(error => {
        console.log(error);
      });


      axios.get('http://localhost:8000/usuario_rol/estudiante_selected/')
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

  useEffect(() => {
    if (state.data1.length > 0 && state.data2.length > 0 && state.data3.length > 0 && state.data4.length > 0 && isLoading) {
      setIsLoading(false);
    }
  }, [state.data1, state.data2, state.data3, state.data4]);

  return (
    <>{userRole === 'superAses' || userRole === 'sistemas' ? <Col className="contenido_children">
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
