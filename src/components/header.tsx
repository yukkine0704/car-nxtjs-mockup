import { FaSearch, FaBell, FaUserCircle, FaHome } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-lg p-6">
      {/* Left Section - Location Title with Home Icon and User Info */}
      <div className="flex flex-col">
        {/* Location Title wrapped in a button */}
        <button className="flex items-center border border-blue-600 text-blue-600 rounded-md w-full h-15 px-2 py-1 hover:bg-blue-50">
          <FaHome color='#2498ff' className="mr-2" />
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-gray-700">Los Alcazares</h2>
            <select className="ml-2 text-sm text-gray-500">
              <option value="1">Centro de Tecnificación Deportiva</option>
              <option value="2">Test</option>
              <option value="3">Test</option>
            </select>
          </div>
        </button>

        {/* User Info Below */}
        <div className="flex items-center mt-4">
          {/* User Avatars */}
          <div className="flex items-center space-x-2">
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
            <span className="text-sm text-gray-500">Alicia, Bruno, Carlos +12 otros</span>
          </div>
          {/* Operativo Status */}
          <span className="ml-4 text-xs text-green-500 bg-green-100 py-1 px-2 rounded-full">Operativo</span>
        </div>
      </div>

      {/* Right Section - Invite Employee Button and Icons */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Invitar empleado
        </button>
        <FaSearch className="text-xl cursor-pointer text-gray-500" role="button" aria-label="Buscar" />
        <FaBell className="text-xl cursor-pointer text-gray-500" role="button" aria-label="Notificaciones" />
        <FaUserCircle className="text-xl cursor-pointer text-gray-500" role="button" aria-label="Perfil" />
      </div>
    </div>
  );
};

export default Navbar;