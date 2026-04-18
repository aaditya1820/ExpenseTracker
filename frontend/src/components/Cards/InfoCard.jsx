import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="card group relative overflow-hidden">
      <div className="flex items-center gap-5 relative z-10">
        <div
          className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-2xl shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}
        >
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
          <h3 className="text-3xl font-black text-white mt-1 tracking-tighter">₹{value}</h3>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity duration-500`} />
    </div>
  );
};

export default InfoCard;

