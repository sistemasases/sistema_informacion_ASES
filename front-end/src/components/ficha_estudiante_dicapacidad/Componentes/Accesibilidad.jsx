import Acordion from "./Acordion";
import Comunicacional from "./Comunicacional";
import FisicaTecnologica from "./FisicaTecnologica";
import Instrumental from "./Instrumental";
import Metodologia from "./Metodologia";
import Programatica from "./Programatica";

const Accesibilidad = () => {
  return (
    <div className="container-acordion container-subacordion">
      <p className="title">COMPONENTES DE ACCESIBILIDAD:</p>
      <Acordion
        title="Accesibilidad Comunicacional"
        claseAcordion={"acordion subacordion"}
      >
        <Comunicacional />
      </Acordion>
      <Acordion
        title="Accesibilidad instrumental"
        claseAcordion={"acordion subacordion"}
      >
        <Instrumental />
      </Acordion>
      <Acordion
        title="Accesibilidad Metodológica"
        claseAcordion={"acordion subacordion"}
      >
        <Metodologia />
      </Acordion>
      <Acordion
        title="Accesibilidad Programática"
        claseAcordion={"acordion subacordion"}
      >
        <Programatica />
      </Acordion>
      <Acordion
        title="Accesibilidad Física y Tecnológica"
        claseAcordion={"acordion subacordion"}
      >
        <FisicaTecnologica />
      </Acordion>
    </div>
  );
};

export default Accesibilidad;
