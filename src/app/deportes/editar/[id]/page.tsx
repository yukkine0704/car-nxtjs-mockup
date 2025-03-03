'use client';

import Sidebar from '@/components/sidebar';
import Navbar from '@/components/header';
import EditarDeporte from '../../components/EditarDeporte';
import { useState } from "react";
import { useParams } from 'next/navigation';

export default function EditarDeportePage() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const deporteId = params.id;

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
          <EditarDeporte/>
        </div>
      </div>
    </div>
  );
}