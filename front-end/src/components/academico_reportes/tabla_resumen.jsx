/**
  * @file tabla_resumen.jsx
  * @version 1.0.0
  * @description Componente para tablas de resumen para reportes académicos
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 29 de abril del 2024
*/

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Tab, Tabs } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Tabla_resumen
 * @description Componente que muestra una tabla de resúmenes para reportes académicos
 * @returns {JSX.Element} Tabla_resumen
 */
const Tabla_resumen = ({ titulos, items }) => {
  return (
    <Table bordered size="sm">
      <thead>
        <tr>
          {titulos.map((titulo, index) => (
            <th key={index} className="titulo_tabla_resumen">{titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((fila, index) => (
          <tr key={index}>
            {fila.map((item, i) => (
              <td key={i} className="contenido_tabla_resumen">{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tabla_resumen;