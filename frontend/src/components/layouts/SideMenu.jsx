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
    <div className="flex flex-col h-full bg-[#0b0f1a] p-6 border-r border-white/5 relative z-10">
      <div className="flex flex-col items-center justify-center py-10 mb-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 shadow-2xl">
        <div className="relative group cursor-pointer mb-5">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-28 h-28 bg-slate-800 rounded-[2rem] object-cover ring-4 ring-white/5 transition-all duration-500 group-hover:ring-primary/40 group-hover:scale-105"
            />
          ) : (
            <CharAvatar
              fullname={user?.fullName || "User"}
              width="w-28"
              height="h-28"
              style="text-3xl rounded-[2rem] ring-4 ring-white/5 transition-all duration-500 group-hover:ring-primary/40 group-hover:scale-105"
            />
          )}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-[#0b0f1a] rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
        </div>
        
        <div className="text-center">
          <h5 className="text-white font-black text-xl tracking-tight mb-1">
            {user?.fullName || "Nexus User"}
          </h5>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Premium Tier</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full nav-item group relative ${
              activeMenu === item.label
                ? "nav-item-active"
                : "nav-item-inactive"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <div className={`p-2 rounded-xl transition-colors ${activeMenu === item.label ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"}`}>
              <item.icon className={`text-xl ${activeMenu === item.label ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
            </div>
            <span className="text-sm font-bold flex-1 text-left">{item.label}</span>
            {activeMenu === item.label && <LuChevronRight className="text-white/50" />}
          </button>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-white/5">
        <button
          className="w-full flex items-center gap-4 py-4 px-6 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 font-bold text-sm border border-transparent hover:border-rose-500/20 group active:scale-95"
          onClick={handleLogout}
        >
          <div className="p-2 rounded-xl bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
            <LuLogOut className="text-xl" />
          </div>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;

