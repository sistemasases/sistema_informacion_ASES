import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, } from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import axios from 'axios';

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

  const handleShow = () => {
    setShowModal(true);
  };


  const [state, set_state] = useState({
    nombre_identitario:"",
    nombre:"",
    pertenencia_grupo_poblacional:[],
    relacion_persona_de_confianza:[],
    apellido:"",
    tipo_doc:"",
    num_doc:"",
    estrato_socioeconomico:"",
    ciudad_nacimiento:"",
    fecha_nac:"",
    departamento_nacimiento:"",
    pais_nacimiento:"",
    ciudad_residencia:"",
    zona_residencial:"",
    direccion_residencia:"",
    barrio_residencia:"",
    comuna_barrio:"",
    telefono_res:"",
    estado_civil:"",
    identidad_etnico_racial:[],
    nombre_persona_de_confianza:"",
    telefono_persona_de_confianza:"",


    //Diversidad sexual

    expresiones_de_genero:[],
    recibir_orientacion_cambio_en_documento: "",
    cambio_nombre_sexo_documento:"",
    pronombres:[],
    orientaciones_sexuales:[],
    respuestas_cambio_documento:[],
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
  const [identidadOptions, setIdentidadOptions] = useState([]);

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
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/pertenencia_grupo_poblacional/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/respuesta-cambio-documento/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/relacion_persona_confianza/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/identidad_etnico_racial/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/pronombre/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/orientacion-sexual/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/expresion-genero/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/identidad-genero/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/ocupacion-actual/`),

  ])
    .then((responses) => {
      //persona
      const [grupoPoblacionResponse, respuestaCambioDocumentoResponse, relacionPersonaConfianzaResponse,
      identidadResponse, pronomeopcionesResponse, orientacionResponse, expresionesResponse,identiadesGeneroResponse,
      ocupacionResponse] = responses;
      const relacionPersonaConfianzaOpciones = relacionPersonaConfianzaResponse.data.map((item) => item.nombre_persona_confianza);
      const grupoPoblacionOpciones = grupoPoblacionResponse.data.map((item) => item.nombre_grupo_poblacional);
      const identidadOpciones = identidadResponse.data.map((item) => item.nombre_identidad_etnico_racial);
      const respuestaCambioDocumentoOpciones = respuestaCambioDocumentoResponse.data.map((item) => item.nombre_respuesta_cambio_documento);
      const pronombreOpciones = pronomeopcionesResponse.data.map((item) => item.nombre_pronombre)
      const orientacionOpciones = orientacionResponse.data.map((item) => item.nombre_orientacion_sexual)
      const expresionesOpciones = expresionesResponse.data.map((item) => item.nombre_expresion_genero)
      const identidadesGeneroOpciones = identiadesGeneroResponse.data.map((item) => item.nombre_identidad_genero)
      const ocupacionOpciones = ocupacionResponse.data.map((item) => item.nombre_ocupacion_actual)
      console.log('Respuesta cambio de documento:', respuestaCambioDocumentoResponse.data);
      setRazasOptions(grupoPoblacionOpciones);
      setIdentidadOptions(identidadOpciones);
      setRelacionOptions(relacionPersonaConfianzaOpciones);
      setDocumentoOptions(respuestaCambioDocumentoOpciones);
      setPronombresOptions(pronombreOpciones);
      setOrientacionOptions(orientacionOpciones);
      setExpresionesOptions(expresionesOpciones);
      setIdentidadesGeneroOptions(identidadesGeneroOpciones);
      setOcupacionOptions(ocupacionOpciones);
      setIsLoading(false);

    })
    .catch((error) => {

      console.error('Error al obtener opciones:', error);
      setIsLoading(false);

    });
}, []);


const handleChange = (event) => {
  const { name, checked, options } = event.target;

  if (name === 'cambio_nombre_sexo_documento') {
    handleCheckboxChange1(event);

    set_state({
      ...state,
      [name]: checked,
    });
  }  else if (name === 'recibir_orientacion_cambio_en_documento') {
    handleCheckboxChange2(event);

    set_state({
      ...state,
      [name]: checked,
    });
  } else if (name === 'identidad_etnico_racial') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  } else if (name === 'identidades_de_genero') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  }else if (name === 'respuestas_cambio_documento') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  }else if (name === 'expresiones_de_genero') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  } 
  else if (name === 'pronombres') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  } else if (name === 'relacion_persona_de_confianza') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  }else if (name === 'pertenencia_grupo_poblacional') {
    set_state({
      ...state,
      [name]: [event.target.value],
    });
  }else if (name === 'orientaciones_sexuales') {
    console.log("Before state update:", state.orientaciones_sexuales);

    const selectedOptions = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
      const updatedOptions = state[name].includes(selectedOptions[0])
      ? state[name].filter(option => option !== selectedOptions[0])
      : [...state[name], ...selectedOptions];;

    console.log("After state update:", selectedOptions);

    // Accumulate the selected options with the existing ones
    set_state({
      ...state,
      [name]: updatedOptions,
    });
  } else {
    set_state({
      ...state,
      [name]: event.target.value,
    });
  }
};





 

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Dividir los datos en función de ciertos campos
  const personaData = {
    nombre_identitario: state.nombre_identitario,
    nombre: state.nombre,
    pertenencia_grupo_poblacional: state.pertenencia_grupo_poblacional,
    relacion_persona_de_confianza: state.relacion_persona_de_confianza,
    apellido: state.apellido,
    tipo_doc: state.tipo_doc,
    num_doc: state.num_doc,
    estrato_socioeconomico: state.estrato_socioeconomico,
    ciudad_nacimiento: state.ciudad_nacimiento,
    fecha_nac: state.fecha_nac,
    departamento_nacimiento: state.departamento_nacimiento,
    pais_nacimiento: state.pais_nacimiento,
    ciudad_residencia: state.ciudad_residencia,
    zona_residencial: state.zona_residencial,
    direccion_residencia: state.direccion_residencia,
    barrio_residencia: state.barrio_residencia,
    comuna_barrio: state.comuna_barrio,
    telefono_res: state.telefono_res,
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
    identidades_de_genero: state.identidades_de_genero,
    recibir_orientacion_cambio_en_documento: state.recibir_orientacion_cambio_en_documento,
    pronombres: state.pronombres,
    orientaciones_sexuales: state.orientaciones_sexuales,
    cambio_nombre_sexo_documento: state.cambio_nombre_sexo_documento,
    respuestas_cambio_documento: state.respuestas_cambio_documento,


    

  }

  const InformacionGeneralData = {

    fecha: state.fecha,
    creacion: state.creacion,
    





  }

    try {
      const personaResponse = await axios.post(`${process.env.REACT_APP_API_URL}/campus_diverso/persona/`, personaData);
      console.log('Respuesta del servidor:', personaResponse.data);
      const personaId = personaResponse.data.num_doc; // Recordemos que usa la cedula para identificar a la persona


      const diversidadSexualResponse = await axios.post(`${process.env.REACT_APP_API_URL}/campus_diverso/diversidad-sexual/`, {
        ...DiversidadSexualData,
        id_persona: personaId, // Usa el ID de la persona recién creada
      });
      
      const informacionGeneralResponse = await axios.post(`${process.env.REACT_APP_API_URL}/campus_diverso/informacion-general/`, {
        ...InformacionGeneralData,
        id_persona: personaId, // Usa el ID de la persona recién creada
      });          
      console.log('Respuesta del servidor (informacion-academica):', diversidadSexualResponse.data);
      console.log('Respuesta del servidor (informacion-academica):', informacionGeneralResponse.data);

      setShowModal(true);
      setMensaje("El formulario se envió con éxito.");
         // Restablecer los valores del formulario a vacío
    set_state({
      nombre_identitario: "",
      nombre: "",
      nombre_grupo_poblacional: "",
      nombre_orientacion_sexual: "",
      respuestas_cambio_documento: "",
      nombre_persona_confianza: "",
      apellido: "",
      tipo_doc: "",
      num_doc: "",
      estrato_socioeconomico: "",
      ciudad_nacimiento: "",
      fecha_nac: "",
      departamento_nacimiento: "",
      pais_nacimiento: "",
      ciudad_residencia: "",
      zona_residencial: "",
      direccion_residencia: "",
      barrio_residencia: "",
      comuna_barrio: "",
      telefono_res: "",
      estado_civil: "",
      identidad_etnico_racial: "",
      nombre_persona_de_confianza: "",
      telefono_persona_de_confianza: "",
      cambio_nombre_sexo_documento: false,
      sede_universidad: "",
      nombre_programa_academico: "",
      cod_univalle: "",
      semestre_academico: "",
      pertenencia_univalle: "",
      recibir_orientacion_cambio_en_documento: false,
    });
     
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setShowModal(true);
      setMensaje("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
      
    }
  };

  return (
    <>
    <h1> Ingreso de datos básicos </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
    
      <Col xs={"10"} md={"5"}>
      
       
      
        <div>
          <label>nombre identitario</label>
          <div>
            <input
              type="text"
              placeholder="Enter username"
              name="nombre_identitario"
              value={state.nombre_identitario}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>nombre</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese nombre"
              name="nombre"
              value={state.nombre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Apellido</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese apellido"
              name="apellido"
              value={state.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
       

   
        <div>
          <label>Tipo de documento</label>
          <div>
            <input
              className='input'
              type="text"
              placeholder="CC, TI , CE , ETC.."
              name="tipo_doc"
              value={state.tipo_doc}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Numero de documento</label>
          <div>
            <input
              className='input'
              type="text"
              placeholder="123456"
              name="num_doc"
              value={state.num_doc}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label>Estrato socioeconomico</label>
          <div>
            <input
              type="number"
              placeholder="Estrato"
              name="estrato_socioeconomico"
              value={state.estrato_socioeconomico}
              onChange={handleChange}
              pattern='[0-9]*'
            />
          </div>
        </div>

        <div>
          <label>Teléfono residencia</label>
          <div>
            <input
              type="number"
              placeholder="Ingrese número telefonico"
              name="telefono_res"
              value={state.telefono_res}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Estado civil</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese estado civil"
              name="estado_civil"
              value={state.estado_civil}
              onChange={handleChange}
            />
          </div>
        </div>
       
        <div>
          <label>identidad etnico racial</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="identidad_etnico_racial"
              value={state.identidad_etnico_racial}
              onChange={handleChange}
              
              
              
            >
              <option value="">Seleccione la identidad </option>
              {identidadOptions.map((identidad_etnico_racial, index) => (
                <option key={index} value={identidad_etnico_racial}>
                  {identidad_etnico_racial} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label>Nombre de persona de confianza</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre_persona_de_confianza"
              value={state.nombre_persona_de_confianza}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Número de persona de confianza</label>
          <div>
            <input
              type="number"
              placeholder="Ingrese numero"
              name="telefono_persona_de_confianza"
              value={state.telefono_persona_de_confianza}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Relacion persona confianza</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="nombre_persona_confianza"
              value={state.nombre_persona_confianza}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione la relacion </option>
              {relacionOptions.map((nombre_persona_confianza, index) => (
                <option key={index} value={nombre_persona_confianza}>
                  {nombre_persona_confianza} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

      </Col>

      
      
      <Col md={"6"}>
    
      <div>
          <label>Ciudad de nacimiento</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese ciudad de nacimiento"
              name="ciudad_nacimiento"
              value={state.ciudad_nacimiento}
              onChange={handleChange}
              pattern='[0-9]*'
            />
          </div>
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <div>
            <input
              type="date"
              name="fecha_nac"
              value={state.fecha_nac}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Grupo poblacional</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="pertenencia_grupo_poblacional"
              value={state.pertenencia_grupo_poblacional}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione un grupo poblacional </option>
              {razasOptions.map((pertenencia_grupo_poblacional, index) => (
                <option key={index} value={pertenencia_grupo_poblacional}>
                  {pertenencia_grupo_poblacional} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>


        <div>
          <label>Departamento de nacimiento</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="departamento_nacimiento"
              value={state.departamento_nacimiento}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>País de nacimiento</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="pais_nacimiento"
              value={state.pais_nacimiento}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>Ciudad de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="ciudad_residencia"
              value={state.ciudad_residencia}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>Zona de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="zona_residencial"
              value={state.zona_residencial}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>Direccion de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese su direccion"
              name="direccion_residencia"
              value={state.direccion_residencia}
              onChange={handleChange}

            />
          </div>
        </div>
        
        <div>
          <label>Barrio de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese su barrio"
              name="barrio_residencia"
              value={state.barrio_residencia}
              onChange={handleChange}

            />
          </div>
        </div>

                
        <div>
          <label>Número de la comuna</label>
          <div>
            <input
              type="number" 
              placeholder="Ingrese la comuna"
              name="comuna_barrio"
              value={state.comuna_barrio}
              onChange={handleChange}

            />
          </div>
        </div>
        
      </Col>
      

    </Container>

      

<h1> Diversidad Sexual </h1>
<Container className="container_informacion_general" xs={"10"} sm={"6"}>

  <Col xs={"10"} md={"5"}>

    <div>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <span >¿Cambio de nombre/sexo?</span>
            <input
              type="checkbox"
              checked={estaActivo}
              name="cambio_nombre_sexo_documento"
              value={state.cambio_nombre_sexo_documento}
              onChange={handleChange}
            />
          </label>
    </div>

  <div>
          <label> Pronombres </label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="pronombres"
              value={state.pronombres}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione el pronombre </option>
              {pronombresOptions.map((pronombres, index) => (
                <option key={index} value={pronombres}>
                  {pronombres} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label>Respuesta cambio de documento</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="respuestas_cambio_documento"
              value={state.respuestas_cambio_documento}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione la situacion </option>
              {documentoOptions.map((respuestas_cambio_documento, index) => (
                <option key={index} value={respuestas_cambio_documento}>
                  {respuestas_cambio_documento} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label>Expresión de genero </label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="expresiones_de_genero"
              value={state.expresiones_de_genero}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione la expesion </option>
              {expresionesOptions.map((expresiones_de_genero, index) => (
                <option key={index} value={expresiones_de_genero}>
                  {expresiones_de_genero} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>
  </Col>

  <Col>

  <div>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <span >¿Recibir orientacion de cambio en documento?</span>
            <input
              type="checkbox"
              checked={estaActivo2}
              name="recibir_orientacion_cambio_en_documento"
              value={state.recibir_orientacion_cambio_en_documento}
              onChange={handleChange}
            />
          </label>
    </div>
  <div>
          <label>Orientacion sexual</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="orientaciones_sexuales"
              value={state.orientaciones_sexuales}
              onChange={handleChange}
              multiple= {true} 
            >
              <option value="">Seleccione la orientacion </option>
              {orientacionOptions.map((orientaciones_sexuales, index) => (
                <option key={index} value={orientaciones_sexuales}>
                  {orientaciones_sexuales} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label> Identidad de genero </label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="identidades_de_genero"
              value={state.identidades_de_genero}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione la expesion </option>
              {identidadesGeneroOptions.map((identidades_de_genero, index) => (
                <option key={index} value={identidades_de_genero}>
                  {identidades_de_genero} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>
  
  </Col>
</Container>


      
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
