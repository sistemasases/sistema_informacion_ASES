import React from 'react';
import { Container, Col  } from 'react-bootstrap';
import Select from 'react-select';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()

export const preventNonNumericValues = (e) => {
  const nonNumericKeys = [ "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab", "Enter", "Shift", "Control", "Alt", "CapsLock"];
  if (!/^[0-9]$/.test(e.key) && !nonNumericKeys.includes(e.key)) {
    e.preventDefault();
  }
};
export const disablePaste = (e) => {
  e.preventDefault();  // Previene que el usuario pueda pegar algo
};
const maxLengthNumber = 20;

const IngresoDatosBasicos = ({state,
    handleChange,
    handleChangeTextField,
    handleChangeUniqueDigit,
    handleChangeNumber,
    isLoading,
    razasOptions,
    handleSelectChange,
    maxLengthBasicInput,
    pronombresOptions,
    tipoDocumentoOptions,
    handleSelectNoMultiChange,
    handleSelectChange2,
    handleSelectChange3

}) => {
  return (
    <>
        <h1 className='title-banner'> Ingreso de datos básicos </h1>
        <div className='div-scroll-registro'>
    <Container className="container_informacion_general" >
    
      <Col className="form-column" xs={"6"} md={"6"}>
      
       
      
    <div className="input-container">
  <label className='custom-div'>Nombre Identitario</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese su nombre identitario"
    name="nombre_identitario"
    value={state.nombre_identitario}
    onChange={handleChange}
    maxLength={maxLengthBasicInput} // Limita la cantidad de caracteres
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.nombre_identitario.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Nombre y apellido</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese nombre y apellido"
    name="nombre_y_apellido"
    value={state.nombre_y_apellido}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.nombre_y_apellido.length}`}</span>
</div>

<div>
  <label className='custom-div'>Tipo documento</label>
  <div>
    {isLoading ? (
      <p>Cargando...</p>
    ) : (
      <Select
        className='create-select'
        name="tipo_documento"
        placeholder='Seleccione su documento'
        options={tipoDocumentoOptions}
        value={tipoDocumentoOptions.find(option => option.value === state.tipo_documento)}
        onChange={handleSelectNoMultiChange}
      />
    )}
  </div>
</div>






<div className="input-container">
  <label className='custom-div'>Email</label>
  <input
    className='input-updated'
    type="email"
    inputMode='email'
    placeholder="Ingrese email"
    name="email"
    value={state.email}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.email.length}`}</span>
</div>



<div className="input-container">
  <label className='custom-div'>Número de documento</label>
  <input
    className='input-updated'
    type="number"
    placeholder="123456"
    name="numero_documento"
    inputMode="numeric"
    onKeyDown={preventNonNumericValues}
    min="0"
    value={state.numero_documento}
    onChange={handleChangeNumber}
    maxLength={maxLengthNumber}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthNumber - state.numero_documento.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Estrato socioeconómico</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Estrato"
    name="estrato_socioeconomico"
    pattern='[0-9]*'
    onKeyDown={preventNonNumericValues}
    min="0"
    value={state.estrato_socioeconomico}
    onChange={handleChangeUniqueDigit}
    maxLength="1"
     />
  
</div>

<div className="input-container">
  <label className='custom-div'>Teléfono</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese número telefónico"
    name="telefono"
    onKeyDown={preventNonNumericValues}
    value={state.telefono}
    onChange={handleChangeNumber}
    maxLength={maxLengthNumber}
  />
<span className="char-count">{`Caracteres restantes: ${maxLengthNumber - (state.telefono?.length || 0)}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Estado civil</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese estado civil"
    name="estado_civil"
    value={state.estado_civil}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.estado_civil.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Identidad étnico racial</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese la identidad"
    name="identidad_etnico_racial"
    value={state.identidad_etnico_racial}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.identidad_etnico_racial.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Nombre de persona de confianza</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese el nombre"
    name="nombre_persona_de_confianza"
    value={state.nombre_persona_de_confianza}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.nombre_persona_de_confianza.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Relación con la persona de confianza</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese la relación"
    name="relacion_persona_de_confianza"
    value={state.relacion_persona_de_confianza}
    onChange={handleChange}
    maxLength={maxLengthBasicInput}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.relacion_persona_de_confianza.length}`}</span>
