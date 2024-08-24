import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Alert  } from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import DiversidadSexual from './components/diversidadSexual';
import axios from 'axios';
import InformacionGeneral from './components/informacionGeneral';
import IngresoDatosBasicos from './components/ingresoDatosBasicos';
import InformacionAcademica from './components/informacionAcademica';
import DocumentosAutorizacion from './components/documentosAutorizacion';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";
import { FooterCampus } from './components/footerCampus';
import FooterCampusDos from './components/footerCampusDos';


  const Registro_estudiante = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const handleClose2 = () => setShow(false);
  const [show, setShow] = useState(false);

  const headers = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),  
  };
  //cant de caracteres para el formulario
  const maxLengthBasicInput = 50; // Límite de caracteres
  const maxLengthTextAreas = 150;


  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [state, set_state] = useState({
    nombre_identitario:"",
    nombre_orientacion_sexual: "",
    nombre_y_apellido:"",
    email:"",
    pertenencia_grupo_poblacional:[],
    relacion_persona_de_confianza:"",
    tipo_documento:[],
    numero_documento:"",
    estrato_socioeconomico:"",
    ciudad_nacimiento:"",
    fecha_nacimiento:"",
    departamento_nacimiento:"",
    corregimiento_nacimiento:"",
    municipio_nacimiento:"",
    municipio_residencia:"",
    corregimiento_residencia:"",
    pais_nacimiento:"",
    ciudad_residencia:"",
    zona_residencial:"",
    direccion_residencia:"",
    barrio_residencia:"",
    comuna_barrio:"",
    telefono:"",
    estado_civil:"",
    identidad_etnico_racial:"",
    nombre_persona_de_confianza:"",
    telefono_persona_de_confianza:"",


    //Diversidad sexual
    expresiones_de_genero:[],
    recibir_orientacion_cambio_en_documento: false,
    cambio_nombre_sexo_documento:"",
    pronombres:[],
    orientaciones_sexuales:[],
    respuestas_cambio_documento:[],
    identidades_de_genero:[],
    
    //Documentos autorización
    autorizacion_manejo_de_datos: false,
    firma_consentimiento_informado: false,
    firma_terapia_hormonal: false,
    documento_digital_y_archivo: false,
    apgar_familiar:0,
    ecomapa:false,
    arbol_familiar: false,

    //Informacion académica
    sede_universidad:"",
    nombre_programa_academico:"",
    codigo_estudiante:"",
    semestre_academico:"",
    pertenencia_univalle:false,
    estamentos: [],
    
    //Informacion general
    dedicacion_externa:"",
    tiene_eps:"",
    nombre_eps:"",
    regimen_eps:"",
    tipo_entidad_acompanamiento_recibido:"",
    calificacion_acompanamiento_recibido:"",
    motivo_calificacion_acompanamiento:"",
    actividades_especificas_tiempo_libre:"",
    observacion_general_fuente_de_ingresos:"",
    calificacion_relacion_familiar:"",
    observacion_general_redes_de_apoyo:"",
    observacion_general_factores_de_riesgo:"",
    creencia_religiosa:"",
    decision_encuentro_inicial_con_profesional:"",
    observacion_horario:"",
    origen_descubrimiento_campus_diverso:"",
    comentarios_o_sugerencias_de_usuario:"",
    observacion_general_actividades_especificas_tiempo_libre: "",
    observacion_general_relacion_convivencia_vivienda:"",
    profesionales_que_brindaron_atencion: "",
    redes_apoyo: [],
    Ocupaciones_actules:"",
    factores_riesgos: [],
    encuentro_dias_horas:[],
    actividades_tiempo_libre:[],
    acompanamiento_que_recibio:"",
    fuentes_ingresos:[],

  });

  const [isLoading, setIsLoading] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  //Persona
  const [razasOptions, setRazasOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);

// Diversidad sexual
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [pronombresOptions, setPronombresOptions] = useState([]);
  const [expresionesOptions, setExpresionesOptions] = useState([]);
  const [identidadesGeneroOptions, setIdentidadesGeneroOptions] = useState([]);
  const [estamentoOptions, setEstamentoOptions]= useState([]);

//Informacion general
const [factoresOptions, setFactoresOptions] = useState([]);
const [actividadesOptions, setActividadesOptions] = useState([]);
const [fuentesOptions, setFuentesOptions] = useState([]);
const [redesOptions, setRedesOptions] = useState([]);




