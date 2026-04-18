import React from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";

const Navbar = ({ activeMenu, toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-[100] w-full glass-effect border-b border-slate-200/60 py-3 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
          <LuWallet className="text-white text-xl" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
          Expensy
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
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
