import React from "react";

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 transition-all">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 flex items-center justify-center text-2xl text-blue-600 bg-blue-50 rounded-2xl">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">₹{value}</h3>
        </div>
      </div>
    </div>
  );
};


export default InfoCard;


