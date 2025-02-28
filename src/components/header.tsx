import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold text-blue-600">🏠</span>
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-700">Los Alcazares</h2>
          <select className="ml-2 text-sm text-gray-500">
            <option value="1">Centro de Tecnificación Deportiva</option>
            <option value="2">Test</option>
            <option value="3">Test</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" />
          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/44.jpg" alt="user" />
          <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/45.jpg" alt="user" />
        </div>
        <span className="ml-2 text-sm font-medium text-green-500">OPERATIVO</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Invitar empleado</button>
        <FaSearch className="text-gray-600 text-xl" />
        <FaBell className="text-gray-600 text-xl" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default Header;