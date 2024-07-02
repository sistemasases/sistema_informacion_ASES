import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ObtenerEstudiante = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [diversidadInfo, setDiversidadInfo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/campus_diverso/persona/`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const listItemStyle = {
    backgroundColor: '#f8f8f8',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const userNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    textAlign: 'left',
  };

  const userEmailStyle = {
    fontSize: '14px',
    textAlign: 'left',
  };

  const openModal = (user) => {
    setModalOpen(true);
    setSelectedUser(user);

    // Hacer una solicitud a la URL de diversidad-sexual con el num_doc
    fetch(`${process.env.REACT_APP_API_URL}/campus_diverso/diversidad-sexual/${user.num_doc}/`)
      .then((response) => response.json())
      .then((data) => setDiversidadInfo(data))
      .catch((error) => console.error('Error al obtener información de diversidad sexual:', error));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setDiversidadInfo(null);
  };

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'left', margin: '20px' }}>
      <h1>Lista de personas</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          textAlign: 'left',
        }} 
      />
      <ul style={{ textAlign: 'left', margin: '10px' }}>
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            style={listItemStyle}
            onClick={() => openModal(user)}
          >
            <h2 style={userNameStyle}>Nombre: {user.nombre}</h2>
            <p style={userEmailStyle}>Identificación: {user.num_doc}</p>
          </li>
        ))}
      </ul>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>Nombre: {selectedUser.nombre}</p>
              <p>Identificación: {selectedUser.num_doc}</p>
              <p>Tipo de identifiacion: {selectedUser.tipo_doc}</p>
              <p>Apellido: {selectedUser.apellido}</p>
              <p>Estrato: {selectedUser.estrato_socioeconomico}</p>

              {diversidadInfo && (
                <div>
                  <p>Información de diversidad sexual:</p>
                  {/* Mostrar información de diversidad sexual aquí */}
                  <p>cambio de nombre y/o sexo en el documento?: {diversidadInfo.pronombres}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ObtenerEstudiante;
