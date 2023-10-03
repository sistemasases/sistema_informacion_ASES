import React, {useState} from 'react';
import  {useEffect} from 'react';
import axios from 'axios'; 
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_user_service from '../../service/all_users'
import all_rols from '../../service/all_rols';
import all_users_rols from '../../service/all_users_rol';
import user_rol from '../../service/user_rol';
import Seguimiento_individual from '../seguimiento_forms/form_seguimiento_individual';
import Inasistencia from '../seguimiento_forms/form_inasistencia';
import user_rol_manage from '../../service/user_rol_manage';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import DataTable, {createTheme} from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { decryptTokenFromSessionStorage, desencriptarInt, desencriptar } from '../../modulos/utilidades_seguridad/utilidades_seguridad';

var bandera_consulta_rol = 0;
var bandera_option_user = true;
var bandera_option_rol = true;
const datos_option_user = []
const datos_option_rol = []

const Selector_usuarios = () =>{

  /*
    constantes
  */
  const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
  };

  const [state,set_state] = useState({
    rol: '',
    rol_actual: '',
    usuario : '',
    id_rol: '',
    id_usuario : '',
    data_user : [],
    data_user_rol : [],
    data_rol : [],
    info_modal : " cargando...",
    select_rows : []
  })
  const [show, setShow] = useState(false);
  const columnas =[
    {
      name: 'USUARIO',
      selector: 'user_username',
      sortable: true,
    },
    {
      name: 'NOMBRES',
      selector: 'user_first_name',
      sortable: true,
    },
    {
      name: 'APELLIDOS',
      selector: 'user_last_name',
      sortable: true,
    },
    {
      name: 'EMAIL',
      selector: 'user_email',
      sortable: true,
    },
    {
      name: 'ROL',
      selector: 'rol_nombre',
      sortable: true,
    },
  ]
  /*
    UseEffect: se ejecuta al iniciar la pestaña. En el está alojada la función de traer todos los usuarios
    necesaria para el selector de usuarios.
  */
  useEffect(()=>{
    all_user_service.all_users().then((res) => {
      set_state({
        ...state,
        data_user : res
      })
    })
  },[]);
  /*
    UseEffect: se ejecuta al iniciar la pestaña. En el está alojada la función de traer todos los usuarios
    necesaria para el selector de usuarios.
  */
  const consulta_all_rol = (e)=>{
    if(bandera_consulta_rol<=0){
      all_rols.all_rols().then((res) => {
        set_state({
          ...state,
          data_rol : res
        })
      })
      bandera_consulta_rol++;
    }

    
  }
  const consulta_all_user_rol = (e) => {
   // console.log('Valor de pk:', pk);
    let pk = desencriptar(sessionStorage.getItem('sede_id'));
    console.log('Valor de pk:', pk);
    all_users_rols.all_users_rols(pk).then((res) => {
      if (Array.isArray(res.data)) {
        const updatedData = res.data;
  
        set_state(prevState => ({
          ...prevState,
          data_user_rol: updatedData
        }));
      } 
    });
  };
  
  

  const handle_user_selector = (e) => {
    console.log('Valor de state.data_user:', state.data_user);
    if(bandera_option_user === true){

      for (var i = 0; i < state.data_user['length']; i++) {
        const dato = { 
        value: state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'],
         label: state.data_user[i]['username']+" - "+ state.data_user[i]['first_name']+" "+state.data_user[i]['last_name'],
         id:state.data_user[i]['id'] 
        }
         datos_option_user.push(dato)
      }

      bandera_option_user = false;
    }
  }
  

  const handle_rol_selector = (e)=>{
    if(bandera_option_rol==true){

      for (var i = 0; i < state.data_rol['length'] ; i++) {
        const dato2 = { value: state.data_rol[i]['nombre'], label: state.data_rol[i]['nombre'],id:state.data_rol[i]['id'] }
        datos_option_rol.push(dato2)
      }
      bandera_option_rol = false;
    }

  }
  

 


  const handle_option_user = (e) => {
    // Getting the files from the input
    console.log(e)
    let formData = new FormData();
  
    //Adding files to the formdata
    formData.append('id', e.id);
    formData.append('id_sede', desencriptarInt(sessionStorage.getItem('sede_id')));
    axios({
      // Endpoint to send files
      //FALTA ORGANIZAR PK
      url:  `${process.env.REACT_APP_API_URL}/usuario_rol/actual_usuario_rol/`+e.id+"/",
      method: "PUT",
      headers: config,
      data: formData,
    })
    .then(res=>{set_state({
      ...state,
      usuario : [e.value],
      id_usuario : [e.id],
      rol_actual: res.data
      
    })})
    .catch(err=>{
      set_state({
        ...state,
        usuario : [e.value],
        id_usuario : [e.id],
        rol_actual: "" 
      })}
    )

  }
  const handle_option_rol = (e) => {
    set_state({
      ...state,
      rol : [e.value],
      id_rol : [e.id],
    })
  }

  const handle_upload = (e) => {
    // Getting the files from the input
    let formData = new FormData();
  
    //Adding files to the formdata
    formData.append('id_rol', state.id_rol[0]);
    formData.append('id_user', state.id_usuario[0]);
    formData.append('id_sede', desencriptarInt(sessionStorage.getItem('sede_id')));
    user_rol.user_rol(formData)
        .then(() => {
            // Actualizar el estado después de asignar el rol
            set_state({
                ...state,
                rol_actual: state.rol[0] || '',
                info_modal: "El rol se asignó correctamente"
            });
            setShow(true);
        })
        .catch(() => {
            set_state({
                ...state,
                info_modal: "Ocurrió un error"
            });
            setShow(true);
        });
    }


  const set_info = (e) => {
    bandera_option_rol = true;
    bandera_consulta_rol = true;
    setShow(false)
    set_state({
      ...state,
      rol: '',
      rol_actual: '',
      usuario : '',
      id_rol: '',
      id_usuario : '',
      info_modal : "cargando..",
    })
    all_rols.all_rols().then((res) => {
      set_state({
        ...state,
        data_rol : res
      })
    })

  }
  const handleClose = () => setShow(false);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
    set_state({
      ...state,
      select_rows : selectedRows
    })
  };
  const delete_user_rol = () => {
    for(var i = 0; i < state.select_rows.length ; i++) {
      const id_user_rol = state.select_rows[i].id

      axios({
        // Endpoint to send files
        //FALTA ORGANIZAR EL PK
        url:  `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`+id_user_rol+"/",
        method: "PUT",
        headers: config,
      })
    }
    consulta_all_user_rol();
    
  }
  
  return (
        <Container>
        <Accordion>
          <Accordion.Item  eventKey="0">
            <Accordion.Header onClick={consulta_all_rol}>Selector de Usuarios</Accordion.Header>
            <Accordion.Body>
            <Row className="g-2">
              <h4>Selecciona un usuario</h4>
            </Row>
            <Row className="mb-3">
                <Select
                    class="form-control"
                    options={datos_option_user}
                    onMenuOpen={handle_user_selector}
                    onChange={handle_option_user}
                    className="g-2"
                />
            </Row>
            <Row className="g-2">
                <h4>Nombre Completo:</h4>
            </Row>
            <Row className="g-2">
                <p>{state.usuario}</p>
            </Row>
            <Row className="g-2">
            <h4>Rol actual:</h4>
            </Row>
            <Row className="g-2">
                <p>{state.rol_actual}</p>
            </Row>
            <Row className="g-2">
                <h4>Selecciona un Rol (Periodo):</h4>
            </Row>
            <Row className="g-2">
                <Select
                    class="form-control"
                    options={datos_option_rol}
                    onMenuOpen={handle_rol_selector}
                    onChange={handle_option_rol}
                    className="g-2"
                />
            </Row>
            <Row className="mt-2">
                <Col lg={{ span: 1, offset: 5 }}>
                    <Button onClick={handle_upload}>Aceptar</Button>
                </Col>
            </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consulta_all_user_rol}>Lista de Usuarios</Accordion.Header>
            <Accordion.Body>
            {/*
              <DataTable 
              title="Usuarios"
              columns={columnas}
              data={state.data_user_rol}
              noDataComponent="Cargando Información."
              pagination
              striped
              selectableRows
              onSelectedRowsChange={handleChange}
              />
              */}
              <DataTableExtensions
                columns={columnas}
                data={state.data_user_rol}
                filter={true}
                filterPlaceHolder={2}
                filterDigit={1}
                exportHeaders={true}
                >

                <DataTable
                  title="Usuarios"
                  noDataComponent="Cargando Información."
                  pagination 
                  paginationRowsPerPageOptions={[10,20,30,40,50,100]}
                  selectableRows
                  onSelectedRowsChange={handleChange}
                  striped
                  keyField="id"
                  />
              </DataTableExtensions>
              <Button onClick={delete_user_rol}>Eliminar Rol</Button> 
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ESTADO ASIGNACIÓN</Modal.Title>
          </Modal.Header>
          <Modal.Body>{state.info_modal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={set_info}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>  
        </Container>
  )
}

export default Selector_usuarios


  
  
  
