/**
 * @file acordeon_roles.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los roles.
 */

import React, { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import all_rols_service from "../../service/all_rols";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import Read_roles from "../../service/panel_admin/panel_admin_roles_listar_roles.js";

const SelectorRoles = () => {
  const [state, setState] = useState({
    data_roles: [],
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllRoles = async () => {
    try {
      // const response = await all_rols_service.all_rols();
      const response = await Read_roles.listar_roles({});
      if (response && Array.isArray(response)) {
        setState({ ...state, data_roles: response });
      }
    } catch (error) {
      console.error("Error al consultar roles:", error);
    }
  };

  // Definición de las columnas de la tabla
  const columnas = [
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      sortable: false,
      wrap: true,
      grow: 0.4,
    },
    {
      name: "PERMISOS",
      selector: (row) => row.permisos?.join(", ") || "Sin permisos",
      sortable: false,
      wrap: true,
      // grow: 0.5,
    },
  ];

  useEffect(() => {
    consultaAllRoles();
  }, []);

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllRoles}>Roles</Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions columns={columnas} data={state.data_roles}>
              <DataTable
                title="Roles"
                noDataComponent="Cargando Información."
                pagination
                striped
              />
            </DataTableExtensions>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SelectorRoles;
