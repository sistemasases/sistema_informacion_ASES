import { useState } from "react";
import "../../../Scss/ficha_estudiante_discapacidad/columns.css";

const Columns = ({ columns }) => {
  return (
    <div className="rowsC">
      {columns.map((elements, rowIndex) => (
        <div key={rowIndex} className="rowC">
          {elements.map((element, elementIndex) => {
            const additionalClass = elementIndex === 0 ? 'first-columnC' : '';
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
                case 'select':
                  return (
                    <div key={elementIndex} className={`${additionalClass}`}>
                      <label>
                        {element.name}
                        <select>
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
                      <input type="text" />
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
