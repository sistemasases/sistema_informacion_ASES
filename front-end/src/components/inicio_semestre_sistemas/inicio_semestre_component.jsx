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
    const opciones = [];
    var bandera_option = true;
    const navigate = useNavigate();

    const [state,set_state] = useState({
        tabs: [],
    })

    const [isDisabled, setDisabled] = useState(false);

    const [selected, setSelected] = useState([]);

    const [selectedName, setSelectedName] = useState([]);

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

    const handle_instancias = (e) => {
        if(bandera_option==true){
            for (var i = 0; i < state.tabs['length'] ; i++) {
                const dato = { value: state.tabs[i]['nombre'], label: state.tabs[i]['nombre'], id: state.tabs[i]['id'] }
                opciones.push(dato);
            }
            bandera_option = false;
        }
    }

    const handleButton = () =>{
        swal({
            title: "Iniciar Semestre",
            text: "Usted está apunto de iniciar un nuevo semestre, lo cual finalizará el semestre anterior y se creará uno nuevo en la instancia " + selectedName[0] +
            " con el nombre "+ "2023-A" +"\n\nEn caso de ser erroneo, por favor contactar con Ases",
            icon: "info",
            buttons: ["Cancelar", "Aceptar"]
        }).then(respuesta=>{
            if(respuesta){
                Inicio_semestre_service.inicio_semestre(selected[0]);
                navigate('/crear_semestre_sistemas');
            }
        })
        
    }

    const handleActivateButton = (e) =>{
        var aux=null;
        selected.shift();
        aux = selected.concat(e.id);
        setSelected(aux);

        var aux1=null;
        selectedName.shift();
        aux1 = selectedName.concat(e.value);
        setSelectedName(aux1);

        if(aux.length>0){
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