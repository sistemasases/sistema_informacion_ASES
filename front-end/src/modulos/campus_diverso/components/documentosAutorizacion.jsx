import React from 'react';
import { Container, Col, } from 'react-bootstrap';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()

const DocumentosAutorizacion = ({
    state,
    handleCheckboxChange,
    handleChange

}) => {
  return (
    <>
    <h1 className='title-banner'> Documentos de autorización</h1>
    <div className='div-scroll-registro'>

    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>
            


    <div className="custom-div-check-documentos ">
      <div className="custom-checkbox-label">
        ¿Firma de consentimiento informado?
      </div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={state.firma_consentimiento_informado}
          name="firma_consentimiento_informado"
          value={state.firma_consentimiento_informado}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>

    <div className="custom-div-check-documentos ">
      <div className="custom-checkbox-label">
        ¿Firma terapia hormonal?
      </div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={state.firma_terapia_hormonal}
          name="firma_terapia_hormonal"
          value={state.firma_terapia_hormonal}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>

        
        </Col>

        <Col className="form-column" xs={"10"} md={"6"}>
        
        <div className="custom-div-check-documentos ">
      <div className="custom-checkbox-label">
        Documentos digital y archivo
      </div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={state.documento_digital_y_archivo}
          name="documento_digital_y_archivo"
          value={state.documento_digital_y_archivo}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>

    <div className="custom-div-check-documentos ">
      <div className="custom-checkbox-label">
        Árbol familiar
      </div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={state.arbol_familiar}
          name="arbol_familiar"
          value={state.arbol_familiar}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>

    <div className="custom-div-check-documentos ">
      <div className="custom-checkbox-label">
        Ecomapa
      </div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={state.ecomapa}
          name="ecomapa"
          value={state.ecomapa}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>

        <div>
                <div className='custom-div'>Apgar familiar</div>
                <input
                  className='input-updated'
                  type="number"
                  name="apgar_familiar"
                  placeholder='Ingrese apgar'
                  pattern='[0-9]*'
                  onKeyDown={preventNegativeValues}
                  min="0"
                  value={state.apgar_familiar}
                  onChange={handleChange}
                />
        </div>



    </Col>
    </Container>
    </div>
    </>
  );
};

export default DocumentosAutorizacion;