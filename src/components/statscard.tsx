import React from 'react';

const Statistics = () => {
  const stats = [
    { title: 'Alertas Pendientes', value: 2, message: '1 nueva alerta', bgColor: 'bg-[#edf7fd]' },
    { title: 'Reservas activas hoy', value: 35, message: '10% más que ayer', bgColor: 'bg-[#edf7fd]' },
    { title: 'Salas Ocupadas / Libres', value: '10/24', message: '+5% desde ayer', bgColor: 'bg-[#edf7fd]' },
    { title: 'Consumo energético', value: '1500 kWh', message: '+2% desde el mes pasado', bgColor: 'bg-[#edf7fd]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
          <h3 className="text-xl font-bold text-blue-400">{stat.title}</h3>
          <p className="text-4xl font-semibold text-blue-400">{stat.value}</p>
          <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full  ${
                    stat.message === '1 nueva alerta'
                      ? 'bg-[#fdd76b] text-[#274967]'
                      : 'bg-[#2498ff] text-[#FFFFFF]'
                  }`}
                >
                  {stat.message}
                </span>
        </div>
      ))}
    </div>
  );
};

export default Statistics;