// Getters de las listas
useEffect(() => {



  Promise.all([
    axios.get(`${process.env.REACT_APP_API_URL}/persona/pertenencia_grupo_poblacional/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/expresion-genero/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/pronombre/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/respuesta-cambio-documento/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/orientacion-sexual/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/identidad-genero/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-academica/estamento/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-general/factor-riesgo/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-general/actividad-tiempo-libre/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-general/fuente-ingresos/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-general/red-apoyo/`),
    axios.get(`${process.env.REACT_APP_API_URL}/persona/tipo-documento/`),




  ])
    .then((responses) => {
      //persona
      const [grupoPoblacionResponse, expresionesResponse, pronomeopcionesResponse,
        respuestaCambioDocumentoResponse, orientacionResponse, 
        identiadesGeneroResponse, estamentoResponse, factorResponse, 
        actividadResponse, fuenteResponse, redResponse,tipoDocumentoResponse] = responses;
      
      const grupoPoblacionOpciones = grupoPoblacionResponse.data.map((item) => ({
        value: item.id_grupo_poblacional,
        label: item.nombre_grupo_poblacional
      }));
      
      const expresionesOpciones = expresionesResponse.data.map((item) => ({
        value: item.id_expresion_genero,
        label: item.nombre_expresion_genero
      }));
      
      const pronombreOpciones = pronomeopcionesResponse.data.map((item) => ({
        value: item.id_pronombre,
        label: item.nombre_pronombre
      }));

      const respuestaCambioDocumentoOpciones = respuestaCambioDocumentoResponse.data.map((item) => ({
        value: item.id_respuesta_cambio_documento,
        label: item.nombre_respuesta_cambio_documento
      }));

      const orientacionOpciones = orientacionResponse.data.map((item) => ({
        value: item.id_orientacion_sexual,
        label: item.nombre_orientacion_sexual
      }));
      
      const identidadesGeneroOpciones = identiadesGeneroResponse.data.map((item) => ({
        value: item.id_identidad_genero,
        label: item.nombre_identidad_genero
      }));
     
      const estamentoOpciones = estamentoResponse.data.map((item) => ({
        value: item.id_estamento,
        label: item.nombre_estamento
      }));

      const factorOpciones = factorResponse.data.map((item) => ({
        value: item.id_factor_de_riesgo,
        label: item.nombre_factor_de_riesgo
      }));

      const actividadOpciones = actividadResponse.data.map((item) => ({
        value: item.id_actividad_de_tiempo_libre,
        label: item.nombre_actividad_de_tiempo_libre
      }));

      const fuenteOpciones = fuenteResponse.data.map((item) => ({
        value: item.id_fuente_de_ingreso,
        label: item.nombre_fuente_de_ingreso
      }));

      const redesOpciones = redResponse.data.map((item) => ({
        value: item.id_red_de_apoyo,
        label: item.nombre_red_de_apoyo
      }));
      const tipoDocumentoOpciones = tipoDocumentoResponse.data.map((item) => ({
        value: item.id_tipo_documento,
        label: item.nombre_tipo_documento
      }));
      setRazasOptions(grupoPoblacionOpciones);
      setExpresionesOptions(expresionesOpciones);
      setPronombresOptions(pronombreOpciones);
      setDocumentoOptions(respuestaCambioDocumentoOpciones);
      setOrientacionOptions(orientacionOpciones);
      setIdentidadesGeneroOptions(identidadesGeneroOpciones);
      setEstamentoOptions(estamentoOpciones);
      setFactoresOptions(factorOpciones);
      setActividadesOptions(actividadOpciones);
      setFuentesOptions(fuenteOpciones);
      setRedesOptions(redesOpciones);
      setTipoDocumentoOptions(tipoDocumentoOpciones);
      setIsLoading(false);
      
    })
    .catch((error) => {

      console.error('Error al obtener opciones:', error);
      setIsLoading(false);
      

    });
}, []);

const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  set_state((prevState) => ({
    ...prevState,
    [name]: checked,
  }));
  console.log(`Checkbox ${name} changed to ${checked}`);
};

