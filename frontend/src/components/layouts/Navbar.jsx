import React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuSprout } from "react-icons/lu";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#03045e]/80 backdrop-blur-md border-b border-[#0077b6] py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#00b4d8] p-2 rounded-lg">
          <LuSprout className="text-[#03045e] text-xl" />
        </div>
        <h2 className="text-xl font-bold text-[#caf0f8] tracking-tight font-display">
          Cash<span className="text-[#00b4d8]">Sprout</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 rounded-xl bg-[#023e8a] text-[#ade8f4] hover:text-[#caf0f8] transition-all border border-[#0077b6]"
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


