'use client'
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/header';
import ReservaForm from '../components/ReservaForm';
import { useState } from "react";

export default function CrearReservaPage() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <ReservaForm isEditing={false} />
                </div>
            </div>
        </div>
    );
}
