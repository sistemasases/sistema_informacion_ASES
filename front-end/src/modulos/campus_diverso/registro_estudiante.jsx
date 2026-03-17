import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import "../../Scss/campus_diverso/campus_diverso.css";
import DiversidadSexual from "./components/diversidadSexual";
import axios from "axios";
import InformacionGeneral from "./components/informacionGeneral";
import IngresoDatosBasicos from "./components/ingresoDatosBasicos";
import InformacionAcademica from "./components/informacionAcademica";
import DocumentosAutorizacion from "./components/documentosAutorizacion";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";
import FooterCampusDos from "./components/footerCampusDos";
import AgradeciemintoEncuesta from "./components/agradecimientoEncuesta";

const Registro_estudiante = () => {
  const [showEstamentoModal, setShowEstamentoModal] = useState(false);
  const [showInitialEstamentoModal, setShowInitialEstamentoModal] =
    useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const handleClose2 = () => setShow(false);
  const [show, setShow] = useState(false);
  const [showModalAutorizacion, setShowModalAutorizacion] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para mostrar el componente
  const headers = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  //cant de caracteres para el formulario
  const maxLengthBasicInput = 50; // Límite de caracteres
  const maxLengthTextAreas = 150;
  const maxLengthUniqueDigit = 1;
  const maxLengthNumber = 20;

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [state, set_state] = useState({
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

    //Diversidad sexual
    expresiones_de_genero: [],
    recibir_orientacion_cambio_en_documento: false,
    cambio_nombre_sexo_documento: "",
    pronombres: [],
    orientaciones_sexuales: [],
    respuestas_cambio_documento: [],
    identidades_de_genero: [],

    //Documentos autorización
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

    //Informacion académica
    sedes: [],
    programas: [],
    codigo_estudiante: "",
    semestre_academico: "",
    pertenencia_univalle: true,
    estamentos: [],

    //Informacion general
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
  });

  const [isLoading, setIsLoading] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //Persona
  const [razasOptions, setRazasOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [estadocivilOptions, setEstadoCivilOptions] = useState([]);
  const [zonaResidencialOptions, setZonaResidencialOptions] = useState([]);
  const [identidadEtnicoRacialOptions, setIdentidadEtnicoRacialOptions] =
    useState([]);
  const [sexoAsignadoOptions, setSexoAsignadoOptions] = useState([]);

  // Diversidad sexual
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [pronombresOptions, setPronombresOptions] = useState([]);
  const [expresionesOptions, setExpresionesOptions] = useState([]);
  const [identidadesGeneroOptions, setIdentidadesGeneroOptions] = useState([]);
  // Información académica
  const [estamentoOptions, setEstamentoOptions] = useState([]);
  const [sedeOptions, setSedeOptions] = useState([]);
  const [programaOptions, setProgramaOptions] = useState([]);

  //Informacion general
  const [factoresOptions, setFactoresOptions] = useState([]);
  const [fuentesOptions, setFuentesOptions] = useState([]);
  const [redesOptions, setRedesOptions] = useState([]);
  const [regimenEpsOptions, setRegimenEpsOptions] = useState([]);
  const [decisionEncuentroInicialOptions, setDecisionENcuentroInicialOptions] =
    useState([]);

  //documentos autorizacion
  const [apgarpregunta1Options, setApgarPregunta1Options] = useState([]);
  const [apgarpregunta2Options, setApgarPregunta2Options] = useState([]);
  const [apgarpregunta3Options, setApgarPregunta3Options] = useState([]);
  const [apgarpregunta4Options, setApgarPregunta4Options] = useState([]);
  const [apgarpregunta5Options, setApgarPregunta5Options] = useState([]);
  const [apgarpregunta6Options, setApgarPregunta6Options] = useState([]);
  const [apgarpregunta7Options, setApgarPregunta7Options] = useState([]);

  // Getters de las listas
  useEffect(() => {
    Promise.all([
      axios.get(
        `${process.env.REACT_APP_API_URL}/persona/pertenencia_grupo_poblacional/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/expresion-genero/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/pronombre/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/respuesta-cambio-documento/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/orientacion-sexual/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/diversidad-sexual/identidad-genero/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-academica/estamento/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-general/factor-riesgo/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-general/fuente-ingresos/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-general/red-apoyo/`
      ),
      axios.get(`${process.env.REACT_APP_API_URL}/persona/tipo-documento/`),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-academica/programa/`
      ),
      axios.get(`${process.env.REACT_APP_API_URL}/informacion-academica/sede/`),
      axios.get(`${process.env.REACT_APP_API_URL}/persona/estado-civil/`),
      axios.get(`${process.env.REACT_APP_API_URL}/persona/zona-residencia/`),
      axios.get(
        `${process.env.REACT_APP_API_URL}/persona/identidad-etnico-racial/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-general/regimen-eps/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/informacion-general/decision-encuentro-inicial/`
      ),
      axios.get(`${process.env.REACT_APP_API_URL}/persona/sexo-asignado/`),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta1/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta2/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta3/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta4/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta5/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta6/`
      ),
      axios.get(
        `${process.env.REACT_APP_API_URL}/documentos-autorizacion/apgar-pregunta7/`
      ),
    ])
      .then((responses) => {
        //persona
        const [
          grupoPoblacionResponse,
          expresionesResponse,
          pronomeopcionesResponse,
          respuestaCambioDocumentoResponse,
          orientacionResponse,
          identiadesGeneroResponse,
          estamentoResponse,
          factorResponse,
          fuenteResponse,
          redResponse,
          tipoDocumentoResponse,
          ProgramaResponse,
          SedeResponse,
          EstadoCivilResponse,
          ZonaResidencialResponse,
          IdentidadEtnicoRacialResponse,
          RegimenEpsResponse,
          DecisionEncuentroInicialResponse,
          SexoAsignadoResponse,
          ApgarPregunta1Response,
          ApgarPregunta2Response,
          ApgarPregunta3Response,
          ApgarPregunta4Response,
          ApgarPregunta5Response,
          ApgarPregunta6Response,
          ApgarPregunta7Response,
        ] = responses;

        const grupoPoblacionOpciones = grupoPoblacionResponse.data.map(
          (item) => ({
            value: item.id_grupo_poblacional,
            label: item.nombre_grupo_poblacional,
          })
        );

        const expresionesOpciones = expresionesResponse.data.map((item) => ({
          value: item.id_expresion_genero,
          label: item.nombre_expresion_genero,
        }));

        const pronombreOpciones = pronomeopcionesResponse.data.map((item) => ({
          value: item.id_pronombre,
          label: item.nombre_pronombre,
        }));

        const respuestaCambioDocumentoOpciones =
          respuestaCambioDocumentoResponse.data.map((item) => ({
            value: item.id_respuesta_cambio_documento,
            label: item.nombre_respuesta_cambio_documento,
          }));

        const orientacionOpciones = orientacionResponse.data.map((item) => ({
          value: item.id_orientacion_sexual,
          label: item.nombre_orientacion_sexual,
        }));

        const identidadesGeneroOpciones = identiadesGeneroResponse.data.map(
          (item) => ({
            value: item.id_identidad_genero,
            label: item.nombre_identidad_genero,
          })
        );

        const estamentoOpciones = estamentoResponse.data.map((item) => ({
          value: item.id_estamento,
          label: item.nombre_estamento,
        }));

        const factorOpciones = factorResponse.data.map((item) => ({
          value: item.id_factor_de_riesgo,
          label: item.nombre_factor_de_riesgo,
        }));

        const fuenteOpciones = fuenteResponse.data.map((item) => ({
          value: item.id_fuente_de_ingreso,
          label: item.nombre_fuente_de_ingreso,
        }));

        const redesOpciones = redResponse.data.map((item) => ({
          value: item.id_red_de_apoyo,
          label: item.nombre_red_de_apoyo,
        }));
        const tipoDocumentoOpciones = tipoDocumentoResponse.data.map(
          (item) => ({
            value: item.id_tipo_documento,
            label: item.nombre_tipo_documento,
          })
        );
        const programaOpciones = ProgramaResponse.data.map((item) => ({
          value: item.id_programa,
          label: item.nombre_programa,
        }));
        const sedeOpciones = SedeResponse.data.map((item) => ({
          value: item.id_sede,
          label: item.nombre_sede,
        }));
        const estadoCivilOpciones = EstadoCivilResponse.data.map((item) => ({
          value: item.id_estado_civil,
          label: item.nombre_estado_civil,
        }));
        const zonaResidenciaOpciones = ZonaResidencialResponse.data.map(
          (item) => ({
            value: item.id_zona_residencia,
            label: item.nombre_zona_residencia,
          })
        );
        const identidadEtnicoRacialOpciones =
          IdentidadEtnicoRacialResponse.data.map((item) => ({
            value: item.id_identidad_etnico_racial,
            label: item.nombre_identidad_etnico_racial,
          }));
        const regimenEpsOpciones = RegimenEpsResponse.data.map((item) => ({
          value: item.id_regimen_eps,
          label: item.nombre_regimen_eps,
        }));
        const decisionEncuentroInicialOpciones =
          DecisionEncuentroInicialResponse.data.map((item) => ({
            value: item.id_decision_encuentro_inicial,
            label: item.nombre_decision_encuentro_inicial,
          }));
        const sexoAsignadoOpciones = SexoAsignadoResponse.data.map((item) => ({
          value: item.id_sexo_asignado,
          label: item.nombre_sexo_asignado,
        }));
        const apgarPregunta1Opciones = ApgarPregunta1Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta1,
            label: item.nombre_apgar_pregunta1,
          })
        );
        const apgarPregunta2Opciones = ApgarPregunta2Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta2,
            label: item.nombre_apgar_pregunta2,
          })
        );
        const apgarPregunta3Opciones = ApgarPregunta3Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta3,
            label: item.nombre_apgar_pregunta3,
          })
        );
        const apgarPregunta4Opciones = ApgarPregunta4Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta4,
            label: item.nombre_apgar_pregunta4,
          })
        );
        const apgarPregunta5Opciones = ApgarPregunta5Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta5,
            label: item.nombre_apgar_pregunta5,
          })
        );
        const apgarPregunta6Opciones = ApgarPregunta6Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta6,
            label: item.nombre_apgar_pregunta6,
          })
        );
        const apgarPregunta7Opciones = ApgarPregunta7Response.data.map(
          (item) => ({
            value: item.id_apgar_pregunta7,
            label: item.nombre_apgar_pregunta7,
          })
        );
        setRazasOptions(grupoPoblacionOpciones);
        setExpresionesOptions(expresionesOpciones);
        setPronombresOptions(pronombreOpciones);
        setDocumentoOptions(respuestaCambioDocumentoOpciones);
        setOrientacionOptions(orientacionOpciones);
        setIdentidadesGeneroOptions(identidadesGeneroOpciones);
        setEstamentoOptions(estamentoOpciones);
        setFactoresOptions(factorOpciones);
        setFuentesOptions(fuenteOpciones);
        setRedesOptions(redesOpciones);
        setTipoDocumentoOptions(tipoDocumentoOpciones);
        setProgramaOptions(programaOpciones);
        setSedeOptions(sedeOpciones);
        setEstadoCivilOptions(estadoCivilOpciones);
        setZonaResidencialOptions(zonaResidenciaOpciones);
        setIdentidadEtnicoRacialOptions(identidadEtnicoRacialOpciones);
        setRegimenEpsOptions(regimenEpsOpciones);
        setDecisionENcuentroInicialOptions(decisionEncuentroInicialOpciones);
        setSexoAsignadoOptions(sexoAsignadoOpciones);
        setApgarPregunta1Options(apgarPregunta1Opciones);
        setApgarPregunta2Options(apgarPregunta2Opciones);
        setApgarPregunta3Options(apgarPregunta3Opciones);
        setApgarPregunta4Options(apgarPregunta4Opciones);
        setApgarPregunta5Options(apgarPregunta5Opciones);
        setApgarPregunta6Options(apgarPregunta6Opciones);
        setApgarPregunta7Options(apgarPregunta7Opciones);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener opciones:", error);
        setIsLoading(false);
      });
  }, []);

  // Efecto para detectar cuando "Estudiante de pregrado" es seleccionado y salga una alerta
  useEffect(() => {
    if (state.estamentos?.includes("Estudiante de pregrado inactivo")) {
      setShowEstamentoModal(true);
    } else {
      setShowEstamentoModal(false);
    }
  }, [state.estamentos]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    // Verifica si el cambio es para "pertenencia_univalle"
    if (name === "pertenencia_univalle" || name === "tiene_eps") {
      const booleanValue = JSON.parse(value); // Convierte el string "true" o "false" en booleano

      set_state((prevState) => ({
        ...prevState,
        [name]: booleanValue, // Asigna el valor booleano al estado
      }));
    } else {
      // Para otros checkboxes, usa el enfoque normal de "checked"
      set_state((prevState) => ({
        ...prevState,
        [name]: checked, // Asigna el valor de checked
      }));
    }

    // Cierra autorización y abre instrucciones
    if (name === "autorizacion_manejo_de_datos" && checked) {
      setShowModalAutorizacion(false);
      setShowModalInfo(true);
    }
  };

  const handleCloseEstamentoModal = () => {
    const isInitialFlow = showInitialEstamentoModal;
    setShowEstamentoModal(false);
    setShowInitialEstamentoModal(false);

    if (isInitialFlow) {
      setShowModalAutorizacion(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= maxLengthBasicInput) {
      set_state((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeTextField = (event) => {
    const { name, value } = event.target;
    if (value.length <= maxLengthTextAreas) {
      set_state((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeUniqueDigit = (event) => {
    const { name, value } = event.target;

    // Asegúrate de que el valor contenga solo dígitos y no exceda la longitud máxima
    if (/^\d*$/.test(value) && value.length <= maxLengthUniqueDigit) {
      set_state((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeNumber = (event) => {
    const { name, value } = event.target;
    // Verificar si el campo es calificacion_acompanamiento_recibido o calificacion_relacion_familiar
    if (
      name === "calificacion_acompanamiento_recibido" ||
      name === "calificacion_relacion_familiar"
    ) {
      // Validar que el valor sea entre 1 y 5, o vacío para permitir el borrado
      if (
        (value === "" || /^[1-5]$/.test(value)) &&
        value.length <= maxLengthNumber
      ) {
        set_state((prevState) => ({
          ...prevState,
          [name]: value, // Actualiza el estado con el valor permitido
        }));
      }
    } else {
      if (/^\d*$/.test(value) && value.length <= maxLengthNumber) {
        set_state((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;

    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    set_state((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const handleSelectNoMultiChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;

    set_state((prevState) => ({
      ...prevState,
      [name]: selectedOption ? [selectedOption.label] : [],
    }));
  };

  const handleSelectChange2 = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;

    // Extraer los labels de las opciones seleccionadas
    const labels = selectedOptions
      ? selectedOptions.map((option) => option.label)
      : [];

    // Actualizar el estado con los labels
    set_state((prevState) => ({
      ...prevState,
      [name]: labels,
    }));
  };

  const handleSelectChange3 = (selectedOption, fieldName) => {
    set_state((prevState) => ({
      ...prevState,
      [fieldName]: selectedOption ? [selectedOption.value] : null,
    }));
  };

  const handleArrayFieldChange = (fieldName, index, field, value) => {
    const updatedArray = [...state[fieldName]];
    updatedArray[index][field] = value;

    set_state({
      ...state,
      [fieldName]: updatedArray,
    });
  };

  const handleAgregarItem = (fieldName, newItem) => {
    set_state({
      ...state,
      [fieldName]: [...state[fieldName], newItem],
    });
  };

  const handleEliminarItem = (fieldName, index) => {
    const updatedArray = [...state[fieldName]];
    updatedArray.splice(index, 1);

    set_state({
      ...state,
      [fieldName]: updatedArray,
    });
  };

  //handle para atributos de un solo item
  const handleArrayChange = (fieldName, index, value) => {
    const updatedArray = [...state[fieldName]];
    updatedArray[index] = value;

    set_state({
      ...state,
      [fieldName]: updatedArray,
    });
  };

  const handleAddItem = (fieldName, newItem = "") => {
    set_state({
      ...state,
      [fieldName]: [...state[fieldName], newItem],
    });
  };

  const handleDeleteItem = (fieldName, index) => {
    const updatedArray = [...state[fieldName]];
    updatedArray.splice(index, 1);

    set_state({
      ...state,
      [fieldName]: updatedArray,
    });
  };

  //handle del captcha
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleClickEnviar = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón

    const requiredFields = [
      "numero_documento",
      //'tiene_eps',
      "email",
      //'pertenencia_univalle',
      "identidades_de_genero",
      "orientaciones_sexuales",
      "expresiones_de_genero",
      "identidad_etnico_racial",
      "estado_civil",
      "Ocupaciones_actules",
      //'actividades_especificas_tiempo_libre',
      "calificacion_relacion_familiar",
      "creencia_religiosa",
      "origen_descubrimiento_campus_diverso",
      // 'acompanamiento_que_recibio',
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

    if (state.pertenencia_univalle === false) {
      listFields = listFields.filter((field) => field !== "estamentos");
      console.log(listFields);
    }

    if (state.estamentos?.includes("Estudiante de posgrado")) {
      requiredFields.push(
        "codigo_estudiante",
        "semestre_academico",
        "pertenencia_univalle"
      );
      listFields.push("programas", "sedes");
    }

    const invalidFields = [
      ...requiredFields.filter((field) => !state[field]),
      ...listFields.filter(
        (field) =>
          !state[field] ||
          (Array.isArray(state[field]) && state[field].length === 0)
      ),
    ];

    const fieldNames = {
      estamentos: "Estamentos",
      semestre_academico: "Semestre académico",
      numero_documento: "Número de documento",
      tiene_eps: "¿Tiene EPS?",
      pertenencia_univalle: "Pertenencia a Univalle",
      identidades_de_genero: "Identidades de género",
      orientaciones_sexuales: "Orientaciones sexuales",
      expresiones_de_genero: "Expresiones de género",
      identidad_etnico_racial: "Identidad étnico-racial",
      estado_civil: "Estado civil",
      email: "Email",
      Ocupaciones_actules: "Ocupación actual",
      actividades_especificas_tiempo_libre: "Actividades en tiempo libre",
      redes_apoyo: "Redes de apoyo",
      calificacion_relacion_familiar: "Relación familiar",
      decision_encuentro_inicial: "Profesional para cita",
      creencia_religiosa: "Creencia religiosa",
      origen_descubrimiento_campus_diverso: "Cómo descubriste Campus Diverso",
      acompanamiento_que_recibio: "Acompañamiento recibido",
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
      setMensaje(
        `Los siguientes campos son obligatorios y están vacíos: ${formattedInvalidFields.join(
          ", "
        )}`
      );
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 25000);
      return;
    }

    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setShowErrorAlert(true);
      setMensaje("Por favor completa el reCAPTCHA.");
      return;
    }
    /* console.log('Enviando formulario con token reCAPTCHA:', recaptchaToken); */

    // Remueve elementos vacios del formulario a la base de datos
    const removeEmptyFields = (data) => {
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      );
    };

    const personaData = removeEmptyFields({
      nombre_identitario: state.nombre_identitario,
      nombre_y_apellido: state.nombre_y_apellido,
      email: state.email,
      municipio_nacimiento: state.municipio_nacimiento,
      corregimiento_nacimiento: state.corregimiento_nacimiento,

      pertenencia_grupo_poblacional: state.pertenencia_grupo_poblacional.map(
        (id) => {
          const option = razasOptions.find((o) => o.value === id);
          return option ? option.label : id;
        }
      ),

      relacion_persona_de_confianza: state.relacion_persona_de_confianza,
      apellido: state.apellido,
      tipo_documento: state.tipo_documento,
      numero_documento: state.numero_documento,
      estrato_socioeconomico: state.estrato_socioeconomico,
      ciudad_nacimiento: state.ciudad_nacimiento,
      fecha_nacimiento: state.fecha_nacimiento,
      departamento_nacimiento: state.departamento_nacimiento,
      pais_nacimiento: state.pais_nacimiento,
      ciudad_residencia: state.ciudad_residencia,
      zona_residencia: state.zona_residencia,
      direccion_residencia: state.direccion_residencia,
      barrio_residencia: state.barrio_residencia,
      comuna_barrio: state.comuna_barrio,
      telefono: state.telefono,
      estado_civil: state.estado_civil,
      identidad_etnico_racial: state.identidad_etnico_racial,
      nombre_persona_de_confianza: state.nombre_persona_de_confianza,
      telefono_persona_de_confianza: state.telefono_persona_de_confianza,
      sexo_asignado: state.sexo_asignado,
      recaptchaToken: recaptchaToken, // token captcha REVISAR--
    });

    const DiversidadSexualData = removeEmptyFields({
      recibir_orientacion_cambio_en_documento:
        state.recibir_orientacion_cambio_en_documento,
      cambio_nombre_sexo_documento: state.cambio_nombre_sexo_documento,

      expresiones_de_genero: state.expresiones_de_genero.map((id) => {
        const option = expresionesOptions.find((o) => o.value === id);
        return option ? option.label : id;
      }),

      pronombres: state.pronombres.map((id) => {
        const option = pronombresOptions.find((o) => o.value === id);
        return option ? option.label : id;
      }),

      respuestas_cambio_documento: state.respuestas_cambio_documento.map(
        (id) => {
          const option = documentoOptions.find((o) => o.value === id);
          return option ? option.label : id;
        }
      ),

      orientaciones_sexuales: state.orientaciones_sexuales.map((id) => {
        const option = orientacionOptions.find((o) => o.value === id);
        return option ? option.label : id;
      }),
      identidades_de_genero: state.identidades_de_genero.map((id) => {
        const option = identidadesGeneroOptions.find((o) => o.value === id);
        return option ? option.label : id;
      }),
    });

    const InformacionGeneralData = removeEmptyFields({
      dedicacion_externa: state.dedicacion_externa,
      factores_riesgos: state.factores_riesgos,
      observacion_general_factores_de_riesgo:
        state.observacion_general_factores_de_riesgo,
      observacion_general_fuente_de_ingresos:
        state.observacion_general_fuente_de_ingresos,
      tiene_eps: state.tiene_eps,
      nombre_eps: state.nombre_eps,
      regimen_eps: state.regimen_eps,
      tipo_entidad_acompanamiento_recibido:
        state.tipo_entidad_acompanamiento_recibido,
      calificacion_acompanamiento_recibido:
        state.calificacion_acompanamiento_recibido,
      motivo_calificacion_acompanamiento:
        state.motivo_calificacion_acompanamiento,
      actividades_especificas_tiempo_libre:
        state.actividades_especificas_tiempo_libre,
      observacion_general_actividades_especificas_tiempo_libre:
        state.observacion_general_actividades_especificas_tiempo_libre,
      observacion_general_relacion_convivencia_vivienda:
        state.observacion_general_relacion_convivencia_vivienda,
      calificacion_relacion_familiar: state.calificacion_relacion_familiar,
      observacion_general_redes_de_apoyo:
        state.observacion_general_redes_de_apoyo,
      creencia_religiosa: state.creencia_religiosa,
      decision_encuentro_inicial: state.decision_encuentro_inicial,
      observacion_horario: state.observacion_horario,
      origen_descubrimiento_campus_diverso:
        state.origen_descubrimiento_campus_diverso,
      comentarios_o_sugerencias_de_usuario:
        state.comentarios_o_sugerencias_de_usuario,
      redes_apoyo: state.redes_apoyo,
      encuentro_dias_horas: state.encuentro_dias_horas,
      fuentes_ingresos: state.fuentes_ingresos,
      acompanamiento_que_recibio: state.acompanamiento_que_recibio,
      Ocupaciones_actules: state.Ocupaciones_actules,
      profesionales_que_brindaron_atencion:
        state.profesionales_que_brindaron_atencion,
    });

    const InformacionAcademicaData = removeEmptyFields({
      sedes: state.sedes,
      programas: state.programas,
      codigo_estudiante: state.codigo_estudiante,
      semestre_academico: state.semestre_academico,
      pertenencia_univalle: state.pertenencia_univalle,
      estamentos: state.estamentos,
    });

    const DocumentosAutorizacionData = removeEmptyFields({
      autorizacion_manejo_de_datos: state.autorizacion_manejo_de_datos,
      firma_consentimiento_informado: state.firma_consentimiento_informado,
      firma_terapia_hormonal: state.firma_terapia_hormonal,
      documento_digital_y_archivo: state.documento_digital_y_archivo,
      apgar_familiar: state.apgar_familiar,
      ecomapa: state.ecomapa,
      arbol_familiar: state.arbol_familiar,
      apgar_pregunta1: state.apgar_pregunta1,
      apgar_pregunta2: state.apgar_pregunta2,
      apgar_pregunta3: state.apgar_pregunta3,
      apgar_pregunta4: state.apgar_pregunta4,
      apgar_pregunta5: state.apgar_pregunta5,
      apgar_pregunta6: state.apgar_pregunta6,
      apgar_pregunta7: state.apgar_pregunta7,
    });

    try {
      const personaResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/persona/persona/`,
        personaData
      );
      /* console.log('Respuesta del servidor (persona):', personaResponse.data); */
      const personaId = personaResponse.data.numero_documento; // Utiliza el número de documento como ID
      setIsSubmitting(true);

      try {
        const diversidadSexualResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/`,
          {
            ...DiversidadSexualData,
            id_persona: personaId,
          }
        );
        /* console.log('Respuesta del servidor (diversidad sexual):', diversidadSexualResponse.data); */

        try {
          const informacionGeneralResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/informacion-general/informacion-general/`,
            {
              ...InformacionGeneralData,
              id_persona: personaId,
            }
          );
          /*console.log('Respuesta del servidor (informacion general):', informacionGeneralResponse.data);*/

          try {
            const informacionAcademicaResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/informacion-academica/informacion-academica/`,
              {
                ...InformacionAcademicaData,
                id_persona: personaId,
              }
            );
            /*console.log('Respuesta del servidor (informacion academica):', informacionAcademicaResponse.data);*/

            try {
              const documentosAutorizacionResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/documentos-autorizacion/documentos-autorizacion/`,
                {
                  ...DocumentosAutorizacionData,
                  id_persona: personaId,
                }
              );
              /* (console.log('Respuesta del servidor (documentos autorizacion):', documentosAutorizacionResponse.data);)*/

              setShowModal(true);
              setMensaje("El formulario se envió con éxito.");
              setIsSubmitted(true);
              setIsSubmitting(false);
              setRecaptchaToken(""); // se reinicia el captcha
              // Restablecer los valores del formulario a vacío
              set_state({
                nombre_identitario: "",
                nombre_y_apellido: "",
                email: "",
                nombre_persona_confianza: "",
                tipo_documento: [],
                sexo_asignado: [],
                numero_documento: "",
                relacion_persona_de_confianza: "",
                estrato_socioeconomico: "",
                ciudad_nacimiento: "",
                fecha_nacimiento: "",
                departamento_nacimiento: "",
                pais_nacimiento: "",
                ciudad_residencia: "",
                zona_residencia: [],
                direccion_residencia: "",
                barrio_residencia: "",
                comuna_barrio: "",
                estado_civil: [],
                identidad_etnico_racial: [],
                nombre_persona_de_confianza: "",
                telefono_persona_de_confianza: "",
                pertenencia_grupo_poblacional: [],

                //Informacion academica -- por revisar
                sedes: [],
                programas: [],
                codigo_estudiante: "",
                semestre_academico: "",
                pertenencia_univalle: null,
                estamentos: [],

                //Documentos autorización
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

                //Diversidad sexual
                expresiones_de_genero: [],
                recibir_orientacion_cambio_en_documento: false,
                cambio_nombre_sexo_documento: "",
                pronombres: [],
                orientaciones_sexuales: [],
                respuestas_cambio_documento: [],
                identidades_de_genero: [],

                //Informacion general
                dedicacion_externa: "",
                tiene_eps: null,
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
              });
              setCurrentStep(0);
            } catch (documentosError) {
              console.error(
                "Error al enviar la solicitud de documentos autorización:",
                documentosError
              );
              // Manejo de error de documentos autorización
              if (documentosError.response) {
                let errorMessage =
                  "Hubo un error al enviar el formulario en los campos de documentos autorización. Por favor, inténtalo de nuevo.";
                if (documentosError.response.data) {
                  errorMessage += "\n\nDetalles del error:\n";
                  for (const field in documentosError.response.data) {
                    errorMessage += `- ${field}: ${documentosError.response.data[field][0]}\n`;
                  }
                }
                setMensaje(errorMessage);
              } else {
                setMensaje(
                  "Hubo un error al enviar el formulario de documentos autorización. Por favor, inténtalo de nuevo."
                );
              }
              setShowModal(true);
              setShowErrorAlert(true);
            }
          } catch (informacionAcademicaError) {
            console.error(
              "Error al enviar la solicitud de información académica:",
              informacionAcademicaError
            );
            // Manejo de error de información académica
            if (informacionAcademicaError.response) {
              let errorMessage =
                "Hubo un error al enviar el formulario en los campos de información académica. Por favor, inténtalo de nuevo.";
              if (informacionAcademicaError.response.data) {
                errorMessage += "\n\nDetalles del error:\n";
                for (const field in informacionAcademicaError.response.data) {
                  errorMessage += `- ${field}: ${informacionAcademicaError.response.data[field][0]}\n`;
                }
              }
              setMensaje(errorMessage);
            } else {
              setMensaje(
                "Hubo un error al enviar el formulario de información académica. Por favor, inténtalo de nuevo."
              );
            }
            setShowModal(true);
            setShowErrorAlert(true);
          }
        } catch (informacionGeneralError) {
          console.error(
            "Error al enviar la solicitud de información general:",
            informacionGeneralError
          );
          // Manejo de error de información general
          if (informacionGeneralError.response) {
            let errorMessage =
              "Hubo un error al enviar el formulario en los campos de información general. Por favor, inténtalo de nuevo.";
            if (informacionGeneralError.response.data) {
              errorMessage += "\n\nDetalles del error:\n";
              for (const field in informacionGeneralError.response.data) {
                errorMessage += `- ${field}: ${informacionGeneralError.response.data[field][0]}\n`;
              }
            }
            setMensaje(errorMessage);
          } else {
            setMensaje(
              "Hubo un error al enviar el formulario de información general. Por favor, inténtalo de nuevo."
            );
          }
          setShowModal(true);
          setShowErrorAlert(true);
        }
      } catch (diversidadError) {
        console.error(
          "Error al enviar la solicitud de diversidad sexual:",
          diversidadError
        );
        // Manejo de error de diversidad sexual
        if (diversidadError.response) {
          let errorMessage =
            "Hubo un error al enviar el formulario en los campos de diversidad sexual. Por favor, inténtalo de nuevo.";
          if (diversidadError.response.data) {
            errorMessage += "\n\nDetalles del error:\n";
            for (const field in diversidadError.response.data) {
              errorMessage += `- ${field}: ${diversidadError.response.data[field][0]}\n`;
            }
          }
          setMensaje(errorMessage);
        } else {
          setMensaje(
            "Hubo un error al enviar el formulario de diversidad sexual. Por favor, inténtalo de nuevo."
          );
        }
        setShowModal(true);
        setShowErrorAlert(true);
      }
    } catch (personaError) {
      console.error("Error al enviar la solicitud de persona:", personaError);
      if (personaError.response) {
        const { status, data } = personaError.response;
        let errorMessage =
          "Hubo un error al enviar el formulario en los campos de persona. Por favor, inténtalo de nuevo.";

        if (status === 400 && data.numero_documento) {
          // Manejar caso específico del número de documento ya existente
          errorMessage =
            "El usuario ya ha enviado el formulario. Por favor, verifique los datos.";
        } else if (data) {
          errorMessage += "\n\nDetalles del error:\n";
          for (const field in data) {
            errorMessage += `- ${field}: ${data[field][0]}\n`;
          }
        }
        setMensaje(errorMessage);
        setShowErrorAlert(true);
        return; // Evita mostrar el modal en caso de error
      }
      setShowModal(true);
      setShowErrorAlert(true);
    }
  };

  const steps = [
    /*{ component: <DocumentosAutorizacion
    state={state}
    handleCheckboxChange={handleCheckboxChange}
    handleChange={handleChange}
    /> }, */
    {
      component: (
        <InformacionAcademica
          state={state}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          estamentoOptions={estamentoOptions}
          isLoading={isLoading}
          handleSelectChange2={handleSelectChange2}
          maxLengthBasicInput={maxLengthBasicInput}
          sedeOptions={sedeOptions}
          programaOptions={programaOptions}
          handleSelectNoMultiChange={handleSelectNoMultiChange}
          handleChangeNumber={handleChangeNumber}
        />
      ),
    },
    {
      component: (
        <IngresoDatosBasicos
          state={state}
          handleChange={handleChange}
          handleChangeTextField={handleChangeTextField}
          handleChangeUniqueDigit={handleChangeUniqueDigit}
          handleChangeNumber={handleChangeNumber}
          isLoading={isLoading}
          razasOptions={razasOptions}
          handleSelectChange={handleSelectChange}
          maxLengthBasicInput={maxLengthBasicInput}
          pronombresOptions={pronombresOptions}
          tipoDocumentoOptions={tipoDocumentoOptions}
          handleSelectNoMultiChange={handleSelectNoMultiChange}
          estadocivilOptions={estadocivilOptions}
          zonaResidencialOptions={zonaResidencialOptions}
          identidadEtnicoRacialOptions={identidadEtnicoRacialOptions}
        />
      ),
    },
    {
      component: (
        <DiversidadSexual
          state={state}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          isLoading={isLoading}
          razasOptions={razasOptions}
          pronombresOptions={pronombresOptions}
          documentoOptions={documentoOptions}
          expresionesOptions={expresionesOptions}
          orientacionOptions={orientacionOptions}
          identidadesGeneroOptions={identidadesGeneroOptions}
          handleCheckboxChange={handleCheckboxChange}
          maxLengthBasicInput={maxLengthBasicInput}
          sexoAsignadoOptions={sexoAsignadoOptions}
          handleSelectNoMultiChange={handleSelectNoMultiChange}
        />
      ),
    },
    {
      component: (
        <InformacionGeneral
          state={state}
          handleChange={handleChange}
          handleChangeTextField={handleChangeTextField}
          handleSelectChange={handleSelectChange}
          handleArrayFieldChange={handleArrayFieldChange}
          handleAgregarItem={handleAgregarItem}
          handleEliminarItem={handleEliminarItem}
          handleArrayChange={handleArrayChange}
          handleAddItem={handleAddItem}
          handleDeleteItem={handleDeleteItem}
          factoresOptions={factoresOptions}
          fuentesOptions={fuentesOptions}
          redesOptions={redesOptions}
          isLoading={isLoading}
          handleSelectChange2={handleSelectChange2}
          maxLengthBasicInput={maxLengthBasicInput}
          maxLengthTextAreas={maxLengthTextAreas}
          handleChangeNumber={handleChangeNumber}
          handleCheckboxChange={handleCheckboxChange}
          regimenEpsOptions={regimenEpsOptions}
          decisionEncuentroInicialOptions={decisionEncuentroInicialOptions}
          handleSelectNoMultiChange={handleSelectNoMultiChange}
        />
      ),
    },
    {
      component: (
        <DocumentosAutorizacion
          state={state}
          handleSelectNoMultiChange={handleSelectNoMultiChange}
          isLoading={isLoading}
          apgarpregunta1Options={apgarpregunta1Options}
          apgarpregunta2Options={apgarpregunta2Options}
          apgarpregunta3Options={apgarpregunta3Options}
          apgarpregunta4Options={apgarpregunta4Options}
          apgarpregunta5Options={apgarpregunta5Options}
          apgarpregunta6Options={apgarpregunta6Options}
          apgarpregunta7Options={apgarpregunta7Options}
          handleSelectChange2={handleSelectChange2}
          handleSelectChange={handleSelectChange}
          handleSelectChange3={handleSelectChange3}
        />
      ),
    },
  ];
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <>
      {isSubmitted ? (
        // Muestra el componente de agradecimiento si se ha enviado el formulario
        <AgradeciemintoEncuesta />
      ) : (
        <>
          <div className="registro-estudiante-container">
            <Container>
              <div className="registro-estudiante-form">
                {/* Renderiza los pasos del formulario */}
                <div>{steps[currentStep].component}</div>

                {/* Captcha en el último paso */}
                <div className="buttons-container-captcha">
                  {currentStep === steps.length - 1 && (
                    <HCaptcha
                      className="captcha"
                      size="normal"
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      onVerify={handleRecaptchaChange}
                      languageOverride="es"
                    />
                  )}
                </div>

                {/* Botones para navegación entre pasos */}
                <div className="buttons-container">
                  <Button
                    className="button-inicial"
                    onClick={() => {
                      setRecaptchaToken(""); // Restablece el token de reCAPTCHA
                      prevStep(); // Función para ir al paso anterior
                    }}
                    disabled={currentStep === 0}
                  >
                    Atrás
                  </Button>

                  <Button
                    className="button-inicial"
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                  >
                    Siguiente
                  </Button>

                  {currentStep === steps.length - 1 && (
                    <Button
                      className="button-inicial"
                      onClick={handleClickEnviar}
                      disabled={!recaptchaToken || isSubmitting}
                    >
                      Enviar
                    </Button>
                  )}
                </div>

                <Modal
                  show={showModalInfo}
                  onHide={() => setShowModalInfo(false)}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Atención</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                      Por favor rellena la siguiente ficha de registro para
                      conocerte mejor. Las preguntas que tengan este símbolo (
                      <span className="simbolo-obligatorio">*</span>) son
                      obligatorias diligenciarlas.
                    </p>
                  </Modal.Body>
                </Modal>

                {/* Modal para autorización de manejo de datos */}
                <Modal
                  show={!showModalInfo && showModalAutorizacion}
                  onHide={() => setShowModalAutorizacion(false)}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header>
                    <Modal.Title>Autorización de Manejo de Datos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="custom-div-check-documentos">
                      <div className="custom-checkbox-label">
                        Autorizo de manera voluntaria, previa, explícita,
                        informada e inequívoca a la Universidad del Valle, para
                        actuar responsablemente en el tratamiento de mis datos
                        personales aquí registrados{" "}
                        <a
                          href="https://drive.google.com/file/d/1EfW4W9r1FoOnBGoscPh80lC04gMaEcTw/view"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          (Autorización de datos)
                        </a>
                        , de acuerdo con los términos establecidos en la Ley
                        Estatutaria 1581 de 2012 y la Ley 1712 de 2014.
                      </div>
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={state.autorizacion_manejo_de_datos}
                          name="autorizacion_manejo_de_datos"
                          value={state.autorizacion_manejo_de_datos}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={
                    !showModalInfo &&
                    !showModalAutorizacion &&
                    (showInitialEstamentoModal || showEstamentoModal)
                  }
                  onHide={handleCloseEstamentoModal}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Atención</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Si eres <span style={{ fontWeight: "bold", color: "red" }}>estudiante de pregrado{" "}
                        activo
                      </span>
                      <b>*</b>, accede a este {" "}
                      <a
                        href="https://forms.gle/urTenmm3zP1YuzKh7"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        enlace
                      </a>{" "}
                      y completa el formulario para ser atendidx. De lo
                      contrario, continúa diligenciando este formulario. ¡Gracias!
                      <br />
                        <span style={{ fontSize: "0.85em", display: "block", marginTop: "10px", color: "red" }}>
                          <b>*</b> Estudiante de pregrado activo: contar con matrícula (tabulado) para el periodo actual.
                        </span>
                    </p>
                  </Modal.Body>
                </Modal>

                {/* Alerta de éxito como modal */}
                <Alert
                  show={showSuccessAlert}
                  variant="success"
                  onClose={() => setShowSuccessAlert(false)}
                  dismissible
                  className="alert-style"
                >
                  <Alert.Heading>¡Éxito!</Alert.Heading>
                  <p>El formulario se envió correctamente.</p>
                </Alert>

                {/* Alerta de error */}
                <Alert
                  show={showErrorAlert}
                  variant="danger"
                  onClose={() => setShowErrorAlert(false)}
                  dismissible
                  className="alert-style"
                >
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{mensaje}</p>
                </Alert>
              </div>
            </Container>
          </div>
          <FooterCampusDos />
        </>
      )}

      {/* Modal para mostrar mensajes */}
      {showModal && (
        <div className="modal">
          <p>{mensaje}</p>
          {/* Cerrar el modal */}
        </div>
      )}
    </>
  );
};

export default Registro_estudiante;
