import React from "react";
import { LuArrowRight, LuHistory } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card border border-blue-50">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <LuHistory className="text-blue-500" />
          Recent Transactions
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
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="py-10 text-center text-blue-300 font-medium">
             No recent activity
          </div>
        )}
      </div>
    </div>
  );
};
export default RecentTransactions;