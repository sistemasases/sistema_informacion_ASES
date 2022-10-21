import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Col, Alert} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Inicio_semestre_service from '../../service/inicio_semestre';
import "bootstrap/dist/css/bootstrap.min.css";

const url_instancias = 'http://127.0.0.1:8000/wizard/all'

const inicio_semestre_component = () =>{

    //Constante y variable que se usaran para el select
    const opciones = [];
    var bandera_option = true;

    //Constante que se usara para el redirecionamiento
    const navigate = useNavigate();

    //Constante que se usara para extraer todas las instancias
    const [state,set_state] = useState({
        tabs: [],
    })

    //Constante que se usara para activar o desactivar parte de la vista
    const [isDisabled, setDisabled] = useState(false);
    const [isError, setError] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    //Constantes que se usaran para los diferentes atributos del semestre
    const [selected, setSelected] = useState();
    const [selectedName, setSelectedName] = useState();
    const [nameSemestre, setNameSemestre] = useState();
    const [fecha_inicio, setFecha_inicio] = useState();
    const [fecha_fin, setFecha_fin] = useState();

    //Conexion con el back para extraer todas las instancias
    useEffect(()=>{
        axios({
            url:  url_instancias,
            method: "GET",
        })
        .then((respuesta)=>{
            set_state({
            ...state,
            tabs : respuesta.data
            })
        })
        .catch(err=>{
            return (err)
        })
    },[]);

    //Funcion que toma las instancias y las transforma en opciones para el select
    const handle_instancias = () => {
        if(bandera_option===true){
            for (var i = 0; i < state.tabs['length'] ; i++) {
                const dato = { value: state.tabs[i]['nombre'], label: state.tabs[i]['nombre'], id: state.tabs[i]['id'] }
                opciones.push(dato);
            }
            bandera_option = false;
        }
    }

    //Actualiza las variables según el input y crea el nuevo semestre
    const handleButton = () =>{
        if(!(!nameSemestre || nameSemestre === '')){
            if(!(!fecha_inicio || fecha_inicio === '')){
                if(!(!fecha_fin || fecha_fin === '')){
                    Inicio_semestre_service.inicio_semestre(selected, nameSemestre, fecha_inicio, fecha_fin);
                    navigate('/crear_semestre_sistemas');
                }
            }
        }
    }
    const handleNombre = (e) => {
        setNameSemestre(e.target.value);
    }
    const handleFecha_inicio = (e) => {
        setFecha_inicio(e.target.value);
    }
    const handleFecha_fin = (e) => {
        setFecha_fin(e.target.value);
    }

    //Activa el boton una vez se haya seleccionado algo en el select y actualiza los valores a mostrar
    const handleActivateButton = async (e) =>{

        //codigo para la actualizacion de nameSemestre
        var nombre_nuevo = null;
        var fecha = null;
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
        setNameSemestre(nombre_nuevo);

        //codigo para la actualizacion de selected y selectedName
        setSelected(e.id);
        setSelectedName(e.value);
        var date_inicio = new Date();
        var date_fin = new Date();
        date_fin.setMonth(date_fin.getMonth() + 6);
        setFecha_inicio(date_inicio);
        setFecha_fin(date_fin);

        //Activa o desativa las vistas
        setIsSelected(true)
        if(fecha < date_inicio){
            setDisabled(true);
            setError(false);
        } else {
            setError(true);
            setDisabled(false);
        }
    }
    
    return (
        <Container>
            <h2>Paso cero: creación del periodo</h2>
            <Row className="rowJustFlex" hidden={isSelected}>
                <p>Para iniciar el semestre selecione la instancia con la cual desea trabajar:</p>
                <Select class="option" options={opciones} onMenuOpen={handle_instancias} onChange={handleActivateButton} className="option"/>
            </Row>
            <Row className="rowJustFlex">
                <Alert variant='danger' show={isError} onClose={() => {setError(false); setDisabled(false); setIsSelected(false)}} dismissible>
                    <Alert.Heading>Advertencia!</Alert.Heading>
                    <p>El semestre al que desea acceder sigue activo.</p>
                </Alert>
            </Row>
            <Row className="rowJustFlex" hidden={!isDisabled}>
                <p>Usted está apunto de iniciar un nuevo semestre, lo cual finalizará el semestre anterior y se creará uno nuevo en la instancia {selectedName}.</p>
                <p>Por favor verifique que los argumentos sean correctos e inicie el semestre. </p>
            </Row>
            <Row className="rowJustFlex" hidden={!isDisabled}>
                <Col>
                    <label><b>Nombre del semestre a crear: </b></label>
                    <input name='nombre' type='text' value={nameSemestre} onChange={handleNombre}/>
                    <p/>
                    <label><b>Fecha de inicio: </b></label>
                    <input name='fecha_inicio' type='text' value={fecha_inicio} onChange={handleFecha_inicio}/>
                    <p/>
                    <label><b>Fecha de finalización: </b></label>
                    <input name='fecha_fin' type='text' value={fecha_fin} onChange={handleFecha_fin}/>
                    <p/>
                </Col>
                <Col/>
            </Row>
            <Row className="rowJustFlex" hidden={!isDisabled}>
                <Col><Row>
                <Button variant="secondary" onClick={() => {setError(false); setDisabled(false); setIsSelected(false)}}>Cancelar</Button>
                </Row></Col>
                <Col><Row>
                <Button variant="primary" onClick={handleButton}>Crear Semestre</Button>
                </Row></Col>
            </Row>
        </Container>
    )
}

export default inicio_semestre_component