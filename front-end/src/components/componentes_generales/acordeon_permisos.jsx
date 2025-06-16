/**
 * @file admin_roles.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los roles.
 */

import React, { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import all_permisos_service from "../../service/all_permisos";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import Read_permisos from "../../service/panel_admin/panel_admin_permisos_listar_permisos.js";

const SelectorPermisos = () => {
  const [state, setState] = useState({
    data_permisos: [],
  });

  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const consultaAllPermisos = async () => {
    try {
      // const response = await all_permisos_service.all_permisos();
      const response = await Read_permisos.listar_permisos({});
      if (response && Array.isArray(response)) {
        setState({ ...state, data_permisos: response });
      }
    } catch (error) {
      console.error("Error al consultar permisos:", error);
    }
  };

  // Definición de las columnas de la tabla
  const columnas = [
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: true },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      sortable: false,
    },
  ];

  useEffect(() => {
    consultaAllPermisos();
  }, []);

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllPermisos}>
            Permisos
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_permisos}
              export={false}
              print={false}
              filterPlaceholder="Buscar Permisos..."
            >
              <DataTable
                title="Permisos"
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

export default SelectorPermisos;
