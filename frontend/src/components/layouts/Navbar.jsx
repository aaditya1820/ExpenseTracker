import React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuSprout } from "react-icons/lu";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <LuSprout className="text-white text-xl" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
          Cash<span className="text-blue-600">Sprout</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 rounded-xl bg-gray-50 text-slate-500 hover:text-blue-600 transition-all border border-gray-100"
        >
          {isMobileMenuOpen ? (
            <HiOutlineX className="text-xl" />
          ) : (
            <HiOutlineMenuAlt3 className="text-xl" />
          )}
        </button>
      </div>
    </nav>
  );
};



export default Navbar;


