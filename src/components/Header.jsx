import { useState } from "react";

export default function Header({ setScreen, name, email }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    setScreen(1);
  };

  return (
    <header className="hidden md:flex absolute bg-white shadow-md px-6 py-4 justify-between items-center right-44 top-4 border-l-4 border-l-red-500 rounded-md">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 focus:outline-none"
        >
          <img
            className="h-10 w-10 rounded-full"
            src="/images/pata.png"
            alt="User Avatar"
          />
          <span className="text-gray-800 dark:text-white font-medium">
            {name}
          </span>
        </button>
        <div
          className={`absolute w-44 -right-6 bg-white mt-6 shadow-lg rounded-lg z-50 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isDropdownOpen ? "max-h-52 py-1" : "max-h-0 h-0 py-0"
          }`}
        >
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-700">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
          <ul>
            <li>
              <button
                onClick={handleSettingsClick}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 "
              >
                Configurações
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
