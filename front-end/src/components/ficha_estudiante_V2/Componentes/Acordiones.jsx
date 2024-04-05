import Accesibilidad from "./accesibilidad/Accesibilidad";
import Acordion from "./Acordion";
import "../../../Scss/ficha_estudiante_V2/acordion.css";
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
