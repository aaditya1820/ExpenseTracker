import React from "react";

const InfoCard = ({ icon, label, value, type }) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'income': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'expense': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'balance': return 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-blue-50 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 flex items-center justify-center text-2xl rounded-2xl border ${getTypeStyles()}`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{label}</p>
          <h3 className={`text-2xl md:text-3xl font-bold mt-1 tracking-tight ${type === 'balance' ? 'text-blue-900' : 'text-blue-900'}`}>₹{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;


