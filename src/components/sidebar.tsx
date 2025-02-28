import { FaChartBar, FaCalendarAlt, FaKey, FaThermometerHalf, FaClipboardList, FaPlus, FaCog, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen p-5 shadow-md">
      <h2 className="text-xl font-bold text-blue-600">CAR Residencias</h2>
      <nav className="mt-6 space-y-4">
        <SidebarItem icon={<FaChartBar />} text="Dashboard" active />
        <SidebarItem icon={<FaCalendarAlt />} text="Reservas" />
        <SidebarItem icon={<FaKey />} text="Accesos" />
        <SidebarItem icon={<FaThermometerHalf />} text="Climatización" />
        <SidebarItem icon={<FaClipboardList />} text="Estadísticas" />
        <SidebarItem icon={<FaPlus />} text="Nueva Reserva" button />
      </nav>
      <div className="absolute bottom-5 left-5 space-y-4">
        <SidebarItem icon={<FaCog />} text="Configuración" />
        <SidebarItem icon={<FaUser />} text="Perfil" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, button }: any) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg ${active ? "bg-blue-100 text-blue-600" : "text-gray-700"} ${button ? "bg-blue-500 text-white font-bold" : ""}`}>
    {icon}
    <span>{text}</span>
  </div>
);

export default Sidebar;