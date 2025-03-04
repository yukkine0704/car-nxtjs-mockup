
'use client';
import { useState } from "react";
import DynamicTable from '@/components/Table';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/header';

const HomePage = () => {
      const [isOpen, setIsOpen] = useState(false);
  const columns = ['Nodo', 'Salas', 'Puertas'];
  const dispositivos = [
    { id: 1, nodo: 101, salas: "Sala de Natación", puertas: "1,2" },
    { id: 2, nodo: 102, salas: "Sala de GYM", puertas: "3" },
    { id: 3, nodo: 103, salas: "Sala de Atletismo", puertas: "4,5" },
    { id: 4, nodo: 104, salas: "Sala de Boxeo", puertas: "6" },
    { id: 5, nodo: 105, salas: "Sala de Tenis", puertas: "7,8" },
    { id: 6, nodo: 106, salas: "Sala de Lucha", puertas: "9" },
    { id: 7, nodo: 107, salas: "Sala de Remo", puertas: "10,11" },
    { id: 8, nodo: 108, salas: "Sala de Piragüismo", puertas: "12" },
    { id: 9, nodo: 109, salas: "Sala de Boccia", puertas: "13,14" },
    { id: 10, nodo: 110, salas: "Sala de Billar", puertas: "15" },
    { id: 11, nodo: 111, salas: "Sala de Atletismo Inclusivo", puertas: "16,17" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafdff]">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="md:sticky md:top-0 md:h-screen transition-transform duration-300 md:translate-x-0"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      />

      <div className="flex-grow flex flex-col">
        <Navbar setIsSidebarOpen={setIsOpen} />

        <div className="p-4 flex-grow overflow-auto">
        <DynamicTable route={"dispositivos"} title={"Dispositivos"} columns={columns} data={dispositivos} showCheckboxes={true} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;