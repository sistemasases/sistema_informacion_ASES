import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';



const ModalSeguimientos = ({isSeguimientoModalOpen, closeSeguimientoModal, selectedUser}) => {
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const [state, set_state] = useState({

  fecha:"",
  observacion:"",
  profesionales:[],

  });

  const [isLoading, setIsLoading] = useState(true);
  const [profesionalesOptions, setProfesionalesOptions] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/seguimiento-campus/profesional/`),
    
  
    ])
    .then((responses) => {
      //persona
      const [profesionalResponse] = responses;
      
      const profesionalOpciones = profesionalResponse.data.map((item) => ({
        value: item.id_profesional,
        label: item.nombre_profesional
      }));

      setProfesionalesOptions(profesionalOpciones);
      setIsLoading(false);

    })
    .catch((error) => {

      console.error('Error al obtener opciones en seguimiento:', error);
      setIsLoading(false);
      

    });
}, []);

  const handleChange = (event) => {
    const { name, value, checked, options } = event.target;
    console.log('handleChange called:', name, value);

  
  
    const updateState = (newState) => {
      set_state({
        ...state,
        [name]: newState,
      });
    };

      updateState(value);
    
  };
  
  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
  
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    set_state(prevState => ({
      ...prevState,
      [name]: values
    }));
    console.log(`react-select-event! : ${state[name]}`);
    console.log('selectedOptions', selectedOptions)
  
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = [
    'observacion',
    'fecha',
    // Add other required fields here
  ];

  const invalidFields = requiredFields.filter(field => !state[field]);

  if (invalidFields.length > 0) {
    // alerta de campos vacíos que están en la lista de requiredFields
    setMensaje(`Los siguientes campos son obligatorios y están vacíos: ${invalidFields.join(', ')}`);
    console.log('asdasd', setMensaje);
    setTimeout(() => {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
    }, 1000); // Simulación de una solicitud exitosa después de 1 segundo
    return;
  }

  // Remueve elementos vacíos del formulario antes de enviarlo a la base de datos
  const removeEmptyFields = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ""));
  };

 setTimeout(() => {
    // Mostrar alerta de éxito
    setShowSuccessAlert(true);
    // Ocultar después de unos segundos
    setTimeout(() => setShowSuccessAlert(false), 3000);
  }, 1000); // Simulación de una solicitud exitosa después de 1 segundo

  const seguimientoData = removeEmptyFields({
    fecha: state.fecha,
    observacion: state.observacion,
    profesional_ids: state.profesionales,
    numero_documento: selectedUser.numero_documento // Incluye el número de documento aquí
  });

  try {

    const profesionalResponse = await axios.post(`${process.env.REACT_APP_API_URL}/seguimiento-campus/seguimiento/`, {
      ...seguimientoData,
      id_persona: selectedUser.numero_documento
    });
    console.log('Respuesta del servidor (Seguimiento):', profesionalResponse.data);

    set_state({
      observacion: "",
      profesionales:[],
      fecha:"",
      // Reset other fields as necessary
    });

  } catch (seguimientoError) {
    console.error('Error al enviar la solicitud de seguimiento:', seguimientoError);
    // Manejo de error de seguimiento
    if (seguimientoError.response) {
      let errorMessage = "Hubo un error al enviar el formulario en los campos de seguimiento. Por favor, inténtalo de nuevo.";
      if (seguimientoError.response.data) {
        errorMessage += "\n\nDetalles del error:\n";
        for (const field in seguimientoError.response.data) {
          errorMessage += `- ${field}: ${seguimientoError.response.data[field][0]}\n`;
        }
      }
      setMensaje(errorMessage);
    } else {
      setMensaje("Hubo un error al enviar el formulario de diversidad sexual. Por favor, inténtalo de nuevo.");
    }
    setShowErrorAlert(true);
  }
};

      


  return (
    <Modal show={isSeguimientoModalOpen} onHide={closeSeguimientoModal} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Seguimiento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Contenido del modal de seguimiento */}
      <div>
          <label className='custom-div'>Fecha del seguimiento </label>
          <div>
            <input
              type="date"
              name="fecha"
              value={state.fecha}
              onChange={handleChange}
            />
          </div>
        </div> 


        <div>
          <label className='custom-div'>Observación </label>
          <div>
            <input
              type="Text"
              name="observacion"
              value={state.observacion}
              onChange={handleChange}
            />
          </div>
        </div>


                <div>
              <label className='custom-div'>Profesionales que atendieron</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                isMulti
                placeholder='Ingrese profesionales'
                className='form-react-select'
                name="profesionales"
                options={profesionalesOptions}
                value={state.profesionales.map(id => ({
                  value: id,
                  label: profesionalesOptions.find(o => o.value === id)?.label
                }))}
                onChange={handleSelectChange}
    
                  />
                  )}
              </div>
            </div>

        </Modal.Body>
    <Modal.Footer>
    <Button onClick={handleSubmit}>Enviar</Button>
      <Button variant="outline-danger" onClick={closeSeguimientoModal}>
        Cerrar
      </Button>
    </Modal.Footer>
    <Alert
      show={showSuccessAlert}
      variant="success"
      onClose={() => setShowSuccessAlert(false)}
      dismissible
      className='alert-style'
    >
      <Alert.Heading>¡Éxito!</Alert.Heading>
      <p>El seguimiento se envio correctamente.</p>
    </Alert>

    {/* Alerta de error */}
      <Alert
        show={showErrorAlert}
        variant="danger"
        onClose={() => setShowErrorAlert(false)}
        dismissible
        className='alert-style'
      >
        <Alert.Heading>Error</Alert.Heading>
        <p>{mensaje}</p>
      </Alert>

  </Modal>
  );
};

export default ModalSeguimientos;