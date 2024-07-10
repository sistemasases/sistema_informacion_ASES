import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import DiversidadSexual from './components/diversidadSexual';
import axios from 'axios';
import InformacionGeneral from './components/informacionGeneral';
import IngresoDatosBasicos from './components/ingresoDatosBasicos';
import InformacionAcademica from './components/informacionAcademica';
import DocumentosAutorizacion from './components/documentosAutorizacion';

  const Registro_estudiante = () => {

  const [mensaje, setMensaje] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const [state, set_state] = useState({
    nombre_identitario:"",
    nombre_orientacion_sexual: "",
    nombre_y_apellido:"",
    email:"",
    pertenencia_grupo_poblacional:[],
    relacion_persona_de_confianza:"",
    tipo_documento:"",
    numero_documento:"",
    estrato_socioeconomico:0,
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
    profesionales_que_brindo_atencion: [],
    redes_de_apoyo: [],
    ocupaciones_actuales:[],
    factores_de_riesgo: [],
    encuentro_dias_horas:[],
    actividades_tiempo_libre:[],
    acompanamientos_recibido:[],
    convivencias_en_vivienda:[],
    fuentes_de_ingresos:[],

  });

  const [isLoading, setIsLoading] = useState(true);


  //Persona
  const [razasOptions, setRazasOptions] = useState([]);

// Diversidad sexual
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [pronombresOptions, setPronombresOptions] = useState([]);
  const [expresionesOptions, setExpresionesOptions] = useState([]);
  const [identidadesGeneroOptions, setIdentidadesGeneroOptions] = useState([]);

// Getters de las listas
useEffect(() => {
  Promise.all([
    axios.get(`${process.env.REACT_APP_API_URL}/persona/pertenencia_grupo_poblacional/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/expresion-genero/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/pronombre/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/respuesta-cambio-documento/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/orientacion-sexual/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/identidad-genero/`),

  ])
    .then((responses) => {
      //persona
      const [grupoPoblacionResponse, expresionesResponse, pronomeopcionesResponse,respuestaCambioDocumentoResponse, orientacionResponse, identiadesGeneroResponse] = responses;
      
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
         
      setRazasOptions(grupoPoblacionOpciones);
      setExpresionesOptions(expresionesOpciones);
      setPronombresOptions(pronombreOpciones);
      setDocumentoOptions(respuestaCambioDocumentoOpciones);
      setOrientacionOptions(orientacionOpciones);
      setIdentidadesGeneroOptions(identidadesGeneroOpciones);
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
  console.log(`react-select-event! : ${state[name]}`);
  console.log('selectedOptions', selectedOptions)

};
 
console.log('state.orientaciones_sexuales:', state.orientaciones_sexuales);
console.log('state.identidades:', state.identidades_de_genero);


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

const handleSubmit = async (e) => {
  e.preventDefault();


  const requiredFields = [
    'numero_documento',
  
    // Add other required fields here
  ];

  const invalidFields = requiredFields.filter(field => !state[field]);

  if (invalidFields.length > 0) {
    // alerta de campos vacíos que están en la lista de requiredFields
    alert(`Los siguientes campos son obligatorios y están vacíos: ${invalidFields.join(', ')}`);
    return;
  }
  // Remueve elementos vacios del formulario a la base de datos
  const removeEmptyFields = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ""));
  };

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
    factores_de_riesgo: state.factores_de_riesgo,
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
    redes_de_apoyo: state.redes_de_apoyo,
    encuentro_dias_horas: state.encuentro_dias_horas,
    convivencias_en_vivienda: state.convivencias_en_vivienda,
    actividades_tiempo_libre: state.actividades_tiempo_libre,
    fuentes_de_ingresos: state.fuentes_de_ingresos,
    acompanamientos_recibido: state.acompanamientos_recibido,
    ocupaciones_actuales: state.ocupaciones_actuales,
    profesionales_que_brindo_atencion: state.profesionales_que_brindo_atencion,
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
            // Restablecer los valores del formulario a vacío
            set_state({
              nombre_identitario: "",
              nombre_y_apellido: "",
              email: "",
              nombre_persona_confianza: "",
              tipo_documento: "",
              numero_documento: "",
              relacion_persona_de_confianza: "",
              estrato_socioeconomico: 0,
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
              profesionales_que_brindo_atencion: [],
              redes_de_apoyo: [],
              ocupaciones_actuales: [],
              factores_de_riesgo: [],
              encuentro_dias_horas: [],
              actividades_tiempo_libre: [],
              acompanamientos_recibido: [],
              convivencias_en_vivienda: [],
              fuentes_de_ingresos: [],
            });
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
    }
  } catch (personaError) {
    console.error('Error al enviar la solicitud de persona:', personaError);
    // Manejo de error de persona
    if (personaError.response) {
      let errorMessage = "Hubo un error al enviar el formulario en los campos de persona. Por favor, inténtalo de nuevo.";
      if (personaError.response.data) {
        errorMessage += "\n\nDetalles del error:\n";
        for (const field in personaError.response.data) {
          errorMessage += `- ${field}: ${personaError.response.data[field][0]}\n`;
        }
      }
      setMensaje(errorMessage);
    } else {
      setMensaje("Hubo un error al enviar el formulario de persona. Por favor, inténtalo de nuevo.");
    }
    setShowModal(true);
  }
};


  return (
    <>

    <IngresoDatosBasicos
    state={state}
    handleChange={handleChange}
    isLoading={isLoading}
    razasOptions={razasOptions}
    handleSelectChange={handleSelectChange}
    />

    <DiversidadSexual
      state={state}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      isLoading={isLoading}
      pronombresOptions={pronombresOptions}
      documentoOptions={documentoOptions}
      expresionesOptions={expresionesOptions}
      orientacionOptions={orientacionOptions}
      identidadesGeneroOptions={identidadesGeneroOptions}
      handleCheckboxChange={handleCheckboxChange}
    />
    
    <InformacionGeneral
    state={state}
    handleChange={handleChange}
    handleSelectChange={handleSelectChange}
    factoresRiesgo={state.factores_de_riesgo}
    handleArrayFieldChange={handleArrayFieldChange}
    handleAgregarItem={handleAgregarItem}
    handleEliminarItem={handleEliminarItem}
    handleArrayChange={handleArrayChange}
    handleAddItem={handleAddItem}
    handleDeleteItem={handleDeleteItem}
    />

    <InformacionAcademica
    state={state}
    handleChange={handleChange}
    handleArrayChange={handleArrayChange}
    handleAddItem={handleAddItem}
    handleDeleteItem={handleDeleteItem}
    handleCheckboxChange={handleCheckboxChange}
    />
    <DocumentosAutorizacion
    state={state}
    handleCheckboxChange={handleCheckboxChange}
    handleChange={handleChange}
    />

      
          <Row >
          
              <Row>
            <Col className="text-center">
              <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                Enviar
              </button>
            </Col>
          </Row>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Resultado del envío</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {mensaje && (
                <div className={mensaje.startsWith("Error") ? "error-message" : "success-message"}>
                  {mensaje}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
        </>
    
  );
}

export default Registro_estudiante;
