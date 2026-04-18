import React from "react";
import {
  LuUtensils,
  LuArrowUpRight,
  LuArrowDownRight,
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
  const isIncome = type === "income";

  return (
    <div className="group flex items-center gap-4 py-3.5 px-3 hover:bg-blue-50/50 rounded-2xl transition-all border border-transparent hover:border-blue-100">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-blue-600 bg-white rounded-xl border border-blue-50 shadow-sm transition-all group-hover:scale-110">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-sm font-bold text-blue-900 truncate tracking-tight">{title}</p>
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex items-center gap-1.5 font-bold text-sm ${isIncome ? "text-emerald-600" : "text-rose-500"}`}>
            <span>{isIncome ? "+" : "-"}₹{amount.toLocaleString()}</span>
            {isIncome ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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



