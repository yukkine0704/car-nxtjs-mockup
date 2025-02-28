import React from 'react';

const Statistics = () => {
  const stats = [
    { title: 'Alertas Pendientes', value: 2, message: '1 nueva alerta', bgColor: 'bg-blue-100' },
    { title: 'Reservas activas hoy', value: 35, message: '10% más que ayer', bgColor: 'bg-blue-100' },
    { title: 'Salas Ocupadas / Libres', value: '10/24', message: '+5% desde ayer', bgColor: 'bg-blue-100' },
    { title: 'Consumo energético', value: '1500 kWh', message: '+2% desde el mes pasado', bgColor: 'bg-blue-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <div key={index} className={`p-4 rounded-lg shadow-md ${stat.bgColor}`}>
          <h3 className="text-xl font-bold text-blue-400">{stat.title}</h3>
          <p className="text-2xl font-semibold text-blue-400">{stat.value}</p>
          <p className="text-sm text-blue-400">{stat.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;