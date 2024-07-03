import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import DiversidadSexual from './components/diversidadSexual';
import axios from 'axios';
import IngresoDatosBasicos from './components/ingresoDatosBasicos';

  const Registro_estudiante = () => {

 const [estaActivo, setEstaActivo] = useState(false);

  const [estaActivo2, setEstaActivo2] = useState(false);


  const handleCheckboxChange1 = (e) => {
    setEstaActivo(e.target.checked);
  };
  const handleCheckboxChange2 = (e) => {
    setEstaActivo2(e.target.checked);
  };

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
    pertenencia_grupo_poblacional:"",
    relacion_persona_de_confianza:"",
    tipo_documento:"",
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

    expresiones_de_genero:"",
    recibir_orientacion_cambio_en_documento: "",
    cambio_nombre_sexo_documento:"",
    pronombres:"",
    orientaciones_sexuales:[],
    respuestas_cambio_documento:"",
    identidades_de_genero:[],
    
    //Informacion académica

    sede_universidad:"",
    nombre_programa_academico:"",
    cod_univalle:"",
    semestre_academico:"",
    pertenencia_univalle:false,

    
    //Informacion general

    fecha:"",
    creacion:"",
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
    relacion_familiar:"",
    observacion_general_redes_de_apoyo:"",
    observacion_general_factores_de_riesgo:"",
    creencia_religiosa:"",
    decision_encuentro_inicial_con_profesional:"",
    observacion_horario:"",
    origen_descubrimiento_campus_diverso:"",
    comentarios_o_sugerencias_de_usuario:"",
    ocupaciones_actuales:[],


    
    





  });
  const [isLoading, setIsLoading] = useState(true);


  //Persona
  const [razasOptions, setRazasOptions] = useState([]);
  const [relacionOptions, setRelacionOptions] = useState([]);

// Diversidad sexual
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [pronombresOptions, setPronombresOptions] = useState([]);
  const [expresionesOptions, setExpresionesOptions] = useState([]);
  const [identidadesGeneroOptions, setIdentidadesGeneroOptions] = useState([]);

//Informacion general
  const [ocupacionOptions, setOcupacionOptions] = useState([]);

// Getters de las listas
useEffect(() => {
  Promise.all([
    axios.get(`${process.env.REACT_APP_API_URL}/persona/pertenencia_grupo_poblacional/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/expresion-genero/`),
    //axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/relacion_persona_confianza/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/pronombre/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/respuesta-cambio-documento/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/orientacion-sexual/`),
    axios.get(`${process.env.REACT_APP_API_URL}/diversidad-sexual/identidad-genero/`),
    //axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/ocupacion-actual/`),

  ])
    .then((responses) => {
      //persona
      const [grupoPoblacionResponse, expresionesResponse, pronomeopcionesResponse,respuestaCambioDocumentoResponse, orientacionResponse, identiadesGeneroResponse] = responses;
      const grupoPoblacionOpciones = grupoPoblacionResponse.data.map((item) => item.nombre_grupo_poblacional);
      const expresionesOpciones = expresionesResponse.data.map((item) => item.nombre_expresion_genero);
      const pronombreOpciones = pronomeopcionesResponse.data.map((item) => item.nombre_pronombre);
      const respuestaCambioDocumentoOpciones = respuestaCambioDocumentoResponse.data.map((item) => item.nombre_respuesta_cambio_documento);
      
      const orientacionOpciones = orientacionResponse.data.map((item) => ({
        value: item.id_orientacion_sexual,
        label: item.nombre_orientacion_sexual
      }));
      
      const identidadesGeneroOpciones = identiadesGeneroResponse.data.map((item) => ({
        value: item.id_identidad_genero,
        label: item.nombre_identidad_genero
      }));
    
      console.log("aquii", orientacionOpciones);
     

       /* const relacionPersonaConfianzaOpciones = relacionPersonaConfianzaResponse.data.map((item) => item.nombre_persona_confianza);
      const orientacionOpciones = orientacionResponse.data.map((item) => item.nombre_orientacion_sexual)
      const ocupacionOpciones = ocupacionResponse.data.map((item) => item.nombre_ocupacion_actual) */
      setRazasOptions(grupoPoblacionOpciones);
      setExpresionesOptions(expresionesOpciones);
      setPronombresOptions(pronombreOpciones);
      setDocumentoOptions(respuestaCambioDocumentoOpciones);
      setOrientacionOptions(orientacionOpciones);
      setIdentidadesGeneroOptions(identidadesGeneroOpciones);

      /*
      setOcupacionOptions(ocupacionOpciones); */
      setIsLoading(false);
      
    })
    .catch((error) => {

      console.error('Error al obtener opciones:', error);
      setIsLoading(false);
      

    });
}, []);


