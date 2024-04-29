/**
 * @file Modal.jsx
 * @version 1.0.0
 * @description Este componente se encarga de renderizar un modal con contenido 
 *              proporcionado como children. El modal puede estar abierto o cerrado 
 *              dependiendo del estado de la propiedad isOpen. Se proporciona una función 
 *              handleClose para cerrar el modal cuando se hace clic en el botón "Close".
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import "../../../Scss/ficha_estudiante_V2/modal.css";

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
        <button onClick={handleClose} className="boton">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
