/**
 * @file admin_roles.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los roles.
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Accordion,
  Col,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import all_permisos_service from "../../service/all_permisos";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import Create_permisos from "../../service/panel_admin/panel_admin_permisos_crear_permisos.js";
import Read_permisos from "../../service/panel_admin/panel_admin_permisos_listar_permisos.js";
import Swal from "sweetalert2";

const SelectorPermisos = () => {
  const [state, setState] = useState({
    data_permisos: [],
    data_nuevo_permiso: {
      nombre: null,
      descripcion: null,
    },
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllPermisos = async () => {
    try {
      // const response = await all_permisos_service.all_permisos();
      const response = await Read_permisos.listar_permisos({});
      if (response && Array.isArray(response)) {
        setState({ ...state, data_permisos: response });
      }
    } catch (error) {
      console.error("Error al consultar permisos:", error);
    }
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
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: true },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      sortable: false,
    },
  ];

  // Mostrar  el modal de creación de permiso
  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      data_nuevo_permiso: {
        ...prevData.data_nuevo_permiso,
        [name]: value,
      },
    }));
  };

  // Función para guardar el nuevo permiso

  const handleSaveCreate = async () => {
    try {
      await Create_permisos.crear_permiso(
        state.data_nuevo_permiso,
      ).then((response) => {
        if (response.status === 201) {
          // console.log("Permiso creado exitosamente:", response.data);
          Swal.fire({
            title: "Éxito",
            text: "Permiso creado exitosamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
        } else if (response.status === 400) {
          // console.error("Error al crear permiso:", response.data);
          Swal.fire({
            title: "Error",
            text: "Error al crear permiso.",
            icon: "error",
            timer: 1500,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
        }
      });
      // Después de guardar, puedes cerrar el modal y refrescar la lista de permisos
      reiniciarFormulario();
      setShowCreateModal(false);
      consultaAllPermisos();
    } catch (error) {
      console.error("Error al crear permiso:", error);
    }
  };

  const reiniciarFormulario = () => {
    setState((prevData) => ({
      ...prevData,
      data_nuevo_permiso: {
        nombre: null,
        descripcion: null,
      },
    }));
  };

  useEffect(() => {
    consultaAllPermisos();
  }, []);

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="">
          <Accordion.Header onClick={consultaAllPermisos}>
            Permisos
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_permisos}
              export={false}
              print={false}
              filterPlaceholder="Buscar Permisos..."
            >
              <DataTable
                title="Permisos"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            {/* Botones internos */}
            <Button
              variant="primary"
              onClick={() => {
                handleCreate();
                reiniciarFormulario();
              }}
            >
              Crear Permiso
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal Creación */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Permiso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNombrePermiso">
              <Form.Label>Nombre del Permiso</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre del permiso"
                value={state.data_nuevo_permiso.nombre}
                onChange={(e) =>
                  setState({
                    ...state,
                    data_nuevo_permiso: {
                      ...state.data_nuevo_permiso,
                      nombre: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescripcionPermiso">
              <Form.Label>Descripción del Permiso</Form.Label>
              <Form.Control
                name="descripcion"
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción del permiso"
                value={state.data_nuevo_permiso.descripcion}
                onChange={(e) => handleCreateChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleSaveCreate()}>
            Guardar Permiso
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorPermisos;
