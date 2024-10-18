import { useEffect } from "react";
import {
    desencriptar,
    desencriptarInt,
    desencriptarBigInt,
  } from "../utilidades_seguridad/utilidades_seguridad.jsx";
import { useAuthStore } from "../../components/ficha_estudiante_dicapacidad/store/auth.js";
import AccesoDenegado from "../../components/ficha_estudiante_dicapacidad/Componentes/AccesoDenegado.jsx";
import AcademicoCheck from "../../components/academico_asistencia/AcademicoCheck.jsx";

const AcademicoAsistencia = () => {
    const { user, setUser } = useAuthStore();
    useEffect(() => {
        setUser({
            rol: desencriptar(sessionStorage.getItem("rol")).toString(),
            sede_id: desencriptarInt(sessionStorage.getItem("sede_id")).toString(),
            id_usuario: desencriptarBigInt(
                sessionStorage.getItem("id_usuario")
            ).toString(),
            userRole: desencriptar(sessionStorage.getItem("permisos")).toString(),
            });
    }, []);

    return (
        <>
        {user &&
            user.userRole &&
            user.userRole.includes("view_academico_asistencia") ? (
                <AcademicoCheck />
            ) : (
                <AccesoDenegado />
            )}
        </>
    );
}

export default AcademicoAsistencia;