import axios from "axios";

const all_estudiantes_reportes = async (formData, id_usuario) => {
  try {
    // console.log("LO RECIBIDO EN EL FORM DATA ES:");
    // console.log(formData.get("usuario_rol"));
    // console.log("LO RECIBIDO EN EL ID_USUARIO ES:");
    // console.log(id_usuario);
    const config = {
      //   headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      //   },
    };
    // const url_axios = 'http://localhost:8000/usuario_rol/estudiante_selected2/';
    const url_axios =
      "http://127.0.0.1:8000/reportes/estudiante_por_rol/" +
      id_usuario.toString() +
      "/";
    //   + id_usuario + "/"
    axios({
      url: url_axios,
      method: "GET",
      headers: config,
      data: formData,
      // {
      //     "usuario_rol": "superAses"
      //     "sede":"1",
      // }
    }).then((res) => {
      // console.log("HOLAAAAAAAAAAAA");
      // console.log(res.data);
      // const res = await axios.get(url_axios, config)
      return res.data;
    });
  } catch (err) {
    // console.log("HOLAAAAAAAAAAAA");
    // console.log(formData);

    console.log(err);
  }
};

export default {
  all_estudiantes_reportes,
};
