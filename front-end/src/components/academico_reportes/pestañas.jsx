/**
  * @file pestañas.jsx
  * @version 1.0.0
  * @description Pestaña de navegación para los reportes académicos
  * @author Carlos Mauricio Tovar
  * @contact carlos.mauricio.tovar@correounivalle.edu.co
  * @date 29 de abril del 2024
*/

import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import Tabla_resumen from './tabla_resumen';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptar, desencriptarInt } from '../../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

/**
 * Pestañas
 * @description Componente que muestra la interfaz de pestañas para los reportes académicos
 * @returns {JSX.Element} Pestañas
 */
const Pestañas = ({ lista_Pestañas, activeTab, onTabSelect }) => {

    return (
        <Container className="contenedor-pestañas">
            <Tabs
                activeKey={activeTab}
                onSelect={onTabSelect}
                id="pestañas"
                className="mb-3 pestañas"
                justify
            >
                {lista_Pestañas.map((pestaña, index) => (
                    <Tab key={index} eventKey={pestaña.title} title={pestaña.title} className="contenido-pestaña">
                        <Container>
                            {pestaña.content}
                        </Container>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default Pestañas;
