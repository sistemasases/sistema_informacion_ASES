/**
 * @file acordeon_asignaciones.jsx
 * @version 1.0.0
 * @description Acordeon para agestionar las asignaciones de monitores a estudiantes.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 10 de julio del 2025
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
  Table,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import Read_asignaciones from "../../service/panel_admin/panel_admin_asignaciones_listar_asignaciones.js";
import Update_asignaciones from "../../service/panel_admin/panel_admin_asignaciones_actualizar_asignaciones.js";
import Delete_asignaciones from "../../service/panel_admin/panel_admin_asignaciones_eliminar_asignacion.js";
import Swal from "sweetalert2";

const SelectorAsignaciones = () => {
  const [state, setState] = useState({
    data_asignaciones: [],
  });
  const [selectedAsignaciones, setSelectedAsignaciones] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAsignacionModal, setShowAsignacionModal] = useState(false);
  const [selectedAsignacion, setSelectedAsignacion] = useState(null);

  const consultaAllAsignaciones = async () => {
    try {
      const response = await Read_asignaciones.listar_asignaciones({
        semestre: desencriptarInt(sessionStorage.getItem("id_semestre_actual")),
      });
      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_asignaciones: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar asignaciones:", error);
    }
  };

  const handleEdit = (estudiante) => {
    setSelectedAsignaciones(estudiante);
    setShowEditModal(true);
  };

  const handleEditAsignacion = (asignacion) => {
    setSelectedAsignacion(asignacion);
    setShowAsignacionModal(true);
  };

  useEffect(() => {
    consultaAllAsignaciones();
  }, []);

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleSaveEdit = async () => {};
  const semestreActual = desencriptarInt(
    sessionStorage.getItem("id_semestre_actual")
  );

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
      name: "DOCUMENTO",
      selector: (row) => row.num_doc,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "ASIGNACIONES",
      selector: (row) =>
        row?.asignaciones?.map((a) =>
          a.semestre == semestreActual
            ? a.nombre_monitor.toUpperCase() + " , "
            : ""
        ) || "Sin asignaciones",
      sortable: true,
      wrap: true,
      grow: 0.8,
      title: "Asignaciones",
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

  const handleUpdateAsignacion = () => {
    Update_asignaciones.actualizar_asignaciones(selectedAsignacion);
    setShowAsignacionModal(false);
    setShowEditModal(false);
    consultaAllAsignaciones();
  };

  const handleDeleteAsignacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la asignación seleccionada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("Se llama a la eliminación de asignación con ID:", id);
        Delete_asignaciones.eliminar_asignacion({ id: id });
        setShowAsignacionModal(false);
        setShowEditModal(false);
        consultaAllAsignaciones();
      } else {
        // console.log("Se cancela la eliminación de asignación con ID:", id);
      }
    });

    // console.log("Eliminando asignación con ID:", id);
  };

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllAsignaciones}>
            Asignación de estudiantes
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_asignaciones}
              export={false}
              print={false}
              filterPlaceholder="Buscar asignaciones..."
            >
              <DataTable
                title="Asignación de estudiantes"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* MODAL DE EDICIÖN */}

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editar Asignaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid>
              {/* {console.log(selectedAsignaciones)} */}
              {
                <div
                  key={selectedAsignaciones.id_estudiante}
                  className="border rounded p-3 mb-4 bg-light"
                >
                  <Row className="mb-2">
                    <Col md={3}>
                      <strong>Nombres:</strong> {selectedAsignaciones.nombre}
                    </Col>
                    <Col md={3}>
                      <strong>Apellidos:</strong>{" "}
                      {selectedAsignaciones.apellido}
                    </Col>
                    <Col md={2}>
                      <strong>Código:</strong>{" "}
                      {selectedAsignaciones.cod_univalle}
                    </Col>
                    <Col md={3}>
                      <strong>Documento:</strong> {selectedAsignaciones.num_doc}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Historial de Asignaciones </h6>
                      {
                        <Table bordered size="sm" responsive>
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>Usuario</th>
                              <th>Nombre Monitor</th>
                              <th>Estado</th>
                              <th>Semestre</th>
                              <th style={{ width: "90px" }}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedAsignaciones?.asignaciones
                              ?.slice()
                              .sort((a, b) => a.semestre - b.semestre) // orden ascendente
                              .map((a) => (
                                <tr key={a.id}>
                                  <td className="text-center">
                                    {a.id_usuario}
                                  </td>
                                  <td>{a.nombre_monitor}</td>
                                  <td className="text-center">
                                    {a.estado === true ? "Activo" : "Inactivo"}
                                  </td>
                                  <td className="text-center">{a.semestre}</td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      paddingRight: "0rem",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "6.5rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Button
                                        variant="warning"
                                        onClick={() => handleEditAsignacion(a)}
                                      >
                                        <FaEdit />
                                      </Button>

                                      <Button
                                        variant="danger"
                                        onClick={() => {
                                          handleDeleteAsignacion(a.id);
                                        }}
                                        style={{
                                          marginLeft: "0.5rem",
                                          marginRight: "0.5rem",
                                        }}
                                      >
                                        <FaTrashCan />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      }
                    </Col>
                  </Row>
                </div>
              }
            </Container>
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

      {/* MODAL DE ASIGNACIÖN INDIVIDUAL */}

      <Modal
        show={showAsignacionModal}
        onHide={() => setShowAsignacionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Asignación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAsignacion && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Monitor</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAsignacion.nombre_monitor}
                  onChange={(e) =>
                    setSelectedAsignacion((prev) => ({
                      ...prev,
                      nombre_monitor: e.target.value,
                    }))
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedAsignacion.correo_monitor}
                  onChange={(e) =>
                    setSelectedAsignacion((prev) => ({
                      ...prev,
                      correo_monitor: e.target.value,
                    }))
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={selectedAsignacion.estado ? "activo" : "inactivo"}
                  onChange={(e) =>
                    setSelectedAsignacion((prev) => ({
                      ...prev,
                      estado: e.target.value === "activo",
                    }))
                  }
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}

          <Form.Group className="mb-3">
            <Form.Label>id semestre</Form.Label>
            <Form.Control
              type="text"
              value={selectedAsignacion?.semestre}
              onChange={(e) =>
                setSelectedAsignacion((prev) => ({
                  ...prev,
                  semestre: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAsignacionModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdateAsignacion(selectedAsignacion);
            }}
          >
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorAsignaciones;
