/**
 * @file acordeon_estudiantes.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los datos de estudiantes.
 */

import React, { useState, useEffect } from "react";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import all_estudiantes_service from "../../service/all_estudiantes";
import { FaEdit } from "react-icons/fa";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

import Read_estudiantes from "../../service/panel_admin/panel_admin_estudiante_listar_estudiantes.js";
import Update_estudiantes from "../../service/panel_admin/panel_admin_estudiante_actualizar_estudiante.js";
import Deactivate_estudiantes from "../../service/panel_admin/panel_admin_estudiante_desactivar_estudiante.js";
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
      // const pk = desencriptar(sessionStorage.getItem("sede_id"));
      // const response = await all_estudiantes_service.all_estudiantes(pk);

      const response = await Read_estudiantes.listar_estudiantes({});

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
    // console.log("Guardando estudiante editado:", selectedEstudiante);
    Update_estudiantes.actualizar_estudiante(selectedEstudiante);
    // setShowEditModal(false);
  };

  const handleDeactivate = () => {
    if (selectedRows.length === 0) {
      alert("Por favor, seleccione al menos un estudiante para eliminar.");
      return;
    }
    const confirmDelete = window.confirm(
      `¿Está seguro de que desea desactivar ${selectedRows.length} estudiante(s)? Esta acción no se puede deshacer.`
    );
    if (confirmDelete) {
      const idsToDelete = selectedRows.map((row) => row.id);
      // console.log("Eliminando estudiantes con IDs:", idsToDelete);
      Deactivate_estudiantes.desactivar_estudiante(idsToDelete);
      consultaAllEstudiantes();
      setSelectedRows([]); // Limpiar la selección después de eliminar
    }
  };
  // Definición de las columnas de la tabla
  const columnas = [
    {
      name: "NOMBRES",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
      grow: 0.9,
    },
    {
      name: "APELLIDOS",
      selector: (row) => row.apellido,
      sortable: true,
      wrap: true,
      grow: 0.9,
    },
    {
      name: "CÓDIGO",
      selector: (row) => row.cod_univalle,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "NACIMIENTO",
      selector: (row) => row.fecha_nac,
      sortable: true,
      wrap: true,
      grow: 0.8,
      format: (row) => {
        const date = new Date(row.fecha_nac);
        return date.toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.num_doc,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "ESTUDIANTE ELEGIBLE",
      selector: (row) =>
        row.estudiante_elegible == true ? "ELEGIBLE" : "NO ELEGIBLE",
      sortable: true,
      wrap: true,
      grow: 0.8,
      title: "Estudiante Elegible",
    },
    {
      name: "PROGRAMAS",
      selector: (row) =>
        row?.programas?.map((p) => p.nombre_programa).join(", ") ||
        "Sin programas",
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "COHORTE",
      selector: (row) =>
        row?.cohortes?.map((c) => c.nombre_cohorte).join(", ") || "Sin cohorte",
      sortable: false,
      wrap: true,
      grow: 0.8,
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
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllEstudiantes}>
            Estudiantes
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_estudiantes}
              export={false}
              print={false}
              filterPlaceholder="Buscar estudiantes..."
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
            <Button variant="danger" onClick={handleDeactivate}>
              Eliminar Estudiantes Seleccionados
            </Button>
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
                name="cod_univalle"
                value={selectedEstudiante?.cod_univalle || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,7}$/.test(value)) {
                    handleEditChange(e);
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="editFechaNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fecha_nac"
                value={
                  selectedEstudiante?.fecha_nac
                    ? new Date(selectedEstudiante.fecha_nac)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleEditChange}
                max={new Date().toISOString().split("T")[0]} // fecha máxima: hoy
                min={"1950-01-01"} // fecha mínima
              />
            </Form.Group>
            <Form.Group controlId="editDocumento">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                name="num_doc"
                value={selectedEstudiante?.num_doc || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleEditChange(e);
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="editCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
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
