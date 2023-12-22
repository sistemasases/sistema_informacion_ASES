import Acordion from "./Acordion";

const AcordionesHijos = ({ acordiones, claseAcor }) => {
  return (
    <div className="container-acordion container-subacordion">
      {acordiones.map((acordion, index) => (
        <Acordion key={index} title={acordion.title} claseAcordion={claseAcor}>
          <p>{acordion.content}</p>
        </Acordion>
      ))}
    </div>
  );
};

export default AcordionesHijos;