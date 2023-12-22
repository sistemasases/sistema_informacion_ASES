import AcordionesHijos from "./AcordionesHijos"
import Columns from "./Columns"

const Programatica = () => {
    return (
        <AcordionesHijos
          acordiones={[
            { title: "Vida Comunitaria", content: (
                <Columns
                  columns={[
                    [
                        { type: "text", name: "Participa en organizaciones benéficas" },
                        { type: "text", name: "Participa en Clubes" },
                        { type: "text", name: "Participa en organizaciones sociales profesionales" },
                    ],
                    [
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                    ],
                    [
                        { type: "input", name: "Cuál?"},
                        { type: "input", name: "Cuál?"},
                        { type: "input", name: "Cuál?"},
                    ],
                  ]}
                />
              ), },
            {
              title: "Ocio y tiempo libre",
              content: (
                <Columns
                  columns={[
                    [
                        { type: "text", name: "Participa en actividades recreativas o de ocio" },
                        { type: "text", name: "Participa en deportes" },
                        { type: "text", name: "Participa en actividades de entretenimiento (museos, cines y teatro)" },
                    ],
                    [
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                    ],
                    [
                        { type: "input", name: "Cuál?"},
                        { type: "input", name: "Cuál?"},
                        { type: "input", name: "Cuál?"},
                    ],
                    [
                        { type: "text", name: "Toca algún instrumento" },
                        { type: "text", name: "Viaja por si sola" },
                    ],
                    [
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                    ],
                    [
                        { type: "input", name: "Cuál?"},
                        { type: "input", name: "Cuál?"},
                    ],
                  ]}
                />
              ),
            },
            { title: "Religión y espiritualidad", content: (
                <Columns
                  columns={[
                    [
                        { type: "text", name: "Participa en actividades organizaciones o prácticas religiosas" },
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "input", name: "Cuál?"},
                    ],
                  ]}
                />
              ), },
            { title: "Derechos humanos", content: (
                <Columns
                  columns={[
                    [
                        { type: "text", name: "Reconoce los derechos humanos" },
                        { type: "radio", name: "binaryChoice", value: "Si"},
                        { type: "radio", name: "binaryChoice", value: "No"},
                        { type: "input", name: "Cuales?"},
                    ],
                  ]}
                />
              ), },
            {
              title: "Ajustes razonables",
              content: (
                <Columns
                  columns={[
                    [
                        { type: "checkbox", name: " Realizar procesos de sensibilización sobre la importancia de agremiaciones y colectivos" },
                        { type: "text", name: "Intensidad" },
                        { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                    ],
                    [
                        { type: "checkbox", name: " Indagar sobre espacios de participación que motiven al estudiante con discapacidad" },
                        { type: "text", name: "Intensidad" },
                        { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                    ],
                    [
                        { type: "checkbox", name: " Indagar sobre espacios de participación a nivel deportivo que motiven al estudiante" },
                        { type: "text", name: "Intensidad" },
                        { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                    ],
                    [
                        { type: "checkbox", name: " Establecer redes interinstitucionales para la participación de eventos a nivel deportivo, cultural y religioso para la inclusión del estudiante" },
                        { type: "text", name: "Intensidad" },
                        { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                    ],
                  ]}
                />
              ),
            },
          ]}
          claseAcor={"acordion subacordion subsubacordion"}
        />
    )
}    

export default Programatica