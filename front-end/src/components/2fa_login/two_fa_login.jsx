import {
  encriptar,
  encriptarJson,
  encriptarInt,
  encriptarBigInt,
  decryptUserIdFromSessionStorage,
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import App from "../../App.js";
import axios from "axios";
import { set } from "date-fns";
import OtpInput from "react-otp-input";

import "../../Scss/TFA_login/tfa_login.css";

const Two_fa_login = () => {
  const [otp, setOtp] = useState("");
  const [otp_token, setOtp_token] = useState({});

  const [timerExpired, setTimerExpired] = useState(false);
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  useEffect(() => {
    if (sessionStorage.getItem("otp")) {
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/correos/enviar_codigo_otp_correo/`,
          {
            id: decryptUserIdFromSessionStorage(),
          },
          config
        )
        .then((res) => {
          console.log("Código OTP enviado al correo");
          // console.log(res.data[0].otp);
          const encrypted_otp = encriptarInt(res.data[0].otp);
          sessionStorage.otp = encrypted_otp;
          sessionStorage.otp_status = true;
          // Configura un temporizador de 3 minutos
          // const timer = setTimeout(() => {
          //   setTimerExpired(true);
          //   sessionStorage.clear();
          //   window.location.reload();
          // }, 180000); // 180000 ms = 3 minutos
          // return () => clearTimeout(timer);
        })
        .catch((error) => {
          alert("Error al enviar el código OTP al correo");
          console.error("Error al enviar el código OTP al correo:", error);
          window.location.reload();
        });
    }
  }, []);

  return (
    <Col>
      <Row>
        {(sessionStorage.otp === undefined &&
          sessionStorage.otp_status == false) ||
        sessionStorage.otp_status === undefined ||
        sessionStorage.access_otp === undefined ? (
          <Container className="prinicipal_container">
            <div className="otp_tittle">
              <h2>Código OTP ASES</h2>
            </div>
            <div>
              <p>
                Ingrese el código de 6 dígitos que se envió al correo con el qué
                se encuentra registrado en ASES
              </p>
              <did className="otp_input_container">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>  -  </span>}
                  renderInput={(props) => (
                    <input {...props} className="otp_input" />
                  )}
                  // containerStyle="otp_container"
                />
              </did>
              <br />
              <p style={{ fontWeight: "lighter" }}>
                Dispone de 5 minutos para ingresar el código, de lo contrario
                deberá solicitarlo nuevamente
              </p>
            </div>
            <div>
              <Button
                className="btn_otp"
                onClick={() => {
                  if (otp.length === 6) {
                    axios
                      .post(
                        `${process.env.REACT_APP_API_URL}/correos/verificar_clave_otp/`,
                        {
                          otp: otp,
                          id: decryptUserIdFromSessionStorage(),
                          email: desencriptar(sessionStorage.email),
                        }
                      )
                      .then((res) => {
                        if (res.data.status === "true") {
                          sessionStorage.otp_status = "true";
                          sessionStorage.refresh_otp = res.data.refresh_otp;
                          sessionStorage.access_otp = res.data.access_otp;
                          window.location.reload();
                        } else {
                          alert("Código incorrecto");
                          sessionStorage.clear();
                          window.location.reload();
                        }
                      })
                      .catch((error) => {
                        console.error(
                          "Error al verificar el código OTP:",
                          error
                        );
                        alert("Error al verificar el código OTP");
                        sessionStorage.clear();
                        window.location.reload();
                      });
                  } else {
                    alert("Código incorrecto");
                    sessionStorage.clear();
                    window.location.reload();
                  }
                }}
              >
                Validar
              </Button>
            </div>
          </Container>
        ) : (
          <App />
        )}
      </Row>
    </Col>
  );
};

export default Two_fa_login;
