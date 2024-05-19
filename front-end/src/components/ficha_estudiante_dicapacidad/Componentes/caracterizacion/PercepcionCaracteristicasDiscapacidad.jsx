import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";

const PercepcionCaracteristicasDiscapacidad = () => {
  return<form>
    <label>¿Consideras que presenta algún tipo de discapacidad o limitación?</label>
    <label>Si</label>
    <input type="checkbox" />
    <label>No</label>
    <input type="checkbox" />
    <input type="textarea" placeholder="Describa la consideración"/>
    <label>¿Cuál de las siguientes circunstancias corresponde a la adquisición de discapacidad?</label>
    <label>Adquisición por</label>
    <input type="textarea" />
  </form>;
};

export default PercepcionCaracteristicasDiscapacidad;
