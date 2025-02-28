import {
  FaChartBar,
  FaCalendarAlt,
  FaKey,
  FaThermometerHalf,
  FaClipboardList,
  FaPlus,
  FaCog,
  FaUser,
  FaArrowLeft,
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`
      fixed md:static 
      w-64 md:w-auto 
      h-screen 
      bg-white 
      p-5 
      shadow-md 
      transition-transform 
      duration-300 
      ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      z-10
    `}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-[#2498ff] md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#2498ff]">CAR Residencias</h2>
      </div>
      <nav className="mt-6 space-y-4">
        <SidebarItem icon={<FaChartBar />} text="Dashboard" active />
        <SidebarItem icon={<FaCalendarAlt />} text="Reservas" />
        <SidebarItem icon={<FaKey />} text="Accesos" />
        <SidebarItem icon={<FaThermometerHalf />} text="Climatización" />
        <SidebarItem icon={<FaClipboardList />} text="Estadísticas" />
        <SidebarItem icon={<FaPlus />} text="Nueva Reserva" button />
      </nav>

      <hr className="min-[1024px]:hidden my-4 border-gray-300" />

      <div className="min-[1024px]:hidden flex flex-col space-y-4">
        <button className="w-full py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Invitar empleado
        </button>
        <div className="flex justify-around"></div>
      </div>

      <div className="absolute bottom-5 left-5 space-y-4">
        <SidebarItem icon={<FaCog />} text="Configuración" />
        <SidebarItem icon={<FaUser />} text="Perfil" />
      </div>

      <div className="absolute bottom-5 left-5 space-y-4 min-[1024px]:hidden">
        <SidebarItem icon={<FaSearch />} text="Buscar" />
        <SidebarItem icon={<FaBell />} text="Notificaciones" />
        <SidebarItem icon={<FaCog />} text="Configuración" />
        <SidebarItem icon={<FaUser />} text="Perfil" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, button }: any) => (
  <div
    className={`
    flex items-center space-x-3 p-3 rounded-lg 
    ${active ? "text-[#2498ff]" : "text-[#274967]"} 
    ${button ? "bg-[#2498ff] text-white font-bold" : ""}
  `}
  >
    {icon}
    <span className="md:inline">{text}</span>
  </div>
);

export default Sidebar;
