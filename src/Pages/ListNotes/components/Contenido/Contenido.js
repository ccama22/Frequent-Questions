import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import WikipediaSearch from "../WikipediaSearch/WikipediaSearch";
import botUnamad from "../../../../assets/img/unamad.jpg";
const theme = {
  background: "#f5f8fb",
  headerBgColor: "#049af1",
  headerFontColor: "#ffffff",
  headerFontSize: "20px",
  botBubbleColor: "#dde2e2",
  botFontColor: "#000000",
  userBubbleColor: "#049af1",
  userFontColor: "#fff",
};

export default class Contenido extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          botAvatar={botUnamad}
          steps={[
            {
              id: "1",
              message: "Hola, ¿Cuál es tu nombre?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              validator: (value) => {
                if (
                  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(
                    value
                  )
                ) {
                  return true;
                } else {
                  return "Por favor ingrese un nombre valido.";
                }
              },
              trigger: "3",
            },
            {
              id: "3",
              message: `Hola {previousValue}👏
              , Bienvenido A la Direccion de Asuntos Academicos.`,
              trigger: "4",
            },
            {
              id: "4",
              message: "¿Necesitas algo de mí?",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                { value: "y", label: "Si", trigger: "6A" },
                { value: "n", label: "No", trigger: "6B" },
              ],
            },
            {
              id: "6A",
              message: "¡Excelente! Dime En que le podemos ayudar...",
              trigger: "seleccion",
            },
            {
              id: "6B",
              message:
                "Lo siento si no puedo ser de ayuda para usted. hasta luego",
              end: true,
            },

            {
              id: "seleccion",
              options: [
                { value: "f", label: "Matricula", trigger: "7A" },
                { value: "b", label: "Forma de pago", trigger: "7B" },
                {
                  value: "g",
                  label: "solicitar apertura de cursos",
                  trigger: "7C",
                },
                {
                  value: "h",
                  label: "¿Que hacer si soy un alumno nuevo?",
                  trigger: "7D",
                },
                {
                  value: "i",
                  label: "¿Que hacer si soy un alumno ya registrado?",
                  trigger: "7E",
                },
              ],
            },
            {
              id: "7A",
              message:
                "Para la matricula tiene que ingresar al modulo de matricula en el siguiente enlace",
              trigger: "seleccionFront",
            },
            {
              id: "7B",
              message: `El pago lo realizas en banco de la nacion 
                y se recomienda realizar el pago en la sede central`,
              trigger: "pagarCodigo",
            },
            {
              id: "7D",
              message: `El alumno nuevo tiene que asistir a la capacitacion de 
              induccion de los ingresantes y ver este manual`,
              trigger: "seleccionCapacitaIngresante",
            },
            {
              id: "7E",
              message: `Tiene que verificar los siguiente:
              1.- Escala de pagos
              2.- Revisar su plan de estudios
              `,
              trigger: "seleccionIRegistrado",
            },
            {
              id: "seleccionCapacitaIngresante",
              options: [
                {
                  value: "sobreManual",
                  label: "ver manual",
                  trigger: "capacitaIngresante",
                },
              ],
            },
            {
              id: "seleccionIRegistrado",
              options: [
                {
                  value: "sobrePlanEstudio",
                  label: "ver plan de estudio",
                  trigger: "ingresanteRegistrado",
                },
              ],
            },
            {
              id: "ingresanteRegistrado",
              component: <WikipediaSearch />,
              asMessage: true,
              trigger: "preguntaVuelta",
            },
            {
              id: "capacitaIngresante",
              component: <WikipediaSearch />,
              asMessage: true,
              trigger: "preguntaVuelta",
            },
            {
              id: "pagarCodigo",
              message: `
              - Tiene que pagar al codigo 3910 con su codigo de estudiante
              `,
              trigger: "pagoMatricula",
            },
            {
              id: "pagoMatricula",
              message: `
              - Tienes problema con el pago de su matricula comunicarse 
                al  WhatSapp 929103530/974229465 
              `,
              trigger: "preguntaVuelta",
            },
            {
              id: "7C",
              message: `Para aperturar cursos son los siguientes requisitos:
                `,
              trigger: "MinimoEstudi",
            },
            {
              id: "MinimoEstudi",
              message: `1.- Minimo de estudiantes 7...`,
              trigger: "seleccionAperturaCursos",
            },
            {
              id: "seleccionFront",
              options: [
                {
                  value: "Ver enlace",
                  label: "Ver enlace",
                  trigger: "9",
                },
                { value: "ver Manual", label: "Ver manual", trigger: "9" },
              ],
            },
            {
              id: "seleccionAperturaCursos",
              options: [
                {
                  value: "sobreRequisitos",
                  label: "ver mas sobre los requisitos",
                  trigger: "9",
                },
              ],
            },
            {
              id: "9",
              component: <WikipediaSearch />,
              asMessage: true,
              trigger: "preguntaVuelta",
            },
            {
              id: "preguntaVuelta",
              message: "¿Necesitas saber algo más?",
              trigger: "respuestaVuelta",
            },
            {
              id: "respuestaVuelta",
              options: [
                { value: "y", label: "Si", trigger: "6A" },
                { value: "n", label: "No", trigger: "6B" },
              ],
            },
          ]}
        />
      </ThemeProvider>
    );
  }
}
