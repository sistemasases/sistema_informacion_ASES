import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Modal, Table, FormGroup, Form, Col} from "react-bootstrap";
import Select from 'react-select';
import All_Rols from '../../service/all_rols';
import All_Users_Rols from '../../service/all_users_rol';
import Create_User from '../../service/create_user';
import user_rol from '../../service/user_rol';

var datos_option_rol = [];

const semestre_sistemas_component = () =>{

    var bandera_option_rol = true;

    const [state,set_state] = useState({
        data: [],
        form: {
            username: undefined,
            password: undefined,
            first_name: undefined, 
            last_name: undefined,
            email: undefined,
        },
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
    
    const insertar = async () =>{
        var nuevo={...state.form};
        var lista=state.data;
        if(!(!nuevo.username || nuevo.username === '')){
            if(!(!nuevo.first_name || nuevo.first_name === '')){
                if(!(!nuevo.last_name || nuevo.last_name === '')){
                    if(!(!nuevo.password || nuevo.password === '')){
                        if(!(!nuevo.email || nuevo.email === '')){
                            await Create_User.user_rol(nuevo);
                            lista.push(nuevo);
                            console.log('Se creó al ususario: ' + nuevo.username);
                            setShow(false);
                            set_state({...state, data: lista, form: {
                                username: undefined,
                                password: undefined,
                                first_name: undefined, 
                                last_name: undefined, 
                                email: undefined,
                            }});
                        } else{
                            window.confirm("Error: Inserte un email valido");
                        }
                    } else{
                        window.confirm("Error: Inserte un documento valido");
                    }
                } else{
                    window.confirm("Error: Inserte un apellido valido");
                }
            } else{
                window.confirm("Error: Inserte un nombre valido");
            }
        } else{
            window.confirm("Error: Inserte un nombre de usuario valido");
        }
    }

    useEffect(()=>{
        All_Rols.all_rols().then((res) => {
            if(bandera_option_rol){
                for (var i = 0; i < res.length ; i++) {
                    const dato = { value: res[i]['nombre'], label: res[i]['nombre'], id: res[i]['id'] }
                    datos_option_rol.push(dato);
                }
            }
            bandera_option_rol = false;
        })
        All_Users_Rols.all_users_rols().then((res) => {
            set_state({
                ...state,
                data: res
            })
        })
    },[]);

    const handleSelect = (rolId, userId) => {
        for(var i = 0; i < state.data['length']; i++){
            if(state.data[i].id == userId){
                state.data[i].id_rol = rolId;
            }
        }
    }

    const handleClick = (e) => {
        var opcion = window.confirm("Se eliminará el usuario: "+e.username);
        if(opcion){
            var contador=0;
            var lista = state.data;
            lista.map((element)=>{
                if(element.id==e.id){
                    lista.splice(contador, 1);
                }
                contador++;
            });
            set_state({...state, data: lista,});
        }
        console.log(e);
    }

    const handleCreate = async () => {
        for(var i = 0; i < state.data['length']; i++){
            if(state.data[i].id == undefined){
                await axios({
                    url:  'http://localhost:8000/usuario_rol/user/',
                    method: "GET"
                })
                .then(res=>{
                    for(var j=0; j<res.data['length']; j++){
                        if(state.data[i] && res.data[j] && res.data[j]['username'] == state.data[i]['username']){
                            state.data[i].id=res.data[j]['id'];
                            console.log(state.data[i] + ': ' + res.data[j]['id'])
                        }
                    }
                })
            }
            let formData = new FormData();
            formData.append('id_rol', state.data[i].id_rol);
            formData.append('id_usuario', state.data[i].id);
            user_rol.user_rol(formData);
        }
    }

    return (
        <Container>
        <Modal show={show} onHide={handleClose} centered={true} fullscreen={'md-down'} >
            <Modal.Header closeButton>
                <Modal.Title>Insertar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <label>Nombre de usuario:</label>
                    <input className='form-control' name='username' type='text' onChange={handleChange}/>
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
                    <input className='form-control' name='password' type='text' onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Correo:</label>
                    <input className='form-control' name='email' type='text' onChange={handleChange}/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" onClick={insertar}>Insertar</Button>
            </Modal.Footer>
        </Modal>
        <Row className="rowJustFlex" align='left'>
            <Table responsive hover size="sm" class="table">
                <thead>
                    <Button variant="primary" onClick={handleShow}>Insertar Usuario</Button>
                    <tr class="table-info">
                        <th align='center'>Username</th>
                        <th align='center'>Nombre</th>
                        <th align='center'>Apellido</th>
                        <th align='center'>Correo</th>
                        <td align='center'><b>Rol</b></td>
                        <td align='center'><b>Eliminar</b></td>
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
                                <Select class="form-control" options={datos_option_rol} defaultInputValue={e.nombre} onChange={(c) => {handleSelect(c.id, e.id)}}/>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleClick(e)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={handleCreate}>Crear usuarios</Button>
        </Row>
        </Container>
    )
}

export default semestre_sistemas_component