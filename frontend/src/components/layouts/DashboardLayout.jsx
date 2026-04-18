import React, { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex flex-col relative">
      {/* Background Decorative Blur */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <Navbar 
        activeMenu={activeMenu} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex flex-1 relative overflow-hidden z-10">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 h-[calc(100vh-80px)] sticky top-20">
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden transition-all duration-500"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`
          fixed top-20 left-0 z-50 w-80 h-[calc(100vh-80px)] bg-[#0b0f1a] transform transition-transform duration-500 ease-in-out md:hidden shadow-2xl border-r border-white/5
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

