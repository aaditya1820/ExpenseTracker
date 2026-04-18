import React, { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col relative">
      <Navbar 
        activeMenu={activeMenu} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex-1 relative">
        {}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[90] bg-blue-900/20 backdrop-blur-sm lg:hidden transition-all duration-300"
            onClick={toggleMobileMenu}
          />
        )}

        {}
        <aside className={`
          fixed top-0 left-0 z-[101] w-72 h-full bg-white transform transition-transform duration-300 ease-in-out lg:hidden border-r border-blue-100 shadow-2xl
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <SideMenu activeMenu={activeMenu} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
        </aside>

        {}
        <main className="py-8 md:py-12">
          <div className="center-layout">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;



