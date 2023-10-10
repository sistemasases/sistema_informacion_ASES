import { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Modal, ModalHeader, ModalBody, FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../Scss/campus_diverso/campus_diverso.css';
import axios from 'axios';

const Registro_estudiante = () => {

  const [estaActivo, setEstaActivo] = useState(false);
  const handleCheckboxChange1 = (e) => {
    setEstaActivo(e.target.checked);
  };

 
  const [estado, setEstado] = useState({
    id_pertenencia_grupo_poblacional: '',
    id_orientacion_sexual:'',
    id_respuesta_cambio_documento:'',
   
  });
  const [state, set_state] = useState({
    nombre_identitario: "",
    nombre_y_apellido: "",
    tipo_documento: "",
    estrato_socioeconomico: "",
    ciudad_nacimiento: "",
    fecha_nacimiento: "",
    municipio_nacimiento: "",
    departamento_nacimiento: "",
    pais_nacimiento: "",
    ciudad_residencia:"",
    zona_residencia:"",
    direccion_residencia:"",
    barrio_residencia:"",
    comuna_barrio:"",
    telefono:"",
    estado_civil:"",
    identidad_etnico_racial:"",
    nombre_persona_de_confianza:"",
    telefono_persona_de_confianza:"",
    relacion_persona_de_confianza:"",
    cambio_nombre_sexo_documento: "",
    sede_universidad: "",
    nombre_programa_academico: "",
    codigo_estudiante: "",
    semestre_academico:"",
    pertenencia_univalle:"",


    
    





  });

  const [razasOptions, setRazasOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Grupo poblacion getter
// Primer useEffect para obtener opciones de grupo poblacional
useEffect(() => {
  Promise.all([
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/pertenencia_grupo_poblacional/`),
    axios.get(`${process.env.REACT_APP_API_URL}/campus_diverso/respuesta-cambio-documento/`)
  ])
    .then((responses) => {
      const [grupoPoblacionResponse, respuestaCambioDocumentoResponse] = responses;
      const grupoPoblacionOpciones = grupoPoblacionResponse.data.map((item) => item.nombre_grupo_poblacional);
      const respuestaCambioDocumentoOpciones = respuestaCambioDocumentoResponse.data.map((item) => item.nombre_respuesta_cambio_documento);
      console.log('Respuesta cambio de documento:', respuestaCambioDocumentoResponse.data);
      setRazasOptions(grupoPoblacionOpciones);
      setDocumentoOptions(respuestaCambioDocumentoOpciones);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error al obtener opciones:', error);
      setIsLoading(false);
    });
}, []);


  const handleChange = (e) => {
    set_state({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes enviar una solicitud POST a la base de datos utilizando Axios



    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/campus_diverso/persona/`, state);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
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
          <label>nombre y apellido</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese nombre y apellido"
              name="nombre_y_apellido"
              value={state.nombre_y_apellido}
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
              placeholder="123456"
              name="tipo_documento"
              value={state.tipo_documento}
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
          <label>Teléfono</label>
          <div>
            <input
              type="number"
              placeholder="Ingrese número telefonico"
              name="telefono"
              value={state.telefono}
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
          <label>Identidad etnico racial</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese la identidad etnico racial"
              name="identidad_etnico_racial"
              value={state.identidad_etnico_racial}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Nombre de persona de confianza</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre_persona_confianza"
              value={state.nombre_persona_confianza}
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
              name="telefono_persona_confianza"
              value={state.telefono_persona_confianza}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Relación de persona de confianza</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese información"
              name="relacion_persona_de_confianza"
              value={state.relacion_persona_de_confianza}
              onChange={handleChange}
            />
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
              name="fecha_nacimiento"
              value={state.fecha_nacimiento}
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
              name="id_pertenencia_grupo_poblacional"
              value={state.id_pertenencia_grupo_poblacional}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione un grupo poblacional </option>
              {razasOptions.map((id_pertenencia_grupo_poblacional, index) => (
                <option key={index} value={id_pertenencia_grupo_poblacional}>
                  {id_pertenencia_grupo_poblacional} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label>Municipio de nacimiento</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese el municipio"
              name="municipio_nacimiento"
              value={state.municipio_nacimiento}
              onChange={handleChange}

            />
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
              name="zona_residencia"
              value={state.zona_residencia}
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

    <h1> Ingreso de información general </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
    
      <Col xs={"10"} md={"5"}>

      <div>
          <label>Respuesta cambio de documento</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="id_respuesta_cambio_documento"
              value={state.id_respuesta_cambio_documento}
              onChange={handleChange}
              
              
            >
              <option value="">Seleccione la situacion </option>
              {documentoOptions.map((id_respuesta_cambio_documento, index) => (
                <option key={index} value={id_respuesta_cambio_documento}>
                  {id_respuesta_cambio_documento} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>

        <div>
          <label>Cambio de nombre/sexo</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el cambio"
              name="cambio_nombre_sexo_documento"
              value={state.cambio_nombre_sexo_documento}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <span >¿Pertenece a univalle?</span>
            <input
              type="checkbox"
              checked={estaActivo}
              value={state.pertenencia_univalle}
              onChange={handleCheckboxChange1}
            />
          </label>
        </div>
        
        <div>
          <label>Semestre académico</label>
          <div>
            <input
              type="number" 
              placeholder="Ingrese el semestre"
              name="semestre_academico"
              value={state.semestre_academico}
              onChange={handleChange}

            />
          </div>
        </div>


        </Col>

        <Col md={"6"}>
        <div>
          <label>Sede de universida del valle</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese la sede"
              name="sede_universidad"
              value={state.sede_universidad}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>Nombre del programa académico</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el programa"
              name="nombre_programa_academico"
              value={state.nombre_programa_academico}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label>Codigo estudiante</label>
          <div>
            <input
              type="number" 
              placeholder="Ingrese el codigo"
              name="codigo_estudiante"
              value={state.codigo_estudiante}
              onChange={handleChange}

            />
          </div>
        </div>



        </Col>

      </Container>


      
          <Row >
          <Col  className="text-center">
            <button type="submit" className= "btn btn-danger" onClick={handleSubmit}>Enviar</button>
          </Col>
        </Row>
        </>
    
  );
}

export default Registro_estudiante;
