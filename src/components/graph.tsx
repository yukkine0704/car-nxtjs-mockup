import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const EnergyConsumptionChart = () => {
  const data = {
    labels: Array.from({ length: 25 }, (_, i) => i + 1), // Etiquetas del eje X (1 a 25)
    datasets: [
      {
        label: 'Consumo Energético',
        data: [500, 1000, 1500, 1200, 1800, 1600, 2000, 1800, 1900, 2100, 2200, 2000, 2300, 2100, 2500, 2400, 2600, 2500, 2700, 2800, 2600, 2500, 2400, 2300, 2200],
        fill: false,
        backgroundColor: 'rgba(113, 182, 246, 1)', // Color de fondo
        borderColor: '#2498ff', // Color de la línea
        tension: 0.4, // Suavizado de la línea
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Días',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Consumo (kWh)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-blue-400">Consumo Energético</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default EnergyConsumptionChart;