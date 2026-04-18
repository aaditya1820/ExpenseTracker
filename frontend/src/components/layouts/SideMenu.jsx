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
    <div className="flex flex-col h-full bg-[#03045e] p-6 border-r border-[#0077b6]">
      <div className="flex flex-col items-center justify-center py-10 mb-8 border-b border-[#0077b6]">
        <div className="relative mb-4">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 bg-[#023e8a] rounded-2xl object-cover border border-[#0077b6]"
            />
          ) : (
            <CharAvatar
              fullname={user?.fullName || "User"}
              width="w-24"
              height="h-24"
              style="text-2xl rounded-2xl bg-[#023e8a] border border-[#0077b6] text-[#caf0f8]"
            />
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00b4d8] border-4 border-[#03045e] rounded-full" />
        </div>
        
        <div className="text-center">
          <h5 className="text-[#caf0f8] font-bold text-lg tracking-tight">
            {user?.fullName || "User"}
          </h5>
          <p className="text-[#0096c7] text-[10px] font-bold uppercase tracking-widest mt-1">Premium Plan</p>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full nav-item group ${
              activeMenu === item.label
                ? "bg-[#90e0ef] text-[#03045e]"
                : "text-[#48cae4] hover:bg-[#023e8a] hover:text-[#caf0f8]"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl ${activeMenu === item.label ? "text-[#03045e]" : "text-[#48cae4] group-hover:text-[#caf0f8]"}`} />
            <span className="text-sm font-semibold flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-[#0077b6]">
        <button
          className="w-full flex items-center gap-4 py-3.5 px-6 rounded-xl text-[#00b4d8] hover:bg-[#023e8a] hover:text-[#caf0f8] transition-all font-bold text-sm"
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


