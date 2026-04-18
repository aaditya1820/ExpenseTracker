import React from "react";
import { LuArrowRight, LuReceipt } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card border border-blue-50">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <LuReceipt className="text-blue-500" />
          Expense Log
        </h5>
        <button 
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors uppercase tracking-widest" 
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-sm" />
        </button>
      </div>
      <div className="space-y-1">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="py-10 text-center text-blue-300 font-medium">
             No expense records
          </div>
        )}
      </div>
    </div>
  );
};
export default ExpenseTransactions;