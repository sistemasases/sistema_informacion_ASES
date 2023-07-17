import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphComponent = ({ fechas, riesgos }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (fechas && riesgos) {
      // Obtener las claves y valores de los riesgos
      const labels = Object.keys(riesgos);
      const datasets = Object.values(riesgos).map((values, index) => ({
        label: labels[index],
        data: values,
        borderColor: getRandomColor(),
        fill: false,
      }));

      // Configurar el gráfico
      const chartConfig = {
        type: 'line',
        data: {
          labels: fechas,
          datasets,
        },
        options: {
          scales: {
            y: {
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

  // Función auxiliar para generar colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef} />;
};

export default GraphComponent;
