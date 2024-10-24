import React from 'react';
import '../../../Scss/ficha_estudiante_discapacidad/InformacionGeneral.css'; // Importa el archivo CSS separado

const InformacionGeneral = () => {
  return (
    <div className="informacion-general-container">
      <div className="left-section">
        {/* Esta es la columna izquierda */}
        <h1>
          <i className="bi bi-person-fill"></i> INFORMACIÓN GENERAL
        </h1>

        <h2>Información del estudiante</h2>

        <div className="student-info">

          <div className="info-block">
            <label>Tipo de documento:</label>
            <p>{'Cedula de'}</p> {/* el o es || se supone*/}
          </div>

          <div className="info-block">
            <label>Número de documento:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Nombres:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Apellidos:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Año de ingreso a Univalle:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Correo electrónico:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Celular:</label>
            <p>{'---'}</p>
          </div>

        </div>
      </div>

      <div className="right-section">
        {/* Esta es la columna derecha */}
        <h2>ESTADO</h2>

        <div className="status-box">
          <p>Acompañamiento: <input type="checkbox" /> SI <input type="checkbox" /> NO</p>
          <p>Retirado/a: <input type="checkbox" /> SI <input type="checkbox" /> NO</p>
        </div>

        <h3>Programas Académicos</h3>
        <div className="academic-program">
          <p>{'---'}</p>
        </div>

        <h3>Información general del acudiente de emergencia</h3>
        <div className="form-row">

          <div className="info-block">
            <label>Nombre Completo:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Parentesco:</label>
            <p>{'---'}</p>
          </div>

          <div className="info-block">
            <label>Celular:</label>
            <p>{'---'}</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default InformacionGeneral;
