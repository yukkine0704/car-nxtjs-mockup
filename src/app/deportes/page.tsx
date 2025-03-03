"use client";

import Sidebar from "@/components/sidebar";
import { useState } from "react";
import Navbar from "@/components/header";
import DeportesTable from "./components/DeportesTable";

export default function ReservasPage() {
  const [isOpen, setIsOpen] = useState(false);
  const deportes = [
    {
      id: "1",
      nombre: "Natación",
      imagen: "https://loremflickr.com/100/100/swimming",
    },
    { id: "2", nombre: "GYM", imagen: "https://loremflickr.com/100/100/gym" },
    {
      id: "3",
      nombre: "Atletismo",
      imagen: "https://loremflickr.com/100/100/athletics",
    },
    {
      id: "4",
      nombre: "Atletismo inclusivo",
      imagen: "https://loremflickr.com/100/100/disabled_athletics",
    },
    {
      id: "5",
      nombre: "Boccia",
      imagen: "https://loremflickr.com/100/100/boccia",
    },
    {
      id: "6",
      nombre: "Billar",
      imagen: "https://loremflickr.com/100/100/billiards",
    },
    {
      id: "7",
      nombre: "Boxeo",
      imagen: "https://loremflickr.com/100/100/boxing",
    },
    {
      id: "8",
      nombre: "Lucha",
      imagen: "https://loremflickr.com/100/100/wrestling",
    },
    {
      id: "9",
      nombre: "Piragüismo",
      imagen: "https://loremflickr.com/100/100/canoeing",
    },
    {
      id: "10",
      nombre: "Remo",
      imagen: "https://loremflickr.com/100/100/rowing",
    },
    {
      id: "11",
      nombre: "Tenis",
      imagen: "https://loremflickr.com/100/100/tennis",
    },
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
          <DeportesTable deportes={deportes} />
        </div>
      </div>
    </div>
  );
}
