import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleMenu = () => {
    setOpenSideMenu((prev) => !prev);
  };

  return (
    <>

      <div className="flex items-center justify-between bg-white border-b border-gray-200/70 py-4 px-7 sticky top-0 z-50 shadow-sm">
        {/* <button
          className="text-black hover:text-blue-600"
          onClick={toggleMenu}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button> */}

        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      </div>

      <div
        className={`fixed top-[64px] left-0 z-40 w-64 h-screen transform ${
          openSideMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out`}
      >
        {/* <SideMenu activeMenu={activeMenu} /> */}
      </div>
    </>
  );
};

export default Navbar;
