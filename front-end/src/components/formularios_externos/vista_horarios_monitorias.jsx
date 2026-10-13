/**
 * @file vista_horarios_monitorias.jsx
 * @description Vista pública de los horarios de monitorías académicas.
 */

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { FaInfoCircle, FaExternalLinkAlt, FaRegUser } from "react-icons/fa";
import HorariosService from "../../service/formularios_externos_horarios_monitorias.js";
import "../../Scss/formularios_externos/vista_horarios_monitorias.css";
import LogoAses from "../componentes_generales/LOGO BLANCORecurso 1.png";
import "../../Scss/navbar/navbar.css"

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

// Convierte "14:00" a "02:00 PM"
const formatearHora12h = (hora24) => {
    if (!hora24) return "";
    const [h, m] = hora24.split(":");
    let horas = parseInt(h, 10);
    const ampm = horas >= 12 ? "PM" : "AM";
    horas = horas % 12;
    horas = horas ? horas : 12;
    const strHoras = horas < 10 ? `0${horas}` : horas;
    return `${strHoras}:${m} ${ampm}`;
};

const VistaHorariosMonitorias = () => {
    const [horarios, setHorarios] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [sedeSeleccionada, setSedeSeleccionada] = useState("Todas");
    const [cargando, setCargando] = useState(true);

    // Función para consultar los horarios y sedes
    const cargarDatos = async (mostrarCargando = false) => {
        if (mostrarCargando) setCargando(true);
        try {
            const [dataHorarios, dataSedes] = await Promise.all([
                HorariosService.listar_horarios_publicos(),
                HorariosService.listar_sedes_publicas(),
            ]);
            setHorarios(Array.isArray(dataHorarios) ? dataHorarios : []);
            setSedes(Array.isArray(dataSedes) ? dataSedes : []);
        } catch (error) {
            console.error("Error al actualizar horarios:", error);
        } finally {
            if (mostrarCargando) setCargando(false);
        }
    };

    useEffect(() => {
        // Carga inicial (muestra "Cargando horarios...")
        cargarDatos(true);

        // 1. Polling: Actualización automática cada 30 segundos
        const INTERVALO_MS = 30000; // 30 segundos 
        const intervaloId = setInterval(() => {
            cargarDatos(false);
        }, INTERVALO_MS);

        // 2. Actualización inmediata al volver a la pestaña
        const alVolverATab = () => {
            if (document.visibilityState === "visible") {
                cargarDatos(false);
            }
        };
        document.addEventListener("visibilitychange", alVolverATab);

        // Limpieza al salir de la vista (evita fugas de memoria)
        return () => {
            clearInterval(intervaloId);
            document.removeEventListener("visibilitychange", alVolverATab);
        };
    }, []);


    // Función auxiliar para saber si el horario es del dpto de matematicas
    const esDptoMatematicas = (h) => {
        const nombreSede = h.nombre_sede?.toLowerCase() || "";
        const nombreMonitor = h.nombre_monitor?.toLowerCase() || "";
        const esPorNombre =
            nombreSede.includes("matematicas") ||
            nombreMonitor.includes("departamento de matematicas");

        const sedeDptoId = sedes.find((s) => s.nombre?.toLowerCase().includes("matematicas"))?.id;
        const esPorId = sedeDptoId && String(h.id_sede) === String(sedeDptoId);

        return Boolean(esPorNombre || esPorId);
    };

    // Función auxiliar para obtener el nombre visible de la sede
    // const obtenerNombreSede = (h) => {
    //     if (esDptoMatematicas(h)) {
    //         return "DEPARTAMENTO DE MATEMATICAS";
    //     }
    //     return h.nombre_sede || "";
    // };

    // Función auxiliar para darle formato al nombre del monitor
    const formatearNombreMonitor = (nombre) => {
        if (!nombre) return "";
        return nombre
            .toLowerCase()
            .replace(/\b\p{L}/gu, (letra) => letra.toUpperCase());
    };

    // Filtrado por sede
    const horariosFiltrados = horarios.filter((h) => {
        if (sedeSeleccionada === "Todas") return true;
        if (sedeSeleccionada === "dpto matematicas") return esDptoMatematicas(h);
        return String(h.id_sede) === String(sedeSeleccionada) && !esDptoMatematicas(h);
    });

    // Agrupar y ordenar por día
    const agruparPorDia = (dia) => {
        return horariosFiltrados
            .filter((h) => h.dia_semana?.toLowerCase() === dia.toLowerCase())
            .sort((a, b) => (a.hora_inicio || "").localeCompare(b.hora_inicio || ""));
    };

    return (
        <>
            {/* Franja roja superior */}
            <div className="nav d-flex align-items-center justify-content-between px-4">
                <div className="d-flex align-items-center gap-3">
                    <img src={LogoAses} alt="Logo ASES" className="logo" style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className="vh-container-fluid py-4 px-3 px-md-5">
                {/* Encabezado y Tarjeta de Instrucciones */}
                <Row className="mb-4 align-items-start">
                    <Col lg={8} md={7}>
                        <h2 className="vh-title">Horarios de Monitorías Académicas</h2>
                        <p className=" mb-3">
                            Consulta los horarios y enlaces de las monitorías académicas disponibles.
                        </p>

                        <div style={{ maxWidth: "260px" }}>
                            <Form.Label className="fw-bold mb-1">Sede</Form.Label>
                            <Form.Select
                                className="vh-select shadow-sm"
                                value={sedeSeleccionada}
                                onChange={(e) => setSedeSeleccionada(e.target.value)}
                            >
                                <option value="Todas">Todas</option>
                                <option key="dpto_matematicas" value="dpto matematicas">DEPARTAMENTO DE MATEMATICAS</option>
                                {sedes
                                    .filter((s) => !["DISCAPACIDAD", "Campus Diverso"].includes(s.nombre) && !s.nombre?.toLowerCase().includes("matematicas"))
                                    .map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nombre}
                                        </option>
                                    ))}
                            </Form.Select>
                        </div>
                    </Col>

                    {/* Tarjeta de instrucciones: ¿Cómo ingresar? */}
                    <Col lg={4} md={5} className="mt-3 mt-md-0">
                        <Card className="vh-info-card shadow-sm border-0">
                            <Card.Body className="p-3">
                                <div className="d-flex align-items-center mb-2 text-primary fw-bold">
                                    <FaInfoCircle className="vh-info-icon fs-5 me-2" />
                                    <span className="fs-6" style={{ color: "#1b48aa" }}>¿Cómo ingresar?</span>
                                </div>
                                <ul className="list-unstyled mb-0 vh-steps-list">
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="vh-step-number text-white">1</span>
                                        <span>Selecciona tu sede.</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="vh-step-number text-white">2</span>
                                        <span>Busca tu asignatura.</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="vh-step-number text-white">3</span>
                                        <span>Revisa el horario.</span>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <span className="vh-step-number text-white">4</span>
                                        <span>Presiona &quot;Ingresar a monitoría&quot;.</span>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Tablero Semanal */}
                <Card className="vh-main-card shadow-sm border">
                    <Card.Header className="bg-white border-bottom py-3">
                        <h5 className="mb-0 fw-bold text-dark">Horario semanal</h5>
                    </Card.Header>
                    <Card.Body className="p-3">
                        {cargando ? (
                            <div className="text-center py-5 text-muted">Cargando horarios...</div>
                        ) : (
                            <Row className="g-3 aling-items-stretch vh-kanban-row">
                                {DIAS_SEMANA.map((dia) => {
                                    const itemsDelDia = agruparPorDia(dia);
                                    return (
                                        <Col key={dia} xs={12} sm={6} md={4} lg={true} className="vh-col-day">
                                            <div className="vh-kanban-col">
                                                <div className="vh-day-header text-uppercase fw-bold mb-2">
                                                    {dia}
                                                </div>

                                                <div className="vh-day-column d-flex flex-column gap-3">
                                                    {itemsDelDia.length === 0 ? (
                                                        <div className="vh-empty-slot text-muted text-center py-4">
                                                            Sin monitorías
                                                        </div>
                                                    ) : (
                                                        itemsDelDia.map((item) => (
                                                            <div key={item.id} className="vh-horario-card p-3 shadow-sm">
                                                                <div className="vh-hora-rango fw-bold">
                                                                    {formatearHora12h(item.hora_inicio)} – {formatearHora12h(item.hora_fin)}
                                                                </div>
                                                                <div className="vh-materia-title text-uppercase fw-semibold my-1">
                                                                    {item.materia}
                                                                </div>
                                                                <div className="vh-monitor-info d-flex align-items-center text-muted mb-1">
                                                                    <FaRegUser className="me-1" />
                                                                    <span>
                                                                        Monitor: {formatearNombreMonitor(item.nombre_monitor)}
                                                                    </span>
                                                                </div>
                                                                {/* <div className="vh-sede-info d-flex align-items-center text-muted mb-2" style={{ fontSize: "0.82rem" }}>
                                                                    <FaRegBuilding className="me-1" />
                                                                    <span>
                                                                        Sede: {obtenerNombreSede(item)}
                                                                    </span>
                                                                </div> */}
                                                                {/* Modalidad Híbrida: muestra salón y botón de ingreso */}
                                                                {item.modalidad === "Híbrida" || (!item.modalidad && item.enlace && item.salon) ? (
                                                                    <div className="d-flex flex-column gap-2">
                                                                        <div
                                                                            className="d-flex align-items-center justify-content-between p-1 px-2 rounded"
                                                                            style={{ backgroundColor: "#f1f5f9", fontSize: "0.82rem" }}
                                                                        >
                                                                            <span className="text-muted fw-semibold">Salón:</span>
                                                                            <span className="fw-bold text-dark">{item.salon || "Asignado"}</span>
                                                                        </div>
                                                                        <Button
                                                                            variant="primary"
                                                                            size="sm"
                                                                            className="w-100 vh-btn-ingresar d-flex align-items-center justify-content-center"
                                                                            href={item.enlace?.startsWith("http") ? item.enlace : `https://${item.enlace}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <FaExternalLinkAlt className="me-2" /> Ingresar a monitoría
                                                                        </Button>
                                                                    </div>
                                                                ) : item.modalidad === "Virtual" || (!item.modalidad && item.enlace) ? (
                                                                    /* Modalidad Virtual: solo botón de ingreso */
                                                                    <Button
                                                                        variant="primary"
                                                                        size="sm"
                                                                        className="w-100 vh-btn-ingresar d-flex align-items-center justify-content-center"
                                                                        href={item.enlace?.startsWith("http") ? item.enlace : `https://${item.enlace}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <FaExternalLinkAlt className="me-2" /> Ingresar a monitoría
                                                                    </Button>
                                                                ) : (
                                                                    /* Modalidad Presencial: solo salón */
                                                                    <Button variant="secondary" size="sm" className="w-100 vh-btn-presencial" disabled>
                                                                        Presencial (Salón {item.salon || "Asignado"})
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default VistaHorariosMonitorias;
