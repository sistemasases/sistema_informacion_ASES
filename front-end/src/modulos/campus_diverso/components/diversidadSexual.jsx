import React from "react";
import { Container, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";

const DiversidadSexual = ({
  state,
  handleChange,
  handleSelectChange,
  isLoading,
  razasOptions,
  pronombresOptions,
  documentoOptions,
  expresionesOptions,
  orientacionOptions,
  identidadesGeneroOptions,
  handleCheckboxChange,
  maxLengthBasicInput,
  sexoAsignadoOptions,
  handleSelectNoMultiChange,
}) => {
  return (
    <>
      <h1 className="title-banner"> Diversidad Sexual </h1>
      <div className="div-scroll-registro">
        <Container className="container_informacion_general" xs={"10"} sm={"6"}>
          <Col className="form-column" xs={"7"} md={"6"}>
            <div>
              <label className="custom-div">
                Sexo asignado al nacer
                <span className="simbolo-obligatorio"> *</span>
              </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ) : (
                  <Select
                    className="create-select"
                    name="sexo_asignado"
                    placeholder="Selecciona el sexo asignado al nacer"
                    options={sexoAsignadoOptions}
                    value={
                      sexoAsignadoOptions.find(
                        (option) => option.label === state.sexo_asignado?.[0]
                      ) || null
                    }
                    onChange={handleSelectNoMultiChange}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="custom-div">
                Identidad de género
                <span className="simbolo-obligatorio"> *</span>
              </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ) : (
                  <Select
                    className="create-select"
                    name="identidades_de_genero"
                    placeholder="Seleccione su orientación sexual"
                    options={identidadesGeneroOptions}
                    value={
                      identidadesGeneroOptions.find(
                        (option) =>
                          option.label === state.identidades_de_genero?.[0]
                      ) || null
                    }
                    onChange={handleSelectNoMultiChange}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="custom-div">
                Expresión de género
                <span className="simbolo-obligatorio"> *</span>
              </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ) : (
                  <Select
                    className="create-select"
                    name="expresiones_de_genero"
                    placeholder="Seleccione expresiones de género"
                    options={expresionesOptions}
                    value={
                      expresionesOptions.find(
                        (option) =>
                          option.label === state.expresiones_de_genero?.[0]
                      ) || null
                    }
                    onChange={handleSelectNoMultiChange}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="custom-div">
                Orientación sexual
                <span className="simbolo-obligatorio"> *</span>
              </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ) : (
                  <Select
                    className="create-select"
                    name="orientaciones_sexuales"
                    placeholder="Seleccione su orientación sexual"
                    options={orientacionOptions}
                    value={
                      orientacionOptions.find(
                        (option) =>
                          option.label === state.orientaciones_sexuales?.[0]
                      ) || null
                    }
                    onChange={handleSelectNoMultiChange}
                  />
                )}
              </div>
            </div>
          </Col>

          <Col className="form-column" xs={"7"} md={"6"}>
            <div>
              <label className="custom-div">
                ¿Has realizado algún cambio en el componente nombre y/o sexo en
                el documento de identidad
                <span className="simbolo-obligatorio"> *</span>{" "}
              </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ) : (
                  <Select
                    className="create-select"
                    name="respuestas_cambio_documento"
                    placeholder="Seleccione su respuesta de cambio de documento"
                    options={documentoOptions}
                    value={
                      documentoOptions.find(
                        (option) =>
                          option.label ===
                          state.respuestas_cambio_documento?.[0]
                      ) || null
                    }
                    onChange={handleSelectNoMultiChange}
                  />
                )}
              </div>
            </div>

            <div className="custom-div-check">
              <label className="custom-label">
                ¿Deseas recibir orientación para el cambio en el componente
                nombre y/o sexo en el documento de identidad?
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={state.recibir_orientacion_cambio_en_documento}
                  name="recibir_orientacion_cambio_en_documento"
                  value={state.recibir_orientacion_cambio_en_documento}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default DiversidadSexual;
