'use client';

import Navbar from '@/components/header';
import Sidebar from '@/components/sidebar';
import BuildingsForm from '../../components/BuildingsForm';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditBuildingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const id = params.id;

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
                    <BuildingsForm isEditing={true} buildingId={id} />
                </div>
            </div>
        </div>
    );
}
