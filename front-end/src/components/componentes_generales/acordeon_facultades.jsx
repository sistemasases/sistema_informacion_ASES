/**
 * @file acordeon_facultades.jsx
 * @version 1.0.0
 * @description info de rendizar las facultades.
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
// import all_facultades_service from "../../service/all_facultades";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";

import Read_facultades from "../../service/panel_admin/panel_admin_facultades_listar_facultades.js";
import Update_facultades from "../../service/panel_admin/panel_admin_facultades_actualizar_facultad.js";
import Create_facultades from "../../service/panel_admin/panel_admin_facultades_crear_facultad.js";

const SelectorFacultad = () => {
  const [state, setState] = useState({
    data_facultades: [],
  });
  const [selectedFacultad, setSelectedFacultad] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFacultad, setNewFacultad] = useState({
    codigo_univalle: "",
    nombre: "",
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllFacultades = async () => {
    try {
      // const response = await all_facultades_service.all_facultades();
      const response = await Read_facultades.listar_facultades({});
      if (response && Array.isArray(response)) {
        setState((prevState) => ({ ...prevState, data_facultades: response }));
      }
    } catch (error) {
      console.error("Error al consultar facultades:", error);
    }
  };

  useEffect(() => {
    consultaAllFacultades();
  }, []);

  const handleEdit = (facultad) => {
    setSelectedFacultad(facultad);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedFacultad((prevFacultad) => ({
      ...prevFacultad,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Guardando cambios:", selectedFacultad);
      // setShowEditModal(false);
      Update_facultades.actualizar_facultad(selectedFacultad);
      consultaAllFacultades();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewFacultad((prevFacultad) => ({
      ...prevFacultad,
      [name]: value,
    }));
  };

  const handleCreateCohorte = async () => {
    try {
      console.log("Creando nuevo facultad:", newFacultad);
      // setShowCreateModal(false);
      Create_facultades.crear_facultad(newFacultad);
      // setNewFacultad({ codigo_univalle: "", nombre: "" }); // Reset form
      consultaAllFacultades();
    } catch (error) {
      console.error("Error al crear facultad:", error);
    }
  };

  const columnas = [
    {
      name: "CÓDIGO UNIVALLE",
      selector: (row) => row.codigo_univalle,
      sortable: true,
    },
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: false },
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
          <Accordion.Header onClick={consultaAllFacultades}>
            Facultades
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_facultades}
              export={false}
              print={false}
              filterPlaceholder="Buscar facultades..."
            >
              <DataTable
                title="Facultades"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={handleShowCreateModal}>
                  Crear Facultad
                </Button>
              </Col>
              {/* <Col>
                <Button
                  variant="danger"
                  onClick={() => console.log("Eliminar facultades")}
                >
                  Eliminar Facultades
                </Button>
              </Col> */}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Facultad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editId">
              <Form.Label>Código Univalle</Form.Label>
              <Form.Control
                type="text"
                name="codigo_univalle"
                value={selectedFacultad?.codigo_univalle || ""}
                onChange={handleEditChange}
                // disabled
                maxLength={2}
              />
            </Form.Group>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedFacultad?.nombre || ""}
                onChange={handleEditChange}
                maxLength={50}
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
          <Modal.Title>Crear Facultad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createId">
              <Form.Label>Código Univalle</Form.Label>
              <Form.Control
                type="text"
                name="codigo_univalle"
                value={newFacultad.codigo_univalle}
                onChange={handleCreateChange}
                maxLength={2}
              />
            </Form.Group>
            <Form.Group controlId="createNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newFacultad.nombre}
                onChange={handleCreateChange}
                maxLength={50}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateCohorte}>
            Crear Facultad
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorFacultad;
