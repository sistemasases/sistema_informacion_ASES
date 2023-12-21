import Acordion from "./Acordion";

const Acordiones = () => {
  return (
    <div className="container-acordion">
      <Acordion title="GENERAL">
        <p>Contenido del acordeón 1</p>
      </Acordion>
      <Acordion title="CARACTERIZACIÓN">
        <p>Contenido del acordeón 2</p>
      </Acordion>
      <Acordion title="ACCESIBILIDAD">
        <p>Contenido del acordeón 3</p>
      </Acordion>
      <Acordion title="SEGUIMIENTO">
        <p>Contenido del acordeón 3</p>
      </Acordion>
    </div>
  );
};

export default Acordiones;
