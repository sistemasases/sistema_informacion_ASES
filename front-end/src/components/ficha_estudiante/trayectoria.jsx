/**
  * @file trayectoria.jsx
  * @version 1.0.0
  * @description Este componente se encarga de mostrar la trayectoria de un estudiante.
  * @author Componente Sistemas ASES
  * @contact sistemas.ases@correounivalle.edu.co
  * @date 13 de febrero del 2024 
*/

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GraphComponent = ({ fechas, riesgos }) => {
  // Referencia al elemento canvas donde se dibujará el gráfico.
  const chartRef = useRef(null);
  // Función que se ejecuta cuando se actualizan las fechas o los riesgos.
  useEffect(() => {
    if (fechas && riesgos) {
      // Obtener las claves y valores de los riesgos
      const labels = Object.keys(riesgos);
      // Este código crea conjuntos de datos para representar gráficamente información, 
      // utilizando valores de un objeto y etiquetas asociadas.
      const datasets = Object.values(riesgos).map((values, index) => ({
        label: labels[index],
        data: values,
        borderColor: getRandomColor(),
        fill: false,
      }));

      // Función auxiliar para formatear el eje Y
      const formatRiskLevel = (value) => {
        switch (value) {
          case 0:
            return "Bajo";
          case 1:
            return "Medio";
          case 2:
            return "Alto";
          default:
            return "";
        }
      };

      // Configurar el gráfico
      const chartConfig = {
        type: "line",
        data: {
          labels: fechas,
          datasets: datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data,
          })),
        },
        options: {
          scales: {
            y: {
              ticks: {
                callback: (value) => formatRiskLevel(value),
              },
              beginAtZero: true,
              max: 3,
            },
          },
        },
      };

      // Crear el gráfico utilizando Chart.js
      const chart = new Chart(chartRef.current, chartConfig);

      // Limpiar el gráfico al desmontar el componente
      return () => {
        chart.destroy();
      };
    }
  }, [fechas, riesgos]);

  /**
  * Genera un color hexadecimal aleatorio.
  * @param {} - No recibe parámetros.
  * @return {string} - Retorna un color aleatorio en formato hexadecimal.
  */
  // Función auxiliar para generar colores aleatorios.
  const getRandomColor = () => {
    // Almadena los caracteres hexadecimales 
    const letters = "0123456789ABCDEF";
    // Almacenará el color generado.
    let color = "#";
    // Genera un color aleatorio.
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Retorna el color generado.
    return color;
  };

  return <canvas ref={chartRef} />;
};

export default GraphComponent;
