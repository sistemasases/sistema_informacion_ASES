import React, { useMemo, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
  desencriptarInt,
} from "../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const Desplegable_item_listas_materias = ({ item, lista_parciales }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const [open, setOpen] = useState(false);

  const [state, set_state] = useState({
    cursos_de_la_facultad: [],
    franjas_de_curso: [],
    profesores_de_la_franja: [],
    alumnos_del_profesor: [],
  });

  // Función para calcular el promedio de las notas
  const calcularPromedio = (notas) => {
    if (!notas || notas.length === 0) return 0;

    const sum = notas.reduce(
      (acc, nota) => acc + parseFloat(nota.calificacion),
      0
    );
    const promedio = sum / notas.length;
    return promedio.toFixed(2);
  };

  const calcularPromedio_parciales = (notas) => {
    if (!notas || notas.length === 0) return 0;

    const notasParciales = notas.filter((nota) =>
      lista_parciales.includes(nota.id_item)
    ); // Filtrar notas por IDs en la lista parcialIDs
    if (notasParciales.length === 0) return 0; // Si no hay notas parciales, retornar 0

    const sum = notasParciales.reduce(
      (acc, nota) => acc + parseFloat(nota.calificacion),
      0
    );
    const promedio = sum / notasParciales.length;
    return promedio.toFixed(2);
  };

  // Función para obtener el color del fondo del campo de promedio
  const getPromedioColor = (promedio) => {
    if (promedio < 3.0) {
      return "red";
    } else if (promedio >= 3.0 && promedio < 3.5) {
      return "orange";
    } else {
      return "green";
    }
  };

  // Función para actualizar la nota en tiempo real
  const updateNota = async (notaIndex, nuevoValor) => {
    const notasActualizadas = [...item.notas]; // Crear una copia del array de notas
    notasActualizadas[notaIndex].calificacion = nuevoValor; // Actualizar el campo de calificación de la nota correspondiente
    item.notas = notasActualizadas; // Actualizar el objeto 'item' con el nuevo array de notas
    set_state({ ...state }); // Disparar una re-renderización para reflejar los cambios en la interfaz

    // Realizar la solicitud HTTP al backend para actualizar la nota en la base de datos
    try {
      const notaId = item.notas[notaIndex].id; // Obtener el ID de la nota que se está actualizando
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/academico/crear_nota/${notaId}/`, // Reemplaza esta URL con la ruta correcta para actualizar la nota
        { calificacion: nuevoValor }, // Datos a enviar en el cuerpo de la solicitud (nueva calificación)
        config
      );
    } catch (error) {
      console.log("Error al actualizar la nota:", error);
      // En caso de error, se puede mostrar un mensaje de error en la interfaz o realizar otras acciones necesarias.
    }
  };

  if (item.tipo_dato === "estudiante") {
    return (
      <Row>
        {/*esta es la lista : <li >{JSON.stringify(lista_parciales)}</li>*/}

        <Col className={open ? "fichas_academico4 open" : "fichas_academico4"}>
          <Row
            className="link_academico1_sin_borde"
            onClick={() => setOpen(!open)}
          >
            {desencriptar(sessionStorage.getItem("rol")) === "profesor" ? (
              <Col className="link_text_academico1_sin_borde" xs={2}>
                {item.nombre} {item.apellido}
              </Col>
            ) : (
              <Col className="link_text_academico1_sin_borde" xs={2}>
                <Link
                  to={`/ficha_estudiante/${item.id}`}
                  className="fichas_academico plain"
                >
                  {item.nombre} {item.apellido}
                </Link>
              </Col>
            )}

            {desencriptar(sessionStorage.getItem("rol")) === "profesor" ? (
              <Col className="link_text_academico1_sin_borde" xs={2}>
                {item.cod_univalle}
              </Col>
            ) : (
              <Col className="link_text_academico1_sin_borde" xs={2}>
                <Link
                  to={`/ficha_estudiante/${item.id}`}
                  className="fichas_academico plain"
                >
                  {item.cod_univalle}
                </Link>
              </Col>
            )}

            {item.notas ? (
              <>
                {item.notas.map((nota, index) => (
                  <Col key={index}>
                    <Form.Control
                      type="number"
                      value={nota.calificacion}
                      onChange={(e) => updateNota(index, e.target.value)}
                      min="0.0"
                      max="5.0"
                    />
                  </Col>
                ))}
                {desencriptar(sessionStorage.rol) !== "profesor" ? (
                  <Col xs={"2"}>
                    <Row>
                      <Col
                        xs={"6"}
                        style={{
                          backgroundColor: getPromedioColor(
                            calcularPromedio(item.notas)
                          ),
                        }}
                      >
                        {calcularPromedio(item.notas)}
                      </Col>
                      <Col
                        xs={"6"}
                        style={{
                          backgroundColor: getPromedioColor(
                            calcularPromedio_parciales(item.notas)
                          ),
                        }}
                      >
                        {calcularPromedio_parciales(item.notas)}
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <div class="d-none"></div>
                )}
              </>
            ) : (
              <Col>sin notas registradas</Col>
            )}
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <a href={item.path || "#"} className="fichas_academico plain">
        return
      </a>
    );
  }
};

export default Desplegable_item_listas_materias;
