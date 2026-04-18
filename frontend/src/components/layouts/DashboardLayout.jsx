import React, { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#03045e] flex flex-col relative">
      <Navbar 
        activeMenu={activeMenu} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 h-[calc(100vh-80px)] sticky top-20">
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-[#03045e]/80 md:hidden transition-all duration-300"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`
          fixed top-20 left-0 z-50 w-72 h-[calc(100vh-80px)] bg-[#03045e] transform transition-transform duration-300 ease-in-out md:hidden border-r border-[#0077b6]
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};


export default DashboardLayout;


