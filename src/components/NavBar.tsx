import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import type { UserRole } from "../types/user"; // 🟢 import จาก types

interface NavBarProps {
  userRole: UserRole;
  onLogout: () => void;
  onLoginClick: () => void; // ฟังก์ชันสำหรับนำทางไปหน้า Login
}

export const NavBar: React.FC<NavBarProps> = ({
  userRole,
  onLogout,
  onLoginClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = userRole === "admin";
  const isAuthenticated = userRole !== "seeker";

  const links = [
    { name: "รายการงาน", path: "/" },
    { name: "โพสต์งานใหม่", path: "/create-job" },
  ];

  return (
    <nav className="bg-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. โลโก้ */}
          <Link to="/" className="flex items-center">
            <span className="text-white text-2xl font-bold tracking-wider">
              JobFinder
            </span>
          </Link>

          {/* 2. ลิงก์หลัก (Desktop) */}
          <div className="hidden sm:flex sm:space-x-4 items-center">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-900 text-white"
                      : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                  }`
                }
                end={link.path === "/"}
              >
                {link.name}
              </NavLink>
            ))}

            {/* ลิงก์ Admin */}
            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-bold transition ${
                    isActive
                      ? "bg-red-700 text-white"
                      : "text-red-200 hover:bg-red-600 hover:text-white"
                  }`
                }
              >
                🔑 Admin Dashboard
              </NavLink>
            )}

            {/* ปุ่ม Login/Logout */}
            {!isAuthenticated ? (
              <Link to="/login">
                <button
                  onClick={onLoginClick}
                  className="px-3 py-1.5 ml-4 text-sm font-medium bg-white text-indigo-700 rounded-full hover:bg-gray-100 shadow-md"
                >
                  🚪 Login
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 ml-4 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
                >
                  👋 Logout ({userRole.toUpperCase()})
                </button>
              </Link>
            )}
          </div>

          {/* 3. ปุ่มเมนู (Mobile) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-600"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* 4. เมนูมือถือ */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-600 hover:text-white"
                }`
              }
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-red-200 hover:bg-red-600 hover:text-white"
            >
              🔑 Admin Dashboard
            </NavLink>
          )}

          {!isAuthenticated ? (
            <button
              onClick={() => {
                onLoginClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 mt-2 text-base font-medium bg-white text-indigo-700 rounded-md hover:bg-gray-100"
            >
              🚪 Login
            </button>
          ) : (
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 mt-2 text-base font-medium bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              👋 Logout ({userRole.toUpperCase()})
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