const handleChange = (event) => {
  const { name, value, checked, options } = event.target;
  console.log('handleChange called:', name, value);
  console.log('Revisa el booleano', name, checked);

  const config = {
    'respuestas_cambio_documento': { isArray: true },
    'expresiones_de_genero': { isArray: true },
    'pronombres': { isArray: true },
    'pertenencia_grupo_poblacional': { isArray: true },
    'orientaciones_sexuales': { isMultiSelect: true },
  };

  const updateState = (newState) => {
    set_state({
      ...state,
      [name]: newState,
    });
  };

  if (config[name]?.isCheckbox) {
    config[name].handler(event);
    updateState(checked);
  } else if (config[name]?.isArray) {
    updateState([value]);
  } else if (config[name]?.isMultiSelect) {
    console.log("Before state update:", state.orientaciones_sexuales);
    const selectedOptions = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    const updatedOptions = state[name].includes(selectedOptions[0])
      ? state[name].filter(option => option !== selectedOptions[0])
      : [...state[name], ...selectedOptions];

    console.log("After state update:", updatedOptions);
    updateState(updatedOptions);
  } else {
    updateState(value);
  }
};



const handleSelectChange = (selectedOptions, actionMeta) => {
  const { name } = actionMeta;

  const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
  set_state(prevState => ({
    ...prevState,
    [name]: values
  }));

};

const handleSelectNoMultiChange = (selectedOption, actionMeta) => {
  const { name } = actionMeta;

  const labels = selectedOption ? [selectedOption.label] : [];

  set_state(prevState => ({
    ...prevState,
    [name]: labels
  }));

  console.log(`eventooo : ${state[name]}`);
  console.log('selectedOption no multi select', selectedOption);
  console.log('state de tipo de documento', state.tipo_documento)
};


// HANDLE SELECT EXCLUSIVO PARA ESTAMENTOS -- REVISAR DESPUES
const handleSelectChange2 = (selectedOptions, actionMeta) => {
  const { name } = actionMeta;

  // Extraer los labels de las opciones seleccionadas
  const labels = selectedOptions ? selectedOptions.map(option => option.label) : [];
  
  // Actualizar el estado con los labels
  set_state(prevState => ({
    ...prevState,
    [name]: labels
  }));
};
 

const handleSelectChange3 = (selectedOption, fieldName) => {
  // Conviértelo a un array con el valor seleccionado o un array vacío si no se selecciona nada
  console.log("selectedOption", selectedOption); // Verifica qué datos están llegando
  const labels = selectedOption ? [selectedOption.label] : [];

  // Actualiza el estado dinámicamente en función del campo proporcionado
  set_state(prevState => ({
    ...prevState,
    [fieldName]: labels
  }));
  console.log("documentoo", state.tipo_documento);
};



useEffect(() => {
  console.log("dooocumentoo", state.tipo_documento);
}, [state.tipo_documento]);


const handleArrayFieldChange = (fieldName, index, field, value) => {
  console.log(`Changing ${fieldName} at index ${index}, field ${field}, value ${value}`);

  const updatedArray = [...state[fieldName]];
  updatedArray[index][field] = value;

  set_state({
    ...state,
    [fieldName]: updatedArray,
  });
};

const handleAgregarItem = (fieldName, newItem) => {
  console.log(`Adding new item to ${fieldName}`);

  set_state({
    ...state,
    [fieldName]: [...state[fieldName], newItem],
  });
};

const handleEliminarItem = (fieldName, index) => {
  console.log(`Deleting item from ${fieldName} at index ${index}`);

  const updatedArray = [...state[fieldName]];
  updatedArray.splice(index, 1);

  set_state({
    ...state,
    [fieldName]: updatedArray,
  });
};

//handle para atributos de un solo item 
const handleArrayChange = (fieldName, index, value) => {
  console.log(`Changing ${fieldName} at index ${index}, value ${value}`);

  const updatedArray = [...state[fieldName]];
  updatedArray[index] = value;

  set_state({
    ...state,
    [fieldName]: updatedArray,
  });
};

const handleAddItem = (fieldName, newItem = '') => {
  console.log(`Adding new item to ${fieldName}`);

  set_state({
    ...state,
    [fieldName]: [...state[fieldName], newItem],
  });
};

