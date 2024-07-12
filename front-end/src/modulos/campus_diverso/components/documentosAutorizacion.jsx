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
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>¿Autoriza manejo de datos?</div>
                <input
                  type="checkbox"
                  checked={state.autorizacion_manejo_de_datos}
                  name="autorizacion_manejo_de_datos"
                  value={state.autorizacion_manejo_de_datos}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>

        <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>¿Firma de consentimiento informado?</div>
                <input
                  type="checkbox"
                  checked={state.firma_consentimiento_informado}
                  name="firma_consentimiento_informado"
                  value={state.firma_consentimiento_informado}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>
    

        <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>¿Firma terapia hormonal?</div>
                <input
                  type="checkbox"
                  checked={state.firma_terapia_hormonal}
                  name="firma_terapia_hormonal"
                  value={state.firma_terapia_hormonal}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>
    
    </Col>

    <Col>
    
    <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>Documentos digital y archivo</div>
                <input
                  type="checkbox"
                  checked={state.documento_digital_y_archivo}
                  name="documento_digital_y_archivo"
                  value={state.documento_digital_y_archivo}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>

        <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>Arbol familiar</div>
                <input
                  type="checkbox"
                  checked={state.arbol_familiar}
                  name="arbol_familiar"
                  value={state.arbol_familiar}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>

        <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>Ecomapa</div>
                <input
                  type="checkbox"
                  checked={state.ecomapa}
                  name="ecomapa"
                  value={state.ecomapa}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>

        <div>
                <div className='custom-div'>Apgar familiar</div>
                <input
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
    </>
  );
};

export default DocumentosAutorizacion;