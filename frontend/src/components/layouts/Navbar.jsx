import React, { useContext } from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuSprout, LuLogOut } from "react-icons/lu";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-blue-100 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <LuSprout className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold text-blue-900 tracking-tight font-display hidden sm:block">
              Cash<span className="text-blue-500">Sprout</span>
            </h2>
          </div>

          {}
          <div className="hidden lg:flex items-center gap-1">
            {SIDE_MENU_DATA.map((item, index) => (
              <button
                key={`nav_${index}`}
                onClick={() => navigate(item.path)}
                className={`nav-item ${
                  activeMenu === item.label ? "nav-item-active" : "nav-item-inactive"
                }`}
              >
                <item.icon className="text-lg" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 pr-4 border-r border-blue-50">
            <div className="text-right">
              <p className="text-sm font-bold text-[#023e8a] leading-none">{user?.fullName || "User"}</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors font-semibold text-sm px-3 py-2 rounded-lg hover:bg-rose-50"
          >
            <LuLogOut className="text-lg" />
            <span>Sign Out</span>
          </button>

          {}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all border border-blue-100"
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="text-xl" />
            ) : (
              <HiOutlineMenuAlt3 className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



