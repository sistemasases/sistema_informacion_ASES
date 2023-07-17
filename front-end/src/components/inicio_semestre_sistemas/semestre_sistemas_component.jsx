/**
  * @file semestre_sistemas_component.jsx
  * @version 1.0.0
  * @description Componente para adicionar, eliminar y actualizar los usuarios del semestre anterior. Utiliza un form para solicitar los datos del usuario a agregar, además lista todos los usuarios donde se les puede actualizar el rol y eliminarlos.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Container, Row, Button, Modal, Table, FormGroup} from "react-bootstrap";
import Select from 'react-select';
import All_Rols from '../../service/all_rols';
import All_Users_Rols from '../../service/all_users_rol_old';
import Create_User from '../../service/create_user';
import Delete_User from '../../service/delete_user';
import user_rol from '../../service/user_rol';

// variable que guarda los roles disponibles en la BD.
var datos_option_rol = [];
// variable bandera para saber si ya se solicitaron los roles del back.
var bandera_option_rol = true;

const Semestre_sistemas_component = () =>{

    // constante para el headers del axios
    const config = {
        headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };

    //Constante para guardar el estado actual de la tabla de usuario y el form del usuario a agregar.
    const [state,set_state] = useState({
        data: [],
        form: {
            id: undefined,
            username: undefined,
            password: undefined,
            first_name: undefined, 
            last_name: undefined,
            email: undefined,
        },
    })

    // Constante para saber si mostrar el modal para ingresar el nuevo usuario y sus respectivas funciones para cambiar el estado.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
        * Manejador de eventos del input form para obtener los cambios a las variables.
        * @param {Event} e Evento del formulario.
    */
    const handleChange = (e) => {
        set_state({
            ...state,
            form:{
                ...state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    /**
        * Función asincrona para insertar un nuevo usuario en la tabla y crearlo en la BD con su respectivo usuario_rol.
    */
    const insertar = () =>{
        var nuevo={...state.form};
        var lista=state.data;
        if(!(!nuevo.username || nuevo.username === '')){
            if(!(!nuevo.first_name || nuevo.first_name === '')){
                if(!(!nuevo.last_name || nuevo.last_name === '')){
                    if(!(!nuevo.password || nuevo.password === '')){
                        if(!(!nuevo.email || nuevo.email === '')){
                            // Crea el usuario y su rol.
                            Create_User.user_rol(nuevo).then((res) => {
                                if(res != null){
                                    nuevo = {
                                        ...state.form,
                                        id: res
                                    }
                                    // Lo agrega a la lista de usuarios.
                                    lista.push(nuevo);
                                    // Cierra el modal
                                    setShow(false);
                                    // Resetea el form y actualiza la tabla
                                    set_state({...state, data: lista, form: {
                                        username: undefined,
                                        password: undefined,
                                        first_name: undefined, 
                                        last_name: undefined, 
                                        email: undefined,
                                    }});
                                } else {
                                    window.confirm("Error: El usuario ya se encuentra registrado o hay un error en los datos");
                                }
                            })
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
        // Trae todos los roles y los guarda en la variable asignada.
        All_Rols.all_rols().then((res) => {
            if(bandera_option_rol){
                for (var i = 0; i < res.length ; i++) {
                    const dato = { value: res[i]['nombre'], label: res[i]['nombre'], id: res[i]['id'] }
                    datos_option_rol.push(dato);
                }
            }
            bandera_option_rol = false;
        })
        // Trae todos los usuario con rol y los guarda en la tabla.
        All_Users_Rols.all_users_rols().then((res) => {
            set_state({
                ...state,
                data: res
            })
        })
    },[]);

    /**
        * Manejador para emparejar el id del rol de los usuarios con el id del rol en el select.
        * @param {Number} rolId id del rol selecionado.
        * @param {Number} userId id del usuario.
    */
    const handleSelect = (rolId, userId) => {
        for(var i = 0; i < state.data['length']; i++){
            if(state.data[i].id === userId){
                state.data[i].id_rol = rolId;
            }
        }
    }

    /**
        * Manejador para eliminar un usuario de la tabla y su respectivos datos en la BD.
        * @param {Event} e Evento del usuario de la tabla seleccionado para eliminar.
    */
    const handleClick = (e) => {
        var opcion = window.confirm("Se eliminará el usuario: "+e.username);
        if(opcion){
            var contador=0;
            var lista = state.data;
            lista.map((element)=>{
                if(element.id === e.id){
                    Delete_User.delete_user_rol(e.id);
                    lista.splice(contador, 1);
                }
                contador++;
            });
            set_state({...state, data: lista,});
        }
    }

    /**
        * Manejador para actualizar el rol un usuario de la tabla y su respectivos datos en la BD.
        * @param {Event} e Evento del usuario de la tabla seleccionado para eliminar.
    */
    const handleCreate = () => {
        for(var i = 0; i < state.data['length']; i++){
            if(state.data[i].id === undefined){
                axios.get('http://localhost:8000/usuario_rol/user/', config)
                .then(res=>{
                    for(var j=0; j<res.data['length']; j++){
                        if(state.data[i] && res.data[j] && res.data[j]['username'] === state.data[i]['username']){
                            state.data[i].id=res.data[j]['id'];
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
                        <label>Contraseña:</label>
                        <input className='form-control' name='password' type='password' onChange={handleChange}/>
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
                        <p/>
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
                <Button variant="primary" onClick={handleCreate}>Crear usuarios</Button>
            </Row>
        </Container>
    )
}

export default Semestre_sistemas_component