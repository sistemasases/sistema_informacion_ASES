/**
 * @file acordeon_tratamiento_datos_temporal.jsx
 * @version 1.0.0
 * @description rendizar los tratamientos de datos temporales de los estudiantes.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 12 de Diciembre del 2025
 */

import React, { useState, useEffect } from "react";
import { Container, Button, Accordion } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import Read_tratamientos_temporales from "../../service/panel_admin/panel_admin_firma_tratamiento_datos_temporales_listar_tratamientos_temporales.js";
import Delete_tratamientos_temporales from "../../service/panel_admin/panel_admin_firma_tratamiento_datos_temporales_eliminar_tratamientos_temporales.js";
import Update_tratamientos from "../../service/panel_admin/panel_admin_firma_tratamiento_datos_temporales_actualizar_tratamientos_temporales.js";

const SelectorTratamientoTemporal = () => {
  const [state, setState] = useState({
    data_tratamientos: [],
    filas_seleccionadas: [],
  });


  const handleRowsSeleccionadas = ({ selectedRows }) => {
    setState((prevState) => ({
      ...prevState,
      filas_seleccionadas: selectedRows,
    }));
  };

  const eliminarTratamientosSeleccionados = async () => {
    try {
      const ids = state.filas_seleccionadas.map((row) => row.num_doc);
      console.log("IDs a eliminar:", ids);
      const response = await Delete_tratamientos_temporales.eliminar_firmas_temporales({values : ids});
      if (response) {
        // eliminamos las filas seleccionadas del estado local para actualizar la tabla inmediatamente
        setState((prevState) => ({
          ...prevState,
          filas_seleccionadas: [], 
        }));

        // esperamos un momento para asegurarnos de que el backend haya procesado la eliminación antes de volver a consultar los datos
        setTimeout(() => {
          consultaAllTratamientosTemporales();
        }, 1000);
        
      } else {
        console.error("No se pudieron eliminar los tratamientos seleccionados.");
      }
    } catch (error) {
      console.error("Error al eliminar tratamientos:", error);
    }
  };

  const consultaAllTratamientosTemporales = async () => {
    try {
      const response =
        await Read_tratamientos_temporales.listar_tratamientosTemporales({});
      if (response && Array.isArray(response)) {
        setState((prevState) => ({
          ...prevState,
          data_tratamientos: response,
        }));
      }
    } catch (error) {
      console.error("Error al consultar tratamientos:", error);
    }
  };

  useEffect(() => {
    consultaAllTratamientosTemporales();
  }, []);

  const handleUpdateData = async () => {
    try {
      //   console.log("Guardando cambios:", selectedTratamiento);
      //   setShowEditModal(false);
      Update_tratamientos.actualizar_tratamientos_temporales();
      setTimeout(() => {
        consultaAllTratamientosTemporales();
      }, 1000);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const columnas = [
    {
      name: "NOMBRE",
      selector: (row) => row?.nombre_firma,
      sortable: false,
      wrap: true,
      grow: 1.2,
    },
    {
      name: "NÚMERO DE DOCUMENTO",
      selector: (row) => row?.num_doc,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "CORREO ELECTRÓNICO",
      selector: (row) => row?.correo_firma,
      sortable: true,
      wrap: true,
      grow: 1.0,
    },
    {
      name: "FECHA DE FIRMA",
      selector: (row) => row?.fecha_firma,
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "AUTORIZA TRATAMIENTO DATOS",
      selector: (row) => (row?.autoriza_tratamiento_datos ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
    {
      name: "AUTORIZA TRATAIENTO IMAGEN",
      selector: (row) => (row?.autoriza_tratamiento_imagen ? "Sí" : "No"),
      sortable: true,
      wrap: true,
      grow: 0.8,
    },
  ];

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={consultaAllTratamientosTemporales}>
            Tratamiento de Datos Temporales
          </Accordion.Header>
          <Accordion.Body>
            <DataTableExtensions
              columns={columnas}
              data={state.data_tratamientos}
              export={false}
              print={false}
              filterPlaceholder="Buscar firma de estudiante..."
            >
              
              <DataTable
                title="Tratamiento de Datos de Estudiantes"
                noDataComponent="Cargando Información."
                pagination
                striped
                selectableRows
                selectableRowsHighlight
                onSelectedRowsChange={handleRowsSeleccionadas}
              />
            </DataTableExtensions>
            <hr />
            <Button variant="primary" onClick={(e) => handleUpdateData()}>
              Verificar Consentimientos
            </Button>
            <Button
              variant="danger"
              disabled={state.filas_seleccionadas.length === 0}  
              className="ms-2"
              onClick={(e) => eliminarTratamientosSeleccionados()}  
            >
              Eliminar seleccionadas ({state.filas_seleccionadas.length})
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SelectorTratamientoTemporal;
