import React, { useState } from 'react';
import '../../../Scss/ficha_estudiante_discapacidad/acordion.css';

// Componente de acordeón
const Acordion = ({ title, children }) => {
  // Estado para controlar si el acordeón está abierto o cerrado  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Botón para abrir y cerrar el acordeón, este botón cambia el estado de la variable entre true/false */}
      <button className='acordion' onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {/* Si isOpen es true, se muestra el contenido del acordeón, si es false, no se muestra nada */}
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Acordion;