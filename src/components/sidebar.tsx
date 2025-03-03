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
  FaFootballBall,
} from "react-icons/fa";

import Link from 'next/link';

const Sidebar = ({ isOpen, setIsOpen, className }: any) => {
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
      ${className}
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
        <SidebarItem route='/' icon={<FaChartBar />} text="Dashboard" active />
        <SidebarItem route='/reservas' icon={<FaCalendarAlt />} text="Reservas" />
        <SidebarItem route='/acceso' icon={<FaKey />} text="Accesos" />
        <SidebarItem route='/climatizacion' icon={<FaThermometerHalf />} text="Climatización" />
        <SidebarItem route='/estadisticas' icon={<FaClipboardList />} text="Estadísticas" />
        <SidebarItem route='/deportes' icon={<FaFootballBall />} text="Deportes" />
        <SidebarItem route='/nueva-reserva' icon={<FaPlus />} text="Nueva Reserva" button />
      </nav>

      <hr className="min-[1024px]:hidden my-4 border-gray-300" />

      <div className="min-[1024px]:hidden flex flex-col space-y-4">
        <button className="w-full py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Invitar empleado
        </button>
        <div className="flex justify-around"></div>
      </div>

      <div className="absolute bottom-5 left-5 space-y-4">
        <SidebarItem route='/configuracion' icon={<FaCog />} text="Configuración" />
        <SidebarItem route='/perfil' icon={<FaUser />} text="Perfil" />
      </div>

      <div className="absolute bottom-5 left-5 space-y-4 min-[1024px]:hidden">
        <SidebarItem route='/buscar' icon={<FaSearch />} text="Buscar" />
        <SidebarItem route='/notificaciones' icon={<FaBell />} text="Notificaciones" />
        <SidebarItem route='/configuracion' icon={<FaCog />} text="Configuración" />
        <SidebarItem route='/perfil' icon={<FaUser />} text="Perfil" />
      </div>
    </div>
  );
};

// Mejora del componente SidebarItem para que maneje correctamente las rutas
const SidebarItem = ({ icon, text, active, button, route = "#" }: any) => {
  const content = (
    <>
      {icon}
      <span className="md:inline">{text}</span>
    </>
  );

  const baseClasses = `
    flex items-center space-x-3 p-3 rounded-lg w-full
    ${active ? "text-[#2498ff]" : "text-[#274967]"} 
    ${button ? "bg-[#2498ff] text-white font-bold" : ""}
    transition-colors duration-200 hover:bg-gray-100
  `;

  return (
    <div className={baseClasses}>
      {route && route !== "#" ? (
        <Link href={route} className="flex items-center space-x-3 w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default Sidebar;
