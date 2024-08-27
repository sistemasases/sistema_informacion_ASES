import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const ConclusionJornadaCaracterizacion = () => {
    return (
        <div className="space_content">
            <div className="select_space">
                <label>Conclusión de la jornada de la caracterización</label>
                <textarea
                    name="conclusion_jornada_caracterizacion"
                    id="conclusion_jornada_caracterizacion"
                    className="textarea-jornada"
                />
            </div>
        </div>
    )
}

export default ConclusionJornadaCaracterizacion;