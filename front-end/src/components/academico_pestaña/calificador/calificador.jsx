import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Tabla_de_notas from './tabla_de_notas';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const Cabecera = () => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const [state, set_state] = useState({
    curso_datos_generales: [],
    datos_del_curso: [],
    alumnos_del_profesor: [],
    tiene_alumnos_del_profesor: false,
    tiene_items: false,
    filtro: '',
    profesores_de_la_franja: [],
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);

  const [itemName, setItemName] = useState('');
  const [isPartial, setIsPartial] = useState(false);
  const [flag_de_actualizacion, setFlag_de_actualizacion] = useState(false);

  const [editItemName, setEditItemName] = useState('');
  const [editIsPartial, setEditIsPartial] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [profesor, setProfesor] = useState('');
  const [curso, setCurso] = useState('');
  const [cod, setCod] = useState('');
  const [franja, setFranja] = useState('');

  const [alumnos_del_profesor, setAlumnos_del_profesor] = useState([]);
  const [curso_datos_generales, setCurso_datos_generales] = useState([]);
  const [datos_del_curso, setDatos_del_curso] = useState([]);
  const [idParciales, setIdParciales] = useState([]);

  const [info_materia, setInfo_materia] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const profesorParam = urlParts[5]; // Obtiene el valor del profesor
    const cursoParam = urlParts[4]; // Obtiene el valor del curso
    const codParam = urlParts[6]; // Obtiene el valor del curso
    const franjaParam = urlParts[7]; // Obtiene el valor del curso

    setProfesor(profesorParam);
    setCurso(cursoParam);
    setCod(codParam);
    setFranja(franjaParam);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/academico/alumnos_del_profesor/`,
          { params: { curso: curso, profesor: profesor } },
          config
        );
        set_state({
          ...state,
          tiene_alumnos_del_profesor: true,
        });
        setAlumnos_del_profesor(response.data);
        console.log('Datos de alumnos capturados correctamente');
      } catch (error) {
        console.log('Error al obtener los datos de alumnos');
      }
    };

    const datos_del_curso = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/academico/datos_del_curso/`,
          { params: { curso_id: curso } },
          config
        );

        setDatos_del_curso(response.data);
        const parcialIDs = response.data.filter(item => item.parcial).map(item => item.id);
        setIdParciales(parcialIDs)

      } catch (error) {
        console.log('No se pudo obtener el dato del curso');
      }
    };

    if (curso !== '' && profesor !== '') {
      fetchData();
      datos_del_curso();
      //info_materia();
    }

    const curso_datos_generales = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/academico/curso_datos_generales/` + curso + '/',
          config
        );

        setCurso_datos_generales(response.data);

        console.log('Datos del curso capturados correctamente');
      } catch (error) {
        console.log('No se pudo obtener el dato del curso');
      }
    };

    if (curso !== '' && profesor !== '') {
      fetchData();
      datos_del_curso();
      curso_datos_generales();
      //info_materia();
    }
  }, [profesor, curso, flag_de_actualizacion]);

  const agregar_item = async () => {
    const semestreActual = curso_datos_generales['id_semestre'];

    try {
      const data = {
        id_curso: curso,
        id_profesor: profesor,
        nombre: itemName,
        parcial: isPartial,
        id_semestre: semestreActual, // Asignar el valor del semestre actual al campo 'id_semestre'
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/academico/crear_item/`,
        data,
        config
      );

      // Aquí puedes realizar alguna acción adicional con la respuesta del backend si lo necesitas.
    const newItemId = response.data.id; // Obtener el ID del nuevo item

      // Crear nuevas notas para cada estudiante del curso con el ID del nuevo item
      const estudiantesCurso = alumnos_del_profesor.map((estudiante) => estudiante.id);
      for (const estudianteId of estudiantesCurso) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/academico/crear_nota/`,
          { id_item: newItemId, id_estudiante: estudianteId, calificacion: 0 }, // Puedes poner 0 o dejarlo vacío según sea necesario
          config
        );
      }
      setFlag_de_actualizacion(!flag_de_actualizacion);
      handleClose(); // Cerrar el modal después de agregar el item exitosamente.
    } catch (error) {
      console.log('Error al agregar el item' + error);
    }
  };

  // Función para abrir el modal de edición
  const handleEditModal = (item) => {
    setEditingItem(item);
    setEditItemName(item.nombre);
    setEditIsPartial(item.parcial);
    setEditShow(true);
  };

  // Función para editar el ítem
  // Función para editar el ítem
  const handleEditItem = async () => {
    const semestreActual = curso_datos_generales['id_semestre'];
  
    try {
      const data = {
        id_curso: curso,
        id_profesor: profesor,
        nombre: editItemName,
        parcial: editIsPartial,
        id_semestre: semestreActual,
      };
  
      // Realizar la solicitud PUT al backend para editar el ítem
      await axios.put(
        `${process.env.REACT_APP_API_URL}/academico/crear_item/${editingItem.id}/`,
        data,
        config
      );
  
      // Aquí puedes realizar alguna acción adicional después de editar el ítem si es necesario.
      setFlag_de_actualizacion(!flag_de_actualizacion);
      setEditingItem(null); // Limpiar el objeto de edición
      setEditShow(false); // Cerrar el modal de edición
    } catch (error) {
      console.log('Error al editar el ítem' + error);
    }
};

const handleDeleteItem = async () => {
  try {
    // Crear una lista de notas con el id_item igual al id del item que queremos borrar
    const notasToDelete = alumnos_del_profesor.flatMap((estudiante) =>
      estudiante.notas.filter((nota) => nota.id_item === editingItem.id)
    );

    // Borrar cada una de las notas
    for (const nota of notasToDelete) {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/academico/borrar_nota/${nota.id}/`,
        config
      );
      console.log('Nota borrada correctamente');
    }

    // Borrar el ítem
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/academico/borrar_item/${editingItem.id}/`,
      config
    );
    console.log('Ítem borrado correctamente');

    // Actualizamos el estado para refrescar la lista de ítems
    setFlag_de_actualizacion(!flag_de_actualizacion);

    // Cerramos el modal de edición
    setEditingItem(null);
    setEditShow(false);
  } catch (error) {
    console.log('Error al borrar el ítem y sus notas:', error);
  }
};


  return (
    <Container>
      <Row>
        <Col xs={'12'} md={'8'} className="texto_titulo_bold">
          {curso_datos_generales.nombre}
        </Col>
      </Row>

      <br/>
      <Row>
        <Col xs={'12'} md={'8'} className="texto_titulo_bold">
          <Button onClick={handleShow}>Agregar Item</Button>
        </Col>
      </Row>

      <Row>
        <Col> Parciales : <i class="bi bi-star"></i></Col>
      </Row>
      <br/>



      {state.tiene_alumnos_del_profesor ? (
        <Row >

          <Col className="contenido_fichas_academico2" xs={2} >
            Estudiante
          </Col>

          <Col className="contenido_fichas_academico2" xs={2} >
            Cod. Estudiante
          </Col>

          {datos_del_curso.length > 0 ? (
            datos_del_curso.map((item, index) => (
              <Col key={index} >
                {item.parcial && <i class="bi bi-star"></i>}
                <span>{item.nombre}</span>
                  <Button
                    variant="link"
                    onClick={() => handleEditModal(item)}
                    style={{ textDecoration: 'none' }}
                  >
                  <i className="bi bi-pencil" />
                </Button>
              </Col>
            ))
          )
          : 
          (
            <Col>No hay items registrados</Col>
          )}

          {sessionStorage.rol !== 'profesor' ? (
            <Col xs={'2'}>
              <Row>
                <Col xs={"6"}>Promedio:</Col>
                <Col xs={"6"}>Parciales:</Col>
              </Row>
            </Col>
          ) : (
            <div class="d-none"></div>
          )}

        </Row>
      ) 
      : 
      (
        <Row>Sin alumnos ni items registrados</Row>
      )
    }




      {state.tiene_alumnos_del_profesor ? (
        <Row >

        <Col xs={"12"}>
          {alumnos_del_profesor.length > 0 ? (
              alumnos_del_profesor.map((item, index) => (
                <Tabla_de_notas key={index} item={item} lista_parciales={idParciales} />
              ))
            ) 
            : 
            (
              <Col>No hay estudiantes registrados</Col>
            )
          }
        </Col>

        </Row>
        ) 
        : 
        (
          <Row>Sin alumnos ni items registrados</Row>
        )
      }

      <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={'12'} md={'6'}>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Nombre del Item"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={'12'} md={'6'}>
              <label>
                <input
                  type="checkbox"
                  checked={isPartial}
                  onChange={() => setIsPartial(!isPartial)}
                />
                Parcial
              </label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={agregar_item}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar/borrar ítems */}
      <Modal show={editShow} onHide={handleEditClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={'12'} md={'6'}>
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
                placeholder="Nombre del Item"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={'12'} md={'6'}>
              <label>
                <input
                  type="checkbox"
                  checked={editIsPartial}
                  onChange={() => setEditIsPartial(!editIsPartial)}
                />
                Parcial
              </label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Borrar
          </Button>
          <Button variant="primary" onClick={handleEditItem}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cabecera;
