import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import ModalEstudiantes from './components/modalEstudiantes';
import axios from 'axios';
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";

const ObtenerEstudiante = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState();
  const [diversidadInfo, setDiversidadInfo] = useState();
  const [generalInfo, setGeneralInfo] = useState();
  const [academicoInfo, setAcademcioInfo] = useState();
  const [documentosInfo, setDocumentosInfo] = useState();
  const [seguimientosInfo, setSeguimientosInfo] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [editableUser, setEditableUser] = useState({ ...selectedUser, });
  const [isEditing, setIsEditing] = useState(false);
  const [isRevisado, setRevisado] = useState(false);

  //Desencripta el token para la API
  const config = {
    headers: {
      // Obtención del token de sesión
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };
  
  const headers = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),  
  };
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/persona/persona/`, {headers})
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const openModal = (user) => {
    setModalOpen(true);
    setSelectedUser(user);
    setCurrentPage(0); // Vuelve a la página inicial

    fetch(`${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/${user.numero_documento}/`)
      .then((response) => response.json())
      .then((data) => setDiversidadInfo(data))
      .catch((error) => console.error('Error al obtener información de diversidad sexual:', error));
  

    fetch(`${process.env.REACT_APP_API_URL}/informacion-general/informacion-general/${user.numero_documento}/`)
      .then((response) => response.json())
      .then((data) => setGeneralInfo(data))
      .catch((error) => console.error('Error al obtener información general:', error));

    fetch(`${process.env.REACT_APP_API_URL}/informacion-academica/informacion-academica/${user.numero_documento}/`)
      .then((response) => response.json())
      .then((data) => setAcademcioInfo(data))
      .catch((error) => console.error('Error al obtener información académica:', error));

    fetch(`${process.env.REACT_APP_API_URL}/documentos-autorizacion/documentos-autorizacion/${user.numero_documento}/`)
      .then((response) => response.json())
      .then((data) => setDocumentosInfo(data))
      .catch((error) => console.error('Error al obtener la información académica:', error));

      fetch(`${process.env.REACT_APP_API_URL}/seguimiento-campus/seguimiento/${user.numero_documento}/`)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorData = await response.json();
          if (response.status === 404 && errorData.detail === "No se encontraron seguimientos para esta persona.") {
            return []; // Retornamos un arreglo vacío si es un error 404 específico
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        }
      })
      .then((data) => {
        setSeguimientosInfo(data || []); // Establecer como un arreglo vacío si no hay datos
      })
      .catch((error) => {
        console.error('Error al obtener la información de seguimientos:', error);
        setSeguimientosInfo([]); // Manejo de error, establecer seguimientosInfo como un arreglo vacío
      });     
};

  const closeModal = () => {


  

    setEditableUser(selectedUser);
    setModalOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
    setDiversidadInfo(null);
    setGeneralInfo(null);
    setDocumentosInfo(null);
    setSeguimientosInfo(null);
    setAcademcioInfo(null);
    
    
    
  };

  const filteredUsers = users.filter((user) =>
    (user.numero_documento && user.numero_documento.includes(searchText)) ||
    (user.nombre_y_apellido && user.nombre_y_apellido.toLowerCase().includes(searchText.toLowerCase()))
  );
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

// PUT request function
const updateUser = async (endpointsList, userId, updatedData) => {
  const results = [];

  for (const endpoint of endpointsList) {
    try {
      console.log("ROPEPEWER");
      console.log(editableUser);
      console.log(endpoint);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/${endpoint}/${userId}/`, updatedData, { headers });
      console.log(`Usuario actualizado en ${endpoint}:`, response.data);
      results.push(response.data);
    } catch (error) {
      console.error(`Error al actualizar usuario en ${endpoint}:`, error);
    }
  }

  return results;
};


