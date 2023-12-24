import Accesibilidad from "./accesibilidad/Accesibilidad";
import Acordion from "./Acordion";
import '../../../Scss/ficha_estudiante_discapacidad/acordion.css';
import General from "./general/General";
import Seguimiento from "./seguimiento/Seguimiento";

// Componente de Acordiones
// Este componente se encarga de mostrar los acordeones de la ficha de estudiante
// Cada acordeón tiene un título y un contenido.

const Acordiones = () => {
  return (
    <div className="container-acordion">
      <Acordion title="GENERAL" claseAcordion={'acordion'}>
        <General />
      </Acordion>
      <Acordion title="CARACTERIZACIÓN" claseAcordion={'acordion'}>
        <p>Contenido del acordeón 2</p>
      </Acordion>
      <Acordion title="ACCESIBILIDAD" claseAcordion={'acordion'}>
        <Accesibilidad />
      </Acordion>
      <Acordion title="SEGUIMIENTO" claseAcordion={'acordion'}>
        <Seguimiento />
      </Acordion>
    </div>
  );
};

export default Acordiones;
