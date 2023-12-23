import React from 'react';
import '../../../Scss/ficha_estudiante_discapacidad/modal.css';

const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalF">
      <div className="modal-contentF">
        {children}
        <button onClick={handleClose} className='boton'>Close</button>
      </div>
    </div>
  );
}

export default Modal;