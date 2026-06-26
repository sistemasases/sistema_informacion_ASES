import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Alert } from "react-bootstrap";
import jsPDF from "jspdf";
import ModalSeguimientos from "./modalSeguimientos";
import Select from "react-select";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const INITIAL_CREATE_STATE = {
  nombre_identitario: "",
  nombre_orientacion_sexual: "",
  nombre_y_apellido: "",
  email: "",
  pertenencia_grupo_poblacional: [],
  relacion_persona_de_confianza: "",
  tipo_documento: [],
  sexo_asignado: [],
  numero_documento: "",
  estrato_socioeconomico: "",
  ciudad_nacimiento: "",
  fecha_nacimiento: "",
  departamento_nacimiento: "",
  corregimiento_nacimiento: "",
  municipio_nacimiento: "",
  municipio_residencia: "",
  corregimiento_residencia: "",
  pais_nacimiento: "",
  ciudad_residencia: "",
  zona_residencia: [],
  direccion_residencia: "",
  barrio_residencia: "",
  comuna_barrio: "",
  telefono: "",
  estado_civil: [],
  identidad_etnico_racial: [],
  nombre_persona_de_confianza: "",
  telefono_persona_de_confianza: "",
  expresiones_de_genero: [],
  recibir_orientacion_cambio_en_documento: false,
  cambio_nombre_sexo_documento: "",
  pronombres: [],
  orientaciones_sexuales: [],
  respuestas_cambio_documento: [],
  identidades_de_genero: [],
  autorizacion_manejo_de_datos: false,
  firma_consentimiento_informado: false,
  firma_terapia_hormonal: false,
  documento_digital_y_archivo: false,
  apgar_familiar: 0,
  ecomapa: false,
  arbol_familiar: false,
  apgar_pregunta1: [],
  apgar_pregunta2: [],
  apgar_pregunta3: [],
  apgar_pregunta4: [],
  apgar_pregunta5: [],
  apgar_pregunta6: [],
  apgar_pregunta7: [],
  sedes: [],
  programas: [],
  codigo_estudiante: "",
  semestre_academico: "",
  pertenencia_univalle: true,
  estamentos: [],
  dedicacion_externa: "",
  tiene_eps: true,
  nombre_eps: "",
  regimen_eps: [],
  tipo_entidad_acompanamiento_recibido: "",
  calificacion_acompanamiento_recibido: "",
  motivo_calificacion_acompanamiento: "",
  actividades_especificas_tiempo_libre: "",
  observacion_general_fuente_de_ingresos: "",
  calificacion_relacion_familiar: "",
  observacion_general_redes_de_apoyo: "",
  observacion_general_factores_de_riesgo: "",
  creencia_religiosa: "",
  decision_encuentro_inicial: [],
  observacion_horario: "",
  origen_descubrimiento_campus_diverso: "",
  comentarios_o_sugerencias_de_usuario: "",
  observacion_general_actividades_especificas_tiempo_libre: "",
  observacion_general_relacion_convivencia_vivienda: "",
  profesionales_que_brindaron_atencion: "",
  redes_apoyo: [],
  Ocupaciones_actules: "",
  factores_riesgos: [],
  encuentro_dias_horas: [],
  acompanamiento_que_recibio: "",
  fuentes_ingresos: [],
};

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
  isEmptyModal = false,
  onCreateSuccess,
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
  const [createStep, setCreateStep] = useState(0);
  const [createState, setCreateState] = useState(INITIAL_CREATE_STATE);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [isCreatingSubmitting, setIsCreatingSubmitting] = useState(false);
  const [createRecaptchaToken, setCreateRecaptchaToken] = useState("");
  const maxLengthBasicInput = 50;
  const maxLengthTextAreas = 150;
  const maxLengthUniqueDigit = 1;
  const maxLengthNumber = 20;

  // Estados para los modales
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedSeguimientoYear, setSelectedSeguimientoYear] = useState("");

  const seguimientoYearOptions = [
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
  ];

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

  const filteredSeguimientos = selectedSeguimientoYear
    ? (seguimientosInfo || []).filter((seguimiento) => {
        const fecha = seguimiento?.fecha ? new Date(seguimiento.fecha) : null;
        return (
          fecha && fecha.getFullYear().toString() === selectedSeguimientoYear.value
        );
      })
    : seguimientosInfo || [];

  const exportSeguimientosPDF = () => {
    if (!selectedUser || !filteredSeguimientos) return;

    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    // Encabezado
    doc.setFillColor(227, 6, 19); // Rojo institucional
    doc.rect(0, 0, 210, 10, "F");
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(227, 6, 19);
    doc.text("Reporte de Seguimientos Académicos - Campus Diverso", margin, y);
    y += 12;

    // Datos del estudiante
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    
    if (selectedUser.nombre_identitario) {
      doc.setFont("helvetica", "bold");
      doc.text("Nombre Identitario:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedUser.nombre_identitario, margin + 38, y);
      y += 6;

      doc.setFont("helvetica", "bold");
      doc.text("Nombre Legal:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedUser.nombre_y_apellido || "N/A", margin + 28, y);
      y += 6;
    } else {
      doc.setFont("helvetica", "bold");
      doc.text("Estudiante:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedUser.nombre_y_apellido || "N/A", margin + 25, y);
      y += 6;
    }

    doc.setFont("helvetica", "bold");
    doc.text("Identificación:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(selectedUser.numero_documento || "N/A", margin + 28, y);
    y += 6;

    if (selectedUser.email) {
      doc.setFont("helvetica", "bold");
      doc.text("Email:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedUser.email, margin + 15, y);
      y += 6;
    }

    if (selectedUser.telefono) {
      doc.setFont("helvetica", "bold");
      doc.text("Teléfono:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedUser.telefono, margin + 20, y);
      y += 6;
    }

    if (selectedSeguimientoYear) {
      doc.setFont("helvetica", "bold");
      doc.text("Año Filtro:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(selectedSeguimientoYear.label, margin + 22, y);
      y += 6;
    }
    
    // Línea divisoria
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, 210 - margin, y);
    y += 10;

    // Listado de seguimientos
    const sortedSeguimientos = [...filteredSeguimientos].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    if (sortedSeguimientos.length === 0) {
      doc.setFont("helvetica", "italic");
      doc.text("No se encontraron registros de seguimientos.", margin, y);
    } else {
      sortedSeguimientos.forEach((seg, index) => {
        // Verificar salto de página
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(227, 6, 19);
        doc.text(`Seguimiento #${sortedSeguimientos.length - index} - Fecha: ${seg.fecha || "S/F"}`, margin, y);
        y += 6;

        // Observación (ajuste de texto automático multi-línea)
        doc.setFont("helvetica", "bold");
        doc.setTextColor(50, 50, 50);
        doc.text("Observación:", margin, y);
        
        doc.setFont("helvetica", "normal");
        const obsLines = doc.splitTextToSize(seg.observacion || "Sin observación.", 170);
        doc.text(obsLines, margin, y + 5);
        y += 5 + (obsLines.length * 5) + 2;

        // Profesionales
        if (seg.profesional && seg.profesional.length > 0) {
          if (y > 260) {
            doc.addPage();
            y = 20;
          }
          doc.setFont("helvetica", "bold");
          doc.text("Profesionales:", margin, y);
          y += 5;
          
          doc.setFont("helvetica", "normal");
          seg.profesional.forEach((prof) => {
            doc.text(`• ${prof.nombre_profesional} (${prof.cargo_profesional})`, margin + 5, y);
            y += 5;
          });
        }
        
        y += 5;
        // Separador sutil entre registros
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, y, 210 - margin, y);
        y += 10;
      });
    }

    const nombre = selectedUser.nombre_identitario || selectedUser.nombre_y_apellido || "estudiante";
    const documento = selectedUser.numero_documento || "";
    const safeName = `${nombre}${documento ? `_${documento}` : ""}`.replace(/\s+/g, "_");
    doc.save(`seguimientos_${safeName}.pdf`);
  };

  useEffect(() => {
    if (isEmptyModal && isModalOpen) {
      setCreateStep(0);
      setCreateState(INITIAL_CREATE_STATE);
      setCreateError("");
      setCreateSuccess("");
      setIsCreatingSubmitting(false);
      setCreateRecaptchaToken("");
    }
  }, [isEmptyModal, isModalOpen]);

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= maxLengthBasicInput) {
      setCreateState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateChangeTextField = (event) => {
    const { name, value } = event.target;
    if (value.length <= maxLengthTextAreas) {
      setCreateState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateChangeUniqueDigit = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value) && value.length <= maxLengthUniqueDigit) {
      setCreateState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateChangeNumber = (event) => {
    const { name, value } = event.target;
    if (
      name === "calificacion_acompanamiento_recibido" ||
      name === "calificacion_relacion_familiar"
    ) {
      if ((value === "" || /^[1-5]$/.test(value)) && value.length <= 1) {
        setCreateState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      return;
    }

    if (/^\d*$/.test(value) && value.length <= maxLengthNumber) {
      setCreateState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "pertenencia_univalle" || name === "tiene_eps") {
      const booleanValue = JSON.parse(value);
      setCreateState((prevState) => ({
        ...prevState,
        [name]: booleanValue,
      }));
      return;
    }

    setCreateState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleCreateSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];
    setCreateState((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const handleCreateSelectNoMultiChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setCreateState((prevState) => ({
      ...prevState,
      [name]: selectedOption ? [selectedOption.label] : [],
    }));
  };

  const handleCreateSelectChange2 = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    const labels = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];
    setCreateState((prevState) => ({
      ...prevState,
      [name]: labels,
    }));
  };

  const handleCreateSelectChange3 = (selectedOption, fieldName) => {
    setCreateState((prevState) => ({
      ...prevState,
      [fieldName]: selectedOption ? [selectedOption.value] : null,
    }));
  };

  const handleCreateArrayFieldChange = (fieldName, index, field, value) => {
    const updatedArray = [...(createState[fieldName] || [])];
    if (!updatedArray[index]) {
      updatedArray[index] = { dia: "", hora: "" };
    }
    updatedArray[index][field] = value;

    setCreateState((prevState) => ({
      ...prevState,
      [fieldName]: updatedArray,
    }));
  };

  const handleCreateAddItem = (fieldName, newItem = "") => {
    setCreateState((prevState) => ({
      ...prevState,
      [fieldName]: [...(prevState[fieldName] || []), newItem],
    }));
  };

  const handleCreateDeleteItem = (fieldName, index) => {
    const updatedArray = [...(createState[fieldName] || [])];
    updatedArray.splice(index, 1);

    setCreateState((prevState) => ({
      ...prevState,
      [fieldName]: updatedArray,
    }));
  };

  const handleCreateArrayChange = (fieldName, index, value) => {
    const updatedArray = [...(createState[fieldName] || [])];
    updatedArray[index] = value;
    setCreateState((prevState) => ({
      ...prevState,
      [fieldName]: updatedArray,
    }));
  };

  const parseApiError = (prefix, error) => {
    if (!error.response) {
      return `${prefix}. Por favor, inténtalo de nuevo.`;
    }

    const { status, data } = error.response;
    let message = `${prefix}.`;

    if (status === 400 && data?.numero_documento) {
      return "El usuario ya ha enviado el formulario. Por favor, verifique los datos.";
    }

    if (data && typeof data === "object") {
      message += "\n\nDetalles del error:\n";
      Object.keys(data).forEach((field) => {
        const fieldValue = Array.isArray(data[field])
          ? data[field][0]
          : data[field];
        message += `- ${field}: ${fieldValue}\n`;
      });
    }

    return message;
  };

  const handleCreateClickEnviar = async () => {
    if (!createRecaptchaToken) {
      setCreateError("Por favor completa el reCAPTCHA.");
      setCreateSuccess("");
      return;
    }

    const requiredFields = [
      "numero_documento",
      "email",
      "identidades_de_genero",
      "orientaciones_sexuales",
      "expresiones_de_genero",
      "identidad_etnico_racial",
      "estado_civil",
      "Ocupaciones_actules",
      "calificacion_relacion_familiar",
      "creencia_religiosa",
      "origen_descubrimiento_campus_diverso",
    ];

    let listFields = [
      "estamentos",
      "identidades_de_genero",
      "orientaciones_sexuales",
      "expresiones_de_genero",
      "identidad_etnico_racial",
      "estado_civil",
      "redes_apoyo",
      "decision_encuentro_inicial",
      "factores_riesgos",
      "fuentes_ingresos",
      "sexo_asignado",
    ];

    if (createState.pertenencia_univalle === false) {
      listFields = listFields.filter((field) => field !== "estamentos");
    }

    if (createState.estamentos?.includes("Estudiante de posgrado")) {
      requiredFields.push(
        "codigo_estudiante",
        "semestre_academico",
        "pertenencia_univalle"
      );
      listFields.push("programas", "sedes");
    }

    const invalidFields = [
      ...requiredFields.filter((field) => !createState[field]),
      ...listFields.filter(
        (field) =>
          !createState[field] ||
          (Array.isArray(createState[field]) && createState[field].length === 0)
      ),
    ];

    const fieldNames = {
      estamentos: "Estamentos",
      semestre_academico: "Semestre académico",
      numero_documento: "Número de documento",
      pertenencia_univalle: "Pertenencia a Univalle",
      identidades_de_genero: "Identidades de género",
      orientaciones_sexuales: "Orientaciones sexuales",
      expresiones_de_genero: "Expresiones de género",
      identidad_etnico_racial: "Identidad étnico-racial",
      estado_civil: "Estado civil",
      email: "Email",
      Ocupaciones_actules: "Ocupación actual",
      redes_apoyo: "Redes de apoyo",
      calificacion_relacion_familiar: "Relación familiar",
      decision_encuentro_inicial: "Profesional para cita",
      creencia_religiosa: "Creencia religiosa",
      origen_descubrimiento_campus_diverso: "Cómo descubriste Campus Diverso",
      factores_riesgos: "Factores de riesgo",
      fuentes_ingresos: "Fuentes de ingreso",
      sexo_asignado: "Sexo asignado al nacer",
      programas: "Programas",
      sedes: "Sedes",
      codigo_estudiante: "Código de estudiante",
    };

    if (invalidFields.length > 0) {
      const formattedInvalidFields = invalidFields.map(
        (field) => fieldNames[field] || field
      );
      setCreateError(
        `Los siguientes campos son obligatorios y están vacíos: ${formattedInvalidFields.join(
          ", "
        )}`
      );
      setCreateSuccess("");
      return;
    }

    setIsCreatingSubmitting(true);
    setCreateError("");
    setCreateSuccess("");

    const removeEmptyFields = (data) =>
      Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined
        )
      );

    const personaData = removeEmptyFields({
      nombre_identitario: createState.nombre_identitario,
      nombre_y_apellido: createState.nombre_y_apellido,
      email: createState.email,
      municipio_nacimiento: createState.municipio_nacimiento,
      corregimiento_nacimiento: createState.corregimiento_nacimiento,
      pertenencia_grupo_poblacional: createState.pertenencia_grupo_poblacional.map(
        (id) => {
          const option = razasOptions.find((o) => o.value === id);
          return option ? option.label : id;
        }
      ),
      relacion_persona_de_confianza: createState.relacion_persona_de_confianza,
      apellido: createState.apellido,
      tipo_documento: createState.tipo_documento,
      numero_documento: createState.numero_documento,
      estrato_socioeconomico: createState.estrato_socioeconomico,
      ciudad_nacimiento: createState.ciudad_nacimiento,
      fecha_nacimiento: createState.fecha_nacimiento,
      departamento_nacimiento: createState.departamento_nacimiento,
      pais_nacimiento: createState.pais_nacimiento,
      ciudad_residencia: createState.ciudad_residencia,
      zona_residencia: createState.zona_residencia,
      direccion_residencia: createState.direccion_residencia,
      barrio_residencia: createState.barrio_residencia,
      comuna_barrio: createState.comuna_barrio,
      telefono: createState.telefono,
      estado_civil: createState.estado_civil,
      identidad_etnico_racial: createState.identidad_etnico_racial,
      nombre_persona_de_confianza: createState.nombre_persona_de_confianza,
      telefono_persona_de_confianza: createState.telefono_persona_de_confianza,
      sexo_asignado: createState.sexo_asignado,
      recaptchaToken: createRecaptchaToken,
    });

    const diversidadData = removeEmptyFields({
      recibir_orientacion_cambio_en_documento:
        createState.recibir_orientacion_cambio_en_documento,
      cambio_nombre_sexo_documento: createState.cambio_nombre_sexo_documento,
      expresiones_de_genero: createState.expresiones_de_genero,
      pronombres: createState.pronombres,
      respuestas_cambio_documento: createState.respuestas_cambio_documento,
      orientaciones_sexuales: createState.orientaciones_sexuales,
      identidades_de_genero: createState.identidades_de_genero,
    });

    const informacionGeneralData = removeEmptyFields({
      dedicacion_externa: createState.dedicacion_externa,
      factores_riesgos: createState.factores_riesgos,
      observacion_general_factores_de_riesgo:
        createState.observacion_general_factores_de_riesgo,
      observacion_general_fuente_de_ingresos:
        createState.observacion_general_fuente_de_ingresos,
      tiene_eps: createState.tiene_eps,
      nombre_eps: createState.nombre_eps,
      regimen_eps: createState.regimen_eps,
      tipo_entidad_acompanamiento_recibido:
        createState.tipo_entidad_acompanamiento_recibido,
      calificacion_acompanamiento_recibido:
        createState.calificacion_acompanamiento_recibido,
      motivo_calificacion_acompanamiento:
        createState.motivo_calificacion_acompanamiento,
      actividades_especificas_tiempo_libre:
        createState.actividades_especificas_tiempo_libre,
      observacion_general_actividades_especificas_tiempo_libre:
        createState.observacion_general_actividades_especificas_tiempo_libre,
      observacion_general_relacion_convivencia_vivienda:
        createState.observacion_general_relacion_convivencia_vivienda,
      calificacion_relacion_familiar: createState.calificacion_relacion_familiar,
      observacion_general_redes_de_apoyo:
        createState.observacion_general_redes_de_apoyo,
      creencia_religiosa: createState.creencia_religiosa,
      decision_encuentro_inicial: createState.decision_encuentro_inicial,
      observacion_horario: createState.observacion_horario,
      origen_descubrimiento_campus_diverso:
        createState.origen_descubrimiento_campus_diverso,
      comentarios_o_sugerencias_de_usuario:
        createState.comentarios_o_sugerencias_de_usuario,
      redes_apoyo: createState.redes_apoyo,
      encuentro_dias_horas: createState.encuentro_dias_horas,
      fuentes_ingresos: createState.fuentes_ingresos,
      acompanamiento_que_recibio: createState.acompanamiento_que_recibio,
      Ocupaciones_actules: createState.Ocupaciones_actules,
      profesionales_que_brindaron_atencion:
        createState.profesionales_que_brindaron_atencion,
    });

    const informacionAcademicaData = removeEmptyFields({
      sedes: createState.sedes,
      programas: createState.programas,
      codigo_estudiante: createState.codigo_estudiante,
      semestre_academico: createState.semestre_academico,
      pertenencia_univalle: createState.pertenencia_univalle,
      estamentos: createState.estamentos,
    });

    const documentosData = removeEmptyFields({
      autorizacion_manejo_de_datos: createState.autorizacion_manejo_de_datos,
      firma_consentimiento_informado: createState.firma_consentimiento_informado,
      firma_terapia_hormonal: createState.firma_terapia_hormonal,
      documento_digital_y_archivo: createState.documento_digital_y_archivo,
      apgar_familiar: createState.apgar_familiar,
      ecomapa: createState.ecomapa,
      arbol_familiar: createState.arbol_familiar,
      apgar_pregunta1: createState.apgar_pregunta1,
      apgar_pregunta2: createState.apgar_pregunta2,
      apgar_pregunta3: createState.apgar_pregunta3,
      apgar_pregunta4: createState.apgar_pregunta4,
      apgar_pregunta5: createState.apgar_pregunta5,
      apgar_pregunta6: createState.apgar_pregunta6,
      apgar_pregunta7: createState.apgar_pregunta7,
    });

    try {
      const personaResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/persona/persona/`,
        personaData
      );
      const personaId = personaResponse.data.numero_documento;

      await axios.post(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/`,
        {
          ...diversidadData,
          id_persona: personaId,
        }
      );

      await axios.post(
        `${process.env.REACT_APP_API_URL}/informacion-general/informacion-general/`,
        {
          ...informacionGeneralData,
          id_persona: personaId,
        }
      );

      await axios.post(
        `${process.env.REACT_APP_API_URL}/informacion-academica/informacion-academica/`,
        {
          ...informacionAcademicaData,
          id_persona: personaId,
        }
      );

      await axios.post(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/documentos-autorizacion/`,
        {
          ...documentosData,
          id_persona: personaId,
        }
      );

      setCreateSuccess("El formulario se envió con éxito.");
      setCreateError("");
      setCreateState(INITIAL_CREATE_STATE);
      setCreateStep(0);
      setCreateRecaptchaToken("");
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      if (!error.response) {
        setCreateError(
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo."
        );
        setCreateSuccess("");
        return;
      }

      const url = error.config?.url || "";
      if (url.includes("/persona/persona/")) {
        setCreateError(
          parseApiError(
            "Hubo un error al enviar el formulario en los campos de datos básicos",
            error
          )
        );
      } else if (url.includes("/diversidad-sexual/diversidad-sexual/")) {
        setCreateError(
          parseApiError(
            "Hubo un error al enviar el formulario en los campos de diversidad sexual",
            error
          )
        );
      } else if (url.includes("/informacion-general/informacion-general/")) {
        setCreateError(
          parseApiError(
            "Hubo un error al enviar el formulario en los campos de información general",
            error
          )
        );
      } else if (url.includes("/informacion-academica/informacion-academica/")) {
        setCreateError(
          parseApiError(
            "Hubo un error al enviar el formulario en los campos de información académica",
            error
          )
        );
      } else {
        setCreateError(
          parseApiError(
            "Hubo un error al enviar el formulario en los campos de documentos autorización",
            error
          )
        );
      }
      setCreateSuccess("");
    } finally {
      setIsCreatingSubmitting(false);
    }
  };

  if (isEmptyModal) {
    const titles = [
      "Información Académica",
      "Datos Básicos",
      "Información de Diversidad Sexual",
      "Información General",
      "Documentos Autorización",
    ];

    return (
      <Modal
        className="registro-estudiante-form-modal-consulta"
        show={isModalOpen}
        onHide={closeModal}
        size="lg"
      >
        <Modal.Header className="custom-modal-header d-flex justify-content-between align-items-start">
          <Modal.Title className="h3">{titles[createStep]}</Modal.Title>
          <Button
            className="btn-action boton-cerrar ms-auto"
            onClick={closeModal}
            disabled={isCreatingSubmitting}
          >
            <CloseIcon /> Cerrar
          </Button>
        </Modal.Header>
        <Modal.Body>
          {createError && (
            <Alert variant="danger" style={{ whiteSpace: "pre-line" }}>
              {createError}
            </Alert>
          )}
          {createSuccess && <Alert variant="success">{createSuccess}</Alert>}

          <Container>
            <Row>
              {/* Paso 0: Información Académica */}
              {createStep === 0 && (
                <div className="div-scroll" style={{ width: "100%" }}>
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="custom-div-check-documentos">
                        <div className="custom-checkbox-label">¿Pertenece a la Universidad del Valle?<span className="simbolo-obligatorio"> *</span></div>
                        <label className="custom-radio">
                          <input type="radio" name="pertenencia_univalle" value={true} checked={createState.pertenencia_univalle === true} onChange={handleCreateCheckboxChange} />
                          Sí
                        </label>
                        <label className="custom-radio">
                          <input type="radio" name="pertenencia_univalle" value={false} checked={createState.pertenencia_univalle === false} onChange={handleCreateCheckboxChange} />
                          No
                        </label>
                      </div>
                      <div>
                        <label className="custom-div">Estamentos{createState.pertenencia_univalle !== false && <span className="simbolo-obligatorio"> *</span>}</label>
                        <Select className="create-select" name="estamentos" placeholder="Seleccione estamentos" options={estamentoOptions || []} value={estamentoOptions?.find((o) => o.label === createState.estamentos?.[0]) || null} onChange={handleCreateSelectNoMultiChange} isDisabled={createState.pertenencia_univalle === false} />
                      </div>
                      <div>
                        <label className="custom-div">Sede{createState.pertenencia_univalle !== false && <span className="simbolo-obligatorio"> *</span>}</label>
                        <Select className="create-select" name="sedes" placeholder="Seleccione sede" options={sedeOptions || []} value={sedeOptions?.find((o) => o.label === createState.sedes?.[0]) || null} onChange={handleCreateSelectNoMultiChange} isDisabled={createState.pertenencia_univalle === false} />
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Programa{createState.pertenencia_univalle !== false && <span className="simbolo-obligatorio"> *</span>}</label>
                        <Select className="create-select" name="programas" placeholder="Seleccione programa" options={programaOptions || []} value={programaOptions?.find((o) => o.label === createState.programas?.[0]) || null} onChange={handleCreateSelectNoMultiChange} isDisabled={createState.pertenencia_univalle === false} />
                      </div>
                      <div>
                        <label className="custom-div">Código de estudiante</label>
                        <input className="input-updated" type="text" name="codigo_estudiante" placeholder="Código" value={createState.codigo_estudiante} onChange={handleCreateChangeNumber} maxLength="9" disabled={createState.pertenencia_univalle === false} />
                      </div>
                      <div>
                        <label className="custom-div">Semestre</label>
                        <input className="input-updated" type="text" name="semestre_academico" placeholder="Semestre" value={createState.semestre_academico} onChange={handleCreateChangeNumber} maxLength="2" disabled={createState.pertenencia_univalle === false} />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Paso 1: Datos Básicos */}
              {createStep === 1 && (
                <div className="div-scroll" style={{ width: "100%" }}>
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Nombre y apellido</label>
                        <input className="input-updated" type="text" name="nombre_y_apellido" placeholder="Nombre y apellido" value={createState.nombre_y_apellido} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Nombre identitario</label>
                        <input className="input-updated" type="text" name="nombre_identitario" placeholder="Nombre identitario" value={createState.nombre_identitario} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Pronombres</label>
                        <Select className="create-select" name="pronombres" placeholder="Pronombres" options={pronombresOptions || []} value={pronombresOptions?.find((o) => o.label === createState.pronombres?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Tipo de documento</label>
                        <Select className="create-select" name="tipo_documento" placeholder="Tipo de documento" options={tipoDocumentoOptions || []} value={tipoDocumentoOptions?.find((o) => o.label === createState.tipo_documento?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Número de documento<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="number" name="numero_documento" placeholder="Número de documento" value={createState.numero_documento} onChange={handleCreateChangeNumber} maxLength={maxLengthNumber} />
                      </div>
                      <div>
                        <label className="custom-div">Email<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="email" name="email" placeholder="email@ejemplo.com" value={createState.email} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      
                      <div>
                        <label className="custom-div">Teléfono</label>
                        <input className="input-updated" type="text" name="telefono" placeholder="Número telefónico" value={createState.telefono} onChange={handleCreateChangeNumber} maxLength={maxLengthNumber} />
                      </div>
                      <div>
                        <label className="custom-div">Estado civil<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="estado_civil" placeholder="Estado civil" options={estadocivilOptions || []} value={estadocivilOptions?.find((o) => o.label === createState.estado_civil?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>     
                      <div>
                        <label className="custom-div">Creencia religiosa<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="text" name="creencia_religiosa" placeholder="Creencia religiosa" value={createState.creencia_religiosa} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Identidad étnico-racial<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="identidad_etnico_racial" placeholder="Identidad étnico-racial" options={identidadEtnicoRacialOptions || []} value={identidadEtnicoRacialOptions?.find((o) => o.label === createState.identidad_etnico_racial?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>      
                      <div>
                        <label className="custom-div">Pertenencia grupo poblacional</label>
                        <Select
                          isMulti
                          className="create-select"
                          name="pertenencia_grupo_poblacional"
                          placeholder="Seleccione grupo poblacional"
                          options={razasOptions || []}
                          value={(createState.pertenencia_grupo_poblacional || []).map((label) => ({
                            label,
                            value: razasOptions?.find((o) => o.label === label)?.value,
                          }))}
                          onChange={handleCreateSelectChange}
                        />
                      </div>     
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Fecha de nacimiento</label>
                        <input className="input-updated" type="date" name="fecha_nacimiento" value={createState.fecha_nacimiento || ""} onChange={handleCreateChange} />
                      </div>
                      <div>
                        <label className="custom-div">País de nacimiento</label>
                        <input className="input-updated" type="text" name="pais_nacimiento" placeholder="País" value={createState.pais_nacimiento} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Departamento de nacimiento</label>
                        <input className="input-updated" type="text" name="departamento_nacimiento" placeholder="Departamento" value={createState.departamento_nacimiento} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Ciudad de nacimiento</label>
                        <input className="input-updated" type="text" name="ciudad_nacimiento" placeholder="Ciudad" value={createState.ciudad_nacimiento} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Corregimiento de nacimiento</label>
                        <input className="input-updated" type="text" name="corregimiento_nacimiento" placeholder="Corregimiento" value={createState.corregimiento_nacimiento} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      
                      <div>
                        <label className="custom-div">Zona de residencia</label>
                        <Select className="create-select" name="zona_residencia" placeholder="Zona de residencia" options={zonaResidencialOptions || []} value={zonaResidencialOptions?.find((o) => o.label === createState.zona_residencia?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Ciudad de residencia</label>
                        <input className="input-updated" type="text" name="ciudad_residencia" placeholder="Ciudad" value={createState.ciudad_residencia} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Dirección de residencia</label>
                        <input className="input-updated" type="text" name="direccion_residencia" placeholder="Dirección" value={createState.direccion_residencia} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Barrio de residencia</label>
                        <input className="input-updated" type="text" name="barrio_residencia" placeholder="Barrio" value={createState.barrio_residencia} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Estrato socioeconómico</label>
                        <input className="input-updated" type="text" name="estrato_socioeconomico" placeholder="Estrato" value={createState.estrato_socioeconomico} onChange={handleCreateChangeUniqueDigit} maxLength={maxLengthUniqueDigit} />
                      </div>
                      <div>
                        <label className="custom-div">Nombre de persona de confianza</label>
                        <input className="input-updated" type="text" name="nombre_persona_de_confianza" placeholder="Nombre" value={createState.nombre_persona_de_confianza} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Relación con la persona de confianza</label>
                        <input className="input-updated" type="text" name="relacion_persona_de_confianza" placeholder="Relación" value={createState.relacion_persona_de_confianza} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Número de persona de confianza</label>
                        <input className="input-updated" type="text" name="telefono_persona_de_confianza" placeholder="Número" value={createState.telefono_persona_de_confianza} onChange={handleCreateChangeNumber} maxLength={maxLengthNumber} />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Paso 2: Diversidad Sexual */}
              {createStep === 2 && (
                <div className="div-scroll" style={{ width: "100%" }}>
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Sexo asignado al nacer<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="sexo_asignado" placeholder="Sexo asignado al nacer" options={sexoAsignadoOptions || []} value={sexoAsignadoOptions?.find((o) => o.label === createState.sexo_asignado?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Identidad de género<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="identidades_de_genero" placeholder="Identidad de género" options={identidadesGeneroOptions || []} value={identidadesGeneroOptions?.find((o) => o.label === createState.identidades_de_genero?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Expresión de género<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="expresiones_de_genero" placeholder="Expresión de género" options={expresionesOptions || []} value={expresionesOptions?.find((o) => o.label === createState.expresiones_de_genero?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Orientación sexual<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="orientaciones_sexuales" placeholder="Orientación sexual" options={orientacionOptions || []} value={orientacionOptions?.find((o) => o.label === createState.orientaciones_sexuales?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">¿Cambio en documento?</label>
                        <Select className="create-select" name="respuestas_cambio_documento" placeholder="Respuesta" options={documentoOptions || []} value={documentoOptions?.find((o) => o.label === createState.respuestas_cambio_documento?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div className="custom-div-check">
                        <label className="custom-checkbox">
                          <input type="checkbox" checked={createState.recibir_orientacion_cambio_en_documento} name="recibir_orientacion_cambio_en_documento" onChange={handleCreateCheckboxChange} />
                          <span className="checkmark"></span>
                        </label>
                        <label className="custom-label">¿Deseas recibir orientación para cambio en documento?</label>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Paso 3: Información General */}
              {createStep === 3 && (
                <div className="div-scroll" style={{ width: "100%" }}>
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div className="custom-div-check-documentos">
                        <div className="custom-checkbox-label">¿Tiene EPS?</div>
                        <label className="custom-radio">
                          <input type="radio" name="tiene_eps" value={true} checked={createState.tiene_eps === true} onChange={handleCreateCheckboxChange} />
                          Sí
                        </label>
                        <label className="custom-radio">
                          <input type="radio" name="tiene_eps" value={false} checked={createState.tiene_eps === false} onChange={handleCreateCheckboxChange} />
                          No
                        </label>
                      </div>
                      {createState.tiene_eps ? (
                        <div>
                          <label className="custom-div">Nombre de la EPS</label>
                          <input className="input-updated" type="text" name="nombre_eps" placeholder="EPS" value={createState.nombre_eps} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                        </div>
                      ) : (
                        <div>
                          <label className="custom-div">¿Por qué no tiene EPS?</label>
                          <input className="input-updated" type="text" name="nombre_eps" placeholder="Motivo" value={createState.nombre_eps} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                        </div>
                      )}
                      <div>
                        <label className="custom-div">Régimen EPS</label>
                        <Select className="create-select" name="regimen_eps" placeholder="Régimen" options={regimenEpsOptions || []} value={regimenEpsOptions?.find((o) => o.label === createState.regimen_eps?.[0]) || null} onChange={handleCreateSelectNoMultiChange} isDisabled={!createState.tiene_eps} />
                      </div>
                      <div>
                        <label className="custom-div">Ocupación<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="text" name="Ocupaciones_actules" placeholder="Ocupación" value={createState.Ocupaciones_actules} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>                      
                      <div>
                        <label className="custom-div">Fuentes de ingreso<span className="simbolo-obligatorio"> *</span></label>
                        <Select isMulti className="create-select" name="fuentes_ingresos" placeholder="Fuentes de ingreso" options={fuentesOptions || []} value={(createState.fuentes_ingresos || []).map((label) => ({ label, value: fuentesOptions?.find((o) => o.label === label)?.value }))} onChange={handleCreateSelectChange2} />
                      </div>
                      <div>
                        <label className="custom-div">Factores de riesgo<span className="simbolo-obligatorio"> *</span></label>
                        <Select isMulti className="create-select" name="factores_riesgos" placeholder="Factores de riesgo" options={factoresOptions || []} value={(createState.factores_riesgos || []).map((label) => ({ label, value: factoresOptions?.find((o) => o.label === label)?.value }))} onChange={handleCreateSelectChange2} />
                      </div>
                      <div>
                        <label className="custom-div">Actividad específica en tiempo libre</label>
                        <input className="input-updated" type="text" name="actividades_especificas_tiempo_libre" placeholder="Actividad" value={createState.actividades_especificas_tiempo_libre} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Redes de apoyo<span className="simbolo-obligatorio"> *</span></label>
                        <Select isMulti className="create-select" name="redes_apoyo" placeholder="Redes de apoyo" options={redesOptions || []} value={(createState.redes_apoyo || []).map((label) => ({ label, value: redesOptions?.find((o) => o.label === label)?.value }))} onChange={handleCreateSelectChange2} />
                      </div>
                      <div>
                        <label className="custom-div">Calificación relación familiar<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="text" name="calificacion_relacion_familiar" placeholder="Calificación (1-5)" value={createState.calificacion_relacion_familiar} onChange={handleCreateChange} maxLength={1} />
                      </div>
                      <div>
                        <label className="custom-div">¿Cómo descubriste Campus Diverso?<span className="simbolo-obligatorio"> *</span></label>
                        <input className="input-updated" type="text" name="origen_descubrimiento_campus_diverso" placeholder="Origen" value={createState.origen_descubrimiento_campus_diverso} onChange={handleCreateChange} maxLength={maxLengthBasicInput} />
                      </div>
                      <div>
                        <label className="custom-div">Decisión encuentro inicial<span className="simbolo-obligatorio"> *</span></label>
                        <Select className="create-select" name="decision_encuentro_inicial" placeholder="Decisión" options={decisionEncuentroInicialOptions || []} value={decisionEncuentroInicialOptions?.find((o) => o.label === createState.decision_encuentro_inicial?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Paso 4: Documentos Autorización */}
              {createStep === 4 && (
                <div className="div-scroll" style={{ width: "100%" }}>
                  <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Apgar Pregunta 1</label>
                        <Select className="create-select" name="apgar_pregunta1" placeholder="Respuesta" options={apgarpregunta1Options || []} value={apgarpregunta1Options?.find((o) => o.label === createState.apgar_pregunta1?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Apgar Pregunta 2</label>
                        <Select className="create-select" name="apgar_pregunta2" placeholder="Respuesta" options={apgarpregunta2Options || []} value={apgarpregunta2Options?.find((o) => o.label === createState.apgar_pregunta2?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Apgar Pregunta 3</label>
                        <Select className="create-select" name="apgar_pregunta3" placeholder="Respuesta" options={apgarpregunta3Options || []} value={apgarpregunta3Options?.find((o) => o.label === createState.apgar_pregunta3?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                    </Col>
                    <Col className="form-column" xs={"10"} md={"6"}>
                      <div>
                        <label className="custom-div">Apgar Pregunta 4</label>
                        <Select className="create-select" name="apgar_pregunta4" placeholder="Respuesta" options={apgarpregunta4Options || []} value={apgarpregunta4Options?.find((o) => o.label === createState.apgar_pregunta4?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Apgar Pregunta 5</label>
                        <Select className="create-select" name="apgar_pregunta5" placeholder="Respuesta" options={apgarpregunta5Options || []} value={apgarpregunta5Options?.find((o) => o.label === createState.apgar_pregunta5?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Apgar Pregunta 6</label>
                        <Select className="create-select" name="apgar_pregunta6" placeholder="Respuesta" options={apgarpregunta6Options || []} value={apgarpregunta6Options?.find((o) => o.label === createState.apgar_pregunta6?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                      <div>
                        <label className="custom-div">Apgar Pregunta 7</label>
                        <Select className="create-select" name="apgar_pregunta7" placeholder="Respuesta" options={apgarpregunta7Options || []} value={apgarpregunta7Options?.find((o) => o.label === createState.apgar_pregunta7?.[0]) || null} onChange={handleCreateSelectNoMultiChange} />
                      </div>
                    </Col>
                  </Row>

                  {/* Captcha en el último paso */}
                  <Row className="mt-4 justify-content-center">
                    <Col xs="12" className="d-flex justify-content-center">
                      <HCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onVerify={(token) => setCreateRecaptchaToken(token)} languageOverride="es" />
                    </Col>
                  </Row>
                </div>
              )}
            </Row>
          </Container>

          {/* Botones de navegación */}
          <div className="buttons-container mt-3 d-flex gap-2">
            <Button className="btn-action btn-nav" onClick={() => setCreateStep(Math.max(createStep - 1, 0))} disabled={createStep === 0 || isCreatingSubmitting}>
              <ArrowBackIcon /> Atrás
            </Button>

            <Button className="btn-action btn-nav" onClick={() => setCreateStep(Math.min(createStep + 1, titles.length - 1))} disabled={createStep === titles.length - 1 || isCreatingSubmitting}>
              <ArrowForwardIcon /> Siguiente
            </Button>

            {createStep === titles.length - 1 && (
              <Button className="btn-action btn-guardar" onClick={handleCreateClickEnviar} disabled={isCreatingSubmitting || !createRecaptchaToken}>
                <CheckIcon /> {isCreatingSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

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
                  <Row className="mb-3">
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                      <label className="form-label">
                        Filtrar seguimientos por año
                      </label>
                      <Select
                        classNamePrefix="Select"
                        value={selectedSeguimientoYear}
                        onChange={(selectedOption) =>
                          setSelectedSeguimientoYear(selectedOption)
                        }
                        options={seguimientoYearOptions}
                        placeholder="Selecciona un año"
                        isClearable
                        styles={{
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 1000,
                          }),
                        }}
                      />
                    </Col>
                    <Col xs={12} md={4} className="d-flex align-items-end">
                      <Button
                        onClick={exportSeguimientosPDF}
                        variant="danger"
                        disabled={!filteredSeguimientos || filteredSeguimientos.length === 0}
                        style={{ height: '38px' }}
                      >
                        Exportar PDF
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <ul className="ul-style">
                      {filteredSeguimientos && filteredSeguimientos.length > 0 ? (
                        [...filteredSeguimientos]
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
