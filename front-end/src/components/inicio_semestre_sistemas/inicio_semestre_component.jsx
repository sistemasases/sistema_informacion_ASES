import React, {useState, useEffect} from 'react';
import {Container, Row, Button} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Inicio_semestre_service from '../../service/inicio_semestre';
import swal from 'sweetalert'
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

    //Constante que se usara para activar o desactivar el boton
    const [isDisabled, setDisabled] = useState(false);

    //Constantes que se usaran para los diferentes atributos de la instancia selecionada
    const [nameSemestre, setNameSemestre] = useState();
    const [selected, setSelected] = useState();
    const [selectedName, setSelectedName] = useState();

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
    const handle_instancias = (e) => {
        if(bandera_option==true){
            for (var i = 0; i < state.tabs['length'] ; i++) {
                const dato = { value: state.tabs[i]['nombre'], label: state.tabs[i]['nombre'], id: state.tabs[i]['id'] }
                opciones.push(dato);
            }
            bandera_option = false;
        }
    }

    //Crea una ventana emergente con la información del nuevo semestre a crear 
    //y si el ususario la valida, crea el semestre nuevo y te manda a su respectiva vista de crear semestre.
    const handleButton = () =>{
        swal({
            title: "Iniciar Semestre",
            text: "Usted está apunto de iniciar un nuevo semestre, lo cual finalizará el semestre anterior y se creará uno nuevo en la instancia " + selectedName +
            " con el nombre "+ nameSemestre +"\n\nEn caso de ser erroneo, por favor contactar con ASES",
            icon: "info",
            buttons: ["Cancelar", "Aceptar"]
        }).then(respuesta=>{
            if(respuesta){
                Inicio_semestre_service.inicio_semestre(selected, nameSemestre);
                navigate('/crear_semestre_sistemas');
            }
        })
        
    }

    //Activa el boton una vez se haya seleccionado algo en el select y actualiza los valores a mostrar
    const handleActivateButton = async (e) =>{

        //codigo para la actualizacion de nameSemestre
        var nombre_nuevo = null;
        await fetch('http://127.0.0.1:8000/wizard/semestre_actual/' + (e.id).toString() +"/")
        .then((res) => res.json())
        .then((res)=>{
            nombre_nuevo = res['nombre']
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

        //Activa o desativa el boton
        if(!(selected)){
            setDisabled(true);
        } else{
            setDisabled(false);
        }
    }
    
    return (
        <Container>
            <Row className="rowJustFlex">
                <p>Para iniciar el semestre selecione la instancia con la cual desea trabajar:</p>
            </Row>
            <Row className="rowJustFlex">
                <Select class="option" options={opciones} onMenuOpen={handle_instancias} onChange={handleActivateButton} className="option"/>
            </Row>
            <Row className="rowJustFlex">
                <p>Crear semestre: </p>  
            </Row>
            <Row className="rowJustFlex">
                <Button onClick={handleButton} disabled={!isDisabled}>Crear</Button>  
            </Row>
        </Container>
    )
}

export default inicio_semestre_component