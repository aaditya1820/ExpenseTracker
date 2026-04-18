import React, { useState, useEffect } from "react";
import { LuPlus, LuTarget, LuCheckCircle } from "react-icons/lu";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import AddGoalForm from "../Income/AddGoalForm";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const IncomeOverview = ({ transactions, onAddIncome, operationMessage }) => {
  const [chartData, setChartData] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [incomeGoalData, setIncomeGoalData] = useState(null);

  const fetchIncomeGoal = async () => {
    try {
      const now = new Date();
      const response = await axiosInstance.get(API_PATHS.GOAL.GET_GOAL, {
        params: { month: now.getMonth() + 1, year: now.getFullYear() },
      });
      if (response.data.goal) {
        setIncomeGoalData(response.data.goal);
      }
    } catch (error) {
      console.error("Error fetching income goal:", error);
    }
  };

  useEffect(() => {
    setChartData(prepareIncomeBarChartData(transactions));
    fetchIncomeGoal();
  }, [transactions]);

  useEffect(() => {
    if (incomeGoalData && transactions.length > 0) {
      const totalIncome = transactions.reduce(
        (sum, txn) => sum + (txn.amount || 0),
        0
      );
      if (totalIncome >= Number(incomeGoalData.incomeGoal) && Number(incomeGoalData.incomeGoal) > 0) {
        toast.success("🎉 Congratulations! You have achieved your income goal!", {
          id: "income-goal-reached",
          duration: 5000,
        });
      }
    }
  }, [incomeGoalData, transactions]);

  const handleSetIncomeGoal = async (goalData) => {
    try {
      const response = await axiosInstance.post(API_PATHS.GOAL.SET_GOAL, {
        ...goalData,
        incomeGoal: parseFloat(goalData.incomeGoal),
      });
      setIncomeGoalData(response.data.goal);
      toast.success("Income goal updated successfully!");
      setShowGoalForm(false);
    } catch (error) {
      console.error("Error setting income goal:", error);
      toast.error("Failed to set income goal");
    }
  };

  return (
    <div className="card bg-white rounded-3xl border border-blue-50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-blue-50 bg-blue-50/30 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <LuTarget className="text-blue-600" />
            Income Overview
          </h2>
          <p className="text-sm text-blue-400 mt-0.5 font-medium">
            Monitor earnings and track your goals.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGoalForm((prev) => !prev)}
            className="secondary-btn !py-2 !px-4 text-xs"
          >
            {showGoalForm ? "Close Goal" : (incomeGoalData ? "Update Goal" : "Set Goal")}
          </button>
          <button
            onClick={onAddIncome}
            className="add-btn !py-2 !px-4 text-xs"
          >
            <LuPlus />
            Add Income
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {showGoalForm && (
          <div className="mb-8 p-6 border border-blue-100 rounded-2xl bg-blue-50/50 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-widest">Set Your Monthly Goal</h3>
            <AddGoalForm onIncomeGoal={handleSetIncomeGoal} initialData={incomeGoalData} />
          </div>
        )}

        {incomeGoalData && incomeGoalData.incomeGoal > 0 && (
          <div className="mb-8 flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                   <LuCheckCircle size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Monthly Goal</p>
                   <p className="text-lg font-bold text-blue-900">₹{incomeGoalData.incomeGoal.toLocaleString()}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Progress</p>
                <p className="text-lg font-bold text-blue-600">
                   {Math.min(100, Math.round((transactions.reduce((s,t)=>s+t.amount, 0) / incomeGoalData.incomeGoal) * 100))}%
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
               <p className="text-blue-900 font-bold">No income data yet</p>
               <p className="text-slate-400 text-sm mt-1">Start by adding your first income entry.</p>
            </div>
          ) : (
            <CustomBarChart data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;