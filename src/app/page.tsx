'use client';
import EnergyConsumptionChart from "@/components/graph";
import Navbar from "@/components/header";
import LastReservations from "@/components/reservations";
import Sidebar from "@/components/sidebar";
import Statistics from "@/components/statscard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#edf7fd]"> {/* Fondo de color #d8e9f4 */} 

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-grow flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="p-4 flex-grow overflow-auto">
          {/* Estadísticas */}
          <div className="mb-4">
            <Statistics />
          </div>

          {/* Contenedor para la gráfica y las reservas */}
          <div className="flex space-x-4 mt-4">
            {/* Gráfico de Consumo Energético */}
            <div className="flex-1">
              <EnergyConsumptionChart />
            </div>

            {/* Últimas Reservas */}
            <div className="flex-1">
              <LastReservations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}