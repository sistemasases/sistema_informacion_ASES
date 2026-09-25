/**
 * @file acordeon_horarios_monitorias.jsx
 * @description Gestión y renderizado de horarios de monitorías académicas en el panel admin.
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
import Read_sedes from "../../service/panel_admin/panel_admin_sedes_listar_sedes.js";
import Read_monitores from "../../service/panel_admin/panel_admin_monitorias_academicas_listar_monitores_academicos.js";
import Read_horarios from "../../service/panel_admin/panel_admin_horarios_listar.js";
import Create_horario from "../../service/panel_admin/panel_admin_horarios_crear.js";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const SelectorHorariosMonitorias = () => {
    // Estado para la lista de horarios
    const [state, setState] = useState({
        data_horarios: [],
        data_sedes: [],
        data_monitores: [],
    });

    // Estados para modales y selección
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Estado para el formulario de nuevo horario
    const [newHorario, setNewHorario] = useState({
        id_monitor: "",
        id_sede: "",
        materia: "",
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        lugar: "",
        is_active: true,
    });

    // Función para consultar los horarios
    const cargarDatosIniciales = async () => {
        try {
            // 1. Obtener horarios registrados
            const horarios = await Read_horarios.listar_horarios({});
            // 2. Obtener sedes de la BD
            const sedes = await Read_sedes.listar_sedes({});

            setState((prev) => ({
                ...prev,
                data_horarios: Array.isArray(horarios) ? horarios : [],
                data_sedes: Array.isArray(sedes) ? sedes : [],
                data_monitores: [], // Se poblará cuando el usuario elija una sede
            }));
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };


    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    // Controladores de Edición
    const handleEdit = (horario) => {
        setSelectedHorario(horario);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSelectedHorario((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSaveEdit = async () => {
        try {
            // TODO: Update_horario.actualizar_horario(selectedHorario);
            Swal.fire({
                title: "Éxito",
                text: "Horario actualizado correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            setShowEditModal(false);
            cargarDatosIniciales();
        } catch (error) {
            console.error("Error al actualizar horario:", error);
        }
    };

    // Controladores de Creación
    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleCreateChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const valorFinal = type === "checkbox" ? checked : value;

        setNewHorario((prev) => ({
            ...prev,
            [name]: valorFinal,
        }));

        // Si cambió la sede, cargar los monitores de esa sede
        if (name === "id_sede") {
            setNewHorario((prev) => ({
                ...prev,
                id_sede: valorFinal,
                id_monitor: "", // Limpiar el monitor previamente seleccionado
            }));

            if (valorFinal) {
                // Consultar monitores de la sede seleccionada
                const monitores = await Read_monitores.listar_monitores_academicos({ id_sede: valorFinal });
                setState((prev) => ({
                    ...prev,
                    data_monitores: Array.isArray(monitores) ? monitores : [],
                }));
            } else {
                // Si deseleccionó la sede, vaciar la lista de monitores
                setState((prev) => ({
                    ...prev,
                    data_monitores: [],
                }));
            }
        }
    };


    const handleCreateHorario = async () => {
        if (
            !newHorario.id_monitor ||
            !newHorario.id_sede ||
            !newHorario.materia.trim() ||
            !newHorario.dia_semana ||
            newHorario.dia_semana === "seleccionar" ||
            !newHorario.hora_inicio ||
            !newHorario.hora_fin ||
            !newHorario.lugar.trim()
        ) {
            Swal.fire({
                title: "Mensaje de alerta",
                text: "Por favor, verifica que todos los campos obligatorios estén llenos antes de enviar.",
                icon: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        const response = await Create_horario.crear_horario(newHorario);
        if (response && (response.status === 200 || response.status === 201)) {
            Swal.fire({
                title: "Creado",
                text: "Horario de monitoría creado con éxito.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });

            setNewHorario({
                id_monitor: "",
                id_sede: "",
                materia: "",
                dia_semana: "",
                hora_inicio: "",
                hora_fin: "",
                lugar: "",
                is_active: true,
            });

            setShowCreateModal(false);
            cargarDatosIniciales();
        }
    };


    // Definición de columnas para DataTable
    const columnas = [
        { name: "ID", selector: (row) => row.id, sortable: true, grow: 0.2 },
        {
            name: "MATERIA",
            selector: (row) => row.materia,
            sortable: true,
            grow: 0.6,
        },
        {
            name: "MONITOR",
            selector: (row) => row.nombre_monitor,
            sortable: true,
            grow: 0.6,
        },
        {
            name: "SEDE",
            selector: (row) => row.nombre_sede,
            sortable: true,
            grow: 0.4,
        },
        {
            name: "DÍA",
            selector: (row) => row.dia_semana,
            sortable: true,
            grow: 0.4,
        },
        {
            name: "HORA INICIO",
            selector: (row) => row.hora_inicio,
            sortable: true,
            grow: 0.4,
        },
        {
            name: "HORA FIN",
            selector: (row) => row.hora_fin,
            sortable: true,
            grow: 0.4,
        },
        {
            name: "LUGAR",
            selector: (row) => row.lugar,
            sortable: true,
            grow: 0.6,
        },
        {
            name: "ACTIVO",
            selector: (row) => (row.is_active ? "Sí" : "No"),
            sortable: true,
            grow: 0.3,
        },
        {
            name: "EDITAR",
            cell: (row) => (
                <Button variant="warning" size="sm" onClick={() => handleEdit(row)}>
                    <FaEdit />
                </Button>
            ),
            grow: 0.3,
        },
    ];

    return (
        <Container>
            <Accordion>
                <Accordion.Item eventKey="horarios_monitorias">
                    <Accordion.Header onClick={cargarDatosIniciales}>
                        Horarios de Monitorías Académicas
                    </Accordion.Header>
                    <Accordion.Body>
                        <DataTableExtensions
                            columns={columnas}
                            data={state.data_horarios}
                            export={false}
                            print={false}
                            filterPlaceholder="Buscar horario..."
                        >
                            <DataTable
                                title="Horarios de Monitorías Académicas"
                                noDataComponent="No hay horarios registrados."
                                pagination
                                striped
                            />
                        </DataTableExtensions>

                        <Row className="mt-3">
                            <Col>
                                <Button variant="primary" onClick={handleShowCreateModal}>
                                    Crear Horario
                                </Button>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {/* Modal para Crear Horario */}
            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Horario Monitorías Académicas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="createDiaSemana">
                            <Form.Label>Día de la Semana</Form.Label>
                            <Form.Select
                                name="dia_semana"
                                value={newHorario.dia_semana}
                                onChange={handleCreateChange}
                            >
                                <option value="">Seleccione un día... </option>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                            </Form.Select>

                        </Form.Group>

                        <Form.Label>Franja Horaria</Form.Label>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="createHoraInicio">
                                    <Form.Label>Hora Inicio</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="hora_inicio"
                                        value={newHorario.hora_inicio}
                                        onChange={handleCreateChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="createHoraFin">
                                    <Form.Label>Hora Fin</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="hora_fin"
                                        value={newHorario.hora_fin}
                                        onChange={handleCreateChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="createMateria">
                            <Form.Label>Nombre de la materia</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Matemática Fundamental"
                                name="materia"
                                value={newHorario.materia}
                                onChange={handleCreateChange}
                                maxLength={100}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="createSede">
                            <Form.Label>Sede</Form.Label>
                            <Form.Select
                                name="id_sede"
                                value={newHorario.id_sede}
                                onChange={handleCreateChange}
                            >
                                <option value="">Seleccione una sede...</option>
                                {state.data_sedes.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="createMonitor">
                            <Form.Label>Monitor</Form.Label>
                            <Form.Select
                                name="id_monitor"
                                value={newHorario.id_monitor}
                                onChange={handleCreateChange}
                                disabled={!newHorario.id_sede}
                            >
                                {!newHorario.id_sede ? (
                                    <option value="">Primero seleccione una sede...</option>
                                ) : state.data_monitores.length === 0 ? (
                                    <option value="">No hay monitores registrados en esta sede</option>
                                ) : (
                                    <option value="">Seleccione un monitor...</option>
                                )}

                                {state.data_monitores.map((m) => (
                                    <option key={m.id_usuario} value={m.id_usuario}>
                                        {m.nombre_monitor}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="createLugar">
                            <Form.Label>Enlace a reunión de meet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. https://meet.google.com/xyz-abc-def"
                                name="lugar"
                                value={newHorario.lugar}
                                onChange={handleCreateChange}
                                maxLength={150}
                            />
                        </Form.Group>

                        <Form.Group controlId="createIsActive">
                            <Form.Check
                                type="checkbox"
                                label="Horario Activo"
                                name="is_active"
                                checked={newHorario.is_active}
                                onChange={handleCreateChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCreateHorario}>
                        Crear Horario
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Editar Horario */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editMateriaMonitor">
                            <Form.Label>Monitor / Materia</Form.Label>
                            <Form.Control
                                type="text"
                                name="materia_monitor"
                                value={selectedHorario?.materia_monitor || ""}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="editDiaSemana">
                            <Form.Label>Día de la Semana</Form.Label>
                            <Form.Select
                                name="dia_semana"
                                value={selectedHorario?.dia_semana || "Lunes"}
                                onChange={handleEditChange}
                            >
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                            </Form.Select>
                        </Form.Group>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="editHoraInicio">
                                    <Form.Label>Hora Inicio</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="hora_inicio"
                                        value={selectedHorario?.hora_inicio || ""}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="editHoraFin">
                                    <Form.Label>Hora Fin</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="hora_fin"
                                        value={selectedHorario?.hora_fin || ""}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="editLugar">
                            <Form.Label>Lugar / Modalidad</Form.Label>
                            <Form.Control
                                type="text"
                                name="lugar"
                                value={selectedHorario?.lugar || ""}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="editIsActive">
                            <Form.Check
                                type="checkbox"
                                label="Horario Activo"
                                name="is_active"
                                checked={selectedHorario?.is_active || false}
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

export default SelectorHorariosMonitorias;
