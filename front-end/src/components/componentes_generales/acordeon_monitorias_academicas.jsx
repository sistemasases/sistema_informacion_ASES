/**
 * @file acordeon_monitorias_academicas.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza las monitorias academicas.
 * @author @iMrStevenS2
 * @date 07-04-2026
 */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  desencriptar,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import Select from "react-select";

// Services
import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";
import Read_monitorias_academicas from "../../service/panel_admin/panel_admin_monitorias_academicas_listar_monitorias.js";
import Read_monitores_academicos from "../../service/panel_admin/panel_admin_monitorias_academicas_listar_monitores_academicos.js";
import Deactivate_monitorias_academicas from "../../service/panel_admin/panel_admin_monitorias_academicas_desactivar_monitorias_academicas.js";
import Create_monitorias_academicas from "../../service/panel_admin/panel_admin_monitorias_academicas_crear_monitorias_academicas.js";

const SelectorMonitoriasAcademicas = () => {
  const [state, setState] = useState({
    data: [],
    data_monitores_academicos: [],
    data_monitorias_monitor: [],
    all_data_monitorias: [],
    data_materias: [
      { id: 1, nombre_materia: "MATEMÁTICA FUNDAMENTAL" },
      { id: 2, nombre_materia: "CÁLCULO I" },
      { id: 3, nombre_materia: "CÁLCULO II" },
      { id: 4, nombre_materia: "CÁLCULO III" },
      { id: 5, nombre_materia: "ÁLGEBRA LINEAL" },
      { id: 6, nombre_materia: "ECUACIONES DIFERENCIALES" },
      { id: 7, nombre_materia: "CIRCUITOS ELÉCTRICOS" },
      { id: 8, nombre_materia: "SISTEMAS DIGITALES" },
      { id: 9, nombre_materia: "DISPOSITIVOS Y CIRCUITOS ELECTRÓNICOS" },
      { id: 10, nombre_materia: "CIRCUITOS INTEGRADOS" },
      { id: 11, nombre_materia: "SISTEMAS EMBEBIDOS" },
      { id: 12, nombre_materia: "SISTEMAS AUTOMÁTICOS DE CONTROL" },
      { id: 13, nombre_materia: "ELECTRÓNICA INDUSTRIAL" },
      { id: 14, nombre_materia: "AUTOMATIZACIÓN INDUSTRIAL" },
      { id: 15, nombre_materia: "CONTROLADORES LÓGICOS PROGRAMABLES" },
      { id: 16, nombre_materia: "LECTURA" },
      { id: 17, nombre_materia: "ESCRITURA" },
      { id: 18, nombre_materia: "CONTABILIDAD" },
      { id: 19, nombre_materia: "FÍSICA" },
      { id: 20, nombre_materia: "QUÍMICA" },
    ],
    data_creacion_monitoria: {
      id_monitor: null,
      nombre_monitor: null,
      materias: [],
      sede: null,
      semestre_actual: desencriptarInt(
        sessionStorage.getItem("id_semestre_actual"),
      ),
    },
    data_sedes: [],
  });

  const [selectedMonitoria, setSelectedMonitoria] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  // Para controlar el Input
  const [mostrarInputMateria, setMostrarInputMateria] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);

  const columnas = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "NOMBRE MONITOR",
      selector: (row) => row.nombre_monitor,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "CORREO MONITOR",
      selector: (row) => row.correo_monitor,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "SEDE",
      selector: (row) => row.nombre_sede,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "SEMESTRE",
      selector: (row) => row.nombre_semestre,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "ESTADO MONITORIA",
      selector: (row) => row.estado,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "MATERIA",
      selector: (row) => row.materia,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "EDITAR",
      cell: (row) => (
        <Button variant="warning" size="sm" onClick={() => handleEdit(row)}>
          <FaEdit />
        </Button>
      ),
      allowOverflow: true,
      button: true,
      grow: 0.1,
    },
  ];

  const consultaAllUser = async () => {
    try {
      const semestre = desencriptarInt(
        sessionStorage.getItem("id_semestre_actual"),
      );
      const response =
        await Read_monitorias_academicas.listar_monitorias_academicas();
      // // console.log(response);
      if (response && Array.isArray(response)) {
        // Agrupar por id_monitor para mostrar solo una vez por usuario
        const groupedByMonitor = response.reduce((acc, monitoria) => {
          if (!acc[monitoria.id_monitor]) {
            acc[monitoria.id_monitor] = {
              ...monitoria,
              materias: [monitoria.materia],
              ids_monitorias: [monitoria.id],
            };
          } else {
            acc[monitoria.id_monitor].materias.push(monitoria.materia);
            acc[monitoria.id_monitor].ids_monitorias.push(monitoria.id);
          }
          return acc;
        }, {});
        const uniqueMonitors = Object.values(groupedByMonitor).map(
          (monitor) => ({
            ...monitor,
            materia: monitor.materias.join(", "),
          }),
        );
        setState({ ...state, data: uniqueMonitors, all_data_monitorias: response });
      }
    } catch (error) {
      console.error("Error al consultar usuarios con roles:", error);
    }
  };

  const consultaMonitoresAcademicos = async () => {
    try {
      const semestre = desencriptarInt(
        sessionStorage.getItem("id_semestre_actual"),
      );
      const response =
        await Read_monitores_academicos.listar_monitores_academicos();
      // console.log(response);
      if (response && Array.isArray(response)) {
        setState({ ...state, data_monitores_academicos: response });
      }
    } catch (error) {
      console.error("Error al consultar monitores academicos:", error);
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

  const handleRowClick = (row) => {
    setSelectedRows((prev) => {
      const exists = prev.find((r) => r.id === row.id);

      if (exists) {
        return prev.filter((r) => r.id !== row.id); // deselecciona
      } else {
        return [...prev, row]; // selecciona
      }
    });
  };

  const handleEdit = (monitoria) => {
    setSelectedMonitoria(monitoria);
    setShowEditModal(true);
    console.log("Monitor:", monitoria);
    const monitorias_monitor = state.all_data_monitorias.filter(
      (m) => m.id_monitor === monitoria.id_monitor,
    );
    setState((prevState) => ({
      ...prevState,
      // data_monitorias_monitor: monitorias_monitor, // dato completo
      data_monitorias_monitor: monitorias_monitor.map((m) => m.id), //solo IDs
    }));
  };

  const handleCreate = () => {
    setShowCreateModal(true);
    consultaMonitoresAcademicos();
    consultaAllSedes();
    setModalKey((prev) => prev + 1);
  };

  const reiniciarDataCreacionMonitoria = () => {
    setState((prevState) => ({
      ...prevState,
      data_creacion_monitoria: {
        id_monitor: null,
        nombre_monitor: null,
        materias: [],
        sede: null,
        semestre_actual: desencriptarInt(
          sessionStorage.getItem("id_semestre_actual"),
        ),
      },
      data_materias: [
        { id: 1, nombre_materia: "MATEMÁTICA FUNDAMENTAL" },
        { id: 2, nombre_materia: "CÁLCULO I" },
        { id: 3, nombre_materia: "CÁLCULO II" },
        { id: 4, nombre_materia: "CÁLCULO III" },
        { id: 5, nombre_materia: "ÁLGEBRA LINEAL" },
        { id: 6, nombre_materia: "ECUACIONES DIFERENCIALES" },
        { id: 7, nombre_materia: "CIRCUITOS ELÉCTRICOS" },
        { id: 8, nombre_materia: "SISTEMAS DIGITALES" },
        { id: 9, nombre_materia: "DISPOSITIVOS Y CIRCUITOS ELECTRÓNICOS" },
        { id: 10, nombre_materia: "CIRCUITOS INTEGRADOS" },
        { id: 11, nombre_materia: "SISTEMAS EMBEBIDOS" },
        { id: 12, nombre_materia: "SISTEMAS AUTOMÁTICOS DE CONTROL" },
        { id: 13, nombre_materia: "ELECTRÓNICA INDUSTRIAL" },
        { id: 14, nombre_materia: "AUTOMATIZACIÓN INDUSTRIAL" },
        { id: 15, nombre_materia: "CONTROLADORES LÓGICOS PROGRAMABLES" },
        { id: 16, nombre_materia: "LECTURA" },
        { id: 17, nombre_materia: "ESCRITURA" },
        { id: 18, nombre_materia: "CONTABILIDAD" },
        { id: 19, nombre_materia: "FÍSICA" },
        { id: 20, nombre_materia: "QUÍMICA" },
      ],
    }));
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reiniciarDataCreacionMonitoria();
  };

  const handleSaveCreate = async () => {
    try {
      console.log("Guardando nueva monitoria académica");
      console.log(state.data_creacion_monitoria);
      await Create_monitorias_academicas.crear_monitoria_academica(
        state.data_creacion_monitoria,
      )
        .then((response) => {
          if (response && response.status === 201) {
            Swal.fire({
              title: "Creado",
              text: "La monitoria académica ha sido creada.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // consultaAllUser();
            reiniciarDataCreacionMonitoria();
            setShowCreateModal(false);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (
            (response && response.status === 400) ||
            response.status === 404
          ) {
            Swal.fire({
              title: "Error",
              text:
                "No se pudo crear la monitoria académica. Por favor, inténtelo de nuevo más tarde." +
                (response?.data?.error ? ` Error: ${response.data.error}` : ""),
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error en la operación:", error);
          Swal.fire({
            title: "Error",
            text:
              "No se pudo crear la monitoria académica. Por favor, inténtelo de nuevo más tarde." +
              (error?.response?.data?.error
                ? ` Error: ${error.response.data.error}`
                : ""),
            icon: "error",
          });
        });
    } catch (error) {
      console.error("Error al guardar la nueva monitoria académica:", error);
    }
  };

  // const handleSaveEdit = async () => {
  //   try {
  //     console.log("Guardando cambios:");
  //     //   setShowEditModal(false);
  //     // Update_tratamientos.actualizar_tratamiento(selectedTratamiento);
  //     // consultaAllTratamientos();
  //   } catch (error) {
  //     console.error("Error al guardar los cambios:", error);
  //   }
  // };

  const handleDeleteMonitoria = (id_monitoria) => {
    // console.log(id_monitoria);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará la monitoria académica seleccionada. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("Desactivando monitoria académica...");
        // Llamado al service para desactivar monitoria académica
        Deactivate_monitorias_academicas.desactivar_monitorias({
          id_monitorias: [id_monitoria],
        }).then((response) => {
          if (response && response.status === 200) {
            Swal.fire({
              title: "Desactivado",
              text: "La monitoria académica ha sido desactivada.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setShowEditModal(false);
            consultaAllUser();
          } else {
            Swal.fire({
              title: "Error",
              text:
                "No se pudo desactivar la monitoria académica." +
                (response?.data?.error ? ` Error: ${response.data.error}` : ""),
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "La acción ha sido cancelada. La monitoria académica sigue activa.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Aquí se implementara la función para desactivar TODAS
  // las monitorias académicas del monitor seleccionado desde el modal

  const handleDeactivateSelectedMonitorias = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará las monitorias académicas seleccionadas. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const idsToDeactivate = selectedRows.flatMap(
          (row) => row.ids_monitorias,
        );
        Deactivate_monitorias_academicas.desactivar_monitorias({
          id_monitorias: idsToDeactivate,
        }).then((response) => {
          if (response && response.status === 200) {
            Swal.fire({
              title: "Desactivado",
              text: "Las monitorias académicas seleccionadas han sido desactivadas.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            consultaAllUser();
            setSelectedRows([]);
          } else {
            Swal.fire({
              title: "Error",
              text:
                "No se pudieron desactivar las monitorias académicas." +
                (response?.data?.error ? ` Error: ${response.data.error}` : ""),
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "La acción ha sido cancelada. Las monitorias académicas siguen activas.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSelectedRows = (_this_state) => {
    // console.log("Filas seleccionadas:", _this_state.selectedRows);
    setSelectedRows(_this_state.selectedRows);

    if (_this_state.allSelected) {
      // console.log("TODO");
      setState((prevState) => ({
        ...prevState,
        data_monitorias_monitor: selectedRows
          ? _this_state.selectedRows.map((row) => row.id)
          : [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        data_monitorias_monitor: [],
      }));
    }
  };

  const handleAgregarMateria = () => {
    if (!nuevaMateria.trim()) return;

    setState((prev) => ({
      ...prev,
      data_creacion_monitoria: {
        ...prev.data_creacion_monitoria,
        materias: [...prev.data_creacion_monitoria.materias, nuevaMateria],
      },
    }));

    // limpiar y ocultar input
    setNuevaMateria("");
    setMostrarInputMateria(false);
  };

  useEffect(() => {
    consultaAllUser();
  }, []);
  return (
    // TABLA DE USUARIOS
    <Container>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllUser}>
            {<span style={{ color: "black" }}>Monitorias Academicas</span>}
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data}
              export={false}
              print={false}
              filterPlaceholder="Buscar usuarios..."
            >
              <DataTable
                title="Monitorias Académicas"
                noDataComponent={
                  state.data.length === undefined
                    ? "Cargando Información."
                    : state?.data?.length === 0
                      ? "No se encontraron monitorias académicas."
                      : "Cargando Información."
                }
                pagination
                selectableRows
                onSelectedRowsChange={handleSelectedRows}
                striped
                pointerOnHover
                highlightOnHover
              />
            </DataTableExtensions>

            {/* Botones Inferiores */}
            <Row sm={4}>
              <Col>
                <Button variant="primary" onClick={() => handleCreate()}>
                  Crear Monitoria Académica
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  disabled={selectedRows.length === 0}
                  onClick={() => handleDeactivateSelectedMonitorias()}
                >
                  Desactivar monitorias académicas seleccionadas
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal Edición */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Monitorias académicas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              key={selectedMonitoria?.id_monitor}
              className="border rounded p-3 mb-4 bg-light"
            >
              <h5>Información del Monitor Académico</h5>
              <Row>
                <Col sm={4}>
                  <strong>Nombre:</strong>{" "}
                  {selectedMonitoria
                    ? `${selectedMonitoria.nombre_monitor}`
                    : ""}
                </Col>
                <Col sm={5}>
                  <strong>Correo:</strong>{" "}
                  {selectedMonitoria
                    ? `${selectedMonitoria.correo_monitor}`
                    : ""}
                </Col>
                <Col sm={3}>
                  <strong>Sede:</strong>{" "}
                  {selectedMonitoria ? `${selectedMonitoria.nombre_sede}` : ""}
                </Col>
              </Row>
            </div>
            <Row style={{ margin: 3 }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Materia</th>
                    <th>Semestre</th>
                    <th>Estado Monitoria</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {state.all_data_monitorias
                    .filter(
                      (m) => m.id_monitor === selectedMonitoria?.id_monitor,
                    )
                    ?.slice()
                    .sort((a, b) => a.id - b.id)
                    .map((monitoria) => (
                      <tr key={monitoria.id}>
                        <td>{monitoria.id}</td>
                        <td>{monitoria.materia}</td>
                        <td>{monitoria.nombre_semestre}</td>
                        <td>{monitoria.estado}</td>
                        <td>
                          {" "}
                          <div
                            style={{
                              width: "2.5rem",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleDeleteMonitoria(monitoria.id);
                              }}
                              style={{
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              <FaDeleteLeft />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col sm={4}>
                <Button
                  variant="warning"
                  onClick={() => handleDeactivateSelectedMonitorias()}
                >
                  Desactivar Monitorias
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          {/* <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button> */}
        </Modal.Footer>
      </Modal>

      {/* Modal creación de monitoria */}
      <Modal
        key={modalKey}
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        size="xl"
        style={{}}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Monitoria Académica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createId">
              <Row sm={12} className="align-items-center">
                <Col sm={4}>Monitores Académicos</Col>
                <Col sm={4}>Materias</Col>
                <Col sm={2}>{"  "}</Col>
                <Col sm={2}>Sede </Col>
              </Row>
              <Row sm={12} className="align-items-center">
                <Col sm={4}>
                  <Select
                    class="form-control"
                    options={state.data_monitores_academicos.map((monitor) => ({
                      value: monitor.id_usuario,
                      label: monitor.nombre_monitor,
                    }))}
                    onChange={(e) => {
                      // // console.log(e);
                      // // console.log(state.data_monitores_academicos);
                      const monitorSeleccionado =
                        state.data_monitores_academicos.find(
                          (m) => m.id_usuario === e.value,
                        );
                      // console.log("Monitor Seleccionado:", monitorSeleccionado);
                      setState((prevState) => ({
                        ...prevState,
                        data_creacion_monitoria: {
                          ...prevState.data_creacion_monitoria,
                          id_monitor: monitorSeleccionado.id_usuario,
                          nombre_monitor: monitorSeleccionado.nombre_monitor,
                        },
                      }));
                    }}
                  ></Select>
                </Col>
                <Col sm={3}>
                  <Select
                    class="form-control"
                    options={state.data_materias.map((materia) => ({
                      value: materia.nombre_materia,
                      label: materia.nombre_materia,
                    }))}
                    onChange={(e) => {
                      const materiaSeleccionada = state.data_materias.find(
                        (m) => m.nombre_materia === e.value,
                      );
                      setState((prevState) => ({
                        ...prevState,
                        data_creacion_monitoria: {
                          ...prevState.data_creacion_monitoria,
                          materias: [
                            ...prevState.data_creacion_monitoria.materias,
                            materiaSeleccionada.nombre_materia,
                          ],
                        },
                      }));

                      // Remover materia del select para evitar duplicados
                      setState((prevState) => ({
                        ...prevState,
                        data_materias: prevState.data_materias.filter(
                          (m) => m.nombre_materia !== e.value,
                        ),
                      }));
                    }}
                  ></Select>
                </Col>
                <Col sm={3}>
                  {!mostrarInputMateria ? (
                    <Button
                      variant="primary"
                      onClick={() => setMostrarInputMateria(true)}
                    >
                      Otro...
                    </Button>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la materia"
                        value={nuevaMateria}
                        onChange={(e) => setNuevaMateria(e.target.value)}
                      />

                      <IoAddCircleOutline
                        size={36}
                        style={{ cursor: "pointer" }}
                        onClick={handleAgregarMateria}
                      />
                    </div>
                  )}
                </Col>
                <Col sm={2}>
                  <Select
                    class="form-control"
                    options={state.data_sedes.map((sede) => ({
                      value: sede.nombre,
                      label: sede.nombre,
                    }))}
                    onChange={(e) => {
                      const sedeSeleccionada = state.data_sedes.find(
                        (s) => s.nombre === e.value,
                      );
                      setState((prevState) => ({
                        ...prevState,
                        data_creacion_monitoria: {
                          ...prevState.data_creacion_monitoria,
                          sede: sedeSeleccionada.id,
                        },
                      }));
                    }}
                  ></Select>
                </Col>
              </Row>
              <Row
                sm={12}
                className="align-items-center"
                style={{ margin: 10 }}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Nombre Monitor</th>
                      <th style={{ width: "40%" }}>Materias</th>
                      <th style={{ width: "20%" }}>Sede</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state?.data_creacion_monitoria?.nombre_monitor
                          ? state.data_creacion_monitoria.nombre_monitor
                          : "No se ha seleccionado un monitor académico."}
                      </td>
                      <td>
                        {state?.data_creacion_monitoria?.materias.length > 0
                          ? state.data_creacion_monitoria.materias.join(", ")
                          : "No se han seleccionado materias."}
                      </td>
                      <td>
                        {state?.data_creacion_monitoria?.sede
                          ? state.data_sedes.find(
                              (s) =>
                                s.id === state.data_creacion_monitoria.sede,
                            )?.nombre
                          : "No se ha seleccionado una sede."}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveCreate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorMonitoriasAcademicas;
