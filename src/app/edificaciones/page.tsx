'use client'

import Navbar from '@/components/header';
import Sidebar from '@/components/sidebar';
import BuildingsTable from './components/BuildingsTable';

import { useState } from 'react';


export default function Page() {
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
                    <BuildingsTable />
                </div>
            </div>

        </div>
    );
}