"use client";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/header";
import DispositivoForm from "../../componentes/DispositivosForm";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function EditarDispositivo() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const dispositivoId = params.id; // Asegúrate de que sea 'id' o el nombre correcto

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
          <DispositivoForm isEditing={true} dispositivoId={dispositivoId} />{" "}
          {/* Pasa el dispositivoId aquí */}
        </div>
      </div>
    </div>
  );
}
