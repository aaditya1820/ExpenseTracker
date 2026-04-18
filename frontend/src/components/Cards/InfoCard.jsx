import React from "react";

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-[#023e8a] p-8 rounded-3xl border border-[#0077b6] transition-all">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 flex items-center justify-center text-2xl text-[#03045e] bg-[#00b4d8] rounded-2xl">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#48cae4] uppercase tracking-widest">{label}</p>
          <h3 className="text-3xl font-bold text-[#caf0f8] mt-1 tracking-tight">₹{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;


