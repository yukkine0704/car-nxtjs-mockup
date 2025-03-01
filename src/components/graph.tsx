import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const EnergyConsumptionChart = () => {
  const data = {
    labels: [5, 10, 15, 20, 25],
    datasets: [
      {
        label: "Consumo Energético",
        data: [1000, 1300, 2500, 2800, 1400],
        fill: true,
        backgroundColor: (context: { chart: any }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(1, "rgba(36, 152, 255, 1)");
          gradient.addColorStop(0, "rgba(255, 255, 255, 0)");

          return gradient;
        },
        borderColor: "#2498ff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          stepSize: 5,
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
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold mb-4 text-[#274967]">
          Consumo Energético
        </h2>
      </div>
      <Line data={data} options={options} className="h-full" />
    </div>
  );
};

export default EnergyConsumptionChart;
