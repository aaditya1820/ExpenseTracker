import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income" 
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
      : "text-rose-400 bg-rose-500/10 border-rose-500/20";

  return (
    <div className="group flex items-center gap-4 p-5 rounded-[2rem] hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/5">
      <div className="w-14 h-14 flex items-center justify-center text-2xl text-slate-300 bg-slate-800 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-xl">
        {icon ? (
          <img src={icon} alt={title} className="w-7 h-7 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-base font-bold text-white tracking-tight truncate group-hover:text-primary-light transition-colors">{title}</p>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-black text-sm transition-all duration-500 ${getAmountStyles()}`}>
            <span>{type === "income" ? "+" : "-"}₹{amount}</span>
            {type === "income" ? <LuTrendingUp size={16} /> : <LuTrendingDown size={16} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-3 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

