import React from 'react';
import '../../../Scss/ficha_estudiante_discapacidad/InformacionGeneral.css'; // Importa el archivo CSS separado

const InformacionGeneral = () => {
  return (
    <div className="informacion-general-container">
      <div className="left-section">
        <h1>
          <i className="bi bi-person-fill"></i> INFORMACIÓN GENERAL
        </h1>
        <h2>Información del estudiante</h2>
        <div className="form-row">
          <label>Tipo de documento:</label>
          <input type="text" placeholder="Ingrese tipo de documento" />
          <label>Número de documento:</label>
          <input type="text" placeholder="Ingrese número de documento" />
        </div>
        <div className="form-row">
          <label>Nombres:</label>
          <input type="text" placeholder="Ingrese nombres" />
          <label>Apellidos:</label>
          <input type="text" placeholder="Ingrese apellidos" />
        </div>
        <div className="form-row">
          <label>Año de ingreso a Univalle:</label>
          <input type="text" placeholder="Ingrese año de ingreso" />
          <label>Correo electrónico:</label>
          <input type="email" placeholder="Ingrese correo" />
          <label>Celular:</label>
          <input type="text" placeholder="Ingrese celular" />
        </div>
        {/* Añade más filas similares para cada campo que necesites */}
      </div>

      <div className="right-section">
        {/* Esta sería la columna derecha de la imagen */}
        <h2>ESTADO</h2>
        <div className="status-box">
          <p>Acompañamiento: <input type="checkbox" /> SI <input type="checkbox" /> NO</p>
          <p>Retirado/a: <input type="checkbox" /> SI <input type="checkbox" /> NO</p>
        </div>
        <h3>Programas Académicos</h3>
        <div className="academic-program">
          <p>FALTA PODER LLAMARLO</p>
        </div>
        <h3>Información general del acudiente de emergencia</h3>
        <div className="form-row">
          <label>Nombre completo:</label>
          <input type="text" placeholder="Ingrese nombre completo" />
          <label>Parentesco:</label>
          <input type="text" placeholder="Ingrese parentesco" />
          <label>Celular:</label>
          <input type="text" placeholder="Ingrese celular" />
        </div>
      </div>
    </div>
  );
};

export default InformacionGeneral;
