'use client'
import { useState } from 'react';

import Navbar from '@/components/header';
import Sidebar from '@/components/sidebar';
import DynamicTable from '@/components/Table';


export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const columns = ["Portada", "Nombre", "Pisos",];
    const buildings = [
        {
            id: 1,
            nombre: "Torre Residencial Norte",
            pisos: 15,
            portada: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            nombre: "Edificio Central",
            pisos: 8,
            portada: "https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            nombre: "Complejo Residencial Sur",
            pisos: 12,
            portada: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 4,
            nombre: "Torre Ejecutiva Plaza",
            pisos: 20,
            portada: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            nombre: "Residencial Parque Verde",
            pisos: 6,
            portada: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
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
                    <DynamicTable route={"edificaciones"} title={"Edificaciones"} columns={columns} data={buildings} />
                </div>
            </div>

        </div>
    );
}