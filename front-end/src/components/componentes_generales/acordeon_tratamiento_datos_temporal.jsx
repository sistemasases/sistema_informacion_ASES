/**
 * @file acordeon_tratamiento_datos_temporal.jsx
 * @version 1.0.0
 * @description rendizar los tratamientos de datos temporales de los estudiantes.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 12 de Diciembre del 2025
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
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";

import Read_tratamientos_temporales from "../../service/panel_admin/panel_admin_firma_tratamiento_datos_temporales_listar_tratamientos_temporales.js";
import Update_tratamientos from "../../service/panel_admin/panel_admin_firma_tratamiento_datos_temporales_actualizar_tratamientos_temporales.js";

const SelectorTratamientoTemporal = () => {
  const [state, setState] = useState({
    data_tratamientos: [],
  });
  const [selectedTratamiento, setSelectedTratamiento] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const consultaAllTratamientosTemporales = async () => {
    try {
      const response =
        await Read_tratamientos_temporales.listar_tratamientosTemporales({});
      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_tratamientos: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar tratamientos:", error);
    }
  };

  useEffect(() => {
    consultaAllTratamientosTemporales();
  }, []);

  const handleEdit = (tratamiento) => {
    setSelectedTratamiento(tratamiento);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, checked } = e.target;
    setSelectedTratamiento((prevTratamiento) => ({
      ...prevTratamiento,
      [name]: checked,
    }));
  };

  const handleUpdateData = async () => {
    try {
      //   console.log("Guardando cambios:", selectedTratamiento);
      //   setShowEditModal(false);
      Update_tratamientos.actualizar_tratamientos_temporales();
      setTimeout(() => {
        consultaAllTratamientosTemporales();
      }, 1000);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const columnas = [
    {
      name: "NOMBRE",
      selector: (row) => row?.nombre_firma,
      sortable: false,
      wrap: true,
      grow: 1.2,
    },
    {
      name: "NÚMERO DE DOCUMENTO",
      selector: (row) => row?.num_doc,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "FECHA DE FIRMA",
      selector: (row) => row?.fecha_firma,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "AUTORIZA TRATAMIENTO DATOS",
      selector: (row) => (row?.autoriza_tratamiento_datos ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "AUTORIZA TRATAIENTO IMAGEN",
      selector: (row) => (row?.autoriza_tratamiento_imagen ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    // {
    //   name: "EDITAR",
    //   cell: (row) => (
    //     <Button variant="warning" onClick={() => handleEdit(row)}>
    //       <FaEdit />
    //     </Button>
    //   ),
    // },
  ];

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllTratamientosTemporales}>
            Tratamiento de Datos Temporales
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_tratamientos}
              export={false}
              print={false}
              filterPlaceholder="Buscar firma de estudiante..."
            >
              <DataTable
                title="Tratamiento de Datos de Estudiantes"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            <hr />
            <Button variant="primary" onClick={(e) => handleUpdateData()}>
              Verificar Consentimientos
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tratamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editId">
              <Row sm={12} className="align-items-center">
                <Col>
                  <Form.Label>Autoriza Tratamiento de Datos</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Check
                    type="checkbox"
                    name="autoriza_tratamiento_datos"
                    checked={
                      selectedTratamiento?.autoriza_tratamiento_datos || false
                    }
                    onChange={handleEditChange}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="editNombre">
              <Row sm={12} className="align-items-center">
                <Col>
                  <Form.Label>Autoriza Tratamiento de Imagen</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Check
                    type="checkbox"
                    name="autoriza_tratamiento_imagen"
                    checked={
                      selectedTratamiento?.autoriza_tratamiento_imagen || false
                    }
                    onChange={handleEditChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={console.log("e")}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default SelectorTratamientoTemporal;
