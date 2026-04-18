import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { LuLogOut, LuX, LuSprout } from "react-icons/lu";

const SideMenu = ({ activeMenu, closeMobileMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
    if (closeMobileMenu) closeMobileMenu();
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {}
      <div className="p-6 flex items-center justify-between border-b border-blue-50">
        <div className="flex items-center gap-2">
          <LuSprout className="text-blue-600 text-2xl" />
          <h2 className="text-xl font-bold text-blue-900 tracking-tight font-display">
            Cash<span className="text-blue-500">Sprout</span>
          </h2>
        </div>
        <button 
          onClick={closeMobileMenu}
          className="p-2 rounded-lg bg-blue-50 text-blue-600"
        >
          <LuX className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8 px-6 bg-blue-50/30">
        <div className="relative mb-4">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 bg-white rounded-2xl object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <CharAvatar
              fullname={user?.fullName || "User"}
              width="w-20"
              height="h-20"
              style="text-2xl rounded-2xl bg-white border-2 border-white text-blue-900 shadow-sm"
            />
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>
        
        <div className="text-center">
          <h5 className="text-blue-900 font-bold text-lg tracking-tight">
            {user?.fullName || "User"}
          </h5>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3.5 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
              activeMenu === item.label
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
            }`}
            onClick={() => handleClick(item)}
          >
            <item.icon className="text-xl" />
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-blue-50">
        <button
          className="w-full flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm"
          onClick={handleLogout}
        >
          <LuLogOut className="text-xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;



