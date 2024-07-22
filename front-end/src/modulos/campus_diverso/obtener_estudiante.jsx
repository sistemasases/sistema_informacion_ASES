import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../Scss/campus_diverso/campus_diverso.css';
import ModalEstudiantes from './components/modalEstudiantes';

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
          />
        </div>
      </Container>
    </>
  );
};

export default ObtenerEstudiante;
