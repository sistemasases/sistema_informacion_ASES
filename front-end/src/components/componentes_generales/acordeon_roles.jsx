/**
 * @file acordeon_roles.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los roles.
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Accordion,
  Modal,
  Button,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";

import Create_roles from "../../service/panel_admin/panel_admin_roles_crear_rol.js";
import Read_roles from "../../service/panel_admin/panel_admin_roles_listar_roles.js";
import Read_permisos from "../../service/panel_admin/panel_admin_permisos_listar_permisos.js";
import Update_roles from "../../service/panel_admin/panel_admin_roles_actualizar_rol.js";

const SelectorRoles = () => {
  // Definición de las columnas de la tabla
  const columnas = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      sortable: false,
      wrap: true,
      grow: 0.4,
    },
    {
      name: "PERMISOS",
      selector: (row) => row.permisos?.join(", ") || "Sin permisos",
      sortable: false,
      wrap: true,
      // grow: 0.5,
    },
    {
      name: "EDITAR",
      cell: (row) => (
        <Button onClick={() => handleEdit(row)} variant="warning">
          <FaEdit />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [state, setState] = useState({
    data_roles: [],
    data_nuevo_rol: {
      nombre: null,
      descripcion: null,
      permisos: [],
    },
    data_update_rol: {
      id: null,
      nombre: null,
      descripcion: null,
      permisos: [],
    },
  });
  const [statePermisos, setStatePermisos] = useState({
    data_permisos: [],
  });

  const [selectedRol, setSelectedRol] = useState(null);
  const [selectedPermisos, setSelectedPermisos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllRoles = async () => {
    try {
      const response = await Read_roles.listar_roles({});
      if (response && Array.isArray(response)) {
        setState({ ...state, data_roles: response });
      }
    } catch (error) {
      console.error("Error al consultar roles:", error);
    }
  };

  const consultaAllPermisos = async () => {
    try {
      const response = await Read_permisos.listar_permisos({});
      if (response && Array.isArray(response)) {
        setStatePermisos({ ...statePermisos, data_permisos: response });
      }
    } catch (error) {
      console.error("Error al consultar permisos:", error);
    }
  };

  const getPermisoOptionValue = (permiso) => `${permiso.nombre}__${permiso.id}`;
  const getPermisoNameFromOptionValue = (optionValue) =>
    optionValue.includes("__") ? optionValue.split("__")[0] : optionValue;
  const getSelectedPermisosFromRol = (rol) => {
    if (!rol?.permisos?.length || !statePermisos.data_permisos) return [];
    return rol.permisos
      .map((nombre) =>
        statePermisos.data_permisos.find((p) => p.nombre === nombre),
      )
      .filter(Boolean)
      .map(getPermisoOptionValue);
  };

  const normalizePermisosToNames = (permisos = []) =>
    permisos.map(getPermisoNameFromOptionValue);

  const handleEdit = (rol) => {
    setState((prevState) => ({
      ...prevState,
      data_update_rol: {
        ...prevState.data_update_rol,
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        permisos: rol.permisos || [],
      },
    }));
    // consultaAllPermisos();
    setSelectedPermisos(getSelectedPermisosFromRol(rol));
    setSelectedRol(rol);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const updatedData = {
      ...state.data_update_rol,
      permisos: normalizePermisosToNames(selectedPermisos),
    };

    try {
      await Update_roles.actualizar_rol(updatedData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Operación exitosa",
              text: response.data.mensaje,
              icon: "success",
              timer: 2500,
              showConfirmButton: false,
            });
            consultaAllRoles();
            setShowEditModal(false);
          } else if (response.status === 400) {
            Swal.fire({
              title: "Error",
              text: response.data.error,
              icon: "error",
              timer: 2500,
              showConfirmButton: false,
            });
          } else if (response.status === 404) {
            Swal.fire({
              title: "Error",
              text: "Rol no encontrado",
              icon: "error",
              timer: 2500,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error en la operación:", error);
        });
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  const hadleSaveCreate = async (nuevoRol) => {
    if (!nuevoRol.nombre || !nuevoRol.descripcion) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos obligatorios.",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const createData = {
        ...nuevoRol,
        permisos: normalizePermisosToNames(nuevoRol.permisos),
      };
      await Create_roles.crear_rol(createData)
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              title: "Operación exitosa",
              text: response.data.mensaje,
              icon: "success",
              timer: 2500,
              showConfirmButton: false,
            });
            consultaAllRoles();
            setShowCreateModal(false);
          } else if (response.status === 400) {
            Swal.fire({
              title: "Error",
              text: response.data.error,
              icon: "error",
              timer: 2500,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error en la operación:", error);
        });
    } catch (error) {
      console.error("Error al crear el rol:", error);
    }
  };

  const reiniciarSelectedPermisos = () => {
    setSelectedPermisos([]);
  };

  const handleToggleNewPermiso = (permiso) => {
    setState((prevState) => {
      const currentPermisos = prevState.data_nuevo_rol.permisos || [];
      const nextPermisos = currentPermisos.includes(permiso)
        ? currentPermisos.filter((item) => item !== permiso)
        : [...currentPermisos, permiso];

      return {
        ...prevState,
        data_nuevo_rol: {
          ...prevState.data_nuevo_rol,
          permisos: nextPermisos,
        },
      };
    });
  };

  const handleToggleSelectedPermiso = (permiso) => {
    setSelectedPermisos((prevPermisos) =>
      prevPermisos.includes(permiso)
        ? prevPermisos.filter((item) => item !== permiso)
        : [...prevPermisos, permiso],
    );
  };

  const reiniciarDataNuevoRol = () => {
    setState((prevState) => ({
      ...prevState,
      data_nuevo_rol: {
        nombre: null,
        descripcion: null,
        permisos: [],
      },
    }));
  };

  useEffect(() => {
    consultaAllRoles();
    consultaAllPermisos();
  }, []);

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllRoles}>Roles</Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_roles}
              export={false}
              print={false}
              filterPlaceholder="Buscar roles..."
            >
              <DataTable
                title="Roles"
                noDataComponent="Cargando Información."
                pagination
                striped
                pointerOnHover
                highlightOnHover
              />
            </DataTableExtensions>

            <Button
              variant="primary"
              className="mt-3"
              onClick={() => {
                reiniciarDataNuevoRol();
                setShowCreateModal(true);
              }}
            >
              Crear Nuevo Rol
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* Modal para Crear rol */}

      <Modal
        size="xl"
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            className="border rounded p-3 mb-4 bg-light"
          >
            <h5 style={{ fontWeight: "bolder" }}>Información del Nuevo Rol</h5>
            <Row>
              <Col sm={2}>Nombre</Col>
              <Col sm={3}>Descripción</Col>
              <Col sm={7}>Permisos</Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Nombre del rol"
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      data_nuevo_rol: {
                        ...prevState.data_nuevo_rol,
                        nombre: e.target.value,
                      },
                    }));
                  }}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  type="text"
                  placeholder="Descripción del rol"
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      data_nuevo_rol: {
                        ...prevState.data_nuevo_rol,
                        descripcion: e.target.value,
                      },
                    }));
                  }}
                />
              </Col>
              <Col sm={7}>
                <Form.Select
                  as="select"
                  name="permisos"
                  style={{ height: "16rem" }}
                  multiple
                  value={state.data_nuevo_rol.permisos || []}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    );
                    setState((prevState) => ({
                      ...prevState,
                      data_nuevo_rol: {
                        ...prevState.data_nuevo_rol,
                        permisos: selectedOptions,
                      },
                    }));
                  }}
                >
                  {statePermisos?.data_permisos?.map((permiso) => {
                    const optionValue = getPermisoOptionValue(permiso);
                    return (
                      <option
                        key={permiso.id}
                        value={optionValue}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleToggleNewPermiso(optionValue);
                        }}
                      >
                        {`${permiso.nombre} (${permiso.id})`}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Text className="text-muted">
                  Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar
                  múltiples permisos o deseleccionar permisos asignados.
                </Form.Text>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => hadleSaveCreate(state.data_nuevo_rol)}
          >
            Crear Rol
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar rol */}
      <Modal
        size="xl"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRol && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              className="border rounded p-3 mb-4 bg-light"
            >
              <h5 style={{ fontWeight: "bolder" }}>Información del Rol</h5>
              <Row>
                <Col sm={2}>Nombre</Col>
                <Col sm={3}>Descripción</Col>
                <Col sm={7}>Permisos</Col>
              </Row>
              <Row>
                <Col sm={2}>{selectedRol.nombre}</Col>
                <Col sm={3}>{selectedRol.descripcion}</Col>
                <Col sm={7}>
                  {selectedRol.permisos?.join(", ") || "Sin permisos"}
                </Col>
              </Row>
            </div>
          )}

          <div>
            <hr />
            <h5 style={{ fontWeight: "bolder" }}>Editar información del rol</h5>

            <Row style={{ height: "20rem" }}>
              <Col sm={2}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedRol?.nombre}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      data_update_rol: {
                        ...prevState.data_update_rol,
                        nombre: e.target.value,
                      },
                    }));
                  }}
                />
              </Col>
              <Col sm={3}>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedRol?.descripcion}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      data_update_rol: {
                        ...prevState.data_update_rol,
                        descripcion: e.target.value,
                      },
                    }));
                  }}
                />
              </Col>
              <Col
                sm={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <Form.Label>Permisos disponibles</Form.Label>
                <Form.Select
                  as="select"
                  name="permisos"
                  style={{ height: "16rem" }}
                  multiple
                  value={selectedPermisos}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    );
                    setSelectedPermisos(selectedOptions);
                  }}
                >
                  {statePermisos?.data_permisos?.map((permiso) => {
                    const optionValue = getPermisoOptionValue(permiso);
                    return (
                      <option
                        key={permiso.id}
                        value={optionValue}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleToggleSelectedPermiso(optionValue);
                        }}
                      >
                        {`${permiso.nombre} (${permiso.id})`}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Text className="text-muted">
                  Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar
                  múltiples permisos o deseleccionar permisos asignados.
                </Form.Text>
              </Col>
              <Col sm={2}>
                <Button
                  variant="success"
                  className="mt-4"
                  onClick={() => handleSaveEdit()}
                >
                  Guardar Cambios
                </Button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorRoles;