const handleChange = (event) => {
  const { name, value, checked, options } = event.target;
  console.log('handleChange called:', name, value);
  console.log('Revisa el booleano', name, checked);

  const config = {
    'recibir_orientacion_cambio_en_documento': { isCheckbox: true, handler: handleCheckboxChange2 },
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




  const handleSubmit = async (e) => {
    e.preventDefault();
  // Dividir los datos en función de ciertos campos
  const personaData = {
    nombre_identitario: state.nombre_identitario,
    nombre_y_apellido: state.nombre_y_apellido,
    email: state.email,
    municipio_nacimiento: state.municipio_nacimiento,
    corregimiento_nacimiento: state.corregimiento_nacimiento,
    
    pertenencia_grupo_poblacional: state.pertenencia_grupo_poblacional,
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
  };

 /* const informacionAcademicaData = {
    sede_universidad: state.sede_universidad,
    nombre_programa_academico: state.nombre_programa_academico,
    cod_univalle: state.cod_univalle,
    semestre_academico: state.semestre_academico,
    pertenencia_univalle: state.pertenencia_univalle,
  };*/

  const DiversidadSexualData = {
    expresiones_de_genero: state.expresiones_de_genero,
    recibir_orientacion_cambio_en_documento: state.recibir_orientacion_cambio_en_documento,
    pronombres: state.pronombres,
    cambio_nombre_sexo_documento: state.cambio_nombre_sexo_documento,
    respuestas_cambio_documento: state.respuestas_cambio_documento,
    orientaciones_sexuales: state.orientaciones_sexuales.map(id => {
      const option = orientacionOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),
    
    identidades_de_genero: state.identidades_de_genero.map(id => {
      const option = identidadesGeneroOptions.find(o => o.value === id);
      return option ? option.label : id;
    }),

    

  }

  /* const InformacionGeneralData = {

    fecha: state.fecha,
    creacion: state.creacion,
    





  } */

    try {
      const personaResponse = await axios.post(`${process.env.REACT_APP_API_URL}/persona/persona/`, personaData);
      console.log('Respuesta del servidor:', personaResponse.data);
      const personaId = personaResponse.data.numero_documento; // Recordemos que usa la cedula para identificar a la persona


      const diversidadSexualResponse = await axios.post(`${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/`, {
        ...DiversidadSexualData,
        id_persona: personaId, // Usa el ID de la persona recién creada
      });
      console.log('Respuesta del servidor (informacion-academica):', diversidadSexualResponse.data);

      /*const informacionGeneralResponse = await axios.post(`${process.env.REACT_APP_API_URL}/campus_diverso/informacion-general/`, {
        ...InformacionGeneralData,
        id_persona: personaId, // Usa el ID de la persona recién creada
      });  */        

      setShowModal(true);
      setMensaje("El formulario se envió con éxito.");
         // Restablecer los valores del formulario a vacío
    set_state({
      nombre_identitario: "",
      nombre_y_apellido: "",
      email:"",
      respuestas_cambio_documento: [],
      nombre_persona_confianza: "",
      tipo_documento: "",
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
      cambio_nombre_sexo_documento: "",
      sede_universidad: "",
      nombre_programa_academico: "",
      cod_univalle: "",
      semestre_academico: "",
      pertenencia_univalle: "",
      recibir_orientacion_cambio_en_documento: false,
      orientaciones_sexuales:[],
      identidades_de_genero:[],
    });
     
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setShowModal(true);
      setMensaje("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
      
    }
  }; 

  return (
    <>

    <IngresoDatosBasicos
    state={state}
    handleChange={handleChange}
    isLoading={isLoading}
    razasOptions={razasOptions}
    />



    <DiversidadSexual
      state={state}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      isLoading={isLoading}
      estaActivo={estaActivo}
      estaActivo2={estaActivo2}
      pronombresOptions={pronombresOptions}
      documentoOptions={documentoOptions}
      expresionesOptions={expresionesOptions}
      orientacionOptions={orientacionOptions}
      identidadesGeneroOptions={identidadesGeneroOptions}
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
