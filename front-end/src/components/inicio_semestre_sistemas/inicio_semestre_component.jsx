import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Col, Alert, Form} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Inicio_semestre_service from '../../service/inicio_semestre';
import All_instancias_service from '../../service/all_instancias';

const url_instancias = 'http://127.0.0.1:8000/wizard/all'

const inicio_semestre_component = () =>{

    //Constante y variable que se usaran para el select
    const opciones = [];
    var bandera_option = true;

    //Constante que se usara para el redirecionamiento
    const navigate = useNavigate();

    //Constante que se usara para extraer todas las instancias
    const [state,set_state] = useState({tabs: [],})

    //Constante que se usara para activar o desactivar parte de la vista
    const [isSelected, setIsSelected] = useState(false);
    const [activated, setActivated] = useState({
        isDisabled: false,
        isError: false,
        isWarning: false,
        mensaje: "",
    });

    //Constantes que se usaran para los diferentes atributos del semestre
    const [semestre, setSemestre] = useState({
        idInstancia: 0,
        nombreInstancia: '',
        nombreSemestre: '',
        fecha_inicio: '',
        fecha_fin: '',
    });

    //variables para las fechas
    var date_inicio = new Date();
    var date_fin = new Date();
    date_fin.setMonth(date_fin.getMonth() + 6);

    //Conexion con el back para extraer todas las instancias
    useEffect(()=>{
        All_instancias_service.all_instancias().then((res) => {
            set_state({
                ...state,
                tabs : res
            })
        })
    },[]);

    //Prop que toma las instancias y las transforma en opciones para el select
    const handle_instancias = () => {
        if(bandera_option===true){
            for (var i = 0; i < state.tabs['length'] ; i++) {
                const dato = { value: state.tabs[i]['nombre'], label: state.tabs[i]['nombre'], id: state.tabs[i]['id'] }
                opciones.push(dato);
            }
            bandera_option = false;
        }
    }

    //Manejador de los diferentes inputs
    const handleButton = () =>{
        if(!(!semestre.nombreSemestre || semestre.nombreSemestre === '') && (semestre.nombreSemestre.includes('-A') || semestre.nombreSemestre.includes('-B')) && (semestre.nombreSemestre.length === 6)){
            if(!(!semestre.fecha_inicio || semestre.fecha_inicio === '') && (dateToInt(formatDate(date_inicio)) <= dateToInt(semestre.fecha_inicio))){
                if(!(!semestre.fecha_fin || semestre.fecha_fin === '') && (dateToInt(semestre.fecha_inicio) < dateToInt(semestre.fecha_fin))){
                    Inicio_semestre_service.inicio_semestre(semestre.idInstancia, semestre.nombreSemestre, semestre.fecha_inicio, semestre.fecha_fin);
                    navigate('/crear_semestre_sistemas');
                } else {
                    setActivated({
                        ...activated,
                        isWarning: true,
                        mensaje: "La fecha de finalización no puede estar vacia y debe ser superior a la fecha de inicio",
                    })
                }
            } else {
                setActivated({
                    ...activated,
                    isWarning: true,
                    mensaje: "La fecha de inicio no puede estar vacia y debe ser igual o superior a la fecha actual",
                })
            }
        } else {
            setActivated({
                ...activated,
                isWarning: true,
                mensaje: "El nombre no puede estar vacio y debe tener un formato parecido a 2022-B",
            })
        }
    }
    const handleChange = (e) => {
        setSemestre({
            ...semestre,
            [e.target.name]: e.target.value,
        });
    }

    //funciones para dar formato a las fechas
    function digitos(int){
        var result = int.toString();
        if(int < 10) {
            result = "0"+ (int).toString();
        }
        return result
    }
    function formatDate(date) {
        return [
            (date.getFullYear()).toString(),
            digitos(date.getMonth() + 1),
            digitos(date.getDate()),
        ].join('-');
      }

    function dateToInt(date) {
        const fecha = date.split('-');
        const fechaint = parseInt(fecha[0] + fecha[1] + fecha[2])
        return fechaint;
    }

    //Activa las vistas una vez se haya seleccionado algo en el select y actualiza los valores a mostrar
    const handleActivateButton = async (e) =>{

        //codigo para la obtencion del nombre del semestre y la fecha de finalizacion del semestre anterior
        var nombre_nuevo = '';
        var fecha = '';
        await fetch('http://127.0.0.1:8000/wizard/semestre_actual/' + (e.id).toString() +"/")
        .then((res) => res.json())
        .then((res)=>{
            nombre_nuevo = res['nombre']
            fecha = new Date(res['fecha_fin'])
        })
        .catch((err)=>{console.log(err)})
        const nombre_semestre = nombre_nuevo.split('-');
        if(!(isNaN(nombre_semestre[0]))){
            if(nombre_semestre[1]==='A'){
                nombre_nuevo = nombre_semestre[0] + '-B'
            } else {
                nombre_nuevo = (parseInt(nombre_semestre[0])+1).toString() + '-A';
            }
        }

        //actualizacion de los datos del semestre
        setSemestre({
            ...semestre,
            idInstancia: e.id,
            nombreInstancia: e.value,
            nombreSemestre: nombre_nuevo,
            fecha_inicio: formatDate(date_inicio),
            fecha_fin: formatDate(date_fin)
        });

        //Activa o desativa las vistas
        setIsSelected(true);
        if(fecha < date_inicio){
            setActivated({
                ...activated,
                isDisabled: true,
            })
        } else {
            setActivated({
                ...activated,
                isError: true,
            })
        }
    }
    
    return (
        <Container>
            <h2>Paso cero: creación del periodo</h2>
            <Row className="rowJustFlex" hidden={isSelected}>
                <p>Para iniciar el semestre selecione la instancia con la cual desea trabajar:</p>
                <Select class="option" options={opciones} onMenuOpen={handle_instancias} onChange={handleActivateButton} className="option" placeholder="Selecione una instancia"/>
            </Row>
            <Row className="rowJustFlex">
                <Alert variant='danger' show={activated.isError}>
                    <Alert.Heading>Advertencia!</Alert.Heading>
                    <p>El semestre al que desea acceder sigue activo.</p>
                    <p>¿Desea continuar con la creación del semestre?</p>
                    <Button variant="secondary" onClick={() => {setActivated({...activated, isError: false,}); setIsSelected(false);}}>Cancelar</Button>
                    {'  '}
                    <Button variant="primary" onClick={() => navigate('/crear_semestre_sistemas')}>Crear Semestre</Button>
                </Alert>
            </Row>
            <Row className="rowJustFlex" hidden={!activated.isDisabled}>
                <p>Usted está apunto de iniciar un nuevo semestre, lo cual finalizará el semestre anterior y se creará uno nuevo en la instancia {semestre.nombreInstancia}.</p>
                <p>Por favor verifique que los argumentos sean correctos e inicie el semestre. </p>
            </Row>
            <Row className="rowJustFlex" hidden={!activated.isDisabled}>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel>Nombre del semestre a crear:</Form.FloatingLabel>
                            <Form.Control name='nombreSemestre' type='text' value={semestre.nombreSemestre} onChange={handleChange} placeholder="Nombre del semestre"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel>Fecha de inicio:</Form.FloatingLabel>
                            <Form.Control name='fecha_inicio' type="date" value={semestre.fecha_inicio} onChange={handleChange} placeholder="Fecha de inicio del semestre"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.FloatingLabel>Fecha de finalización:</Form.FloatingLabel>
                            <Form.Control name='fecha_fin' type="date" value={semestre.fecha_fin} onChange={handleChange} placeholder="Fecha de finalización del semestre"/>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Alert variant='danger' show={activated.isWarning}>
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{activated.mensaje}</p>
                </Alert>
                </Col>
            </Row>
            <Row className="rowJustFlex" hidden={!activated.isDisabled}>
                <Col><Row>
                <Button variant="secondary" onClick={() => {setActivated({...activated, isDisabled: false,}); setIsSelected(false);}}>Cancelar</Button>
                </Row></Col>
                <Col><Row>
                <Button variant="primary" onClick={handleButton}>Crear Semestre</Button>
                </Row></Col>
            </Row>
        </Container>
    )
}

export default inicio_semestre_component