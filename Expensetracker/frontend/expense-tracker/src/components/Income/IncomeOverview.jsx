import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import AddGoalForm from "../Income/AddGoalForm";

const IncomeOverview = ({ transactions, onAddIncome, operationMessage }) => {
  const [chartData, setChartData] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [incomeGoalData, setIncomeGoalData] = useState(null);

  useEffect(() => {
    setChartData(prepareIncomeBarChartData(transactions));
  }, [transactions]);

  useEffect(() => {
    if (incomeGoalData && transactions.length > 0) {
      const totalIncome = transactions.reduce(
        (sum, txn) => sum + (txn.amount || 0),
        0
      );
      if (totalIncome >= Number(incomeGoalData.incomeGoal)) {
        setToastMessage("🎉 Congratulations! You have achieved your income goal!");
      }
    }
  }, [incomeGoalData, transactions]);

  useEffect(() => {
    if (operationMessage) setToastMessage(operationMessage);
  }, [operationMessage]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSetIncomeGoal = (goalData) => {
    const isUpdate = incomeGoalData !== null;
    setIncomeGoalData(goalData);
    setToastMessage(
      isUpdate
        ? "🔁 Income goal updated successfully!"
        : "✅ Income goal set successfully!"
    );
    setShowGoalForm(false);
  };

  return (
    <div className="card relative p-4 bg-white rounded-2xl shadow-md">
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-md">
          <div className="bg-purple-100 border border-purple-300 text-purple-900 px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in text-center">
            {toastMessage}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Income Overview</h2>
          <p className="text-lg text-gray-500 mt-1">
            Track your earnings over time and analyze your income trends!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowGoalForm((prev) => !prev)}
            className="flex items-center justify-center bg-gray-100 text-sm font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
          >
            {showGoalForm ? "CLOSE INCOME GOAL" : "ADD INCOME GOAL"}
            <LuPlus className="ml-2 text-base" />
          </button>

          <button
            onClick={onAddIncome}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            <LuPlus className="text-lg" />
            Add Income
          </button>
        </div>
      </div>

      {showGoalForm && (
        <div className="mt-6 p-6 border border-purple-300 rounded-2xl bg-purple-100 shadow-md transition-all duration-300 animate-fade-in">
          <AddGoalForm onIncomeGoal={handleSetIncomeGoal} />
        </div>
      )}

      <div className="mt-10">
        {chartData.length === 0 ? (
          <p className="text-center text-gray-400">No income data to display.</p>
        ) : (
          <CustomBarChart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
