/**
 * @file Acordion.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar un acordeón con un 
 *              título y un contenido que se puede abrir y cerrar.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";

// Componente de acordeón
// Recibe como props:
// title: título del acordeón
// children: contenido del acordeón
// claseAcordion: clase del acordeón
// claseContenido: clase del contenido del acordeón
// flechaUp: flecha hacia arriba
// flechaDown: flecha hacia abajo
const Acordion = ({
  title,
  children,
  claseAcordion,
  claseContenido,
  flechaUp,
  flechaDown,
}) => {
  // Estado para controlar si el acordeón está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Botón para abrir y cerrar el acordeón, este botón cambia el estado de la variable entre true/false */}
      <button className={claseAcordion} onClick={() => setIsOpen(!isOpen)}>
        {title}
        {flechaUp !== "" &&
          flechaDown !== "" &&
          (isOpen ? flechaUp : flechaDown)}
      </button>
      {/* Si isOpen es true, se muestra el contenido del acordeón, si es false, no se muestra nada */}
      {isOpen && <div className={claseContenido}>{children}</div>}
    </div>
  );
};

export default Acordion;
