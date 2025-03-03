'use client';

import Sidebar from '@/components/sidebar';
import ReservaTable from './components/ReservaTable';
import { useState } from 'react';
import Navbar from '@/components/header';

export default function ReservasPage() {
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
          <ReservaTable />
        </div>
      </div>
    </div>
  );
}
