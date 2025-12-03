/**
 * @file estadisticas_monitorias.jsx
 * @version 1.0.0
 * @description Módulo de estadísticas y visualización de monitorías académicas.
 * @author José Alexander Muñoz
 * @date 2025
 */

import React, { useEffect, useMemo, useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import axios from "axios";
import writeXlsxFile from "write-excel-file";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import All_sede_service from "../../service/all_sede";
import Api_facultades_sede from "../../service/facultades_por_sede";

const COLORS = [
    "#E30613", // Rojo Univalle
    "#00796B", // Verde petróleo
    "#1565C0", // Azul institucional
    "#F9A825", // Amarillo mostaza (energía)
    "#6A1B9A", // Violeta académico
    "#4D4D4D", // Gris oscuro
];

const EstadisticasMonitorias = () => {
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    sede: "",
    semestre: "",
    facultad: "",
    materia: "",
    programa: "",
  });

  const [materias, setMaterias] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [allProgramas, setAllProgramas] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [facultades, setFacultades] = useState([]);

  // Datos agregados
  const [kpis, setKpis] = useState({
    totalEstudiantes: 0,
    totalAsistencias: 0,
    promedioAsistencia: 0,
    materiaMayorAsistencia: "-",
    materiaMenorAsistencia: "-",
  });

  // Series para gráficas
  const [estudiantesPorMateria, setEstudiantesPorMateria] = useState([]);
  const [asistenciasPorMateria, setAsistenciasPorMateria] = useState([]);
  const [estudiantesPorPrograma, setEstudiantesPorPrograma] = useState([]);
  const [asistenciasPorPrograma, setAsistenciasPorPrograma] = useState([]);
  const [estudiantesPorMes, setEstudiantesPorMes] = useState([]);
  const [asistenciasPorMes, setAsistenciasPorMes] = useState([]);

  const reportRef = useRef(null);

  // Cargar catálogos (semestres, materias, programas)
  const cargarCatalogos = async () => {
    try {
      const token = await decryptTokenFromSessionStorage();
      const sede = desencriptarInt(sessionStorage.getItem("sede_id"));
      const headers = { Authorization: `Bearer ${token}` };

      // Cargar sedes
      const sedesLista = await All_sede_service.all_sede();
      if (Array.isArray(sedesLista)) setSedes(sedesLista);      
      
    } catch (error) {
      console.error("Error cargando catálogos:", error);
    }
  };

  // Cargar estadísticas desde API
  const cargarDesdeAPI = async () => {
    setLoading(true);
    try {
      // const sede = desencriptarInt(sessionStorage.getItem("sede_id"));
      const token = await decryptTokenFromSessionStorage();
      const headers = { Authorization: `Bearer ${token}` };

      const payload = {
        sede_id: filtros.sede || null,
        semestre: filtros.semestre || null,
        materia: filtros.materia || null,
        programa: filtros.programa || null,
        facultad: filtros.facultad || null,
      };
      console.log("Payload enviado:", payload);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reportes/estadisticas_monitorias/estadisticas_monitorias/`,
        payload,
        { headers }
      );
      console.log("Datos crudos del backend:", response.data);
      const data = response?.data || {};

      setKpis({
        totalEstudiantes: data.kpis?.totalEstudiantes || 0,
        totalAsistencias: data.kpis?.totalAsistencias || 0,
        promedioAsistencia: data.kpis?.promedioAsistencia || 0,
        materiaMayorAsistencia: data.kpis?.materiaMayorAsistencia || "-",
        materiaMenorAsistencia: data.kpis?.materiaMenorAsistencia || "-",
      });

      setEstudiantesPorMateria(data.estudiantesPorMateria || []);
      setAsistenciasPorMateria(data.asistenciasPorMateria || []);
      setEstudiantesPorPrograma(data.estudiantesPorPrograma || []);
      setAsistenciasPorPrograma(data.asistenciasPorPrograma || []);
      setEstudiantesPorMes(data.estudiantesPorMes || []);
      setAsistenciasPorMes(data.asistenciasPorMes || []);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
      // En caso de error, mantener datos vacíos o mostrar mensaje
      setKpis({
        totalEstudiantes: 0,
        totalAsistencias: 0,
        promedioAsistencia: 0,
        materiaMayorAsistencia: "-",
        materiaMenorAsistencia: "-",
      });
      setEstudiantesPorMateria([]);
      setAsistenciasPorMateria([]);
      setEstudiantesPorPrograma([]);
      setAsistenciasPorPrograma([]);
      setEstudiantesPorMes([]);
      setAsistenciasPorMes([]);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial al abrir la página
  useEffect(() => {
    const init = async () => {
      try {
        // Carga catálogos generales (sedes)
        await cargarCatalogos();
        // Carga inicial de estadísticas (todas las sedes, semestre actual)
        await cargarDesdeAPI();
      } catch (error) {
        console.error("Error durante la carga inicial:", error);
      }
    };
    init();
  }, []);

  // Actualiza catálogos dependientes al cambiar la sede
  useEffect(() => {
    // Si se selecciona "Todas", recargamos todo nuevamente
    if (filtros.sede === "") {
      // Solo limpiar dependientes y mostrar estadísticas globales
      setSemestres([]);
      setMaterias([]);
      setProgramas([]);
      cargarDesdeAPI();    // estadísticas globales
      return;
    }

    if (!filtros.sede) return; // si aún no hay sede, no hace nada

      const actualizarCatalogosPorSede = async () => {
        try {
          const token = await decryptTokenFromSessionStorage();
          const headers = { Authorization: `Bearer ${token}` };
          const sedeId = Number(filtros.sede);

          // Cargar Semestres de la sede seleccionada
          const respSem = await axios.get(
            `${process.env.REACT_APP_API_URL}/wizard/semestre/${filtros.sede}/semestre_sede/`,
            { headers }
          );
          setSemestres(respSem.data || []);

          // Cargar facultades
          const respFacultades = await Api_facultades_sede.facultades_por_sede(filtros.sede);
          setFacultades(respFacultades || []);  

          // Cargar materias (usando endpoint de estadísticas si aplica)
          const payloadMaterias = { sede_id: sedeId };
          const respStats = await axios.post(
            `${process.env.REACT_APP_API_URL}/reportes/estadisticas_monitorias/estadisticas_monitorias/`,
            payloadMaterias,
            { headers }
          );

          const mats = respStats?.data?.estudiantesPorMateria || [];

          // Normalizamos y eliminamos duplicados
          const materiasUnicas = [
            ...new Map(
              mats
                .filter(m => m.materia) // solo las que tienen nombre
                .map(m => [m.materia.trim().toUpperCase(), m.materia.trim()])
            ).values()
          ];

          setMaterias(materiasUnicas);          

          // Cargar programas filtrados por sede
          const respProgramas = await axios.get(
            `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_programas/`,
            { headers }
          );
          if (Array.isArray(respProgramas.data)) {
            const lista = respProgramas.data.filter(
              (p) => Number(p.id_sede) === sedeId
            );
            const programasFormateados = lista.map((p) => {
              const jornadaLabel = p.jornada && p.jornada.toUpperCase().includes("DIUR") ? "D" : "N";
              return `${p.nombre} (${jornadaLabel})`;
            });
            
            setProgramas([...new Set(programasFormateados)]);
          }
          
        } catch (error) {
          console.error("Error actualizando catálogos por sede:", error);
        }
      };

    actualizarCatalogosPorSede();
  }, [filtros.sede]);

  // Actualizar programas al cambiar facultad (encadenado por sede + facultad)
  useEffect(() => {
    const actualizarProgramasPorFacultad = async () => {
      try {
        const sedeId = filtros.sede ? Number(filtros.sede) : null;
        const facId = filtros.facultad ? Number(filtros.facultad) : null;
        let lista = allProgramas || [];
        if (sedeId) {
          lista = lista.filter((p) => {
            const s1 = p?.id_sede;
            const s2 = p?.id_sede?.id;
            const s3 = p?.id_sede_id;
            return s1 === sedeId || s2 === sedeId || s3 === sedeId;
          });
        }
        if (facId) {
          lista = lista.filter((p) => {
            const f1 = p?.id_facultad;
            const f2 = p?.id_facultad?.id;
            const f3 = p?.id_facultad_id;
            return f1 === facId || f2 === facId || f3 === facId;
          });
        }
        setProgramas([...new Set(lista.map((p) => p.nombre).filter(Boolean))]);
      } catch (error) {
        console.error("Error actualizando programas por facultad:", error);
      }
    };

    // reiniciar programa cuando cambia facultad
    setFiltros((prev) => ({ ...prev, programa: "" }));
    actualizarProgramasPorFacultad();
  }, [filtros.facultad]);


  // Recarga de estadísticas al aplicar filtros
  useEffect(() => {
    // Solo recarga si hay sede seleccionada y se ha tocado algún filtro adicional
    if (
      filtros.sede &&
      (filtros.semestre || filtros.facultad || filtros.materia || filtros.programa)
    ) {
      cargarDesdeAPI();
    }
  }, [filtros.semestre, filtros.facultad, filtros.materia, filtros.programa]);  

  const onFiltro = (e) => {
    const { name, value } = e.target;
  
    setFiltros((prev) => {
      // Si cambia la sede
      if (name === "sede") {
        // Si selecciona “Todas”
        if (value === "") {
          setSemestres([]);
          setMaterias([]);
          setProgramas([]);
          cargarDesdeAPI(); // global
          return { sede: "", semestre: "", facultad: "", materia: "", programa: "" };
        }
  
        // Si elige una sede específica
        setSemestres([]);
        setMaterias([]);
        setProgramas([]);
        return { sede: value, semestre: "", facultad: "", materia: "", programa: "" };
      }
  
      // Otros filtros normales
      return { ...prev, [name]: value };
    });
  };

  const exportCSVHeaders = [
    { label: "Materia", key: "materia" },
    { label: "Estudiantes", key: "asistentes" },
  ];

  const csvEstudiantesPorMateria = useMemo(() => 
    (estudiantesPorMateria || []).map((d) => ({ materia: d.materia, asistentes: d.asistentes })), 
    [estudiantesPorMateria]
  );

  const exportExcel = async () => {
    const schema = [
      { column: "Materia", type: String, value: (r) => r.materia },
      { column: "Asistentes", type: Number, value: (r) => r.asistentes },
    ];
    await writeXlsxFile(estudiantesPorMateria, { 
      schema, 
      fileName: `estadisticas_monitorias_${new Date().toISOString().split('T')[0]}.xlsx` 
    });
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`estadisticas_monitorias_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF. Por favor, intente nuevamente.");
    }
  };

  return (
    <Col className="contenido_children">
      <Row className="containerRow">
        <Container fluid ref={reportRef}>
          <Row style={{ marginBottom: 12 }}>
            <Col><h4>Estadísticas de Monitorías Académicas</h4></Col>
          </Row>

          {/* Filtros */}
          <Card style={{ marginBottom: 12 }}>
            <Card.Body>
              <Row>
                <Col md={2} style={{ marginBottom: 8 }}>
                  <Form.Label>Sede</Form.Label>
                  <Form.Select 
                    name="sede" 
                    value={filtros.sede}
                    onChange={onFiltro}
                    disabled={loading}
                  >
                    <option value="">Todas</option>
                    {(sedes || []).map((s) => (
                      <option key={s.id} value={s.id}>{s.nombre}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} style={{ marginBottom: 8 }}>
                  <Form.Label>Semestre</Form.Label>
                  <Form.Select 
                    name="semestre" 
                    value={filtros.semestre || (filtros.sede && semestres.length > 0 ? semestres[0].id : "")} 
                    onChange={onFiltro}
                    disabled={loading || !filtros.sede}
                  >
                    {/* Opción por defecto "Actual" solo si no hay sede */}
                    {!filtros.sede && <option value="">Actual</option>}

                    {semestres.map((s) => (
                      <option key={s.id} value={s.id}>{s.nombre}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} style={{ marginBottom: 8 }}>
                  <Form.Label>Facultad</Form.Label>
                  <Form.Select 
                    name="facultad" 
                    value={filtros.facultad || ""} 
                    onChange={onFiltro}
                    disabled={loading || !filtros.sede}
                  >
                    <option value="">Todas</option>
                    {facultades.map((f) => (
                      <option key={f.id} value={f.id}>{f.nombre}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} style={{ marginBottom: 8 }}>
                  <Form.Label>Materia</Form.Label>
                  <Form.Select 
                    name="materia" 
                    value={filtros.materia} 
                    onChange={onFiltro}
                    disabled={loading || !filtros.sede}
                  >
                    <option value="">Todas</option> 
                    {materias.map((m, idx) => (
                      <option key={idx} value={m}>{m}</option> 
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} style={{ marginBottom: 8 }}>
                  <Form.Label>Programa Académico</Form.Label>
                  <Form.Select 
                    name="programa" 
                    value={filtros.programa} 
                    onChange={onFiltro}
                    disabled={loading || !filtros.sede}
                  >
                    <option value="">Todos</option>
                    {programas.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button disabled={loading} onClick={cargarDesdeAPI}>
                    {loading ? "Cargando..." : "Filtrar datos"}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            <Col md={3} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Body>
                  <div style={{ fontSize: 12, color: "#666" }}>Total estudiantes</div>
                  <div style={{ fontSize: 24, fontWeight: 700, display:'flex', alignItems:'center', gap:8 }}>
                    {kpis.totalEstudiantes}                    
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Body>
                  <div style={{ fontSize: 12, color: "#666" }}>Total asistencias</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{kpis.totalAsistencias}</div>
                </Card.Body>
              </Card>
            </Col>            
            <Col md={3} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Body>
                  <div style={{ fontSize: 12, color: "#666" }}>Mayor / Menor asistencia</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{kpis.materiaMayorAsistencia}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>{kpis.materiaMenorAsistencia}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Estudiantes por materia</Card.Header>
                <Card.Body style={{ height: 450 }}>
                  {estudiantesPorMateria.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={estudiantesPorMateria} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
                        <XAxis 
                          dataKey="materia" 
                          angle={-65}
                          textAnchor="end"
                          height={100}
                          interval={0}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="asistentes" fill="#E30613" maxBarSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Asistencias por materia</Card.Header>
                <Card.Body style={{ height: 450 }}>
                  {asistenciasPorMateria.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={asistenciasPorMateria} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
                        <XAxis 
                          dataKey="materia" 
                          angle={-65}
                          textAnchor="end"
                          height={100}
                          interval={0}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="asistentes" fill="#E30613" maxBarSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>            
          </Row>

          <Row>
            <Col lg={6} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Estudiantes por programa</Card.Header>
                <Card.Body style={{ height: 500 }}>
                  {estudiantesPorPrograma.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
                          <Pie
                            dataKey="valor"
                            data={estudiantesPorPrograma.filter(p => p && p.valor > 0 && p.programa)}
                            nameKey="programa"
                            outerRadius={120}
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
                              const RADIAN = Math.PI / 180;
                              const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="white"
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  style={{ fontWeight: 'bold', fontSize: 14 }}
                                >
                                  {`${(percent * 100).toFixed(0)}%`}
                                </text>
                              );  
                            }}
                        >
                            {estudiantesPorPrograma.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ maxHeight: 60, overflowY: 'auto' }} />
                    </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Asistencias por programa</Card.Header>
                <Card.Body style={{ height: 500 }}>
                  {asistenciasPorPrograma.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                          <Pie
                            dataKey="valor"
                            data={asistenciasPorPrograma}
                            nameKey="programa"
                            outerRadius={120}
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
                              const RADIAN = Math.PI / 180;
                              const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="white"
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  style={{ fontWeight: 'bold', fontSize: 14 }}
                                >
                                  {`${(percent * 100).toFixed(0)}%`}
                                </text>
                              );  
                            }}
                        >
                            {asistenciasPorPrograma.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ maxHeight: 60, overflowY: 'auto' }} />
                    </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>            

          <Row>
            <Col lg={12} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Evolución cantidad de Estudiante</Card.Header>
                <Card.Body style={{ height: 370 }}>
                  {estudiantesPorMes.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={estudiantesPorMes}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="valor" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{ marginBottom: 12 }}>
              <Card>
                <Card.Header>Evolución cantidad de asistencias</Card.Header>
                <Card.Body style={{ height: 370 }}>
                  {asistenciasPorMes.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={asistenciasPorMes}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="valor" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: "center", paddingTop: 100 }}>No hay datos disponibles</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginTop: 8, padding: 10 }}>
              <Button onClick={exportExcel} disabled={loading} style={{ marginRight: 8 }}>
                Exportar Excel
              </Button>
              <Button onClick={exportPDF} disabled={loading} variant="danger">
                Exportar PDF
              </Button>
            </Col>
          </Row>
        </Container>
      </Row>
    </Col>
  );
};

export default EstadisticasMonitorias;