const handleDeleteItem = (fieldName, index) => {
  console.log(`Deleting item from ${fieldName} at index ${index}`);

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

const handleSubmit = async (e) => {
  e.preventDefault();



  const requiredFields = [
    'numero_documento',
  
    // Add other required fields here
  ];



  if (!recaptchaToken) {
    setShowErrorAlert(true);
    setMensaje('Por favor completa el reCAPTCHA.');
    return;
  }
  console.log('Enviando formulario con token reCAPTCHA:', recaptchaToken);




  // Remueve elementos vacios del formulario a la base de datos
  const removeEmptyFields = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ""));
  };

  const invalidFields = requiredFields.filter(field => !state[field]);

  if (invalidFields.length > 0) {
    // alerta de campos vacíos que están en la lista de requiredFields
    setMensaje(`Los siguientes campos son obligatorios y están vacíos: ${invalidFields.join(', ')}`);
    console.log('asdasd', setMensaje);
    setTimeout(() => {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
    }, 1000); // Simulación de una solicitud exitosa después de 1 segundo
    return;
  }

  setTimeout(() => {
    // Mostrar alerta de éxito
    setShowSuccessAlert(true);
    // Ocultar después de unos segundos
    setTimeout(() => setShowSuccessAlert(false), 3000);
  }, 1000); // Simulación de una solicitud exitosa después de 1 segundo
 

  const personaData = removeEmptyFields ({
    nombre_identitario: state.nombre_identitario,
    nombre_y_apellido: state.nombre_y_apellido,
    email: state.email,
    municipio_nacimiento: state.municipio_nacimiento,
    corregimiento_nacimiento: state.corregimiento_nacimiento,

    pertenencia_grupo_poblacional: state.pertenencia_grupo_poblacional.map(id => {
      const option = razasOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),    

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
    zona_residencial: state.zona_residencial,
    direccion_residencia: state.direccion_residencia,
    barrio_residencia: state.barrio_residencia,
    comuna_barrio: state.comuna_barrio,
    telefono: state.telefono,
    estado_civil: state.estado_civil,
    identidad_etnico_racial: state.identidad_etnico_racial,
    nombre_persona_de_confianza: state.nombre_persona_de_confianza,
    telefono_persona_de_confianza: state.telefono_persona_de_confianza,
    recaptchaToken: recaptchaToken // token captcha REVISAR--
  });

  const DiversidadSexualData = removeEmptyFields ({
    recibir_orientacion_cambio_en_documento: state.recibir_orientacion_cambio_en_documento,
    cambio_nombre_sexo_documento: state.cambio_nombre_sexo_documento,

    expresiones_de_genero: state.expresiones_de_genero.map(id => {
      const option = expresionesOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),

    pronombres: state.pronombres.map(id => {
      const option = pronombresOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),

    respuestas_cambio_documento: state.respuestas_cambio_documento.map(id => {
      const option = documentoOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),

    orientaciones_sexuales: state.orientaciones_sexuales.map(id => {
      const option = orientacionOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),
    identidades_de_genero: state.identidades_de_genero.map(id => {
      const option = identidadesGeneroOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),
  });

  const InformacionGeneralData = removeEmptyFields ({
    dedicacion_externa: state.dedicacion_externa,
    factores_riesgos: state.factores_riesgos,
    observacion_general_factores_de_riesgo: state.observacion_general_factores_de_riesgo,
    observacion_general_fuente_de_ingresos: state.observacion_general_fuente_de_ingresos,
    tiene_eps: state.tiene_eps,
    nombre_eps: state.nombre_eps,
    regimen_eps: state.regimen_eps,
    tipo_entidad_acompanamiento_recibido: state.tipo_entidad_acompanamiento_recibido,
    calificacion_acompanamiento_recibido: state.calificacion_acompanamiento_recibido,
    motivo_calificacion_acompanamiento: state.motivo_calificacion_acompanamiento,
    actividades_especificas_tiempo_libre: state.actividades_especificas_tiempo_libre,
    observacion_general_actividades_especificas_tiempo_libre: state.observacion_general_actividades_especificas_tiempo_libre,
    observacion_general_relacion_convivencia_vivienda: state.observacion_general_relacion_convivencia_vivienda,
    calificacion_relacion_familiar: state.calificacion_relacion_familiar,
    observacion_general_redes_de_apoyo: state.observacion_general_redes_de_apoyo,
    creencia_religiosa: state.creencia_religiosa,
    decision_encuentro_inicial_con_profesional: state.decision_encuentro_inicial_con_profesional,
    observacion_horario: state.observacion_horario,
    origen_descubrimiento_campus_diverso: state.origen_descubrimiento_campus_diverso,
    comentarios_o_sugerencias_de_usuario: state.comentarios_o_sugerencias_de_usuario,
    redes_apoyo: state.redes_apoyo,
    encuentro_dias_horas: state.encuentro_dias_horas,
    actividades_tiempo_libre: state.actividades_tiempo_libre,
    fuentes_ingresos: state.fuentes_ingresos,
    acompanamiento_que_recibio: state.acompanamiento_que_recibio,
    Ocupaciones_actules: state.Ocupaciones_actules,
    profesionales_que_brindaron_atencion: state.profesionales_que_brindaron_atencion,
  });

  const InformacionAcademicaData = removeEmptyFields ({
    sede_universidad: state.sede_universidad,
    nombre_programa_academico: state.nombre_programa_academico,
    codigo_estudiante: state.codigo_estudiante,
    semestre_academico: state.semestre_academico,
    pertenencia_univalle: state.pertenencia_univalle,
    estamentos: state.estamentos,
  });

  const DocumentosAutorizacionData = removeEmptyFields ({
    autorizacion_manejo_de_datos: state.autorizacion_manejo_de_datos,
    firma_consentimiento_informado: state.firma_consentimiento_informado,
    firma_terapia_hormonal: state.firma_terapia_hormonal,
    documento_digital_y_archivo: state.documento_digital_y_archivo,
    apgar_familiar: state.apgar_familiar,
    ecomapa: state.ecomapa,
    arbol_familiar: state.arbol_familiar,
  });
  

  try {
    const personaResponse = await axios.post(`${process.env.REACT_APP_API_URL}/persona/persona/`, personaData);
    console.log('Respuesta del servidor (persona):', personaResponse.data);
    const personaId = personaResponse.data.numero_documento; // Utiliza el número de documento como ID
    setIsSubmitting(true);

    try {
      const diversidadSexualResponse = await axios.post(`${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/`, {
        ...DiversidadSexualData,
        id_persona: personaId,
      });
      console.log('Respuesta del servidor (diversidad sexual):', diversidadSexualResponse.data);

      try {
        const informacionGeneralResponse = await axios.post(`${process.env.REACT_APP_API_URL}/informacion-general/informacion-general/`, {
          ...InformacionGeneralData,
          id_persona: personaId,
        });
        console.log('Respuesta del servidor (informacion general):', informacionGeneralResponse.data);

        try {
          const informacionAcademicaResponse = await axios.post(`${process.env.REACT_APP_API_URL}/informacion-academica/informacion-academica/`, {
            ...InformacionAcademicaData,
            id_persona: personaId,
          });
          console.log('Respuesta del servidor (informacion academica):', informacionAcademicaResponse.data);

          try {
            const documentosAutorizacionResponse = await axios.post(`${process.env.REACT_APP_API_URL}/documentos-autorizacion/documentos-autorizacion/`, {
              ...DocumentosAutorizacionData,
              id_persona: personaId,
            });
            console.log('Respuesta del servidor (documentos autorizacion):', documentosAutorizacionResponse.data);

            setShowModal(true);
            setMensaje("El formulario se envió con éxito.");
            setIsSubmitting(false);
            setRecaptchaToken("");// se reinicia el captcha
            // Restablecer los valores del formulario a vacío
            set_state({
              nombre_identitario: "",
              nombre_y_apellido: "",
              email: "",
              nombre_persona_confianza: "",
              tipo_documento:[],
              numero_documento: "",
              relacion_persona_de_confianza: "",
              estrato_socioeconomico: "",
              ciudad_nacimiento: "",
              fecha_nacimiento: "",
              departamento_nacimiento: "",
              pais_nacimiento: "",
              ciudad_residencia: "",
              zona_residencial: "",
              direccion_residencia: "",
              barrio_residencia: "",
              comuna_barrio: "",
              estado_civil: "",
              identidad_etnico_racial: "",
              nombre_persona_de_confianza: "",
              telefono_persona_de_confianza: "",
              pertenencia_grupo_poblacional: [],
              

              //Informacion academica -- por revisar
              sede_universidad: "",
              nombre_programa_academico: "",
              codigo_estudiante: "",
              semestre_academico: "",
              pertenencia_univalle: false,
              estamentos: [],

              //Documentos autorización
              autorizacion_manejo_de_datos: false,
              firma_consentimiento_informado: false,
              firma_terapia_hormonal: false,
              documento_digital_y_archivo: false,
              apgar_familiar: 0,
              ecomapa: false,
              arbol_familiar: false,

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
              tiene_eps: "",
              nombre_eps: "",
              regimen_eps: "",
              tipo_entidad_acompanamiento_recibido: "",
              calificacion_acompanamiento_recibido: "",
              motivo_calificacion_acompanamiento: "",
              actividades_especificas_tiempo_libre: "",
              observacion_general_fuente_de_ingresos: "",
              calificacion_relacion_familiar: "",
              observacion_general_redes_de_apoyo: "",
              observacion_general_factores_de_riesgo: "",
              creencia_religiosa: "",
              decision_encuentro_inicial_con_profesional: "",
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
              actividades_tiempo_libre: [],
              acompanamiento_que_recibio: "",
              fuentes_ingresos: [],
              
            });
            setCurrentStep(0);
          } catch (documentosError) {
            console.error('Error al enviar la solicitud de documentos autorización:', documentosError);
            // Manejo de error de documentos autorización
            if (documentosError.response) {
              let errorMessage = "Hubo un error al enviar el formulario en los campos de documentos autorización. Por favor, inténtalo de nuevo.";
              if (documentosError.response.data) {
                errorMessage += "\n\nDetalles del error:\n";
                for (const field in documentosError.response.data) {
                  errorMessage += `- ${field}: ${documentosError.response.data[field][0]}\n`;
                }
              }
              setMensaje(errorMessage);
            } else {
              setMensaje("Hubo un error al enviar el formulario de documentos autorización. Por favor, inténtalo de nuevo.");
            }
            setShowModal(true);
            setShowErrorAlert(true);
          }
        } catch (informacionAcademicaError) {
          console.error('Error al enviar la solicitud de información académica:', informacionAcademicaError);
          // Manejo de error de información académica
          if (informacionAcademicaError.response) {
            let errorMessage = "Hubo un error al enviar el formulario en los campos de información académica. Por favor, inténtalo de nuevo.";
            if (informacionAcademicaError.response.data) {
              errorMessage += "\n\nDetalles del error:\n";
              for (const field in informacionAcademicaError.response.data) {
                errorMessage += `- ${field}: ${informacionAcademicaError.response.data[field][0]}\n`;
              }
            }
            setMensaje(errorMessage);
          } else {
            setMensaje("Hubo un error al enviar el formulario de información académica. Por favor, inténtalo de nuevo.");
          }
          setShowModal(true);
          setShowErrorAlert(true);
        }
      } catch (informacionGeneralError) {
        console.error('Error al enviar la solicitud de información general:', informacionGeneralError);
        // Manejo de error de información general
        if (informacionGeneralError.response) {
          let errorMessage = "Hubo un error al enviar el formulario en los campos de información general. Por favor, inténtalo de nuevo.";
          if (informacionGeneralError.response.data) {
            errorMessage += "\n\nDetalles del error:\n";
            for (const field in informacionGeneralError.response.data) {
              errorMessage += `- ${field}: ${informacionGeneralError.response.data[field][0]}\n`;
            }
          }
          setMensaje(errorMessage);
        } else {
          setMensaje("Hubo un error al enviar el formulario de información general. Por favor, inténtalo de nuevo.");
        }
        setShowModal(true);
        setShowErrorAlert(true);
      }
    } catch (diversidadError) {
      console.error('Error al enviar la solicitud de diversidad sexual:', diversidadError);
      // Manejo de error de diversidad sexual
      await axios.delete(`${process.env.REACT_APP_API_URL}/persona/persona/${personaId}`);
      console.log(`Persona con ID: ${personaId} eliminada exitosamente.`);
      if (diversidadError.response) {
        let errorMessage = "Hubo un error al enviar el formulario en los campos de diversidad sexual. Por favor, inténtalo de nuevo.";
        if (diversidadError.response.data) {
          errorMessage += "\n\nDetalles del error:\n";
          for (const field in diversidadError.response.data) {
            errorMessage += `- ${field}: ${diversidadError.response.data[field][0]}\n`;
          }
        }
        setMensaje(errorMessage);
      } else {
        setMensaje("Hubo un error al enviar el formulario de diversidad sexual. Por favor, inténtalo de nuevo.");
      }
      setShowModal(true);
      setShowErrorAlert(true);
    }
  } catch (personaError) {
    console.error('Error al enviar la solicitud de persona:', personaError);
    if (personaError.response) {
      const { status, data } = personaError.response;
      let errorMessage = "Hubo un error al enviar el formulario en los campos de persona. Por favor, inténtalo de nuevo.";
      
      if (status === 400 && data.numero_documento) {
        // Manejar caso específico del número de documento ya existente
        errorMessage = "El usuario ya ha enviado el formulario. Por favor, verifique los datos.";
      } else if (data) {
        errorMessage += "\n\nDetalles del error:\n";
        for (const field in data) {
          errorMessage += `- ${field}: ${data[field][0]}\n`;
        }
      }
      setMensaje(errorMessage);
    } else {
      setMensaje("Hubo un error al enviar el formulario de persona. Por favor, inténtalo de nuevo.");
    }
    setShowModal(true);
    setShowErrorAlert(true);
  }
};

const steps = [
  { component:   <IngresoDatosBasicos
    state={state}
    handleChange={handleChange}
    isLoading={isLoading}
    razasOptions={razasOptions}
    handleSelectChange={handleSelectChange}
    maxLengthBasicInput={maxLengthBasicInput}
    pronombresOptions={pronombresOptions}
    tipoDocumentoOptions={tipoDocumentoOptions}
    handleSelectNoMultiChange = {handleSelectNoMultiChange}
    handleSelectChange2={handleSelectChange2}
    handleSelectChange3={handleSelectChange3}
    /> },
  { component:     <DiversidadSexual
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
  /> },
  { component:   <InformacionGeneral
    state={state}
    handleChange={handleChange}
    handleSelectChange={handleSelectChange}
    handleArrayFieldChange={handleArrayFieldChange}
    handleAgregarItem={handleAgregarItem}
    handleEliminarItem={handleEliminarItem}
    handleArrayChange={handleArrayChange}
    handleAddItem={handleAddItem}
    handleDeleteItem={handleDeleteItem}
    factoresOptions={factoresOptions}
    actividadesOptions={actividadesOptions}
    fuentesOptions={fuentesOptions}
    redesOptions={redesOptions}
    isLoading={isLoading}
    handleSelectChange2={handleSelectChange2}
    maxLengthBasicInput={maxLengthBasicInput}
    maxLengthTextAreas={maxLengthTextAreas}

    /> },
    { component:   <InformacionAcademica
      state={state}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleCheckboxChange={handleCheckboxChange}
      estamentoOptions={estamentoOptions}
      isLoading={isLoading}
      handleSelectChange2={handleSelectChange2}
      maxLengthBasicInput={maxLengthBasicInput}
      /> },
  { component: <DocumentosAutorizacion
    state={state}
    handleCheckboxChange={handleCheckboxChange}
    handleChange={handleChange}
    /> },
];  const nextStep = () => {
  setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
};

const prevStep = () => {
  setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
};

  return (
    <>
    <div className='registro-estudiante-container'>
    <Container >
    <div className='registro-estudiante-form'>
      <div>{steps[currentStep].component}</div>

      <div className='buttons-container-captcha'>
  {currentStep === steps.length - 1 && (
    <ReCAPTCHA 
      className="captcha"
      size='normal'
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      onChange={handleRecaptchaChange}
    />
  )}
  </div>

 <div className='buttons-container'>
  <Button className='button-inicial' onClick={() => {
    setRecaptchaToken(''); // Restablece el token de reCAPTCHA
    prevStep(); // Llama a la función para ir al paso anterior
  }} disabled={currentStep === 0}>Atrás</Button>

  <Button className='button-inicial' onClick={nextStep} disabled={currentStep === steps.length - 1}>Siguiente</Button>

  {currentStep === steps.length - 1 && (
    <Button className="button-inicial" onClick={handleSubmit} disabled={!recaptchaToken || isSubmitting}>Enviar</Button>
  )}
</div>


      {/* Alerta de éxito como modal */}
      <Alert
        show={showSuccessAlert}
        variant="success"
        onClose={() => setShowSuccessAlert(false)}
        dismissible
        className='alert-style'
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
        className='alert-style'
      >
        <Alert.Heading>Error</Alert.Heading>
        <p>{mensaje}</p>
      </Alert>
    </div>
  </Container>

  </div>
  <FooterCampusDos/>

  </>
  );
}

export default Registro_estudiante;
