import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalSeguimientos = ({isSeguimientoModalOpen, closeSeguimientoModal}) => {
  return (
    <Modal show={isSeguimientoModalOpen} onHide={closeSeguimientoModal} size='lg'>
    <Modal.Header closeButton>
      <Modal.Title>Seguimiento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Contenido del modal de seguimiento */}
      <p>Contenido del seguimiento...</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger" onClick={closeSeguimientoModal}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ModalSeguimientos;