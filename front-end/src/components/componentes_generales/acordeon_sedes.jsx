/**
 * @file acordeon_sedes.jsx
 * @version 1.0.0
 * @description info de rendizar las sedes.
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
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { FaEdit } from "react-icons/fa";

import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";
import Read_municipios from "../../service/panel_admin/panel_admin_sedes_listar_sedes";
import Update_sedes from "../../service/panel_admin/panel_admin_sedes_actualizar_sede.js";
import Create_sedes from "../../service/panel_admin/panel_admin_sedes_crear_sede.js";

const SelectorSedes = () => {
  const [state, setState] = useState({
    data_sedes: [],
    municipios: [], // Nueva lista para los municipios
  });
  const [selectedSede, setSelectedSede] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSede, setNewSede] = useState({
    id: "",
    codigo_univalle: "",
    nombre: "",
    municipio: "",
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllSedes = async () => {
    try {
      // const response = await all_sede_service.all_sede();
      const response = await Read_sedes.listar_sedes({});
      if (response && Array.isArray(response)) {
        setState((prevState) => ({ ...prevState, data_sedes: response }));
      }
    } catch (error) {
      console.error("Error al consultar sedes:", error);
    }
  };

  const consultaMunicipios = async () => {
    try {
      // Reemplazar con el servicio o lista de municipios
      const response = await Read_municipios.listar_municipios({});
      if (response && Array.isArray(response)) {
        // console.log(response);
        setState((prevState) => ({ ...prevState, municipios: response }));
      }
    } catch (error) {
      console.error("Error al consultar municipios:", error);
    }
  };

  useEffect(() => {
    consultaAllSedes();
    consultaMunicipios();
  }, []);

  const handleEdit = (sede) => {
    setSelectedSede(sede);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setSelectedSede((prevSede) => ({
      ...prevSede,
      [name]: value,
    }));
    if (name === "municipio") {
      setSelectedSede((prevSede) => ({
        ...prevSede,
        id_municipio: parseInt(e?.target?.selectedOptions[0]?.id), // Actualizar el id del municipio
      }));
    }
  };

  const handleSaveEdit = async () => {
    try {
      // console.log("Guardando cambios:", selectedSede);

      Update_sedes.actualizar_sede(selectedSede);
      setShowEditModal(false);
      consultaAllSedes();
      setSelectedSede({}); // Limpiar la sede seleccionada después de guardar
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewSede((prevSede) => ({
      ...prevSede,
      [name]: value,
    }));
    if (name === "municipio") {
      setNewSede((prevSede) => ({
        ...prevSede,
        id_municipio_id: parseInt(e?.target?.selectedOptions[0]?.id), // Actualizar el id del municipio
      }));
    }
  };

  const handleCreateSede = async () => {
    try {
      // console.log("Creando nueva sede:", newSede);
      Create_sedes.crear_sede(newSede);
      // setShowCreateModal(false);
      // consultaAllSedes();
    } catch (error) {
      console.error("Error al crear sede:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Eliminando sedes seleccionadas");
      consultaAllSedes();
    } catch (error) {
      console.error("Error al eliminar sedes:", error);
    }
  };

  const columnas = [
    {
      name: "CÓDIGO UNIVALLE",
      selector: (row) => row.codigo_univalle,
      sortable: true,
    },
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: false },
    { name: "MUNICIPIO", selector: (row) => row.municipio, sortable: false },
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
          <Accordion.Header onClick={consultaAllSedes}>Sedes</Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions columns={columnas} data={state.data_sedes}>
              <DataTable
                title="Sedes"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={handleShowCreateModal}>
                  Crear Sede
                </Button>
              </Col>
              {/* <Col>
                <Button variant="danger" onClick={handleDelete} hidden={true}>
                  Eliminar Sedes
                </Button>
              </Col> */}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal para editar sede */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sede</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editCodigoUnivalle">
              <Form.Label>Código Univalle</Form.Label>
              <Form.Control
                type="text"
                name="codigo_univalle"
                value={selectedSede?.codigo_univalle}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedSede?.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editMunicipio">
              <Form.Label>Municipio</Form.Label>
              <Form.Select
                name="municipio" // debe coincidir con la clave que actualizas en el estado
                value={selectedSede?.municipio || ""}
                onChange={handleEditChange}
              >
                <option value="">Seleccione un municipio</option>
                {state.municipios.map((mun) => (
                  <option key={mun.id} id={mun.id} value={mun.nombre}>
                    {mun.nombre}
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

      {/* Modal para crear sede */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Sede</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createCodigoUnivalle">
              <Form.Label>Código Univalle</Form.Label>
              <Form.Control
                type="text"
                name="codigo_univalle"
                value={newSede.codigo_univalle}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newSede.nombre}
                onChange={handleCreateChange}
              />
            </Form.Group>
            <Form.Group controlId="createMunicipio">
              <Form.Label>Municipio</Form.Label>
              <Form.Select
                name="municipio"
                value={newSede.municipio}
                onChange={handleCreateChange}
              >
                <option value="">Seleccione un municipio</option>
                {state.municipios.map((mun) => (
                  <option key={mun.id} id={mun.id} value={mun.nombre}>
                    {mun.nombre}
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
          <Button variant="primary" onClick={handleCreateSede}>
            Crear Sede
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SelectorSedes;
