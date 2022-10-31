import React, {useState} from 'react';
import {Container, Row, Button, Modal, Table, FormGroup, Form, Col} from "react-bootstrap";
import axios from 'axios';
//import Inicio_semestre from '../../service/inicio_semestre';

const semestre_sistemas_component = () =>{

    const data = [
        {id: 1, first_name: "Deiby", last_name: "Rodriguez", documento: 123456, correo: "@correounivalle.edu.co"},
        {id: 2, first_name: "Clara", last_name: "Alvarez", documento: 147258, correo: "@correounivalle.edu.co"},
        {id: 3, first_name: "Jose", last_name: "Muñoz", documento: 159951, correo: "@correounivalle.edu.co"},
        {id: 4, first_name: "Luz", last_name: "Murillo", documento: 753698, correo: "@correounivalle.edu.co"},
        {id: 5, first_name: "Santiago", last_name: "Burbano", documento: 842697, correo: "@correounivalle.edu.co"},
    ]

    const [state,set_state] = useState({
        data: data,
        form: {
            id: undefined,
            first_name: undefined, 
            last_name: undefined, 
            documento: undefined, 
            correo: undefined,
        }
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
                            <td>{e.first_name}</td>
                            <td>{e.last_name}</td>
                            <td>{e.correo}</td>
                            <td>
                                <Form.Select name= "rol">
                                    <option value="profesor">Profesor</option>
                                    <option value="director">Director</option>
                                    <option value="socieducativo">Socieducativo</option>
                                </Form.Select>
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