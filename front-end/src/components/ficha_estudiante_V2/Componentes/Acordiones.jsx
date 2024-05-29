/**
 * @file Acordiones.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar los acordeones de la ficha de estudiante.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import Acordion from "./Acordion";
import "../../../Scss/ficha_estudiante_discapacidad/acordion.css";
import General from "./general/General";
import Seguimiento from "./seguimiento/Seguimiento";
import Academico from "./academico/Academico";

// Componente de Acordiones
// Este componente se encarga de mostrar los acordeones de la ficha de estudiante
// Cada acordeón tiene un título y un contenido.

const Acordiones = () => {
  return (
    <div className="container-acordion">
      <Acordion title="GENERAL" claseAcordion={"acordion"}>
        <General />
      </Acordion>
      <Acordion title="SOCIOEDUCATIVO" claseAcordion={"acordion"}>
        <Seguimiento />
      </Acordion>
      <Acordion title="ACADÉMICO" claseAcordion={"acordion"}>
        <Academico />
      </Acordion>
      <Acordion title="GEOGRÁFICO" claseAcordion={"acordion"}></Acordion>
    </div>
  );
};

export default Acordiones;
