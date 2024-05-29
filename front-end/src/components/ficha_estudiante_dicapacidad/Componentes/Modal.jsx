import React from "react";
import "../../../Scss/ficha_estudiante_discapacidad/modal.css";

// Componente de Modal
// Recibe como props:
// isOpen: booleano que indica si el modal esta abierto o cerrado
// handleClose: funcion que se ejecuta cuando se cierra el modal
// children: elementos que se muestran dentro del modal

const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalF">
      <div className="modal-contentF">
        {children}
        <button onClick={handleClose} className="full-size-button boton_cerrar">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
