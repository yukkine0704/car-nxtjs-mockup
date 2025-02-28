import { FaSearch, FaBell, FaUserCircle, FaHome, FaBars } from "react-icons/fa";

const Navbar = ({ setIsSidebarOpen }) => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full md:w-auto">
          <button
            className="flex items-center border border-[#2498ff] rounded-md w-full h-15 px-2 py-1 hover:bg-blue-50"
            onClick={() => setIsSidebarOpen((prev: any) => !prev)}
          >
            <div className="md:hidden">
              <FaBars color="#2498ff" className="mr-2" />
            </div>
            <div className="hidden md:inline">
              <FaHome color="#2498ff" className="mr-2" />
            </div>
            <div className="flex items-center">
              <h2 className="text-lg font-bold text-[#274967] truncate">
                Los Alcazares
              </h2>
              <select className="ml-2 text-sm text-[#274967] hidden md:inline">
                <option value="1">Centro de Tecnificación Deportiva</option>
                <option value="2">Test</option>
                <option value="3">Test</option>
              </select>
            </div>
          </button>

          <div className="flex items-center mt-4 flex-wrap">
            <div className="flex items-center space-x-2 mr-4">
              <img
                src="https://i.pravatar.cc/30?img=1"
                alt="Avatar de Alicia"
                className="w-8 h-8 rounded-full"
              />
              <img
                src="https://i.pravatar.cc/30?img=2"
                alt="Avatar de Bruno"
                className="w-8 h-8 rounded-full"
              />
              <img
                src="https://i.pravatar.cc/30?img=3"
                alt="Avatar de Carlos"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span className="text-sm text-[#274967] mr-4">
              Alicia, Bruno, Carlos +12 otros
            </span>
            <span className="text-xs text-[#4ddb4d] font-bold border border-[#d8e9f4] py-2 px-3 rounded-full flex items-center mt-2 md:mt-0">
              <span className="w-2 h-2 bg-[#4ddb4d] rounded-full mr-1"></span>
              <span className="hidden md:inline">OPERATIVO</span>
            </span>
          </div>
        </div>

        <div className="hidden min-[1024px]:flex items-center space-x-4">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
            Invitar empleado
          </button>
          <FaSearch
            className="text-xl cursor-pointer text-gray-500"
            role="button"
            aria-label="Buscar"
          />
          <FaBell
            className="text-xl cursor-pointer text-gray-500"
            role="button"
            aria-label="Notificaciones"
          />
          <FaUserCircle
            className="text-xl cursor-pointer text-gray-500"
            role="button"
            aria-label="Perfil"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
