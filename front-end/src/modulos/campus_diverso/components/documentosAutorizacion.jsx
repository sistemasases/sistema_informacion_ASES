import React from 'react';
import { Container, Col,  } from 'react-bootstrap';
import Select from 'react-select';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()

const DocumentosAutorizacion = ({
    state,
    isLoading,
    handleSelectNoMultiChange,
    apgarpregunta1Options,
    apgarpregunta2Options,
    apgarpregunta3Options,
    apgarpregunta4Options,
    apgarpregunta5Options,
    apgarpregunta6Options,
    apgarpregunta7Options,
    handleSelectChange2,
    handleSelectChange,
    handleSelectChange3,

}) => {
  return (
    <>
    <h1 className='title-banner'> Apgar familiar</h1>
    <div className="subtitle-forms">
    Las siguientes preguntas corresponden al instrumento APGAR Familiar y tienen como finalidad evaluar su percepción sobre el apoyo recibido dentro de su entorno familiar, social y personal.
    </div>
    <div className='div-scroll-registro'>

    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
    


        <Col className="form-column" xs={"10"} md={"6"}>
            
        <div>
          <label className='custom-label'>Me satisface la ayuda que recibo de mi familia cuando tengo algún problema y/o necesidad<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta1"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta1Options}
                value={apgarpregunta1Options.find(option => option.label === state.apgar_pregunta1?.[0]) || null}
                onChange={handleSelectNoMultiChange}              />
            )}
          </div>
        </div>

        <div>
          <label className='custom-label'>Me satisface como en mi familia hablamos y compartimos nuestros problemas<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta2"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta2Options}
                value={apgarpregunta2Options.find(option => option.label === state.apgar_pregunta2?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>
        

        <div>
          <label className='custom-label'>Me satisface como mi familia acepta y apoya mi deseo de emprender nuevas actividades<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta3"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta3Options}
                value={apgarpregunta3Options.find(option => option.label === state.apgar_pregunta3?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>

        <div>
          <label className='custom-label'>Me satisface como mi familia expresa afecto y responde a mis emociones tales como rabia, tristeza, amor<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta4"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta4Options}
                value={apgarpregunta4Options.find(option => option.label === state.apgar_pregunta4?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>

        </Col>

        <Col className="form-column" xs={"10"} md={"6"}>
        
       
        <div>
          <label className='custom-label'>Me satisface como compartimos en mi familia: tiempo/espacio/dinero<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta5"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta5Options}
                value={apgarpregunta5Options.find(option => option.label === state.apgar_pregunta5?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>

        <div>
          <label className='custom-label'>Tengo un(a) amigo(a) cercano quien pueda buscar cuando necesito ayuda<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta6"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta6Options}
                value={apgarpregunta6Options.find(option => option.label === state.apgar_pregunta6?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>

        <div>
          <label className='custom-label'>Estoy satisfecho(a) con el soporte que recibo de mis amigos(as)<span className='simbolo-obligatorio'> *</span></label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="apgar_pregunta7"
                placeholder='Seleccione su respuesta'
                options={apgarpregunta7Options}
                value={apgarpregunta7Options.find(option => option.label === state.apgar_pregunta7?.[0]) || null}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>
    </Col>
  
    </Container>
    </div>
    </>
  );
};

export default DocumentosAutorizacion;