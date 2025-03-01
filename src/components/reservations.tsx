import React from "react";

const LastReservations = () => {
  const reservations = [
    {
      sala: "Pista 1",
      usuario: "Laura M.",
      hora: "10:00 - 11:30",
      estado: "PENDIENTE",
    },
    {
      sala: "Gimnasio",
      usuario: "Pedro R.",
      hora: "11:00 - 12:30",
      estado: "CONFIRMADA",
    },
    {
      sala: "Sala de Reunión",
      usuario: "Equipo X",
      hora: "14:00 - 15:30",
      estado: "CANCELADA",
    },
    {
      sala: "Sala de Fitness",
      usuario: "Ana G.",
      hora: "16:00 - 18:00",
      estado: "CONFIRMADA",
    },
    {
      sala: "Sala de Yoga",
      usuario: "Javier L.",
      hora: "18:00 - 19:30",
      estado: "PENDIENTE",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md  h-full">
      <h2 className="text-lg font-bold mb-4 text-[#2498ff]">
        Últimas Reservas
      </h2>
      <table className="min-w-full table-auto  ">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-[#91a4b2]">SALA</th>
            <th className="text-left py-2 text-[#91a4b2]">USUARIO</th>
            <th className="text-left py-2 text-[#91a4b2]">HORA</th>
            <th className="text-left py-2 text-[#91a4b2]">ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2 underline text-[#2498ff]">
                {reservation.sala}
              </td>
              <td className="py-2 underline text-[#2498ff]">
                {reservation.usuario}
              </td>
              <td className="py-2 text-[#274967] ">{reservation.hora}</td>
              <td className="py-2 ">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full border border-blue-200 ${
                    reservation.estado === "CONFIRMADA"
                      ? " text-[#4ddb4d]"
                      : reservation.estado === "CANCELADA"
                        ? " text-[#ed433a]"
                        : " text-[#fdd76b]"
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
