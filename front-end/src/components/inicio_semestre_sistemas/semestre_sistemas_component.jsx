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
            id: undefined,
            username: undefined,
            password: undefined,
            first_name: undefined, 
            last_name: undefined, 
            documento: undefined, 
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
    
    const insertar = () =>{
        var nuevo={...state.form};
        var lista=state.data;
        if(!(!nuevo.username || nuevo.username === '')){
            if(!(!nuevo.first_name || nuevo.first_name === '')){
                if(!(!nuevo.last_name || nuevo.last_name === '')){
                    if(!(!nuevo.documento || nuevo.documento === '')){
                        if(!(!nuevo.email || nuevo.email === '')){
                            nuevo.id=state.data.length+1;
                            nuevo.password=nuevo.documento;
                            lista.push(nuevo);
                            Create_User.user_rol(nuevo)
                            console.log(nuevo.username)
                        }
                    }
                }
            }
        }
        set_state({...state, data: lista, form: {
            id: undefined,
            username: undefined,
            password: undefined,
            first_name: undefined, 
            last_name: undefined, 
            documento: undefined, 
            email: undefined,
        }});
        setShow(false);
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

    const handle_rol_selector = (e) =>{
        var nombrerol;
        for(var i = 0; i<datos_option_rol['length']; i++){
            if(datos_option_rol[i] && datos_option_rol[i]['id'] === e){
                nombrerol = datos_option_rol[i]['value']
            }
        }
        return nombrerol;
      }

    const handleSelect = (rolId, userId) => {
        console.log(rolId)
        console.log(userId)
        for(var i = 0; i < state.data['length']; i++){
            if(state.data[i].id == userId){
                state.data[i].id_rol = rolId;
            }
        }
    }

    const handleCreate = () => {
        for(var i = 0; i < state.data['length']; i++){
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
                    <input className='form-control' name='documento' type='text' onChange={handleChange}/>
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
                                <Select class="form-control" options={datos_option_rol} defaultInputValue={handle_rol_selector(e.id_rol)} onChange={(c) => {handleSelect(c.id, e.id)}}/>
                            </td>
                            <td align='center'><input class="form-check-input" type="checkbox" defaultChecked/></td>
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