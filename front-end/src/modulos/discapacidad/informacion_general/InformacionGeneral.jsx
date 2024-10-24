import React from 'react'
import { FaInfoCircle } from 'react-icons/fa';

function InformacionGeneral() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        <i className="bi bi-person-fill" style={{ marginRight: '10px' }}></i> Información General
      </h1>
      <h2>Información del Estudiante</h2>
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <div>
          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <input type="text" id="tipoDocumento" placeholder="Ingrese tipo de documento" style={{ marginTop: '5px', padding: '8px', width: '150px' }} />
          
          <label htmlFor="numeroDocumento" style={{ marginTop: '15px' }}>Número de Documento:</label>
          <input type="text" id="numeroDocumento" placeholder="Ingrese número de documento" style={{ marginTop: '5px', padding: '8px', width: '150px' }} />
        </div>
      </div>
      {/* Sección para el campo "Nombre" */}
      <div style={{ marginTop: '30px' }}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Ingrese nombre" style={{ marginTop: '5px', padding: '8px', width: '150px' }} />
      </div>
    </div>
  );
};


export default InformacionGeneral
