import Accesibilidad from "./Accesibilidad";
import Acordion from "./Acordion";
import '../../../Scss/ficha_estudiante_discapacidad/acordion.css';

const Acordiones = () => {
  return (
    <div className="container-acordion">
      <Acordion title="GENERAL" claseAcordion={'acordion'}>
        <p>Contenido del acordeón 1</p>
      </Acordion>
      <Acordion title="CARACTERIZACIÓN" claseAcordion={'acordion'}>
        <p>Contenido del acordeón 2</p>
      </Acordion>
      <Acordion title="ACCESIBILIDAD" claseAcordion={'acordion'}>
        <Accesibilidad />
      </Acordion>
      <Acordion title="SEGUIMIENTO" claseAcordion={'acordion'}>
        <p>Contenido del acordeón 3</p>
      </Acordion>
    </div>
  );
};

export default Acordiones;
