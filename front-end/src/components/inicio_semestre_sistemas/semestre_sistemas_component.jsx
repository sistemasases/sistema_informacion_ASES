import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Modal, Table, FormGroup, Form, Col} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import DataTable, {createTheme} from 'react-data-table-component';
//import Inicio_semestre from '../../service/inicio_semestre';

var datos_option_rol = [];

const semestre_sistemas_component = () =>{

    var bandera_option_rol = true;

    const [state,set_state] = useState({
        data: [],
        form: {
            id: undefined,
            first_name: undefined, 
            last_name: undefined, 
            documento: undefined, 
            correo: undefined,
        },
        rol: [],
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        set_state({
            ...state,
            form:{
                ...state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    const insertar = () =>{
        var nuevo={...state.form};
        var lista=state.data;
        if(!(!nuevo.first_name || nuevo.first_name === '')){
            if(!(!nuevo.last_name || nuevo.last_name === '')){
                if(!(!nuevo.documento || nuevo.documento === '')){
                    if(!(!nuevo.correo || nuevo.correo === '')){
                        nuevo.id=state.data.length+1;
                        lista.push(nuevo);
                    }
                }
            }
        }
        set_state({...state, data: lista, form: {
            id: undefined,
            first_name: undefined, 
            last_name: undefined, 
            documento: undefined, 
            correo: undefined,
        }});
        setShow(false);
    }

    useEffect(()=>{
        axios({
            url:  'http://127.0.0.1:8000/usuario_rol/allrol/',
            method: "GET",
        })
        .then((respuesta)=>{
            if(bandera_option_rol){
                for (var i = 0; i < respuesta.data['length'] ; i++) {
                    //nombre = state.rol[i]['nombre']
                    const dato = { value: respuesta.data[i]['nombre'], label: respuesta.data[i]['nombre'], id: respuesta.data[i]['id'] }
                    datos_option_rol.push(dato);
                }
                bandera_option_rol = false;
            }
            set_state({
                ...state,
                rol: respuesta.data
            })
            axios.get('http://127.0.0.1:8000/usuario_rol/all_user_rol/')
            .then((res)=>{
                set_state({
                    ...state,
                    data: res.data
                })
            })
        })
        .catch(err=>{
            return (err)
        })
    },[]);

    const handle_rol_selector = (e) =>{
        console.log(e)
        if(datos_option_rol[e])
        return datos_option_rol[e]['value']
      }

    return (
        <Container>
        <Modal show={show} onHide={handleClose} centered={true} fullscreen={'md-down'} >
            <Modal.Header closeButton>
                <Modal.Title>Insertar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <label>Id:</label>
                    <input className='form-control' readOnly name='id' type='text' value={state.data.length+1}/>
                </FormGroup>
                <FormGroup>
                    <label>Nombres:</label>
                    <input className='form-control' name='first_name' type='text' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Apellidos:</label>
                    <input className='form-control' name='last_name' type='text' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Documento:</label>
                    <input className='form-control' name='documento' type='text' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Correo:</label>
                    <input className='form-control' name='correo' type='text' onChange={handleChange}/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" onClick={insertar}>Insertar</Button>
            </Modal.Footer>
        </Modal>
        <Row className="rowJustFlex" align='left'>
            <Table responsive size="sm" class="table">
                <thead>
                    <Button variant="primary" onClick={handleShow}>Insertar Usuario</Button>
                    <tr class="table-info">
                        <th align='center'>Username</th>
                        <th align='center'>Nombre</th>
                        <th align='center'>Apellido</th>
                        <th align='center'>Correo</th>
                        <td align='center'><b>Rol</b></td>
                        <td align='center'><b>Continua</b></td>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((e)=>(
                        <tr>
                            <td>{e.username}</td>
                            <td>{e.first_name}</td>
                            <td>{e.last_name}</td>
                            <td>{e.email}</td>
                            <td>
                                <Select class="form-control" options={datos_option_rol} defaultInputValue={handle_rol_selector(e.id_rol)}/>
                            </td>
                            <td align='center'><input class="form-check-input" type="checkbox" defaultChecked/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Row>
        </Container>
    )
}

export default semestre_sistemas_component