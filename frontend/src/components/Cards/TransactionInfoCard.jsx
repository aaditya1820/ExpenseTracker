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
    <div className="group flex items-center gap-4 py-4 px-2 hover:bg-neutral-800/30 rounded-2xl transition-all border border-transparent hover:border-neutral-800">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-neutral-400 bg-neutral-900 rounded-xl border border-neutral-800 transition-all">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-sm font-bold text-white truncate">{title}</p>
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex items-center gap-1.5 font-bold text-sm ${isIncome ? "text-primary" : "text-rose-500"}`}>
            <span>{isIncome ? "+" : "-"}₹{amount}</span>
            {isIncome ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-2 text-neutral-600 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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


