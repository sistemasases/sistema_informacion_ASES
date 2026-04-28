/**
 * @file acordeon_usuarios_duplicados.jsx
 * @version 1.0.0
 * @description Este archivo importa y renderiza los usuarios duplicados.
 * @author @iMrStevenS2
 * @date 27 de marzo del 2026
 */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Button, Accordion, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

// Services
import Read_user from "../../service/panel_admin/panel_admin_usuario_listar_usuarios_duplicados.js";
import Delete_user from "../../service/panel_admin/panel_admin_usuario_eliminar_usuarios.js";

const SelectorUsuarios = () => {
  const [state, setState] = useState({
    data_user_rol: [],
  });

  const [selectedRows, setSelectedRows] = useState([]);

  const consultaAllUser = async () => {
    try {
      const semestre = desencriptarInt(
        sessionStorage.getItem("id_semestre_actual"),
      );
      const response = await Read_user.listar_usuarios_duplicados();
      // console.log(response);
      if (response && Array.isArray(response)) {
        setState({ ...state, data_user_rol: response });
      }
    } catch (error) {
      console.error("Error al consultar usuarios con roles:", error);
    }
  };

  const handleRowClick = (row) => {
    setSelectedRows((prev) => {
      const exists = prev.find((r) => r.id === row.id);

      if (exists) {
        return prev.filter((r) => r.id !== row.id); // deselecciona
      } else {
        return [...prev, row]; // selecciona
      }
    });
  };

  const handleSelectedRowsChange = ({ allSelected, selectedCount, selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleDelete = () => {
    // console.log(selectedRows);
    if (selectedRows.length === 0) {
      alert("Por favor, seleccione al menos un usuario para eliminar.");
      return;
    }

    const tieneAsignaciones = selectedRows.some(
      (row) => row.total_asignaciones > 0,
    );

    if (tieneAsignaciones) {
      Swal.fire({
        title: "Error",
        text: "No se pueden eliminar usuarios con seguimientos realizados. Por favor, desactive el usuario en su lugar.",
        icon: "error",
        timer: 3000,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    const ids = selectedRows.map((row) => row.id);
    Delete_user.eliminar_usuario({ ids });
    setSelectedRows([]);
  };

  // Definición de las columnas de la tabla
  const columnas = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      grow: 0.2,
    },
    {
      name: "USUARIO",
      selector: (row) => row.username,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "NOMBRES",
      selector: (row) => row.first_name,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "APELLIDOS",
      selector: (row) => row.last_name,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      grow: 1.4,
    },
    {
      name: "Seguimientos Realizados",
      selector: (row) => row.total_asignaciones,
      sortable: true,
      wrap: true,
      grow: 1,
    },
  ];

  useEffect(() => {
    consultaAllUser();
  }, []);

  return (
    // TABLA DE USUARIOS
    <Container>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={consultaAllUser}>
            {
              <span style={{ color: "black", fontWeight: "bold" }}>
                Usuarios Duplicados
              </span>
            }
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_user_rol}
              export={false}
              print={false}
              filterPlaceholder="Buscar usuarios..."
            >
              <DataTable
                title="Usuarios Duplicados"
                noDataComponent="Cargando Información."
                pagination
                selectableRows
                onSelectedRowsChange={handleSelectedRowsChange}
                striped
                pointerOnHover
                highlightOnHover
              />
            </DataTableExtensions>
            <Button
              variant="danger"
              disabled={selectedRows.length === 0}
              onClick={() => handleDelete()}
            >
              Eliminar Usuarios Seleccionados
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SelectorUsuarios;
