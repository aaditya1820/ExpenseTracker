import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { LuLogOut } from "react-icons/lu";

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
    <div className="flex flex-col h-full bg-white border-r border-slate-200/60 p-5">
      <div className="flex flex-col items-center justify-center py-8 mb-4 border-b border-slate-100">
        <div className="relative group cursor-pointer">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 bg-slate-100 rounded-3xl object-cover ring-4 ring-slate-50 transition-all group-hover:ring-primary/10"
            />
          ) : (
            <CharAvatar
              fullname={user?.fullName || "User"}
              width="w-24"
              height="h-24"
              style="text-2xl rounded-3xl ring-4 ring-slate-50 transition-all group-hover:ring-primary/10"
            />
          )}
          <div className="absolute inset-0 rounded-3xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-300"></div>
        </div>
        
        <div className="mt-4 text-center">
          <h5 className="text-slate-900 font-bold text-lg tracking-tight">
            {user?.fullName || "User"}
          </h5>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">
            Member
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full nav-item ${
              activeMenu === item.label
                ? "nav-item-active"
                : "nav-item-inactive"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl ${activeMenu === item.label ? "text-white" : "text-slate-500"}`} />
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <button
          className="w-full flex items-center gap-3 py-3 px-5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-semibold text-sm"
          onClick={handleLogout}
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
