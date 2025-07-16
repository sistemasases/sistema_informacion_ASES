/**
 * @file acordeon_asignaciones_monitores.jsx
 * @version 1.0.0
 * @description Acordeon para agestionar las asignaciones de estudiantes a monitores.
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
// import all_facultades_service from "../../service/all_facultades";
import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

import Read_asginaciones_monitores from "../../service/panel_admin/panel_admin_asignaciones_monitores_listar_asignaciones.js";
import Update_asignaciones_monitores from "../../service/panel_admin/panel_admin_asignaciones_monitores_actualizar_asignaciones.js";
import Delete_asignaciones_monitores from "../../service/panel_admin/panel_admin_asignaciones_monitores_eliminar_asignacion.js";

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
      const response =
        await Read_asginaciones_monitores.listar_asignaciones_monitores({
          semestre: desencriptarInt(
            sessionStorage.getItem("id_semestre_actual")
          ),
        });
      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_asignaciones: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar facultades:", error);
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
      name: "ID",
      selector: (row) => row.id_monitor,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "USUARIO",
      selector: (row) => row.usuario_monitor,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "NOMBRES",
      selector: (row) => row.nombre_monitor,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "CORREO",
      selector: (row) => row.correo_monitor,
      sortable: true,
      wrap: true,
      grow: 0.9,
    },
    {
      name: "ASIGNACIONES",
      selector: (row) =>
        row?.asignaciones?.map((a) =>
          a.semestre == semestreActual
            ? a.nombre_estudiante.toUpperCase() + " , "
            : ""
        ) || "Sin asignaciones",
      sortable: true,
      wrap: true,
      grow: 0.9,
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
    Update_asignaciones_monitores.actualizar_asignaciones_monitores(
      selectedAsignacion
    );
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
        Delete_asignaciones_monitores.eliminar_asignacion_monitores({ id: id });
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
            Asignación de monitores
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
                title="Asignación de monitores"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            <Row className="mt-3"></Row>
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
                    <Col md={2}>
                      <strong>Usuario:</strong>{" "}
                      {selectedAsignaciones.id_monitor}
                    </Col>
                    <Col md={4}>
                      <strong>Nombre monitor:</strong>{" "}
                      {selectedAsignaciones.nombre_monitor}
                    </Col>
                    <Col md={4}>
                      <strong>Correo:</strong>{" "}
                      {selectedAsignaciones.correo_monitor}
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <h5>Historial de Asignaciones </h5>
                      {
                        <Table bordered size="sm" responsive>
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>Código </th>
                              <th>Nombre Monitor</th>
                              <th>Estado</th>
                              <th>Semestre</th>
                              <th style={{ width: "90px" }}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedAsignaciones?.asignaciones
                              ?.slice()
                              .sort((a, b) => b.semestre - a.semestre) // orden descendente
                              .map((a) => (
                                <tr key={a.id}>
                                  <td className="text-center">
                                    {a.cod_univalle_estudiante}
                                  </td>
                                  <td>{a.nombre_estudiante}</td>
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
                <Form.Label>Código del Estudiante</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAsignacion.cod_univalle_estudiante}
                  onChange={(e) =>
                    setSelectedAsignacion((prev) => ({
                      ...prev,
                      id_monitor: e.target.value,
                    }))
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Estudiante</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    selectedAsignacion.nombre_estudiante +
                    " " +
                    selectedAsignacion.apellido_estudiante
                  }
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
