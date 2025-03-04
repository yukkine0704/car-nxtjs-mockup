'use client';
import { useState } from 'react';

import Sidebar from '@/components/sidebar';
import Navbar from '@/components/header';
import DynamicTable from '@/components/Table';

export default function ReservasPage() {
  const [isOpen, setIsOpen] = useState(false);

  const columns = ["Nombre", "Fecha", "Inicio", "Fin", "Edificio", "Sala", "Estado"];
  const reservations = [
    {
      id: 1,
      nombre: "Laura M.",
      fecha: "2025-02-11",
      inicio: "13:00:00",
      fin: "15:00:00",
      edificio: "Edificio 1",
      sala: "Gym",
      estado: 'Pending'
    },
    {
      id: 2,
      nombre: "Carlos R.",
      fecha: "2025-02-12",
      inicio: "09:00:00",
      fin: "11:00:00",
      edificio: "Edificio 2",
      sala: "Sala de Reuniones",
      estado: 'Confirmed'
    },
    {
      id: 3,
      nombre: "Ana P.",
      fecha: "2025-02-13",
      inicio: "10:00:00",
      fin: "12:00:00",
      edificio: "Edificio 1",
      sala: "Piscina",
      estado: 'Cancelled'
    },
    {
      id: 4,
      nombre: "Miguel G.",
      fecha: "2025-02-14",
      inicio: "14:00:00",
      fin: "16:00:00",
      edificio: "Edificio 3",
      sala: "Auditorio",
      estado: 'Pending'
    },
    {
      id: 5,
      nombre: "Sofia T.",
      fecha: "2025-02-15",
      inicio: "15:00:00",
      fin: "17:00:00",
      edificio: "Edificio 2",
      sala: "Comedor",
      estado: 'Confirmed'
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafdff]">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="md:sticky md:top-0 md:h-screen"
      />

      <div className="flex-grow flex flex-col">
        <Navbar setIsSidebarOpen={setIsOpen} />

        <div className="p-4 flex-grow overflow-auto">
          <DynamicTable route={"reservas"} title={"Reservas"} columns={columns} data={reservations} />
        </div>
      </div>
    </div>
  );
}
