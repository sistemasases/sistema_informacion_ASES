import Accesibilidad from "./accesibilidad/Accesibilidad";
import Acordion from "./Acordion";
import "../../../Scss/ficha_estudiante_discapacidad/acordion.css";
import General from "./general/General";
import Seguimiento from "./seguimiento/Seguimiento";
import Caracterizacion from "./caracterizacion/Caracterizacion";
import { useAuthStore } from "../store/auth";

// Componente de Acordiones
// Este componente se encarga de mostrar los acordeones de la ficha de estudiante
// Cada acordeón tiene un título y un contenido.

const Acordiones = () => {
  const { estudianteSelected } = useAuthStore();
  return (
    <div className="container-acordion">
      <Acordion title="GENERAL" claseAcordion={"acordion"}>
        {estudianteSelected?.id ? <General /> : <></>}{" "}
        {/* Si no hay un estudiante seleccionado no se muestra el componente Accesibilidad */}
      </Acordion>
      <Acordion title="CARACTERIZACIÓN" claseAcordion={"acordion"}>
        {estudianteSelected?.id ? <Caracterizacion /> : <></>}{" "}
        {/* Si no hay un estudiante seleccionado no se muestra el componente Accesibilidad */}
      </Acordion>
      <Acordion title="ACCESIBILIDAD" claseAcordion={"acordion"}>
        {estudianteSelected?.id ? <Accesibilidad /> : <></>}{" "}
        {/* Si no hay un estudiante seleccionado no se muestra el componente Accesibilidad */}
      </Acordion>
      {/* <Acordion title="SEGUIMIENTO" claseAcordion={"acordion"}>
        <Seguimiento />
      </Acordion> */}
    </div>
  );
};

export default Acordiones;
