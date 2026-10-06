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

    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            const [dataHorarios, dataSedes] = await Promise.all([
                HorariosService.listar_horarios_publicos(),
                HorariosService.listar_sedes_publicas(),
            ]);
            setHorarios(Array.isArray(dataHorarios) ? dataHorarios : []);
            setSedes(Array.isArray(dataSedes) ? dataSedes : []);
            setCargando(false);
        };
        cargarDatos();
    }, []);

    //Función auxilicar para saber si el horario es del dpto de matematicas
    const esDptoMatematicas = (h) => {
        return h.nombre_monitor?.toLowerCase().includes("departamento de matematicas");
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
                        <h2 className="vh-title fw-bold">Horarios de Monitorías Académicas</h2>
                        <p className="text-muted mb-3">
                            Consulta los horarios y enlaces de las monitorías académicas disponibles.
                        </p>

                        <div style={{ maxWidth: "260px" }}>
                            <Form.Label className="fw-semibold text-secondary mb-1">Sede</Form.Label>
                            <Form.Select
                                className="vh-select shadow-sm"
                                value={sedeSeleccionada}
                                onChange={(e) => setSedeSeleccionada(e.target.value)}
                            >
                                <option value="Todas">Todas</option>
                                <option key="dpto_matematicas" value="dpto matematicas">DEPARTAMENTO DE MATEMATICAS</option>
                                {sedes
                                    .filter((s) => !["DISCAPACIDAD", "Campus Diverso"].includes(s.nombre))
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
                                    <FaInfoCircle className="fs-5 me-2" />
                                    <span className="fs-6">¿Cómo ingresar?</span>
                                </div>
                                <ul className="list-unstyled mb-0 vh-steps-list">
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="vh-step-number text-white">1</span>
                                        <span>Busca tu asignatura.</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-2">
                                        <span className="vh-step-number text-white">2</span>
                                        <span>Revisa el horario.</span>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <span className="vh-step-number text-white">3</span>
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
                            <Row className="g-3">
                                {DIAS_SEMANA.map((dia) => {
                                    const itemsDelDia = agruparPorDia(dia);
                                    return (
                                        <Col key={dia} xs={12} sm={6} md={4} lg={true} className="vh-col-day">
                                            <div className="vh-day-header text-uppercase fw-bold text-muted mb-2">
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
                                                            <div className="vh-monitor-info d-flex align-items-center text-muted mb-2">
                                                                <FaRegUser className="me-1" />
                                                                <span>
                                                                    Monitor: {item.nombre_monitor}
                                                                </span>
                                                            </div>

                                                            {item.enlace ? (
                                                                <Button
                                                                    variant="primary"
                                                                    size="sm"
                                                                    className="w-100 vh-btn-ingresar d-flex align-items-center justify-content-center"
                                                                    href={item.enlace.startsWith("http") ? item.enlace : `https://${item.enlace}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <FaExternalLinkAlt className="me-2" /> Ingresar a monitoría
                                                                </Button>
                                                            ) : (
                                                                <Button variant="secondary" size="sm" className="w-100" disabled>
                                                                    Presencial (Salón {item.salon || "Asignado"})
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
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
