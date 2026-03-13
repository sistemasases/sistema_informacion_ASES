/**
 * @file acordeon_cohortes.jsx
 * @version 1.0.0
 * @description info de rendizar las cohortes.
 * @author Valentina Salamanca
 * @contact salamanca.valentina@correounivalle.edu.co
 * @date 13 de noviembre del 2024
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Accordion,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import all_cohorte_service from "../../service/all_cohorte";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import Read_cohorte from "../../service/panel_admin/panel_admin_cohortes_listar_cohortes.js";
import Update_cohorte from "../../service/panel_admin/panel_admin_cohortes_actualizar_cohorte.js";
import Create_cohorte from "../../service/panel_admin/panel_admin_cohortes_crear_cohorte.js";

const SelectorCohortes = () => {
  const [state, setState] = useState({
    data_cohortes: [],
  });
  const [selectedCohorte, setSelectedCohorte] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCohorte, setNewCohorte] = useState({
    id_number: "",
    nombre: "",
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllCohortes = async () => {
    try {
      // const response = await all_cohorte_service.all_cohorte();
      const response = await Read_cohorte.listar_cohortes({});
      if (response && Array.isArray(response)) {
        setState((prevState) => ({ ...prevState, data_cohortes: response }));
      }
    } catch (error) {
      console.error("Error al consultar cohortes:", error);
    }
  };

  useEffect(() => {
    consultaAllCohortes();
  }, []);

  const handleEdit = (cohorte) => {
    setSelectedCohorte(cohorte);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedCohorte((prevCohorte) => ({
      ...prevCohorte,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      // console.log("Guardando cambios:", selectedCohorte);
      // setShowEditModal(false);
      Update_cohorte.actualizar_cohorte(selectedCohorte);
      consultaAllCohortes();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewCohorte((prevCohorte) => ({
      ...prevCohorte,
      [name]: value,
    }));
  };

  const handleCreateCohorte = async () => {
    if (newCohorte.id_number == "" || newCohorte.nombre == "") {
      Swal.fire({
        title: "Mensaje de alerta",
        text: "Por favor, verifica que todos los campos obligatorios estén llenos antes de enviar",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Aceptar",
        // cancelButtonText: "No",
      });
      return;
    } else {
      try {
        // console.log("Creando nuevo cohorte:", newCohorte);
        Create_cohorte.crear_cohorte(newCohorte);
        setNewCohorte({ id_number: "", nombre: "" }); // Reset form
        // setShowCreateModal(false);
        consultaAllCohortes();
      } catch (error) {
        console.error("Error al crear cohorte:", error);
      }
    }
  };

  const columnas = [
    { name: "ID", selector: (row) => row.id, sortable: true, grow: 0.3 },
    {
      name: "ID NUMBER",
      selector: (row) => row.id_number,
      sortable: true,
      grow: 0.4,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      sortable: true,
      grow: 0.9,
    },
    {
      name: "ACTIVO",
      selector: (row) => (row.is_active ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.4,
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

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllCohortes}>
            Cohortes
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_cohortes}
              export={false}
              print={false}
              filterPlaceholder="Buscar cohortes..."
            >
              <DataTable
                title="Cohortes"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={handleShowCreateModal}>
                  Crear Cohorte
                </Button>
              </Col>
              {/* <Col>
                <Button
                  variant="danger"
                  onClick={() => console.log("Eliminar cohortes")}
                >
                  Eliminar Cohortes
                </Button>
              </Col> */}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal para editar cohorte */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cohorte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editId">
              <Form.Label>ID cohorte</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={selectedCohorte?.id || ""}
                onChange={handleEditChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editIdNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                name="id_number"
                value={selectedCohorte?.id_number || ""}
                onChange={handleEditChange}
                maxLength={20}
              />
            </Form.Group>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedCohorte?.nombre || ""}
                onChange={handleEditChange}
                maxLength={50}
              />
            </Form.Group>
            <Form.Group controlId="editIsActive">
              <Form.Label>Activo</Form.Label>
              <Form.Check
                type="checkbox"
                name="is_active"
                checked={selectedCohorte?.is_active || false}
                onChange={(e) =>
                  setSelectedCohorte((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
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

      {/* Modal para crear cohorte */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Cohorte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group controlId="createId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={newCohorte.id}
                onChange={handleCreateChange}
              />
            </Form.Group> */}
            <Form.Group controlId="createIdNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                name="id_number"
                value={newCohorte.id_number}
                onChange={handleCreateChange}
                maxLength={20}
              />
            </Form.Group>
            <Form.Group controlId="createNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newCohorte.nombre}
                onChange={handleCreateChange}
                maxLength={50}
              />
            </Form.Group>
            <Form.Group controlId="createIsActive">
              <Form.Label>Activo</Form.Label>
              <Form.Check
                type="checkbox"
                name="is_active"
                checked={newCohorte.is_active || false}
                onChange={(e) =>
                  setNewCohorte((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateCohorte}>
            Crear Cohorte
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorCohortes;
