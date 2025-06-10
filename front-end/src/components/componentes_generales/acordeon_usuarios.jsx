/**
 * @file admin.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los acordeones.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} 
from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { FaEdit } from "react-icons/fa";

// Services
import all_rols from "../../service/all_rols";
import all_users_rols_service from "../../service/all_users_rol";
import create_user from "../../service/admin_crear_usuario.js";

const SelectorUsuarios = () => {
  const [state, setState] = useState({
    data_user_rol: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  console.log(config);

  const consultaAllUserRol = async () => {
    try {
      const pk = desencriptar(sessionStorage.getItem("sede_id"));
      const response = await all_users_rols_service.all_users_rols(pk);
      if (response && Array.isArray(response.data)) {
        setState({ ...state, data_user_rol: response.data });
      }
    } catch (error) {
      console.error("Error al consultar usuarios con roles:", error);
    }
  };

  const [roles, setRoles] = useState([]); // Estado para los roles

  const consultaRoles = async () => {
    try {
      const response = await all_rols.all_rols();
      if (response && Array.isArray(response)) {
        setRoles(response); // Guarda los roles en el estado
      }
    } catch (error) {
      console.error("Error al consultar los roles:", error);
    }
  };

  useEffect(() => {
    consultaRoles();
  }, []);

  const handleRowSelected = ({ selectedRows }) => setSelectedRows(selectedRows);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {

    setShowCreateModal(false);
  };

  // Definición de las columnas de la tabla
  const columnas = [
    { name: "NOMBRES", selector: (row) => row.user_first_name, sortable: true },
    { name: "APELLIDOS", selector: (row) => row.user_last_name, sortable: true },
    { name: "EMAIL", selector: (row) => row.user_email, sortable: true },
    { name: "ROL", selector: (row) => row.rol_nombre, sortable: true },
    { name: "CLAVE", selector: (row) => row.user_password, sortable: true },
    {
      name: "EDITAR",
      cell: (row) => (
        <Button variant="warning" onClick={() => handleEdit(row)}>
          <FaEdit />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    consultaAllUserRol();
  }, []);

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllUserRol}>Usuarios</Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions columns={columnas} data={state.data_user_rol}>
              <DataTable
                title="Usuarios"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                striped
              />
            </DataTableExtensions>
            <Button variant="danger">
              Eliminar Usuarios Seleccionados
            </Button>
            <Button variant="primary" onClick={handleShowCreateModal}>
              Crear Usuario
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="user_first_name"
                value={selectedUser?.user_first_name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="user_last_name"
                value={selectedUser?.user_last_name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                value={selectedUser?.user_email || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editRole">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="rol_nombre"
                value={selectedUser?.rol_nombre || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccionar Rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nombre}>{role.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="user_password"
                value={selectedUser?.user_password || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="user_first_name"
                value={newUser.user_first_name}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="user_last_name"
                value={newUser.user_last_name}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                value={newUser.user_email}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="user_password"
                value={newUser.user_password}
                onChange={handleCreateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorUsuarios;
