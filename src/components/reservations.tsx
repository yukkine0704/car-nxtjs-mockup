import React from 'react';

const LastReservations = () => {
  const reservations = [
    { sala: 'Pista 1', usuario: 'Laura M.', hora: '10:00 - 11:30', estado: 'PENDIENTE' },
    { sala: 'Gimnasio', usuario: 'Pedro R.', hora: '11:00 - 12:30', estado: 'CONFIRMADA' },
    { sala: 'Sala de Reunión', usuario: 'Equipo X', hora: '14:00 - 15:30', estado: 'CANCELADA' },
    { sala: 'Sala de Fitness', usuario: 'Ana G.', hora: '16:00 - 18:00', estado: 'CONFIRMADA' },
    { sala: 'Sala de Yoga', usuario: 'Javier L.', hora: '18:00 - 19:30', estado: 'PENDIENTE' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md  h-full">
      <h2 className="text-lg font-bold mb-4">Últimas Reservas</h2>
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">SALA</th>
            <th className="text-left py-2">USUARIO</th>
            <th className="text-left py-2">HORA</th>
            <th className="text-left py-2">ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{reservation.sala}</td>
              <td className="py-2">{reservation.usuario}</td>
              <td className="py-2">{reservation.hora}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full ${
                    reservation.estado === 'CONFIRMADA'
                      ? 'bg-green-100 text-green-600'
                      : reservation.estado === 'CANCELADA'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {reservation.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastReservations;