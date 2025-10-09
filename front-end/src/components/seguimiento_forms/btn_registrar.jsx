import { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import { Button, Modal } from "react-bootstrap";
import "../../Scss/seguimiento_forms/form_seguimiento_individual_v2.css";

/**
 * Componente que permite registrar información y, opcionalmente, 
 * descargar un archivo CSV antes de enviar los datos al servidor.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.state - Objeto con los datos a registrar y exportar en el CSV.
 * @param {Function} props.verificador_datos_basicos - Función que valida los datos antes de registrar.
 * @param {Function} [props.onConfirmDownload] - Callback opcional que se ejecuta después de confirmar el registro (con o sin descarga).
 * @returns {JSX.Element} Botón de registro con descarga CSV opcional y modal de confirmación.
 */

export default function RegistroConCSV({ state, verificador_datos_basicos, onConfirmDownload }) {
  
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  /** Referencia al componente CSVLink para disparar la descarga del CSV */
  const csvRef = useRef();

  /**
   * Maneja el evento al hacer clic en "Registrar".
   * Verifica los datos y, si son válidos, muestra el modal de confirmación.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - Evento del clic.
   */
  const handleRegistrar = (e) => {
    e.preventDefault();
    const valid = verificador_datos_basicos();
    if (valid) {
      setShowModal(true);
    }
  };

  const handleConfirmDownload = () => {
    setShowModal(false);
    setShowReminderModal(true);
  };

  const handleFinalDownload = () => {
    setShowReminderModal(false);
    
    // Descargar CSV
    if (csvRef.current) {
      csvRef.current.link.click();
    }
    
    // Luego enviar datos al servidor
    setTimeout(() => {
      if (onConfirmDownload) {
        onConfirmDownload();
      }
    }, 500); 
  };

  /**
   * Maneja la opción de cancelar la descarga (pero guardar los datos igualmente).
   * Ejecuta el callback de confirmación sin descargar el CSV.
   */
  const handleCancel = () => {
    setShowModal(false);
    
    setTimeout(() => {
      if (onConfirmDownload) {
        onConfirmDownload();
      }
    }, 500); 
  };

  const handleCancelReminder = () => {
    setShowReminderModal(false);
    setShowModal(true); // Volver al modal anterior
  };

  return (
    <>
      <Button type="button" variant="secondary" onClick={handleRegistrar}>
        Registrar
      </Button>

      <CSVLink
        data={[state]}
        filename={`Seguimiento_Individual_${state.fecha}`}
        style={{ display: "none" }}
        ref={csvRef}
      />

      {/* Modal inicial de confirmación */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1055
        }}
        dialogClassName="modal-oscuro"
        

      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar registro y descarga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas descargar el archivo CSV? El registro se guardará de cualquier manera.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            No descargar (solo guardar)
          </Button>
          <Button variant="primary" onClick={handleConfirmDownload}>
            Sí, descargar y guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de recordatorio antes de descargar */}
      <Modal 
        show={showReminderModal} 
        onHide={handleCancelReminder}
        centered
        backdrop="static"
        keyboard={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1060
        }}
        dialogClassName="modal-oscuro"
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Recordatorio importante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Una vez que descargues el archivo recuerda subirlo al Drive y borrarlo por completo del computador.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelReminder}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleFinalDownload}>
            Descargar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}