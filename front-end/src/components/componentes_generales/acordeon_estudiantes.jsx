/**
 * @file acordeon_estudiantes.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los datos de estudiantes.
 */

import React, { useState, useEffect } from "react";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import all_estudiantes_service from "../../service/all_estudiantes";
import { FaEdit } from "react-icons/fa";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const SelectorEstudiantes = () => {
  const [state, setState] = useState({
    data_estudiantes: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllEstudiantes = async () => {
    try {
      const pk = desencriptar(sessionStorage.getItem("sede_id"));
      const response = await all_estudiantes_service.all_estudiantes(pk);
      if (response && Array.isArray(response)) {
        setState({ ...state, data_estudiantes: response });
      }
    } catch (error) {
      console.error("Error al consultar estudiantes:", error);
    }
  };

  useEffect(() => {
    consultaAllEstudiantes();
  }, []);

  const handleRowSelected = ({ selectedRows }) => setSelectedRows(selectedRows);

  const handleEdit = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedEstudiante((prevEstudiante) => ({
      ...prevEstudiante,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    // Aquí se puede implementar la lógica para guardar los cambios en el estudiante.
    console.log("Guardando estudiante editado:", selectedEstudiante);
    setShowEditModal(false);
  };

  // Definición de las columnas de la tabla
  const columnas = [
    { name: "NOMBRES", selector: (row) => row.nombre, sortable: true },
    { name: "APELLIDOS", selector: (row) => row.apellido, sortable: true },
    { name: "CÓDIGO", selector: (row) => row.cod_univalle, sortable: true },
    { name: "DOCUMENTO", selector: (row) => row.num_doc, sortable: true },
    { name: "CORREO", selector: (row) => row.email, sortable: true },
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
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllEstudiantes}>
            Estudiantes
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_estudiantes}
            >
              <DataTable
                title="Estudiantes"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                striped
              />
            </DataTableExtensions>
            <Button variant="danger">Eliminar Estudiantes Seleccionados</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedEstudiante?.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={selectedEstudiante?.apellido || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editCodigo">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={selectedEstudiante?.cod_univalle || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editDocumento">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                name="documento"
                value={selectedEstudiante?.num_doc || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={selectedEstudiante?.email || ""}
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
    </Container>
  );
};

export default SelectorEstudiantes;
