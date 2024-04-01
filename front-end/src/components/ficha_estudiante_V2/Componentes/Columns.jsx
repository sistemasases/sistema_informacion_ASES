import { useEffect, useState } from "react";
import "../../../Scss/ficha_estudiante_discapacidad/columns.css";

// Este componente es el que se encarga de mostrar la informacion del
// estudiante de manera organizada en columnas, para que sea mas facil de leer
// recibe como parametro un arreglo de arreglos, donde cada arreglo interno contiene objetos
// que representan una columna, cada objeto tiene un atributo type que indica el tipo de elemento

// Componente de Columns
// Recibe como props:
// columns: arreglo de columnas
// twobold: si es si, se aplica negrita a la primera y tercera columna
const Columns = ({ columns, twobold }) => {
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  // La idea es hacer la peticion al backend para editar al estudiante en esta parte
  // y modificar ciertos detalles

  return (
    <div className="rowsC contenido">
      {columns.map((elements, rowIndex) => (
        <div key={rowIndex} className="rowC">
          {elements.map((element, elementIndex) => {
            let additionalClass = "";
            if (
              twobold === "si" &&
              (elementIndex === 0 || elementIndex === 2)
            ) {
              additionalClass = "bold";
            } else if (elementIndex === 0) {
              additionalClass = "first-columnC";
            }
            const inputName = `${rowIndex}-${elementIndex}-${element.name}`;
            switch (element.type) {
              case "text":
                return (
                  <p key={elementIndex} className={`${additionalClass}`}>
                    {element.name}
                  </p>
                );
              case "radio":
                return (
                  <div key={elementIndex} className={`${additionalClass}`}>
                    <label>
                      <input
                        type="radio"
                        checked={element.checked}
                        name={element.name}
                        value={element.value}
                      />
                      {element.value}
                    </label>
                  </div>
                );
              case "checkbox":
                return (
                  <div key={elementIndex} className={`${additionalClass}`}>
                    <label>
                      <input type="checkbox" checked={element.checked} />
                      {element.name}
                    </label>
                  </div>
                );
              case "select":
                return (
                  <div key={elementIndex} className={`${additionalClass}`}>
                    <label>
                      {element.name}
                      <select
                        value={inputValues[inputName] || ""}
                        onChange={(e) =>
                          setInputValues({
                            ...inputValues,
                            [inputName]: e.target.value,
                          })
                        }
                      >
                        <option>Seleccione una opción</option>
                        {element.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                );
              case "input":
                return (
                  <div key={elementIndex} className={`${additionalClass}`}>
                    <label>
                      {element.name}
                      <input
                        type="text"
                        value={inputValues[inputName] || ""}
                        onChange={(e) =>
                          setInputValues({
                            ...inputValues,
                            [inputName]: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                );
              case "number":
                return (
                  <div key={elementIndex} className={`${additionalClass}`}>
                    <label>
                      {element.name}
                      <input
                        type="number"
                        value={inputValues[inputName] || ""}
                        onChange={(e) =>
                          setInputValues({
                            ...inputValues,
                            [inputName]: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Columns;
