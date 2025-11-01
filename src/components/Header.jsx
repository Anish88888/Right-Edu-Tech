import React, { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiGrid,
  FiMaximize,
  FiBell,
  FiMail,
  FiMessageCircle,
  FiUser,
  FiSettings,
  FiActivity,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 sm:left-64 right-0 h-[50px] flex items-center px-4 sm:px-6 lg:px-8 shadow-md z-50 bg-[#343d46]">
      {/* Left: Sidebar toggle */}
      <button className="text-white text-xl mr-4 sm:hidden">
        <FiMenu />
      </button>

      {/* Middle: Search */}
      <div className="flex-1 relative max-w-md">
        <input
          type="text"
          placeholder="Search in HRMS"
          className="w-full h-9 pl-3 pr-20 rounded bg-[#2c323a] text-white placeholder-gray-400 text-sm focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs bg-[#2c323a] px-1 rounded">
          CTRL + /
        </span>
      </div>

      {/* Right: Icons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
        {/* Fullscreen */}
        <button className="text-white text-lg p-2 hover:bg-[#414b57] rounded">
          <FiMaximize />
        </button>

        {/* Grid / Apps */}
        <button className="text-white text-lg p-2 hover:bg-[#414b57] rounded">
          <FiGrid />
        </button>

        {/* Chat */}
        <button className="relative text-white text-lg p-2 hover:bg-[#414b57] rounded">
          <FiMessageCircle />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Mail */}
        <button className="relative text-white text-lg p-2 hover:bg-[#414b57] rounded">
          <FiMail />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Notifications */}
        <button className="relative text-white text-lg p-2 hover:bg-[#414b57] rounded">
          <FiBell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3 h-3 rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/32"
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-[#343d46] rounded-full" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Kevin Larry"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Kevin Larry
                    </p>
                    <p className="text-xs text-gray-500">warren@example.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiUser className="text-gray-600 text-base" />
                  <span>My Profile</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiSettings className="text-gray-600 text-base" />
                  <span>Settings</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiActivity className="text-gray-600 text-base" />
                  <span>Status</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiCreditCard className="text-gray-600 text-base" />
                  <span>My Account</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiHelpCircle className="text-gray-600 text-base" />
                  <span>Knowledge Base</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200">
                <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                  <FiLogOut className="text-gray-600 text-base" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
