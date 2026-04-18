import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { LuLogOut, LuChevronRight } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] p-6 border-r border-neutral-900">
      <div className="flex flex-col items-center justify-center py-10 mb-8 border-b border-neutral-900">
        <div className="relative mb-4">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 bg-neutral-800 rounded-2xl object-cover border border-neutral-800"
            />
          ) : (
            <CharAvatar
              fullname={user?.fullName || "User"}
              width="w-24"
              height="h-24"
              style="text-2xl rounded-2xl bg-neutral-800 border border-neutral-800"
            />
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary border-4 border-[#0a0a0a] rounded-full" />
        </div>
        
        <div className="text-center">
          <h5 className="text-white font-bold text-lg tracking-tight">
            {user?.fullName || "User"}
          </h5>
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">Premium Plan</p>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full nav-item group ${
              activeMenu === item.label
                ? "nav-item-active"
                : "nav-item-inactive"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl ${activeMenu === item.label ? "text-primary" : "text-neutral-500 group-hover:text-neutral-200"}`} />
            <span className="text-sm font-semibold flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-neutral-900">
        <button
          className="w-full flex items-center gap-4 py-3.5 px-6 rounded-xl text-neutral-500 hover:bg-neutral-900 hover:text-rose-500 transition-all font-bold text-sm"
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


