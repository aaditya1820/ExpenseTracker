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
      ? "text-emerald-600 bg-emerald-50 border-emerald-100" 
      : "text-rose-600 bg-rose-50 border-rose-100";

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-100">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-slate-700 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-sm font-bold text-slate-800 truncate">{title}</p>
          <p className="text-xs font-medium text-slate-400 mt-0.5">{date}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-sm ${getAmountStyles()}`}>
            <span>{type === "income" ? "+" : "-"}₹{amount}</span>
            {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
