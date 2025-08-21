/**
 * @file acordeon_permisos.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los permsisos.
 */
import React, { useState, useEffect } from "react";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { FaEdit } from "react-icons/fa";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

import Read_programas from "../../service/panel_admin/panel_admin_programas_listar_programas.js";
import Update_programas from "../../service/panel_admin/panel_admin_programas_actualizar_programas.js";

import Read_facultades from "../../service/panel_admin/panel_admin_facultades_listar_facultades.js";
import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";

const SelectorProgramas = () => {
  const [state, setState] = useState({
    data_programas: [],
    data_facultades: [],
    data_sedes: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPrograma, setSelectedPrograma] = useState(null);

  const consultaAllProgramas = async () => {
    try {
      const response = await Read_programas.listar_programas({});

      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_programas: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar programas:", error);
    }
  };

  const consultaAllFacultades = async () => {
    try {
      const response = await Read_facultades.listar_facultades({});

      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_facultades: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar facultades:", error);
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
    consultaAllProgramas();
    consultaAllFacultades();
    consultaAllSedes();
  }, []);

  const handleRowSelected = ({ selectedRows }) => setSelectedRows(selectedRows);

  const handleEdit = (programa) => {
    setSelectedPrograma(programa);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedPrograma((prevPrograma) => ({
      ...prevPrograma,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    console.log("Guardando programa editado:", selectedPrograma);
    Update_programas.actualizar_programa(selectedPrograma);
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
      name: "SNIES",
      selector: (row) => row.codigo_snies,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "CÓDIGO",
      selector: (row) => row.codigo_univalle,
      sortable: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "NOMBRES",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
      grow: 0.9,
    },
    {
      name: "JORNADA",
      selector: (row) => row.jornada,
      sortable: true,
      wrap: true,
      grow: 0.6,
    },
    {
      name: "FACULTAD",
      selector: (row) => row.nombre_facultad,
      sortable: true,
      wrap: true,
      grow: 0.9,
    },
    {
      name: "SEDE",
      selector: (row) => row.nombre_sede,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "MUNICIPIO",
      selector: (row) => row.municipio_sede,
      sortable: true,
      wrap: true,
      grow: 0.5,
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
          <Accordion.Header onClick={consultaAllProgramas}>
            Programas
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_programas}
              export={false}
              print={false}
              filterPlaceholder="Buscar programas..."
            >
              <DataTable
                title="Programas"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                striped
              />
            </DataTableExtensions>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Programa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editCodigoSNIES">
              <Form.Label>Código SNIES</Form.Label>
              <Form.Control
                type="text"
                name="codigo_snies"
                value={selectedPrograma?.codigo_snies || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editCodigoUnivalle">
              <Form.Label>Código Univalle</Form.Label>
              <Form.Control
                type="text"
                name="codigo_univalle"
                value={selectedPrograma?.codigo_univalle || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedPrograma?.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editJornada">
              <Form.Label>Jornada</Form.Label>
              <Form.Control
                type="text"
                name="jornada"
                value={selectedPrograma?.jornada || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editSede">
              <Form.Label>Sede</Form.Label>
              <Form.Select
                name="id_sede"
                value={selectedPrograma?.id_sede || ""}
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
            <Form.Group controlId="editFacultad">
              <Form.Label>Facultad</Form.Label>
              <Form.Select
                name="id_facultad"
                value={selectedPrograma?.id_facultad || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccionar Facultad</option>
                {state?.data_facultades?.map((facultad) => (
                  <option key={facultad.id} value={facultad.id}>
                    {facultad.nombre}
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
    </Container>
  );
};

export default SelectorProgramas;
