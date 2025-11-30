import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import ModalSeguimientos from "./modalSeguimientos";
import Select from "react-select";
import axios from "axios";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const ModalEstudiantes = ({
  isModalOpen,
  closeModal,
  selectedUser,
  diversidadInfo,
  academicoInfo,
  generalInfo,
  documentosInfo,
  seguimientosInfo,
  currentPage,
  prevPage,
  nextPage,
  handleFormSubmit,
  handleInputChange,
  editableUser,
  setEditableUser,
  handleCheckboxChange,
  razasOptions,
  handleSelectChange,
  isEditing,
  setIsEditing,
  pronombresOptions,
  expresionesOptions,
  orientacionOptions,
  identidadesGeneroOptions,
  documentoOptions,
  estamentoOptions,
  handleDelete,
  factoresOptions,
  fuentesOptions,
  redesOptions,
  Usuariorevisado,
  handleSelectChange3,
  tipoDocumentoOptions,
  setSeguimientosInfo,
  sedeOptions,
  programaOptions,
  regimenEpsOptions,
  decisionEncuentroInicialOptions,
  estadocivilOptions,
  zonaResidencialOptions,
  identidadEtnicoRacialOptions,
  apgarpregunta1Options,
  apgarpregunta2Options,
  apgarpregunta3Options,
  apgarpregunta4Options,
  apgarpregunta5Options,
  apgarpregunta6Options,
  apgarpregunta7Options,
  sexoAsignadoOptions,
}) => {
  const titles = [
    "Datos Básicos",
    "Información de Diversidad Sexual",
    "Información General ",
    "Observaciones",
    "Información Académica",
    "Documentos Autorización",
    "Dinámica Familiar - APGAR",
    "Seguimientos",
  ];
  const [isSeguimientoModalOpen, setSeguimientoModalOpen] = useState(false);

  // Estados para los modales
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  // Funciones para manejar los modales
  const handleOpenFirstModal = () => setShowFirstModal(true);
  const handleCloseFirstModal = () => setShowFirstModal(false);

  const handleOpenSecondModal = () => {
    setShowFirstModal(false); // Cerrar el primer modal
    setShowSecondModal(true); // Abrir el segundo modal
  };
  const handleCloseSecondModal = () => setShowSecondModal(false);

  const handleFinalDelete = () => {
    handleDelete(selectedUser.numero_documento); // Llamar a la función de eliminación
    handleCloseSecondModal(); // Cerrar el segundo modal después de la eliminación
  };

  const handleCancel = () => {
    setEditableUser({ selectedUser });
    console.log(selectedUser, "selected despues de cancelar");

    console.log(editableUser, "editable despues de cancelar");
    setIsEditing(false);
  };

  const openSeguimientoModal = () => {
    setSeguimientoModalOpen(true);
  };

  const closeSeguimientoModal = () => {
    setSeguimientoModalOpen(false);
  };

  return (
    <>
      <Modal
        className="registro-estudiante-form-modal-consulta"
        show={isModalOpen}
        onHide={closeModal}
        size="lg"
      >
        <Modal.Header className="custom-modal-header d-flex justify-content-between align-items-start">
          {isEditing ? (
            <></>
          ) : (
            <div className="d-flex gap-2 flex-grow-0 flex-shrink-0">
              <Button
                className="btn-action btn-follow"
                onClick={openSeguimientoModal}
              >
                <EventNoteIcon />
                Registrar
              </Button>
              <Button
                className="btn-action btn-edit"
                onClick={() => setIsEditing(true)}
                disabled={currentPage === 6 || currentPage === 7}
              >
                <EditIcon /> Editar
              </Button>
            </div>
          )}
          <div className="flex-grow-1 text-center text-truncate mx-2">
            {" "}
            {/* mx-2 añade un poco de margen horizontal para separación */}
            <Modal.Title className="h3">{titles[currentPage]}</Modal.Title>{" "}
            {/* h5 y mb-0 para estilos de título de Bootstrap sin margen inferior */}
          </div>
          <Button
            className="btn-action boton-cerrar ms-auto"
            onClick={closeModal}
          >
            <CloseIcon /> Cerrar
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {currentPage === 0 && selectedUser && diversidadInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Nombre y apellido: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="nombre_y_apellido"
                            className="input-updated"
                            value={
                              editableUser.nombre_y_apellido !== undefined
                                ? editableUser.nombre_y_apellido
                                : selectedUser.nombre_y_apellido || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.nombre_y_apellido
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Nombre identitario: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="nombre_identitario"
                            className="input-updated"
                            value={
                              editableUser.nombre_identitario !== undefined
                                ? editableUser.nombre_identitario
                                : selectedUser.nombre_identitario || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.nombre_identitario
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Pronombres: </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione pronombres"
                            className="create-select"
                            name="pronombres"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={pronombresOptions.filter(
                              (option) =>
                                !(
                                  editableUser.pronombres ||
                                  diversidadInfo.pronombres
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.pronombres ||
                              diversidadInfo.pronombres ||
                              []
                            ).map((value) => {
                              const foundOption = pronombresOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          diversidadInfo.pronombres.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Tipo de documento: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            name="tipo_documento"
                            placeholder="Seleccione su documento"
                            options={tipoDocumentoOptions}
                            value={tipoDocumentoOptions.find(
                              (option) =>
                                option.value === editableUser.tipo_documento
                            )}
                            onChange={handleSelectChange3}
                            isOptionDisabled={(option) =>
                              option.value === editableUser.tipo_documento
                            } // Deshabilita la opción ya seleccionada
                          />
                        ) : selectedUser.tipo_documento &&
                          selectedUser.tipo_documento.length ? (
                          selectedUser.tipo_documento.join(", ")
                        ) : (
                          "No especificado"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Identificación:</b> {selectedUser.numero_documento}
                      </div>

                      <div className="div-modal">
                        <b>Email: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="email"
                            value={
                              editableUser.email !== undefined
                                ? editableUser.email
                                : selectedUser.email || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.email
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Teléfono: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="telefono"
                            className="input-updated"
                            value={
                              editableUser.telefono !== undefined
                                ? editableUser.telefono
                                : selectedUser.telefono || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.telefono
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Estado Civil: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            placeholder="Seleccione identidad étnico racial"
                            name="estado_civil"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={estadocivilOptions.filter(
                              (option) =>
                                !(
                                  editableUser.estado_civil ||
                                  selectedUser.estado_civil ||
                                  []
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.estado_civil ||
                              selectedUser.estado_civil ||
                              []
                            ).map((value) => {
                              const foundOption = estadocivilOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          selectedUser.estado_civil.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Identidad étnico racial: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            placeholder="Seleccione identidad étnico racial"
                            name="identidad_etnico_racial"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={identidadEtnicoRacialOptions}
                            // Opciones seleccionadas
                            value={(
                              editableUser.identidad_etnico_racial ||
                              selectedUser.identidad_etnico_racial ||
                              []
                            ).map((value) => {
                              const foundOption =
                                identidadEtnicoRacialOptions.find(
                                  (o) => o.value === value
                                );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                            isOptionDisabled={(option) =>
                              option.value ===
                              editableUser.identidad_etnico_racial
                            }
                          />
                        ) : (
                          selectedUser.identidad_etnico_racial.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Pertenencia grupo poblacional: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            placeholder="Seleccione grupo poblacional"
                            name="pertenencia_grupo_poblacional"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={razasOptions.filter(
                              (option) =>
                                !(
                                  editableUser.pertenencia_grupo_poblacional ||
                                  selectedUser.pertenencia_grupo_poblacional ||
                                  []
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.pertenencia_grupo_poblacional ||
                              selectedUser.pertenencia_grupo_poblacional ||
                              []
                            ).map((value) => {
                              const foundOption = razasOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange}
                          />
                        ) : (
                          selectedUser.pertenencia_grupo_poblacional.join(", ")
                        )}
                      </div>
                    </Col>

                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Fecha de nacimiento "Año/Mes/Día": </b>
                        {isEditing ? (
                          <input
                            type="date"
                            name="fecha_nacimiento"
                            className="input-updated"
                            value={
                              editableUser.fecha_nacimiento !== undefined
                                ? editableUser.fecha_nacimiento
                                : selectedUser.fecha_nacimiento || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.fecha_nacimiento
                        )}
                      </div>

                      <div className="div-modal">
                        <b>País de nacimiento: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="pais_nacimiento"
                            className="input-updated"
                            value={
                              editableUser.pais_nacimiento !== undefined
                                ? editableUser.pais_nacimiento
                                : selectedUser.pais_nacimiento || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.pais_nacimiento
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Departamento de nacimiento: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="departamento_nacimiento"
                            className="input-updated"
                            value={
                              editableUser.departamento_nacimiento !== undefined
                                ? editableUser.departamento_nacimiento
                                : selectedUser.departamento_nacimiento || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.departamento_nacimiento
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Ciudad de nacimiento: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="ciudad_nacimiento"
                            className="input-updated"
                            value={
                              editableUser.ciudad_nacimiento !== undefined
                                ? editableUser.ciudad_nacimiento
                                : selectedUser.ciudad_nacimiento || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.ciudad_nacimiento
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Corregimiento de nacimiento: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="corregimiento_nacimiento"
                            className="input-updated"
                            value={
                              editableUser.corregimiento_nacimiento !==
                              undefined
                                ? editableUser.corregimiento_nacimiento
                                : selectedUser.corregimiento_nacimiento || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.corregimiento_nacimiento
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Ciudad de residencia: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="ciudad_residencia"
                            className="input-updated"
                            value={
                              editableUser.ciudad_residencia !== undefined
                                ? editableUser.ciudad_residencia
                                : selectedUser.ciudad_residencia || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.ciudad_residencia
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Zona de residencia: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            placeholder="Seleccione la residencia"
                            name="zona_residencia"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={zonaResidencialOptions.filter(
                              (option) =>
                                !(
                                  editableUser.zona_residencia ||
                                  selectedUser.zona_residencia ||
                                  []
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.zona_residencia ||
                              selectedUser.zona_residencia ||
                              []
                            ).map((value) => {
                              const foundOption = zonaResidencialOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          selectedUser.zona_residencia.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Dirección de residencia: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="direccion_residencia"
                            className="input-updated"
                            value={
                              editableUser.direccion_residencia !== undefined
                                ? editableUser.direccion_residencia
                                : selectedUser.direccion_residencia || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.direccion_residencia
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Barrio: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="barrio_residencia"
                            className="input-updated"
                            value={
                              editableUser.barrio_residencia !== undefined
                                ? editableUser.barrio_residencia
                                : selectedUser.barrio_residencia || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.barrio_residencia
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Estrato socioeconómico: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="estrato_socioeconomico"
                            className="input-updated"
                            value={
                              editableUser.estrato_socioeconomico !== undefined
                                ? editableUser.estrato_socioeconomico
                                : selectedUser.estrato_socioeconomico || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.estrato_socioeconomico
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Nombre persona de confianza: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="nombre_persona_de_confianza"
                            className="input-updated"
                            value={
                              editableUser.nombre_persona_de_confianza !==
                              undefined
                                ? editableUser.nombre_persona_de_confianza
                                : selectedUser.nombre_persona_de_confianza || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.nombre_persona_de_confianza
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Relación persona de confianza: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="relacion_persona_de_confianza"
                            className="input-updated"
                            value={
                              editableUser.relacion_persona_de_confianza !==
                              undefined
                                ? editableUser.relacion_persona_de_confianza
                                : selectedUser.relacion_persona_de_confianza ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.relacion_persona_de_confianza
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Teléfono persona de confianza: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="telefono_persona_de_confianza"
                            className="input-updated"
                            value={
                              editableUser.telefono_persona_de_confianza !==
                              undefined
                                ? editableUser.telefono_persona_de_confianza
                                : selectedUser.telefono_persona_de_confianza ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.telefono_persona_de_confianza
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {currentPage === 1 && selectedUser && diversidadInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Sexo asignado al nacer: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            name="sexo_asignado"
                            placeholder="Seleccione el sexo asignado al nacer"
                            options={sexoAsignadoOptions.filter(
                              (option) =>
                                !(
                                  editableUser.sexo_asignado ||
                                  selectedUser.sexo_asignado
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.sexo_asignado ||
                              selectedUser.sexo_asignado ||
                              []
                            ).map((value) => {
                              const foundOption = sexoAsignadoOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : selectedUser.sexo_asignado &&
                          selectedUser.sexo_asignado.length ? (
                          selectedUser.sexo_asignado.join(", ")
                        ) : (
                          "No especificado"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Expresiones de genero: </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="expresiones_de_genero"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={expresionesOptions.filter(
                              (option) =>
                                !(
                                  editableUser.expresiones_de_genero ||
                                  diversidadInfo.expresiones_de_genero
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.expresiones_de_genero ||
                              diversidadInfo.expresiones_de_genero ||
                              []
                            ).map((value) => {
                              const foundOption = expresionesOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          diversidadInfo.expresiones_de_genero.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Orientaciones sexuales: </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="orientaciones_sexuales"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={orientacionOptions.filter(
                              (option) =>
                                !(
                                  editableUser.orientaciones_sexuales ||
                                  diversidadInfo.orientaciones_sexuales
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.orientaciones_sexuales ||
                              diversidadInfo.orientaciones_sexuales ||
                              []
                            ).map((value) => {
                              const foundOption = orientacionOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          diversidadInfo.orientaciones_sexuales.join(", ")
                        )}
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Repuestas cambio de documento: </b>
                        {isEditing ? (
                          <Select
                            isMulti
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="respuestas_cambio_documento"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={documentoOptions.filter(
                              (option) =>
                                !(
                                  editableUser.respuestas_cambio_documento ||
                                  diversidadInfo.respuestas_cambio_documento
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.respuestas_cambio_documento ||
                              diversidadInfo.respuestas_cambio_documento ||
                              []
                            ).map((value) => {
                              const foundOption = documentoOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange}
                          />
                        ) : (
                          diversidadInfo.respuestas_cambio_documento.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Identidades de genero: </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="identidades_de_genero"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={identidadesGeneroOptions.filter(
                              (option) =>
                                !(
                                  editableUser.identidades_de_genero ||
                                  diversidadInfo.identidades_de_genero
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.identidades_de_genero ||
                              diversidadInfo.identidades_de_genero ||
                              []
                            ).map((value) => {
                              const foundOption = identidadesGeneroOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          diversidadInfo.identidades_de_genero.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Recibir orientacion en cambio de documento: </b>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name="recibir_orientacion_cambio_en_documento"
                            checked={
                              editableUser.recibir_orientacion_cambio_en_documento ??
                              diversidadInfo.recibir_orientacion_cambio_en_documento
                            }
                            onChange={handleCheckboxChange}
                          />
                        ) : diversidadInfo.recibir_orientacion_cambio_en_documento ? (
                          "Sí"
                        ) : (
                          "No"
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {currentPage === 2 && generalInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>¿Tiene EPS?: </b>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name="tiene_eps"
                            className="input-updated"
                            checked={
                              editableUser.tiene_eps ?? generalInfo.tiene_eps
                            }
                            onChange={handleCheckboxChange}
                          />
                        ) : generalInfo.tiene_eps ? (
                          "Sí"
                        ) : (
                          "No"
                        )}
                      </div>

                      <div className="div-modal">
                        {/* Cambia dinamicamente el label, dependiendo de si la persona tiene o no EPS */}
                        <b>
                          {editableUser.tiene_eps ?? generalInfo.tiene_eps
                            ? "Nombre de la EPS: "
                            : "¿Por qué no tiene EPS?: "}
                        </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="nombre_eps"
                            className="input-updated"
                            value={
                              editableUser.nombre_eps !== undefined
                                ? editableUser.nombre_eps
                                : generalInfo.nombre_eps || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.nombre_eps || "No registrado"
                        )}
                      </div>

                      <div className="div-modal">
                        {/* Cambia dinamicamente el label, dependiendo de si la persona tiene o no EPS */}
                        <b>
                          {editableUser.tiene_eps ?? generalInfo.tiene_eps
                            ? "Régimen EPS: "
                            : "Régimen EPS (si no cuenta con EPS dejar vacio o marcar 'No lo sé'): "}
                        </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione regimen"
                            className="create-select"
                            name="regimen_eps"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={regimenEpsOptions.filter(
                              (option) =>
                                !(
                                  editableUser.regimen_eps ||
                                  generalInfo.regimen_eps
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.regimen_eps ||
                              generalInfo.regimen_eps ||
                              []
                            ).map((value) => {
                              const foundOption = regimenEpsOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : generalInfo.regimen_eps &&
                          generalInfo.regimen_eps.length ? (
                          generalInfo.regimen_eps.join(", ")
                        ) : (
                          "No especificado/No presenta EPS"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Ocupaciones actuales: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="Ocupaciones_actules"
                            value={
                              editableUser.Ocupaciones_actules !== undefined
                                ? editableUser.Ocupaciones_actules
                                : generalInfo.Ocupaciones_actules || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.Ocupaciones_actules
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Actividades específicas en tiempo libre: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="actividades_especificas_tiempo_libre"
                            value={
                              editableUser.actividades_especificas_tiempo_libre !==
                              undefined
                                ? editableUser.actividades_especificas_tiempo_libre
                                : generalInfo.actividades_especificas_tiempo_libre ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.actividades_especificas_tiempo_libre
                        )}
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Calificación relación familiar: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="calificacion_relacion_familiar"
                            value={
                              editableUser.calificacion_relacion_familiar !==
                              undefined
                                ? editableUser.calificacion_relacion_familiar
                                : generalInfo.calificacion_relacion_familiar ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.calificacion_relacion_familiar
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Creencia religiosa: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="creencia_religiosa"
                            value={
                              editableUser.creencia_religiosa !== undefined
                                ? editableUser.creencia_religiosa
                                : generalInfo.creencia_religiosa || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.creencia_religiosa
                        )}
                      </div>

                      <div className="div-modal">
                        <b>
                          ¿Qué profesional prefieres para agendar la atención
                          inicial?:{" "}
                        </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="decision_encuentro_inicial"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={decisionEncuentroInicialOptions.filter(
                              (option) =>
                                !(
                                  editableUser.decision_encuentro_inicial ||
                                  generalInfo.decision_encuentro_inicial
                                ).includes(option.value && option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.decision_encuentro_inicial ||
                              generalInfo.decision_encuentro_inicial ||
                              []
                            ).map((value) => {
                              const foundOption =
                                decisionEncuentroInicialOptions.find(
                                  (o) => o.value === value
                                );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : (
                          generalInfo.decision_encuentro_inicial.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>¿Cómo conociste a campus diverso?: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            className="input-updated"
                            name="origen_descubrimiento_campus_diverso"
                            value={
                              editableUser.origen_descubrimiento_campus_diverso !==
                              undefined
                                ? editableUser.origen_descubrimiento_campus_diverso
                                : generalInfo.origen_descubrimiento_campus_diverso ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.origen_descubrimiento_campus_diverso
                        )}
                      </div>

                      <div className="div-modal">
                        <b>¿tipo(s) de acompañamiento(s) recibido(s)?: </b>
                        {isEditing ? (
                          <textarea
                            type="text"
                            name="acompanamiento_que_recibio"
                            className="input-updated"
                            value={
                              editableUser.acompanamiento_que_recibio !==
                              undefined
                                ? editableUser.acompanamiento_que_recibio
                                : generalInfo.acompanamiento_que_recibio || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.acompanamiento_que_recibio
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
              {currentPage === 3 && generalInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Observación general fuente de ingresos: </b>
                        <div className="div-modal-justify">
                          {isEditing ? (
                            <textarea
                              type="text"
                              className="input-updated"
                              name="observacion_general_fuente_de_ingresos"
                              value={
                                editableUser.observacion_general_fuente_de_ingresos !==
                                undefined
                                  ? editableUser.observacion_general_fuente_de_ingresos
                                  : generalInfo.observacion_general_fuente_de_ingresos ||
                                    ""
                              }
                              onChange={handleInputChange}
                            />
                          ) : (
                            generalInfo.observacion_general_fuente_de_ingresos
                          )}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>Observación general redes de apoyo: </b>
                        <div className="div-modal-justify">
                          {isEditing ? (
                            <textarea
                              type="text"
                              className="input-updated"
                              name="observacion_general_redes_de_apoyo"
                              value={
                                editableUser.observacion_general_redes_de_apoyo !==
                                undefined
                                  ? editableUser.observacion_general_redes_de_apoyo
                                  : generalInfo.observacion_general_redes_de_apoyo ||
                                    ""
                              }
                              onChange={handleInputChange}
                            />
                          ) : (
                            generalInfo.observacion_general_redes_de_apoyo
                          )}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>Observación general factores de riesgo: </b>
                        {isEditing ? (
                          <textarea
                            type="text"
                            className="input-updated"
                            name="observacion_general_factores_de_riesgo"
                            value={
                              editableUser.observacion_general_factores_de_riesgo !==
                              undefined
                                ? editableUser.observacion_general_factores_de_riesgo
                                : generalInfo.observacion_general_factores_de_riesgo ||
                                  ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          generalInfo.observacion_general_factores_de_riesgo
                        )}
                      </div>

                      <div className="div-modal">
                        <b>
                          Observación general actividades específicas en tiempo
                          libre:{" "}
                        </b>
                        <div className="div-modal-justify">
                          {isEditing ? (
                            <textarea
                              type="text"
                              className="input-updated"
                              name="observacion_general_actividades_especificas_tiempo_libre"
                              value={
                                editableUser.observacion_general_actividades_especificas_tiempo_libre !==
                                undefined
                                  ? editableUser.observacion_general_actividades_especificas_tiempo_libre
                                  : generalInfo.observacion_general_actividades_especificas_tiempo_libre ||
                                    ""
                              }
                              onChange={handleInputChange}
                            />
                          ) : (
                            generalInfo.observacion_general_actividades_especificas_tiempo_libre
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Fuentes de ingresos: </b>
                        {isEditing ? (
                          <Select
                            isMulti
                            placeholder="Seleccione las fuentes de ingresos"
                            className="create-select"
                            name="fuentes_ingresos"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={fuentesOptions.filter(
                              (option) =>
                                !(
                                  editableUser.fuentes_ingresos ||
                                  generalInfo.fuentes_ingresos
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.fuentes_ingresos ||
                              generalInfo.fuentes_ingresos ||
                              []
                            ).map((value) => {
                              const foundOption = fuentesOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange}
                          />
                        ) : (
                          generalInfo.fuentes_ingresos.join(", ")
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Redes de apoyo: </b>
                        {isEditing ? (
                          <Select
                            isMulti
                            className="create-select"
                            placeholder="Seleccione las redes de apoyo"
                            name="redes_apoyo"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={redesOptions.filter(
                              (option) =>
                                !(
                                  editableUser.redes_apoyo ||
                                  generalInfo.redes_apoyo
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.redes_apoyo ||
                              generalInfo.redes_apoyo ||
                              []
                            ).map((value) => {
                              const foundOption = redesOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange}
                          />
                        ) : (
                          generalInfo.redes_apoyo.join(", ")
                        )}
                      </div>
                      <div className="div-modal">
                        <b>factores de riesgo: </b>
                        {isEditing ? (
                          <Select
                            isMulti
                            placeholder="Seleccione factores de riesgo"
                            className="create-select"
                            name="factores_riesgos"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={factoresOptions.filter(
                              (option) =>
                                !(
                                  editableUser.factores_riesgos ||
                                  generalInfo.factores_riesgos
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.factores_riesgos ||
                              generalInfo.factores_riesgos ||
                              []
                            ).map((value) => {
                              const foundOption = factoresOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange}
                          />
                        ) : (
                          generalInfo.factores_riesgos.join(", ")
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
              {currentPage === 4 && academicoInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>¿Pertenece a univalle?: </b>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name="pertenencia_univalle"
                            checked={
                              editableUser.pertenencia_univalle ??
                              academicoInfo.pertenencia_univalle
                            }
                            onChange={handleCheckboxChange}
                          />
                        ) : academicoInfo.pertenencia_univalle ? (
                          "Sí"
                        ) : (
                          "No"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Estamentos: </b>
                        {isEditing ? (
                          <Select
                            placeholder="Seleccione expresiones"
                            className="create-select"
                            name="estamentos"
                            // Opciones disponibles, excluyendo las ya seleccionadas
                            options={estamentoOptions.filter(
                              (option) =>
                                !(
                                  editableUser.estamentos ||
                                  academicoInfo.estamentos
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.estamentos ||
                              academicoInfo.estamentos ||
                              []
                            ).map((value) => {
                              const foundOption = estamentoOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : academicoInfo.estamentos &&
                          academicoInfo.estamentos.length ? (
                          academicoInfo.estamentos.join(", ")
                        ) : (
                          "No especifica/No presenta"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Nombre del programa académico: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            name="programas"
                            placeholder="Seleccione programa"
                            options={programaOptions.filter(
                              (option) =>
                                !(
                                  editableUser.programas ||
                                  academicoInfo.programas
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.programas ||
                              academicoInfo.programas ||
                              []
                            ).map((value) => {
                              const foundOption = programaOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : academicoInfo.programas &&
                          academicoInfo.programas.length ? (
                          academicoInfo.programas.join(", ")
                        ) : (
                          "No especificado"
                        )}
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Sede: </b>
                        {isEditing ? (
                          <Select
                            className="create-select"
                            name="sedes"
                            placeholder="Seleccione programa"
                            options={sedeOptions.filter(
                              (option) =>
                                !(
                                  editableUser.sedes || academicoInfo.sedes
                                ).includes(option.label)
                            )}
                            // Opciones seleccionadas
                            value={(
                              editableUser.sedes ||
                              academicoInfo.sedes ||
                              []
                            ).map((value) => {
                              const foundOption = sedeOptions.find(
                                (o) => o.value === value
                              );
                              return foundOption || { value, label: value };
                            })}
                            onChange={handleSelectChange3}
                          />
                        ) : academicoInfo.sedes &&
                          academicoInfo.sedes.length ? (
                          academicoInfo.sedes.join(", ")
                        ) : (
                          "No especificado"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>Código de estudiante:</b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="codigo_estudiante"
                            className="input-updated"
                            value={
                              editableUser.codigo_estudiante !== undefined
                                ? editableUser.codigo_estudiante
                                : academicoInfo.codigo_estudiante || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          academicoInfo.codigo_estudiante ||
                          "No especificado/No presenta"
                        )}
                      </div>

                      <div className="div-modal">
                        <b>semestre académico: </b>
                        {isEditing ? (
                          <input
                            type="text"
                            name="semestre_academico"
                            className="input-updated"
                            value={
                              editableUser.semestre_academico !== undefined
                                ? editableUser.semestre_academico
                                : academicoInfo.semestre_academico || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          academicoInfo.semestre_academico
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {currentPage === 5 && documentosInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Autorización manejo de datos: </b>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name="autorizacion_manejo_de_datos"
                            checked={
                              editableUser.autorizacion_manejo_de_datos ??
                              documentosInfo.autorizacion_manejo_de_datos
                            }
                            onChange={handleCheckboxChange}
                          />
                        ) : documentosInfo.autorizacion_manejo_de_datos ? (
                          "Sí"
                        ) : (
                          "No"
                        )}
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>Firma consentimiento informado: </b>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name="firma_consentimiento_informado"
                            checked={
                              editableUser.firma_consentimiento_informado ??
                              documentosInfo.firma_consentimiento_informado
                            }
                            onChange={handleCheckboxChange}
                          />
                        ) : documentosInfo.firma_consentimiento_informado ? (
                          "Sí"
                        ) : (
                          "No"
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {currentPage === 6 && documentosInfo && (
                <div className="div-scroll">
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>
                          Me satisface la ayuda que recibo de mi familia cuando
                          tengo algún problema y/o necesidad
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta1 &&
                          documentosInfo.apgar_pregunta1.length
                            ? documentosInfo.apgar_pregunta1.join(", ")
                            : "No especificado"}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>
                          Me satisface como en mi familia hablamos y compartimos
                          nuestros problemas
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta2 &&
                          documentosInfo.apgar_pregunta2.length
                            ? documentosInfo.apgar_pregunta2.join(", ")
                            : "No especificado"}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>
                          Me satisface como mi familia acepta y apoya mi deseo
                          de emprender nuevas actividades
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta3 &&
                          documentosInfo.apgar_pregunta3.length
                            ? documentosInfo.apgar_pregunta3.join(", ")
                            : "No especificado"}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>
                          Me satisface como mi familia expresa afecto y responde
                          a mis emociones tales como rabia, tristeza, amor
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta4 &&
                          documentosInfo.apgar_pregunta4.length
                            ? documentosInfo.apgar_pregunta4.join(", ")
                            : "No especificado"}
                        </div>
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="div-modal">
                        <b>
                          Me satisface como compartimos en mi familia:
                          tiempo/espacio/dinero
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta5 &&
                          documentosInfo.apgar_pregunta5.length
                            ? documentosInfo.apgar_pregunta5.join(", ")
                            : "No especificado"}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>
                          Tengo un(a) amigo(a) cercano quien pueda buscar cuando
                          necesito ayuda
                          <span className="simbolo-obligatorio">
                            {" "}
                            NO puntúa APGAR{" "}
                          </span>
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta6 &&
                          documentosInfo.apgar_pregunta6.length
                            ? documentosInfo.apgar_pregunta6.join(", ")
                            : "No especificado"}
                        </div>
                      </div>

                      <div className="div-modal">
                        <b>
                          Estoy satisfecho(a) con el soporte que recibo de mis
                          amigos(as)
                          <span className="simbolo-obligatorio">
                            {" "}
                            NO puntúa APGAR{" "}
                          </span>
                        </b>
                        <div className="apgar-respuesta">
                          {documentosInfo.apgar_pregunta7 &&
                          documentosInfo.apgar_pregunta7.length
                            ? documentosInfo.apgar_pregunta7.join(", ")
                            : "No especificado"}
                        </div>
                      </div>
                    </Col>
                    <Row className="mt-6">
                      <Col xs="12">
                        <div className="div-modal">
                          <b>Puntaje APGAR:</b>
                          <div className="apgar-respuesta">
                            {(() => {
                              const valoraciones = {
                                nunca: 0,
                                "casi nunca": 1,
                                "algunas veces": 2,
                                "casi siempre": 3,
                                siempre: 4,
                              };

                              const preguntas = [
                                documentosInfo.apgar_pregunta1,
                                documentosInfo.apgar_pregunta2,
                                documentosInfo.apgar_pregunta3,
                                documentosInfo.apgar_pregunta4,
                                documentosInfo.apgar_pregunta5,
                              ];

                              let puntaje = 0;

                              preguntas.forEach((pregunta) => {
                                if (Array.isArray(pregunta)) {
                                  pregunta.forEach((respuesta) => {
                                    const valor =
                                      valoraciones[respuesta.toLowerCase()];
                                    if (valor !== undefined) puntaje += valor;
                                  });
                                }
                              });

                              return `${puntaje} puntos`;
                            })()}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </div>
              )}

              {currentPage === 7 && seguimientosInfo && (
                <div className="div-scroll">
                  <Row>
                    <ul className="ul-style">
                      {seguimientosInfo && seguimientosInfo.length > 0 ? (
                        [...seguimientosInfo]
                          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                          .map((seguimiento, id_persona) => (
                            <li className="li-style" key={id_persona}>
                              <div>
                                <b>Fecha:</b> {seguimiento.fecha}
                              </div>
                              <div className="div-observacion">
                                <b>Observación:</b> {seguimiento.observacion}
                              </div>
                              <div>
                                <b>Profesionales:</b>
                                <ul className="ul-style">
                                  {seguimiento.profesional.map(
                                    (prof, profIndex) => (
                                      <li key={profIndex}>
                                        {prof.nombre_profesional} -{" "}
                                        {prof.cargo_profesional}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                              {/* <div><b>ID Creador Campus:</b> {seguimiento.id_creador_campus || 'N/A'}</div> */}
                            </li>
                          ))
                      ) : (
                        <li className="li-style">
                          <div>
                            No hay seguimientos disponibles para este usuario.
                          </div>
                        </li>
                      )}
                    </ul>
                  </Row>
                </div>
              )}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          {isEditing ? (
            <>
              <Button
                className="btn-action btn-guardar"
                onClick={() => {
                  handleFormSubmit(editableUser);
                  setIsEditing(false);
                  setEditableUser({ selectedUser });
                }}
              >
                <CheckIcon /> Guardar
              </Button>
              <Button
                className="btn-action btn-cancelar"
                onClick={handleCancel}
              >
                <CancelIcon />
                Cancelar
              </Button>
            </>
          ) : (
            <>
              {/*<Button variant="primary" onClick={Usuariorevisado}>
                Revisado
              </Button>*/}
              <div className="div-botones-navegacion">
                <Button
                  className="btn-action btn-nav"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  <ArrowBackIcon /> Atrás
                </Button>
                <Button
                  className="btn-action btn-nav"
                  onClick={nextPage}
                  disabled={currentPage === 7}
                >
                  <ArrowForwardIcon /> Adelante
                </Button>
              </div>
              <div className="div-boton-eliminar ms-auto">
                <Button
                  className="btn-action btn-delete"
                  onClick={handleOpenFirstModal}
                >
                  <DeleteIcon /> Eliminar
                </Button>
              </div>

              {/* Primer Modal */}
              <Modal show={showFirstModal} onHide={handleCloseFirstModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmación de Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  ¿Estás seguro de que deseas eliminar este usuario?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn-action btn-nav"
                    onClick={handleCloseFirstModal}
                  >
                    <CancelIcon />
                    Cancelar
                  </Button>
                  <Button
                    className="btn-action btn-delete"
                    onClick={handleOpenSecondModal}
                  >
                    <DeleteIcon />
                    Sí, estoy seguro
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Segundo Modal */}
              <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmación Final</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  ¿Realmente estás seguro de que deseas{" "}
                  <span className="texto-enfatico"> eliminar </span> este
                  usuario?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn-action btn-nav"
                    onClick={handleCloseSecondModal}
                  >
                    <CancelIcon />
                    Cancelar
                  </Button>
                  <Button
                    className="btn-action btn-delete"
                    onClick={handleFinalDelete}
                  >
                    <DeleteIcon />
                    Sí, eliminar definitivamente
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <ModalSeguimientos
        isSeguimientoModalOpen={isSeguimientoModalOpen}
        closeSeguimientoModal={closeSeguimientoModal}
        selectedUser={selectedUser}
        setSeguimientosInfo={setSeguimientosInfo}
        Usuariorevisado={Usuariorevisado}
      />
    </>
  );
};

export default ModalEstudiantes;
