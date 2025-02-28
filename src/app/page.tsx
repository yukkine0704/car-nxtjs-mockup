"use client";
import EnergyConsumptionChart from "@/components/graph";
import Navbar from "@/components/header";
import LastReservations from "@/components/reservations";
import Sidebar from "@/components/sidebar";
import Statistics from "@/components/statscard";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafdff]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-grow flex flex-col">
        <Navbar setIsSidebarOpen={setIsOpen} />

        <div className="p-4 flex-grow overflow-auto">
          <div className="mb-4">
            <Statistics />
          </div>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
            <div className="w-full lg:w-1/2">
              <EnergyConsumptionChart />
            </div>

            <div className="w-full lg:w-1/2">
              <LastReservations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
