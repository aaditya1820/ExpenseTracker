import React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-[100] w-full glass-effect py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-gradient-to-br from-primary to-primary-dark p-2.5 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
          <LuWallet className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tighter font-display">
          Nexus<span className="text-primary-light">Pay</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-3 rounded-2xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-95"
        >
          {isMobileMenuOpen ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt3 className="text-2xl" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

