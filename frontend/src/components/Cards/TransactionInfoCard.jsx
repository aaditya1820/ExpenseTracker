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
    <div className="group flex items-center gap-4 py-4 px-2 hover:bg-[#023e8a]/50 rounded-2xl transition-all border border-transparent hover:border-[#0077b6]">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-[#ade8f4] bg-[#023e8a] rounded-xl border border-[#0077b6] transition-all">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate mr-4">
          <p className="text-sm font-bold text-[#caf0f8] truncate">{title}</p>
          <p className="text-[10px] font-bold text-[#48cae4] uppercase tracking-widest mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex items-center gap-1.5 font-bold text-sm ${isIncome ? "text-[#90e0ef]" : "text-[#00b4d8]"}`}>
            <span>{isIncome ? "+" : "-"}₹{amount}</span>
            {isIncome ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
          </div>

          {!hideDeleteBtn && (
            <button
              className="p-2 text-[#0077b6] hover:text-[#f43f5e] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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



