import React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuSprout } from "react-icons/lu";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-[100] w-full bg-black/40 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <LuSprout className="text-black text-xl" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight font-display">
          Cash<span className="text-primary">Sprout</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 rounded-xl bg-white/5 text-neutral-400 hover:text-white transition-all border border-white/5"
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


