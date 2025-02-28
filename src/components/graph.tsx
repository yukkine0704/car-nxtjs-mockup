import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const EnergyConsumptionChart = () => {
  const data = {
    labels: Array.from({ length: 25 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Consumo Energético',
        data: [500, 1000, 1500, 1200, 1800, 1600, 2000, 1800, 1900, 2100, 2200, 2000, 2300, 2100, 2500, 2400, 2600, 2500, 2700, 2800, 2600, 2500, 2400, 2300, 2200],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(1, 'rgba(36, 152, 255, 1)'); 
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); 

          return gradient;
        },
        borderColor: '#2498ff',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
        },
        ticks: {
          stepSize: 500,
          beginAtZero: true,
          max: 3000,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className='flex justify-between items-center'>
        <h2 className="text-lg font-bold mb-4 text-[#274967]">Consumo Energético</h2>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default EnergyConsumptionChart;