//Getters de la API y guardado de datos
  //Persona
  const [razasOptions, setRazasOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
// Diversidad sexual
  const [orientacionOptions, setOrientacionOptions] = useState([]);
  const [documentoOptions, setDocumentoOptions] = useState([]);
  const [pronombresOptions, setPronombresOptions] = useState([]);
  const [expresionesOptions, setExpresionesOptions] = useState([]);
  const [identidadesGeneroOptions, setIdentidadesGeneroOptions] = useState([]);
// Información académica
const [estamentoOptions, setEstamentoOptions]= useState([]);
const [sedeOptions, setSedeOptions]= useState([]);
const [programaOptions, setProgramaOptions]= useState([]);
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
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-academica/programa/`),
    axios.get(`${process.env.REACT_APP_API_URL}/informacion-academica/sede/`),
  ])
    .then((responses) => {
      //persona
      const [grupoPoblacionResponse, expresionesResponse, pronomeopcionesResponse,
        respuestaCambioDocumentoResponse, orientacionResponse, identiadesGeneroResponse,estamentoResponse, factorResponse, actividadResponse, fuenteResponse, redResponse, tipoDocumentoResponse,
        ProgramaResponse, SedeResponse] = responses;
      
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
      const programaOpciones = ProgramaResponse.data.map((item) => ({
        value: item.id_programa,
        label: item.nombre_programa
      }));
      const sedeOpciones = SedeResponse.data.map((item) => ({
        value: item.id_sede,
        label: item.nombre_sede
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
      setProgramaOptions(programaOpciones);
      setSedeOptions(sedeOpciones);

    })
    .catch((error) => {

      console.error('Error al obtener opciones:', error);
      

    });
}, []);

// Handle del multi-select
// Handle del multi-select
const handleSelectChange = (selectedOptions, actionMeta) => {
  const { name } = actionMeta;

  // Verifica si selectedOptions es un array y tiene elementos
  const values = selectedOptions && selectedOptions.length > 0
    ? selectedOptions.map(option => option.label)
    : []; // Setea como [] si no hay opciones seleccionadas

  setEditableUser(prevState => ({
    ...prevState,
    [name]: values
  }));

  console.log('selectedOptions:', selectedOptions);
  console.log('updatedValues:', values);
};


const handleUpdateUser = async (endpointsList, userId, updatedData) => {
  try {
    // Realizar la actualización
    const updatedUsers = await updateUser(endpointsList, userId, updatedData);

    // Obtener la información completa del usuario después de la actualización
    const fullUserResponse = await axios.get(`${process.env.REACT_APP_API_URL}/persona/persona/${userId}/`, { headers });
    const fullUser = fullUserResponse.data;

    // Actualizar el estado con la información completa del usuario
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.numero_documento === userId ? fullUser : user))
    );
    setSelectedUser(fullUser); // Actualiza el usuario seleccionado con la información completa

    // Actualiza el estado según el endpoint
    console.log('Datos a enviar:', editableUser);
    if (endpointsList.includes('diversidad-sexual/diversidad-sexual')) {
      setDiversidadInfo(fullUser.diversidad_sexual);
      setSelectedUser(fullUser);
    }
    if (endpointsList.includes('documentos-autorizacion/documentos-autorizacion')) {
      setDocumentosInfo(fullUser.documentos_autorizacion);
    }
    if (endpointsList.includes('informacion-academica/informacion-academica')) {
      setAcademcioInfo(fullUser.informacion_academica);
    } 
    if (endpointsList.includes('seguimiento-campus/seguimiento')) {
      setSeguimientosInfo(fullUser.seguimientosInfo);
    }
    else if (endpointsList.includes('informacion-general/informacion-general')) {
      setGeneralInfo(fullUser.informacion_general);
    }

  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};


const Usuariorevisado = async () => {
  const endpoint = ['persona/persona']; 
  const userId = selectedUser.numero_documento;
  const updatedData = { revision_usiario: true };

  await handleUpdateUser(endpoint, userId, updatedData);

  closeModal();
};

const handleSelectChange3 = (selectedOption, actionMeta) => {
  const { name } = actionMeta;

  const labels = selectedOption ? [selectedOption.label] : [];
  // Actualiza el estado dinámicamente en función del campo proporcionado
  setEditableUser(prevState => ({
    ...prevState,
    [name]: labels
  }));
};

//handle para atributos de un solo item 
const handleArrayChange = (fieldName, index, value) => {
  console.log(`Changing ${fieldName} at index ${index}, value ${value}`);

  const updatedArray = [...(editableUser[fieldName] || [])];
  updatedArray[index] = value;

  setEditableUser({
    ...editableUser,
    [fieldName]: updatedArray,
  });
};



const handleArrayFieldChange = (fieldName, index, field, value) => {
  console.log(`Changing ${fieldName} at index ${index}, field ${field}, value ${value}`);

  const updatedArray = [...editableUser[fieldName]];
  updatedArray[index][field] = value;

  setEditableUser({
    ...editableUser,
    [fieldName]: updatedArray,
  });
};
const handleAddItem = (fieldName, newItem = '') => {
  console.log(`Adding new item to ${fieldName}`);

  setEditableUser({
    ...editableUser,
    [fieldName]: [...(editableUser[fieldName] || []), newItem],
  });
};

const handleDeleteItem = (fieldName, index) => {
  console.log(`Deleting item from ${fieldName} at index ${index}`);

  const updatedArray = [...(editableUser[fieldName] || [])];
  updatedArray.splice(index, 1);

  setEditableUser({
    ...editableUser,
    [fieldName]: updatedArray,
  });
};

const handleDelete = async (userId) => {
  try {
    console.log('usuario', userId);
    await axios.delete(`${process.env.REACT_APP_API_URL}/persona/persona/${userId}/`, { headers });
    // Aquí podrías hacer una llamada para actualizar la lista de usuarios o cerrar el modal
    alert('Usuario eliminado con éxito');
    closeModal(); // Opcional, para cerrar el modal después de eliminar
    setUsers((prevUsers) => prevUsers.filter((user) => user.numero_documento !== userId));
  } catch (error) {
    console.error('Error eliminando el usuario:', error);
    alert('Hubo un error al eliminar el usuario');
  }
};

// Handle form submit
const handleFormSubmit = (e) => {
  if (selectedUser) {
    const { numero_documento } = selectedUser;
    const updatedData = {
     nombre_y_apellido: editableUser.nombre_y_apellido,
     nombre_identitario: editableUser.nombre_identitario,
     tipo_documento: editableUser.tipo_documento,
     email: editableUser.email,
     estrato_socioeconomico: editableUser.estrato_socioeconomico,
     telefono: editableUser.telefono,
     identidad_etnico_racial: editableUser.identidad_etnico_racial,
     nombre_persona_de_confianza: editableUser.nombre_persona_de_confianza,
     telefono_persona_de_confianza: editableUser.telefono_persona_de_confianza,
     relacion_persona_de_confianza: editableUser.relacion_persona_de_confianza,
     estado_civil: editableUser.estado_civil,
     ciudad_nacimiento: editableUser.ciudad_nacimiento,
     corregimiento_nacimiento: editableUser.corregimiento_nacimiento,
     municipio_nacimiento: editableUser.municipio_nacimiento,
     pais_nacimiento: editableUser.pais_nacimiento,
     departamento_nacimiento: editableUser.departamento_nacimiento,
     fecha_nacimiento: editableUser.fecha_nacimiento,
     pertenencia_grupo_poblacional: editableUser.pertenencia_grupo_poblacional,
     comuna_barrio: editableUser.comuna_barrio,
     barrio_residencia: editableUser.barrio_residencia,
     ciudad_residencia: editableUser.ciudad_residencia,
     direccion_residencia: editableUser.direccion_residencia,

     //Diversidad sexual
     cambio_nombre_sexo_documento: editableUser.cambio_nombre_sexo_documento,
     recibir_orientacion_cambio_en_documento: editableUser.recibir_orientacion_cambio_en_documento,
     pronombres: editableUser.pronombres,
     orientaciones_sexuales: editableUser.orientaciones_sexuales,
     expresiones_de_genero: editableUser.expresiones_de_genero,
     respuestas_cambio_documento: editableUser.respuestas_cambio_documento,
     identidades_de_genero: editableUser.identidades_de_genero,
     
     //Info general
     tiene_eps: editableUser.tiene_eps,
     calificacion_relacion_familiar: editableUser.calificacion_relacion_familiar,
     creencia_religiosa: editableUser.creencia_religiosa,
     decision_encuentro_inicial_con_profesional: editableUser.decision_encuentro_inicial_con_profesional,
     origen_descubrimiento_campus_diverso: editableUser.origen_descubrimiento_campus_diverso,
     comentarios_o_sugerencias_de_usuario: editableUser.comentarios_o_sugerencias_de_usuario,
     actividades_especificas_tiempo_libre: editableUser.actividades_especificas_tiempo_libre,

     factores_riesgos: editableUser.factores_riesgos,
     Ocupaciones_actules: editableUser.Ocupaciones_actules,
     profesionales_que_brindaron_atencion: editableUser.profesionales_que_brindaron_atencion,
     acompanamiento_que_recibio: editableUser.acompanamiento_que_recibio,
     fuentes_ingresos: editableUser.fuentes_ingresos,
     actividades_tiempo_libre: editableUser.actividades_tiempo_libre,
     redes_apoyo: editableUser.redes_apoyo,
     observacion_general_actividades_especificas_tiempo_libre: editableUser.observacion_general_actividades_especificas_tiempo_libre,
     observacion_general_fuente_de_ingresos: editableUser.observacion_general_fuente_de_ingresos,
     observacion_horario: editableUser.observacion_horario,
     observacion_general_redes_de_apoyo: editableUser.observacion_general_redes_de_apoyo,
     observacion_general_factores_de_riesgo: editableUser.observacion_general_factores_de_riesgo,
     //Info academica
     codigo_estudiante: editableUser.codigo_estudiante,
     sedes: editableUser.sedes,
     programas: editableUser.programas,
     semestre_academico: editableUser.semestre_academico,
     pertenencia_univalle: editableUser.pertenencia_univalle,
     estamentos: editableUser.estamentos,
     
     //documentos
     autorizacion_manejo_de_datos: editableUser.autorizacion_manejo_de_datos,
     firma_consentimiento_informado: editableUser.firma_consentimiento_informado,
     firma_terapia_hormonal: editableUser.firma_terapia_hormonal,
     apgar_familiar: editableUser.apgar_familiar,
     documento_digital_y_archivo: editableUser.documento_digital_y_archivo,
     ecomapa: editableUser.ecomapa,
     arbol_familiar: editableUser.arbol_familiar,
    };
    let endpointsList = [];

    switch (currentPage) {
      case 0:
        endpointsList = ['persona/persona','diversidad-sexual/diversidad-sexual'];
        break;
      case 1:
        endpointsList = ['diversidad-sexual/diversidad-sexual'];
        break;
      case 2:
        endpointsList = ['informacion-general/informacion-general'];
        break;
      case 3:
        endpointsList = ['informacion-general/informacion-general'];
        break;
      case 4:
        endpointsList = ['informacion-academica/informacion-academica'];
        break;
      case 5:
        endpointsList = ['documentos-autorizacion/documentos-autorizacion'];
        break;
      case 6:
        endpointsList = ['seguimiento-campus/seguimiento'];
        break;
      // Añade más casos para otras páginas si es necesario
      default:
        console.error('Página no válida');
        return;
    }

    handleUpdateUser(endpointsList, numero_documento, updatedData);


    setEditableUser({
      nombre_identitario: "",
      nombre_y_apellido: "",
      email: "",
      nombre_persona_confianza: "",
      tipo_documento: [],
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
      sedes: [],
      programas: [],
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
      Ocupaciones_actules: "",
      acompanamiento_que_recibio: "",
      profesionales_que_brindaron_atencion: "",
      redes_apoyo: [],
      factores_riesgos: [],
      encuentro_dias_horas: [],
      actividades_tiempo_libre: [],
      acompanamientos_recibido: [],
      fuentes_ingresos: [],
      
    });
  }
};
//checkbox
const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setEditableUser((prevState) => ({
    ...prevState,
    [name]: checked,
  }));
  console.log(`Checkbox ${name} changed to ${checked}`);
};

// Handle input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditableUser({
    ...editableUser,
    [name]: value,
  });
};
  return (
<>
  <h1 className="title-search">Lista de personas</h1>
  <Container>
    <input
      type="text"
      placeholder="Buscar por nombre"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="search-input"
    />
    <p className="result-count">Resultados: {filteredUsers.length}</p>
    <div className="table-container">
      <div className="table-scroll">
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre Identitario</th>
              <th>Nombre y Apellido</th>
              <th>Tipo de Documento</th>
              <th>Número de Documento</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .sort((a, b) => new Date(b.fecha_creacion_usuario) - new Date(a.fecha_creacion_usuario)) // Ordena por fecha de creación
              .map((user, index) => (
                <tr
                  key={user.numero_documento}
                  className={`${index % 2 === 0 ? 'even-row' : 'odd-row'} ${!user.revision_usiario ? 'pending-review' : ''}`}
                  onClick={() => openModal(user)}
                >
                  <td>{user.nombre_identitario}</td>
                  <td>{user.nombre_y_apellido}</td>
                  <td>{user.tipo_documento ? user.tipo_documento : 'No registrado'}</td>
                  <td>{user.numero_documento}</td>
                  <td>{new Date(user.fecha_creacion_usuario).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
          <ModalEstudiantes
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            selectedUser={selectedUser}
            diversidadInfo={diversidadInfo}
            academicoInfo={academicoInfo}
            generalInfo={generalInfo}
            documentosInfo={documentosInfo}
            seguimientosInfo={seguimientosInfo}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
            editableUser={editableUser}
            setEditableUser={setEditableUser}
            handleCheckboxChange={handleCheckboxChange}
            razasOptions={razasOptions}
            handleSelectChange={handleSelectChange}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            pronombresOptions={pronombresOptions}
            expresionesOptions={expresionesOptions}
            orientacionOptions={orientacionOptions}
            identidadesGeneroOptions={identidadesGeneroOptions}
            documentoOptions={documentoOptions}
            estamentoOptions={estamentoOptions}
            handleArrayFieldChange={handleArrayFieldChange}
            handleAddItem={handleAddItem}
            handleDeleteItem={handleDeleteItem}
            handleArrayChange={handleArrayChange}
            handleDelete={handleDelete}
            factoresOptions={factoresOptions}
            fuentesOptions={fuentesOptions}
            redesOptions={redesOptions}
            actividadesOptions={actividadesOptions}
            Usuariorevisado={Usuariorevisado}
            isRevisado={isRevisado}
            setRevisado={setRevisado}
            handleSelectChange3={handleSelectChange3}
            tipoDocumentoOptions={tipoDocumentoOptions}
            setSeguimientosInfo={setSeguimientosInfo}
            sedeOptions={sedeOptions}
            programaOptions={programaOptions}
          />
      </Container>
    </>
  );
};

export default ObtenerEstudiante;
