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
    <div className="group flex items-center gap-4 py-4 px-2 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-blue-600 bg-gray-50 rounded-xl border border-gray-100 transition-all">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-sm font-bold text-slate-900 truncate">{title}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex items-center gap-1.5 font-bold text-sm ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
            <span>{isIncome ? "+" : "-"}₹{amount}</span>
            {isIncome ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-2 text-slate-300 hover:text-rose-600 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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



