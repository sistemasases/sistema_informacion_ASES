import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../../Scss/campus_diverso/campus_diverso.css";
import ModalEstudiantes from "./components/modalEstudiantes";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Select from "react-select";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";

const ObtenerEstudiante = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [diversidadInfo, setDiversidadInfo] = useState();
  const [generalInfo, setGeneralInfo] = useState();
  const [academicoInfo, setAcademcioInfo] = useState();
  const [documentosInfo, setDocumentosInfo] = useState();
  const [seguimientosInfo, setSeguimientosInfo] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [editableUser, setEditableUser] = useState({ ...selectedUser });
  const [isEditing, setIsEditing] = useState(false);
  const [isRevisado, setRevisado] = useState(false);
  const [searchDate, setSearchDate] = useState(null);
  const [startDate, setStartDate] = useState(null); // Fecha de inicio
  const [endDate, setEndDate] = useState(null); // Fecha de fi
  const [selectedPrograma, setSelectedPrograma] = useState("");
  const [selectedRevision, setSelectedRevision] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

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

  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/persona/persona/`, { headers })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error al obtener usuarios:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setModalOpen(true);
    setSelectedUser(user);
    setEditableUser(user);
    setCurrentPage(0); // Vuelve a la página inicial

    fetch(
      `${process.env.REACT_APP_API_URL}/diversidad-sexual/diversidad-sexual/${user.numero_documento}/`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => setDiversidadInfo(data))
      .catch((error) =>
        console.error(
          "Error al obtener información de diversidad sexual:",
          error
        )
      );

    fetch(
      `${process.env.REACT_APP_API_URL}/informacion-general/informacion-general/${user.numero_documento}/`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => setGeneralInfo(data))
      .catch((error) =>
        console.error("Error al obtener información general:", error)
      );

    fetch(
      `${process.env.REACT_APP_API_URL}/informacion-academica/informacion-academica/${user.numero_documento}/`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => setAcademcioInfo(data))
      .catch((error) =>
        console.error("Error al obtener información académica:", error)
      );

    fetch(
      `${process.env.REACT_APP_API_URL}/documentos-autorizacion/documentos-autorizacion/${user.numero_documento}/`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => setDocumentosInfo(data))
      .catch((error) =>
        console.error("Error al obtener la información académica:", error)
      );

    fetch(
      `${process.env.REACT_APP_API_URL}/seguimiento-campus/seguimiento/${user.numero_documento}/`,
      { headers }
    )
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorData = await response.json();
          if (
            response.status === 404 &&
            errorData.detail ===
              "No se encontraron seguimientos para esta persona."
          ) {
            return []; // Retornamos un arreglo vacío si es un error 404 específico
          } else {
            throw new Error("Error en la respuesta del servidor");
          }
        }
      })
      .then((data) => {
        setSeguimientosInfo(data || []); // Establecer como un arreglo vacío si no hay datos
      })
      .catch((error) => {
        console.error(
          "Error al obtener la información de seguimientos:",
          error
        );
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

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    fetchUsers();
    closeCreateModal();
  };

  const filteredUsers = users.filter((user) => {
    // Filtro por nombre, número de documento y carrera
    const matchesSearchText =
      user.nombre_y_apellido.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nombre_identitario
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      user.numero_documento.toLowerCase().includes(searchText.toLowerCase()) ||
      (Array.isArray(user.informacion_academica?.programas)
        ? user.informacion_academica.programas
            .join(" ")
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : (user.informacion_academica?.programas || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()));

    const matchesPrograma = selectedPrograma
      ? selectedPrograma.value === "otro"
        ? !user.informacion_academica?.programas ||
          user.informacion_academica.programas.length === 0 ||
          (Array.isArray(user.informacion_academica.programas) &&
            user.informacion_academica.programas.every((p) => !p))
        : Array.isArray(user.informacion_academica?.programas)
        ? user.informacion_academica.programas
            .join(" ")
            .toLowerCase()
            .includes(selectedPrograma.label.toLowerCase())
        : (user.informacion_academica?.programas || "")
            .toLowerCase()
            .includes(selectedPrograma.label.toLowerCase())
      : true;

    // Filtro por rango de fechas (si se seleccionó)
    const userDate = dayjs(user.fecha_creacion_usuario);
    const matchesDateRange =
      (!startDate && !endDate) ||
      (startDate && !endDate && userDate.isSame(startDate, "day")) ||
      (startDate &&
        endDate &&
        userDate.isBetween(startDate, endDate, null, "[]")); // Incluye ambas fechas

    // Se devuelve el usuario si coincide con el texto de búsqueda y el rango de fechas

    const matchesRevisionStatus =
      !selectedRevision ||
      (selectedRevision.value === "revisados" &&
        user.revision_usiario === true) ||
      (selectedRevision.value === "no_revisados" &&
        user.revision_usiario === false);
    return (
      matchesSearchText &&
      matchesPrograma &&
      matchesDateRange &&
      matchesRevisionStatus
    );
  });

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
        /* console.log(editableUser);
      console.log(endpoint);*/
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/${endpoint}/${userId}/`,
          updatedData,
          { headers }
        );
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
      })
      .catch((error) => {
        console.error("Error al obtener opciones:", error);
      });
  }, []);

  const revisionOptions = [
    //{ label: "Todos", value: "todos" },
    { label: "Revisados", value: "revisados" },
    { label: "No revisados", value: "no_revisados" },
  ];

  // Handle del multi-select
  // Handle del multi-select
  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;

    // Verifica si selectedOptions es un array y tiene elementos
    const values =
      selectedOptions && selectedOptions.length > 0
        ? selectedOptions.map((option) => option.label)
        : []; // Setea como [] si no hay opciones seleccionadas

    setEditableUser((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const handleUpdateUser = async (endpointsList, userId, updatedData) => {
    try {
      // Realizar la actualización
      const updatedUsers = await updateUser(endpointsList, userId, updatedData);

      // Obtener la información completa del usuario después de la actualización
      const fullUserResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/persona/persona/${userId}/`,
        { headers }
      );
      const fullUser = fullUserResponse.data;

      // Actualizar el estado con la información completa del usuario
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.numero_documento === userId ? fullUser : user
        )
      );
      setSelectedUser(fullUser); // Actualiza el usuario seleccionado con la información completa

      // Actualiza el estado según el endpoint
      console.log("Datos a enviar:", editableUser);
      if (endpointsList.includes("diversidad-sexual/diversidad-sexual")) {
        setDiversidadInfo(fullUser.diversidad_sexual);
        setSelectedUser(fullUser);
      }
      if (
        endpointsList.includes(
          "documentos-autorizacion/documentos-autorizacion"
        )
      ) {
        setDocumentosInfo(fullUser.documentos_autorizacion);
      }
      if (
        endpointsList.includes("informacion-academica/informacion-academica")
      ) {
        setAcademcioInfo(fullUser.informacion_academica);
      }
      if (endpointsList.includes("seguimiento-campus/seguimiento")) {
        setSeguimientosInfo(fullUser.seguimientosInfo);
      } else if (
        endpointsList.includes("informacion-general/informacion-general")
      ) {
        setGeneralInfo(fullUser.informacion_general);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const Usuariorevisado = async () => {
    const endpoint = ["persona/persona"];
    const userId = selectedUser.numero_documento;
    const updatedData = { revision_usiario: true };

    await handleUpdateUser(endpoint, userId, updatedData);

    closeModal();
  };

  const handleSelectChange3 = (selectedOption, actionMeta) => {
    const { name } = actionMeta;

    const labels = selectedOption ? [selectedOption.label] : [];
    // Actualiza el estado dinámicamente en función del campo proporcionado
    setEditableUser((prevState) => ({
      ...prevState,
      [name]: labels,
    }));
  };

  //handle para atributos de un solo item
  const handleArrayChange = (fieldName, index, value) => {
    const updatedArray = [...(editableUser[fieldName] || [])];
    updatedArray[index] = value;

    setEditableUser({
      ...editableUser,
      [fieldName]: updatedArray,
    });
  };

  const handleArrayFieldChange = (fieldName, index, field, value) => {
    const updatedArray = [...editableUser[fieldName]];
    updatedArray[index][field] = value;

    setEditableUser({
      ...editableUser,
      [fieldName]: updatedArray,
    });
  };
  const handleAddItem = (fieldName, newItem = "") => {
    setEditableUser({
      ...editableUser,
      [fieldName]: [...(editableUser[fieldName] || []), newItem],
    });
  };

  const handleDeleteItem = (fieldName, index) => {
    const updatedArray = [...(editableUser[fieldName] || [])];
    updatedArray.splice(index, 1);

    setEditableUser({
      ...editableUser,
      [fieldName]: updatedArray,
    });
  };

  const handleDelete = async (userId) => {
    try {
      console.log("usuario", userId);
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/persona/persona/${userId}/`,
        { headers }
      );
      // Aquí podrías hacer una llamada para actualizar la lista de usuarios o cerrar el modal
      alert("Usuario eliminado con éxito");
      closeModal(); // Opcional, para cerrar el modal después de eliminar
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.numero_documento !== userId)
      );
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
      alert("Hubo un error al eliminar el usuario");
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
        telefono_persona_de_confianza:
          editableUser.telefono_persona_de_confianza,
        relacion_persona_de_confianza:
          editableUser.relacion_persona_de_confianza,
        estado_civil: editableUser.estado_civil,
        ciudad_nacimiento: editableUser.ciudad_nacimiento,
        corregimiento_nacimiento: editableUser.corregimiento_nacimiento,
        municipio_nacimiento: editableUser.municipio_nacimiento,
        pais_nacimiento: editableUser.pais_nacimiento,
        departamento_nacimiento: editableUser.departamento_nacimiento,
        fecha_nacimiento: editableUser.fecha_nacimiento,
        pertenencia_grupo_poblacional:
          editableUser.pertenencia_grupo_poblacional,
        comuna_barrio: editableUser.comuna_barrio,
        barrio_residencia: editableUser.barrio_residencia,
        ciudad_residencia: editableUser.ciudad_residencia,
        direccion_residencia: editableUser.direccion_residencia,
        zona_residencia: editableUser.zona_residencia,
        //Diversidad sexual
        cambio_nombre_sexo_documento: editableUser.cambio_nombre_sexo_documento,
        recibir_orientacion_cambio_en_documento:
          editableUser.recibir_orientacion_cambio_en_documento,
        pronombres: editableUser.pronombres,
        orientaciones_sexuales: editableUser.orientaciones_sexuales,
        expresiones_de_genero: editableUser.expresiones_de_genero,
        respuestas_cambio_documento: editableUser.respuestas_cambio_documento,
        identidades_de_genero: editableUser.identidades_de_genero,
        sexo_asignado: editableUser.sexo_asignado,
        //Info general
        tiene_eps: editableUser.tiene_eps,
        calificacion_relacion_familiar:
          editableUser.calificacion_relacion_familiar,
        creencia_religiosa: editableUser.creencia_religiosa,
        decision_encuentro_inicial: editableUser.decision_encuentro_inicial,
        origen_descubrimiento_campus_diverso:
          editableUser.origen_descubrimiento_campus_diverso,
        comentarios_o_sugerencias_de_usuario:
          editableUser.comentarios_o_sugerencias_de_usuario,
        actividades_especificas_tiempo_libre:
          editableUser.actividades_especificas_tiempo_libre,

        factores_riesgos: editableUser.factores_riesgos,
        Ocupaciones_actules: editableUser.Ocupaciones_actules,
        profesionales_que_brindaron_atencion:
          editableUser.profesionales_que_brindaron_atencion,
        acompanamiento_que_recibio: editableUser.acompanamiento_que_recibio,
        fuentes_ingresos: editableUser.fuentes_ingresos,
        redes_apoyo: editableUser.redes_apoyo,
        observacion_general_actividades_especificas_tiempo_libre:
          editableUser.observacion_general_actividades_especificas_tiempo_libre,
        observacion_general_fuente_de_ingresos:
          editableUser.observacion_general_fuente_de_ingresos,
        observacion_horario: editableUser.observacion_horario,
        observacion_general_redes_de_apoyo:
          editableUser.observacion_general_redes_de_apoyo,
        observacion_general_factores_de_riesgo:
          editableUser.observacion_general_factores_de_riesgo,
        regimen_eps: editableUser.regimen_eps,
        nombre_eps: editableUser.nombre_eps,
        //Info academica
        codigo_estudiante: editableUser.codigo_estudiante,
        sedes: editableUser.sedes,
        programas: editableUser.programas,
        semestre_academico: editableUser.semestre_academico,
        pertenencia_univalle: editableUser.pertenencia_univalle,
        estamentos: editableUser.estamentos,

        //documentos
        autorizacion_manejo_de_datos: editableUser.autorizacion_manejo_de_datos,
        firma_consentimiento_informado:
          editableUser.firma_consentimiento_informado,
        firma_terapia_hormonal: editableUser.firma_terapia_hormonal,
        apgar_familiar: editableUser.apgar_familiar,
        documento_digital_y_archivo: editableUser.documento_digital_y_archivo,
        ecomapa: editableUser.ecomapa,
        arbol_familiar: editableUser.arbol_familiar,
      };
      let endpointsList = [];

      switch (currentPage) {
        case 0:
          endpointsList = [
            "persona/persona",
            "diversidad-sexual/diversidad-sexual",
          ];
          break;
        case 1:
          endpointsList = [
            "persona/persona",
            "diversidad-sexual/diversidad-sexual",
          ];
          break;
        case 2:
          endpointsList = ["informacion-general/informacion-general"];
          break;
        case 3:
          endpointsList = ["informacion-general/informacion-general"];
          break;
        case 4:
          endpointsList = ["informacion-academica/informacion-academica"];
          break;
        case 5:
          endpointsList = ["documentos-autorizacion/documentos-autorizacion"];
          break;
        case 6:
          endpointsList = ["seguimiento-campus/seguimiento"];
          break;
        // Añade más casos para otras páginas si es necesario
        default:
          console.error("Página no válida");
          return;
      }

      handleUpdateUser(endpointsList, numero_documento, updatedData);

      setEditableUser({
        nombre_identitario: "",
        nombre_y_apellido: "",
        email: "",
        sexo_asignado: [],
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
        Ocupaciones_actules: "",
        acompanamiento_que_recibio: "",
        profesionales_que_brindaron_atencion: "",
        redes_apoyo: [],
        factores_riesgos: [],
        encuentro_dias_horas: [],
        acompanamientos_recibido: [],
        fuentes_ingresos: [],
        //APGAR familiar
        apgar_pregunta1: [],
        apgar_pregunta2: [],
        apgar_pregunta3: [],
        apgar_pregunta4: [],
        apgar_pregunta5: [],
        apgar_pregunta6: [],
        apgar_pregunta7: [],
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
        <Row className="mb-3 align-items-end">
          <Col xs={12} md={3} className="mb-2 mb-md-0">
            <label className="form-label">Buscar por nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="form-control"
              style={{ height: "38px" }}
            />
          </Col>

          <Col xs={12} md={4} className="mb-2 mb-md-0">
            <label className="form-label">Buscar por fecha</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ display: "flex", gap: "10px" }}>
                <DatePicker
                  label="Fecha de Inicio"
                  value={startDate}
                  onChange={(newDate) =>
                    setStartDate(newDate ? dayjs(newDate) : null)
                  }
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
                <DatePicker
                  label="Fecha de Fin"
                  value={endDate}
                  onChange={(newDate) =>
                    setEndDate(newDate ? dayjs(newDate) : null)
                  }
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </div>
            </LocalizationProvider>
          </Col>
          <Col xs="auto" className="d-flex align-items-end mb-2 mb-md-0">
            {(startDate || endDate) && (
              <Button
                className="button-inicial"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
                variant="outline-secondary" // Estilo de botón de Bootstrap
                style={{ height: "38px", width: "38px", padding: 0 }}
              >
                <i className="bi-trash"></i>
              </Button>
            )}
          </Col>
          <Col
            xs="auto"
            className="d-flex align-items-end mb-2 mb-md-0 ms-auto"
          >
            <Button
              className="btn-action btn-follow"
              onClick={openCreateModal}
              style={{ height: "50px" }}
            >
              <PersonAddAlt1Icon style={{ marginRight: "6px" }} />
              Agregar persona
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={12} md={4} lg={4} className="mb-2 mb-md-0">
            <label className="form-label">Filtrar por programa</label>
            <Select
              classNamePrefix="Select"
              value={selectedPrograma}
              onChange={(selectedOption) => setSelectedPrograma(selectedOption)}
              options={[...programaOptions, { label: "Otro", value: "otro" }]}
              placeholder="Selecciona un programa"
              isClearable
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 1000,
                }),
              }}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="mb-2 mb-md-0">
            <label className="form-label">Filtrar por revisión</label>
            <Select
              classNamePrefix="Select"
              value={selectedRevision}
              onChange={(selectedOption) => setSelectedRevision(selectedOption)}
              options={revisionOptions}
              placeholder="Visualizar revisados o no"
              isClearable
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 1000,
                }),
              }}
            />
          </Col>
        </Row>
        <p className="result-count">Resultados: {filteredUsers.length}</p>
        <div className="table-container">
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th className="table-name">Nombre Identitario</th>
                  <th className="table-name">Nombre y Apellido</th>
                  <th className="table-name">Tipo de Documento</th>
                  <th className="table-name">Número de Documento</th>
                  <th className="table-name">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers
                  .sort(
                    (a, b) =>
                      new Date(b.fecha_creacion_usuario) -
                      new Date(a.fecha_creacion_usuario)
                  ) // Ordenar por fecha
                  .map((user, index) => (
                    <tr
                      key={user.numero_documento}
                      className={`${index % 2 === 0 ? "even-row" : "odd-row"} ${
                        !user.revision_usiario ? "pending-review" : ""
                      }`}
                      onClick={() => openModal(user)}
                    >
                      <td>{user.nombre_identitario}</td>
                      <td>{user.nombre_y_apellido}</td>
                      <td>
                        {user.tipo_documento
                          ? user.tipo_documento
                          : "No registrado"}
                      </td>
                      <td>{user.numero_documento}</td>
                      <td>
                        {new Date(
                          user.fecha_creacion_usuario
                        ).toLocaleDateString()}
                      </td>
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
          Usuariorevisado={Usuariorevisado}
          isRevisado={isRevisado}
          setRevisado={setRevisado}
          handleSelectChange3={handleSelectChange3}
          tipoDocumentoOptions={tipoDocumentoOptions}
          setSeguimientosInfo={setSeguimientosInfo}
          sedeOptions={sedeOptions}
          programaOptions={programaOptions}
          regimenEpsOptions={regimenEpsOptions}
          decisionEncuentroInicialOptions={decisionEncuentroInicialOptions}
          estadocivilOptions={estadocivilOptions}
          zonaResidencialOptions={zonaResidencialOptions}
          identidadEtnicoRacialOptions={identidadEtnicoRacialOptions}
          apgarpregunta1Options={apgarpregunta1Options}
          apgarpregunta2Options={apgarpregunta2Options}
          apgarpregunta3Options={apgarpregunta3Options}
          apgarpregunta4Options={apgarpregunta4Options}
          apgarpregunta5Options={apgarpregunta5Options}
          apgarpregunta6Options={apgarpregunta6Options}
          apgarpregunta7Options={apgarpregunta7Options}
          sexoAsignadoOptions={sexoAsignadoOptions}
        />

        <ModalEstudiantes
          isModalOpen={isCreateModalOpen}
          closeModal={closeCreateModal}
          isEmptyModal={true}
          razasOptions={razasOptions}
          pronombresOptions={pronombresOptions}
          expresionesOptions={expresionesOptions}
          orientacionOptions={orientacionOptions}
          identidadesGeneroOptions={identidadesGeneroOptions}
          documentoOptions={documentoOptions}
          estamentoOptions={estamentoOptions}
          factoresOptions={factoresOptions}
          fuentesOptions={fuentesOptions}
          redesOptions={redesOptions}
          tipoDocumentoOptions={tipoDocumentoOptions}
          sedeOptions={sedeOptions}
          programaOptions={programaOptions}
          regimenEpsOptions={regimenEpsOptions}
          decisionEncuentroInicialOptions={decisionEncuentroInicialOptions}
          estadocivilOptions={estadocivilOptions}
          zonaResidencialOptions={zonaResidencialOptions}
          identidadEtnicoRacialOptions={identidadEtnicoRacialOptions}
          apgarpregunta1Options={apgarpregunta1Options}
          apgarpregunta2Options={apgarpregunta2Options}
          apgarpregunta3Options={apgarpregunta3Options}
          apgarpregunta4Options={apgarpregunta4Options}
          apgarpregunta5Options={apgarpregunta5Options}
          apgarpregunta6Options={apgarpregunta6Options}
          apgarpregunta7Options={apgarpregunta7Options}
          sexoAsignadoOptions={sexoAsignadoOptions}
          onCreateSuccess={handleCreateSuccess}
        />
      </Container>
    </>
  );
};

export default ObtenerEstudiante;
