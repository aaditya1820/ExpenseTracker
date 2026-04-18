import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="card flex items-center gap-5">
      <div
        className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-2xl shadow-lg shadow-current/20`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-0.5">₹{value}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
