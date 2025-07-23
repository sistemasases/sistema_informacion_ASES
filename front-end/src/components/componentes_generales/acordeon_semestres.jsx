/**
 * @file panel_admin_semestres_actualizar_semestres.js
 * @version 1.0.0
 * @description Service para Actualizar los datos de un semestre existente mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2025-07-23
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Accordion,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { FaEdit } from "react-icons/fa";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

import Create_semestre from "../../service/panel_admin/panel_admin_semestres_crear_semestre.js";
import Read_semestres from "../../service/panel_admin/panel_admin_semestres_listar_semestres.js";
import Update_semestre from "../../service/panel_admin/panel_admin_semestres_actualizar_semestre.js";

import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";

const SelectorSemestres = () => {
  const [state, setState] = useState({
    data_semestres: [],
    data_sedes: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSemestre, setNewSemestre] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    semestre_actual: false,
    id_sede_id: "",
  });

  const consultaAllSemestres = async () => {
    try {
      const response = await Read_semestres.listar_semestres({});

      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_semestres: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar semestres:", error);
    }
  };

  const consultaAllSedes = async () => {
    try {
      const response = await Read_sedes.listar_sedes({});

      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_sedes: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar sedes:", error);
    }
  };

  useEffect(() => {
    consultaAllSemestres();
    consultaAllSedes();
  }, []);

  const handleRowSelected = ({ selectedRows }) => setSelectedRows(selectedRows);

  const handleEdit = (semestre) => {
    setSelectedSemestre(semestre);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedSemestre((prevSemestre) => ({
      ...prevSemestre,
      [name]: value,
    }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewSemestre((prevSemestre) => ({
      ...prevSemestre,
      [name]: value,
    }));
  };

  const handleCreateSemestre = () => {
    console.log("Creando nuevo semestre:", newSemestre);
    Create_semestre.crear_semestre(newSemestre);
    // setShowCreateModal(false);
  };

  const handleSaveEdit = () => {
    console.log("Guardando semestre editado:", selectedSemestre);
    Update_semestre.actualizar_semestre(selectedSemestre);
    // setShowEditModal(false);
  };

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
      name: "FECHA INICIO",
      selector: (row) => row.fecha_inicio,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "FECHA FIN",
      selector: (row) => row.fecha_fin,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "SEMESTRE ACTUAL",
      selector: (row) => (row.semestre_actual ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.4,
    },
    // {
    //   name: "ESTADO",
    //   selector: (row) => row.estado,
    //   sortable: true,
    //   wrap: true,
    //   grow: 0.9,
    // },
    {
      name: "ID SEDE",
      selector: (row) => row.id_sede_id,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "SEDE",
      selector: (row) => row.id_sede_id__nombre,
      sortable: true,
      wrap: true,
      grow: 0.3,
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
          <Accordion.Header onClick={consultaAllSemestres}>
            Semestres
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_semestres}
              export={false}
              print={false}
              filterPlaceholder="Buscar semestres..."
            >
              <DataTable
                title="Semestres"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                striped
              />
            </DataTableExtensions>

            <Row>
              <Col>
                <Button variant="primary" onClick={handleShowCreateModal}>
                  Crear Semestre
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* MODAL EDITAR ESTUDIANTE */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Semestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedSemestre?.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editFechaInicio">
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                min="2000-01-01"
                max="2100-12-31"
                value={
                  selectedSemestre?.fecha_inicio
                    ? selectedSemestre.fecha_inicio.slice(0, 10)
                    : ""
                }
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editFechaFin">
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                min="2000-01-01"
                max="2100-12-31"
                value={
                  selectedSemestre?.fecha_fin
                    ? selectedSemestre.fecha_fin.slice(0, 10)
                    : ""
                }
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editSemestreActual">
              <Form.Label>Semestre Actual</Form.Label>
              <Form.Select
                name="semestre_actual"
                value={
                  selectedSemestre?.semestre_actual === true
                    ? "true"
                    : selectedSemestre?.semestre_actual === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  handleEditChange({
                    target: {
                      name: "semestre_actual",
                      value: e.target.value === "true",
                    },
                  })
                }
              >
                <option value="">Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="editSede">
              <Form.Label>Sede</Form.Label>
              <Form.Select
                name="id_sede_id"
                value={selectedSemestre?.id_sede_id || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccionar Sede</option>
                {state?.data_sedes?.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </Form.Select>
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
          <Modal.Title>Crear Semestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newSemestre.nombre}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createFechaInicio">
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                min="2000-01-01"
                max="2100-12-31"
                value={newSemestre.fecha_inicio}
                onChange={handleCreateChange}
              />
            </Form.Group>

            <Form.Group controlId="createFechaFin">
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                min="2000-01-01"
                max="2100-12-31"
                value={newSemestre.fecha_fin}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createSemestreActual">
              <Form.Label>Semestre Actual</Form.Label>
              <Form.Select
                name="semestre_actual"
                value={newSemestre.semestre_actual ? "true" : "false"}
                onChange={(e) =>
                  handleCreateChange({
                    target: {
                      name: "semestre_actual",
                      value: e.target.value === "true",
                    },
                  })
                }
              >
                <option value="">Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="createSede">
              <Form.Label>Sede</Form.Label>
              <Form.Select
                name="id_sede_id"
                value={newSemestre.id_sede_id}
                onChange={handleCreateChange}
              >
                <option value="">Seleccionar Sede</option>
                {state?.data_sedes?.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateSemestre}>
            Crear Semestre
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorSemestres;