</div>

<div className="input-container">
  <label className='custom-div'>Número de persona de confianza</label>
  <input
    className='input-updated'
    type="text"
    placeholder="Ingrese número"
    name="telefono_persona_de_confianza"
    pattern='[0-9]*'
    onKeyDown={preventNonNumericValues}
    min="0"
    value={state.telefono_persona_de_confianza}
    onChange={handleChangeNumber}
    maxLength={maxLengthNumber}
  />
  <span className="char-count">{`Caracteres restantes: ${maxLengthNumber - state.telefono_persona_de_confianza.length}`}</span>
</div>


      </Col>

      
      
      <Col className="form-column" xs={"6"} md={"6"}>
    
          <div className="input-container">
      <label className='custom-div'>Ciudad de nacimiento</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese ciudad de nacimiento"
        name="ciudad_nacimiento"
        value={state.ciudad_nacimiento}
        onChange={handleChange}
        pattern='[0-9]*'
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.ciudad_nacimiento.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Corregimiento de nacimiento</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese corregimiento de nacimiento"
        name="corregimiento_nacimiento"
        value={state.corregimiento_nacimiento}
        onChange={handleChange}
        pattern='[0-9]*'
        maxLength={maxLengthBasicInput}
      />
     <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - (state.corregimiento_nacimiento?.length || 0)}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Municipio de nacimiento</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese municipio de nacimiento"
        name="municipio_nacimiento"
        value={state.municipio_nacimiento}
        onChange={handleChange}
        pattern='[0-9]*'
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - (state.municipio_nacimiento?.length || 0)}`}</span>
    </div>

        <div>
          <label className='custom-div'>Fecha de nacimiento</label>
          <div>
            <input
              className='input-updated'
              type="date"
              name="fecha_nacimiento"
              value={state.fecha_nacimiento}
              onChange={handleChange}
            />
          </div>
        </div>



    <div className="input-container">
      <label className='custom-div'>Departamento de nacimiento</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese el departamento"
        name="departamento_nacimiento"
        value={state.departamento_nacimiento}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.departamento_nacimiento.length}`}</span>
    </div>


 

    <div className="input-container">
      <label className='custom-div'>País de nacimiento</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese el país"
        name="pais_nacimiento"
        value={state.pais_nacimiento}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.pais_nacimiento.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Ciudad de residencia</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese ciudad de residencia"
        name="ciudad_residencia"
        value={state.ciudad_residencia}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.ciudad_residencia.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Zona de residencia</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese zona de residencia"
        name="zona_residencial"
        value={state.zona_residencial}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.zona_residencial.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Dirección de residencia</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese su dirección"
        name="direccion_residencia"
        value={state.direccion_residencia}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.direccion_residencia.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Barrio de residencia</label>
      <input
        className='input-updated'
        type="text"
        placeholder="Ingrese su barrio"
        name="barrio_residencia"
        value={state.barrio_residencia}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.barrio_residencia.length}`}</span>
    </div>

    <div className="input-container">
      <label className='custom-div'>Número de la comuna</label>
      <input
        className='input-updated'
        type="number"
        placeholder="Ingrese la comuna"
        name="comuna_barrio"
        pattern='[0-9]*'
        onKeyDown={preventNegativeValues}
        min="0"
        value={state.comuna_barrio}
        onChange={handleChange}
        maxLength={maxLengthBasicInput}
      />
      <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.comuna_barrio.length}`}</span>
    </div>
        
      </Col>
      

    </Container>
    </div>
    </>
  );
};

export default IngresoDatosBasicos;