import React, { useState, useEffect } from "react";
import { LuPlus, LuTarget, LuTriangleAlert } from "react-icons/lu";
import CustomLineChart from "../../components/Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";
import ExpenseLimitModal from "../Expense/AddExpenseLimit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const ExpenseOverview = ({ transactions, onAddExpense, onExpenseLimit, operationMessage }) => {
  const [chartData, setChartData] = useState([]);
  const [showExpenseLimitModal, setShowExpenseLimitModal] = useState(false);
  const [expenseLimitData, setExpenseLimitData] = useState(null);

  const fetchExpenseLimit = async () => {
    try {
      const now = new Date();
      const response = await axiosInstance.get(API_PATHS.GOAL.GET_GOAL, {
        params: { month: now.getMonth() + 1, year: now.getFullYear() },
      });
      if (response.data.goal) {
        setExpenseLimitData(response.data.goal);
      }
    } catch (error) {
      console.error("Error fetching expense limit:", error);
    }
  };

  useEffect(() => {
    setChartData(prepareExpenseLineChartData(transactions));
    fetchExpenseLimit();
  }, [transactions]);

  useEffect(() => {
    if (expenseLimitData && transactions.length > 0) {
      const totalExpense = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
      if (totalExpense > Number(expenseLimitData.expenseLimit) && Number(expenseLimitData.expenseLimit) > 0) {
        toast.error("⚠️ Warning: You have exceeded your expense limit!", {
           id: "expense-limit-exceeded",
           duration: 5000,
        });
      }
    }
  }, [expenseLimitData, transactions]);

  const handleSetExpenseLimit = async (limitData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.GOAL.SET_GOAL, {
        ...limitData,
        expenseLimit: parseFloat(limitData.expenseLimit),
      });
      setExpenseLimitData(response.data.goal);
      toast.success("Expense limit updated successfully!");
      setShowExpenseLimitModal(false);
    } catch (error) {
      console.error("Error setting expense limit:", error);
      toast.error("Failed to set expense limit");
    }
  };

  return (
    <div className="card bg-white rounded-3xl border border-blue-50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-blue-50 bg-blue-50/30 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <LuTarget className="text-blue-600" />
            Expense Overview
          </h2>
          <p className="text-sm text-blue-400 mt-0.5 font-medium">
            Track spending habits and manage limits.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowExpenseLimitModal((prev) => !prev)}
            className="secondary-btn !py-2 !px-4 text-xs"
          >
            {showExpenseLimitModal ? "Close Limit" : (expenseLimitData ? "Update Limit" : "Set Limit")}
          </button>
          <button
            onClick={onAddExpense}
            className="add-btn !py-2 !px-4 text-xs"
          >
            <LuPlus />
            Add Expense
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {showExpenseLimitModal && (
          <div className="mb-8 p-6 border border-blue-100 rounded-2xl bg-blue-50/50 animate-in fade-in slide-in-from-top-4 duration-300">
             <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-widest">Set Your Spending Limit</h3>
             <ExpenseLimitModal
               onClose={() => setShowExpenseLimitModal(false)}
               onExpenseLimit={handleSetExpenseLimit}
               initialData={expenseLimitData}
             />
          </div>
        )}

        {expenseLimitData && expenseLimitData.expenseLimit > 0 && (
          <div className="mb-8 flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                   <LuTriangleAlert size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Monthly Limit</p>
                   <p className="text-lg font-bold text-rose-900">₹{expenseLimitData.expenseLimit.toLocaleString()}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Spent</p>
                <p className={`text-lg font-bold ${transactions.reduce((s,t)=>s+t.amount, 0) > expenseLimitData.expenseLimit ? 'text-rose-600' : 'text-blue-600'}`}>
                   ₹{transactions.reduce((s,t)=>s+t.amount, 0).toLocaleString()}
                </p>
             </div>
          </div>
        )}

        <div className="min-h-[300px]">
          {chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <LuTarget className="text-blue-200 text-3xl" />
               </div>
               <p className="text-blue-900 font-bold">No expense data yet</p>
               <p className="text-slate-400 text-sm mt-1">Start by adding your first expense entry.</p>
            </div>
          ) : (
            <CustomLineChart data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;