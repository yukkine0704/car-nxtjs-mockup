'use client'
import DynamicTable from "@/components/Table";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/header";
import { useState } from "react";

export default function SalaPage() {
    const [isOpen, setIsOpen] = useState(false);
    const columns = ["Portada", "Nombre", "Edificacion", "Capacidad",];
    const hills = [
        {
            id: 1,
            portada: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            nombre: "Sala 1",
            edificacion: "Edificio A",
            capacidad: 50,
        },
        {
            id: 2,
            portada: "https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            nombre: "Sala 2",
            edificacion: "Edificio B",
            capacidad: 30,
        },
        {
            id: 3,
            portada: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            nombre: "Sala 3",
            edificacion: "Edificio C",
            capacidad: 20,
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
                    <DynamicTable route={"reservas"} title={"Reservas"} columns={columns} data={hills} />
                </div>
            </div>
        </div>
    );
}