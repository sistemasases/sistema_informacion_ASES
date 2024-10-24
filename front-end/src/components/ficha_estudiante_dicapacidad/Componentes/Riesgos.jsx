import { useState } from "react";
import "../../../Scss/ficha_estudiante_discapacidad/riesgos.css";
import Modal from "./Modal";
import Formulario from "./Formulario";

// Componente de Riesgos
// Este componente se encarga de mostrar los riesgos que puede tener un estudiante
// y de mostrar un formulario para agregar un nuevo seguimiento
const Riesgos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container-riesgos">
      <button className="buttonR" onClick={() => setIsModalOpen(true)}>
        NUEVO SEGUIMIENTO
      </button>
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <Formulario />
      </Modal>
      <p className="titleR">RIESGOS</p>

      <div className="categorias">
        <div className="casos">
          <p className="gradoS alto">A</p>
          <p className="cat">Alto</p>
        </div>
        <div className="casos">
          <p className="gradoS medio">M</p>
          <p className="cat">Medio</p>
        </div>
        <div className="casos">
          <p className="gradoS bajo">B</p>
          <p className="cat">Bajo</p>
        </div>
      </div>

      <div className="container-casos">
        <div className="casos casosG">
          <p className="letras B">B</p>
          <p className="grupo bajo">INDIVIDUAL</p>
        </div>
        <div className="casos casosG">
          <p className="letras M">M</p>
          <p className="grupo medio">FAMILIAR</p>
        </div>
        <div className="casos casosG">
          <p className="letras A">A</p>
          <p className="grupo alto">ACADÉMICO</p>
        </div>
        <div className="casos casosG">
          <p className="letras B">B</p>
          <p className="grupo bajo">ECONÓMICO</p>
        </div>
        <div className="casos casosG">
          <p className="letras B">B</p>
          <p className="grupo bajo espV">VIDA UNIVERSITARIA</p>
        </div>
        <div className="casos casosG">
          <p className="letras N">N</p>
          <p className="grupo nan">GEOGRÁFICO</p>
        </div>
      </div>
    </div>
  );
};

export default Riesgos;
