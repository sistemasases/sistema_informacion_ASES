import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import ModalEstudiantes from './components/modalEstudiantes';
import axios from 'axios';

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
  const [editableUser, setEditableUser] = useState({ ...selectedUser });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/persona/persona/`)
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
    setModalOpen(false);
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
const updateUser = async (endpoint, userId, updatedData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/${endpoint}/${userId}/`, updatedData);
    console.log('Usuario actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};


const handleUpdateUser = async (endpoint, userId, updatedData) => {
  try {
    // Realizar la actualización
    const updatedUser = await updateUser(endpoint, userId, updatedData);

    // Obtener la información completa del usuario después de la actualización
    const fullUserResponse = await axios.get(`${process.env.REACT_APP_API_URL}/persona/persona/${userId}/`);
    const fullUser = fullUserResponse.data;

    // Actualizar el estado con la información completa del usuario
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.numero_documento === userId ? fullUser : user))
    );
    setSelectedUser(fullUser); // Actualiza el usuario seleccionado con la información completa

    // Si el endpoint es de diversidad sexual, también actualiza la información de diversidad sexual
    if (endpoint === 'diversidad-sexual/diversidad-sexual') {
      setDiversidadInfo(updatedUser);
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
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
    };
    let endpoint = '';

    switch (currentPage) {
      case 0:
        endpoint = 'persona/persona';
        break;
      case 1:
        endpoint = 'diversidad-sexual/diversidad-sexual';
        break;
      // Añade más casos para otras páginas si es necesario
      default:
        console.error('Página no válida');
        return;
    }

    handleUpdateUser(endpoint, numero_documento, updatedData);
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
      <h1 className='title-search'>Lista de personas</h1>
      <Container>

      <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <p className="result-count">Resultados: {filteredUsers.length}</p>
        <div className="div-search">
         
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li
                key={user.numero_documento}
                className="list-item"
                onClick={() => openModal(user)}
              >
                <h2 className="user-name">{user.nombre_y_apellido}</h2>
                <p className="user-email"> {user.nombre_identitario}</p>
                <p className="user-email"> {user.numero_documento}</p>
              </li>
            ))}
          </ul>

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
          />
        </div>
      </Container>
    </>
  );
};

export default ObtenerEstudiante;
