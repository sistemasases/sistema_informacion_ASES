/**
 * @file admin_usuarios.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza el acordeón de usuarios.
 */

import React, { useState, useEffect } from "react";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { desencriptarInt } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { FaEdit } from "react-icons/fa";

// Services
import all_rols from "../../service/all_rols";
import Create_user from "../../service/panel_admin/panel_admin_usuario_crear_usuario.js";
import Read_user from "../../service/panel_admin/panel_admin_usuario_listar_usuarios.js";
import Update_user from "../../service/panel_admin/panel_admin_usuario_actualizar_usuarios.js";
import Deactivate_user from "../../service/panel_admin/panel_admin_usuario_desactivar_usuario.js";
import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";

const SelectorUsuarios = () => {
  const [state, setState] = useState({
    data_user_rol: [],
  });
  const [sede, setSede] = useState({
    data_sedes: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    user_username: "",
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  });

  const consultaAllUserRol = async () => {
    try {
      const semestre = desencriptarInt(
        sessionStorage.getItem("id_semestre_actual"),
      );
      const response = await Read_user.listar_usuarios({ semestre: semestre });
      // console.log(response);
      if (response && Array.isArray(response)) {
        setState({ ...state, data_user_rol: response });
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

  const consultaAllSedes = async () => {
    try {
      const response = await Read_sedes.listar_sedes({});
      if (response && Array.isArray(response)) {
        setSede((prevState) => ({ ...prevState, data_sedes: response }));
      }
    } catch (error) {
      console.error("Error al consultar sedes:", error);
    }
  };

  useEffect(() => {
    consultaRoles();
    consultaAllSedes();
  }, []);

  const handleRowSelected = ({ selectedRows }) => setSelectedRows(selectedRows);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setSelectedUser((prevUser) => {
      // Si se cambia la sede
      if (name === "sede") {
        const currentUser = state.data_user_rol.find(
          (user) => user.id === prevUser.id,
        );

        // Solo asignar oldSede si aún no existe
        const oldSede =
          prevUser.oldSede !== undefined
            ? prevUser.oldSede
            : (currentUser?.sede ?? null);

        return {
          ...prevUser,
          oldSede,
          [name]: value,
        };
      }

      // Si se cambia cualquier otro campo
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSaveEdit = () => {
    // console.log(selectedUser);
    const semestre_actual = desencriptarInt(
      sessionStorage.getItem("id_semestre_actual"),
    );
    setSelectedUser((prevUser) => ({
      ...prevUser,
      semestre: semestre_actual,
    }));

    setTimeout(() => {
      Update_user.actualizar_usuarios({
        ...selectedUser,
        semestre: semestre_actual,
      });
      consultaAllUserRol();
      setShowEditModal(false);
    }, 0); // Espera un ciclo del event loop para asegurar que el estado haya cambiado
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
    Create_user.crear_usuario(newUser);
    setShowCreateModal(false);
  };

  const handleDeactivate = () => {
    // Verificar si hay filas seleccionadas
    if (selectedRows.length === 0) {
      alert("Por favor, seleccione al menos un usuario para desactivar.");
      return;
    }
    const usernamesToDeactivate = selectedRows.map((row) => {
      return { usuario: row.usuario };
    });
    Deactivate_user.desactivar_usuario(usernamesToDeactivate);
    setSelectedRows([]); // Limpiar la selección después de desactivar
  };

  // Definición de las columnas de la tabla
  const columnas = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "USUARIO",
      selector: (row) => row.usuario,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    { name: "NOMBRES", selector: (row) => row.nombre, sortable: true },
    {
      name: "APELLIDOS",
      selector: (row) => row.apellido,
      sortable: true,
      wrap: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.correo,
      sortable: true,
      wrap: true,
      grow: 1.5,
    },
    {
      name: "ROL",
      selector: (row) => row.rol,
      sortable: true,
      wrap: true,
      grow: 0.6,
    },
    {
      name: "SEDE",
      selector: (row) => row.sede,
      sortable: true,
      wrap: true,
      grow: 0.6,
    },
    {
      name: "ESTADO",
      selector: (row) => (row.estado == true ? "ACTIVO" : "INACTIVO"),
      sortable: true,
      wrap: true,
      grow: 0.6,
    },
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
    // TABLA DE USUARIOS CON ROLES
    <Container>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllUserRol}>
            Usuarios
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_user_rol}
              export={false}
              print={false}
              filterPlaceholder="Buscar usuarios..."
            >
              <DataTable
                title="Usuarios"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                striped
              />
            </DataTableExtensions>
            <Button variant="danger" onClick={handleDeactivate}>
              Desactivar Usuarios Seleccionados
            </Button>
            <Button variant="primary" onClick={handleShowCreateModal}>
              Crear Usuario
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* MODAL EDITAR ESTUDIANTE */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={selectedUser?.usuario || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedUser?.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={selectedUser?.apellido || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={selectedUser?.correo || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editRole">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="rol"
                value={selectedUser?.rol || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccionar Rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nombre}>
                    {role.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editSede">
              <Form.Label>Sede</Form.Label>
              <Form.Select
                name="sede"
                value={selectedUser?.sede || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccione una Sede</option>
                {sede.data_sedes.map((sede) => (
                  <option
                    key={sede.id}
                    id={sede.id}
                    name={sede.sede}
                    value={sede.nombre}
                  >
                    {sede.nombre}
                  </option>
                ))}
              </Form.Select>
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

      {/* MODAL CREAR USUARIO */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="user_username"
                value={newUser.user_username}
                onChange={handleCreateChange}
              />
            </Form.Group>
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
