import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../../components/Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";
import ExpenseLimitModal from "../Expense/AddExpenseLimit";

const ExpenseOverview = ({ transactions, onAddExpense, onExpenseLimit, operationMessage }) => {
  const [chartData, setChartData] = useState([]);
  const [showExpenseLimitModal, setShowExpenseLimitModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [expenseLimitData, setExpenseLimitData] = useState(null);

  useEffect(() => {
    setChartData(prepareExpenseLineChartData(transactions));
  }, [transactions]);

  useEffect(() => {
    if (expenseLimitData && transactions.length > 0) {
      const totalExpense = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
      if (totalExpense > Number(expenseLimitData.expenseLimit)) {
        setToastMessage("⚠️ Warning: You have exceeded your expense limit!");
      }
    }
  }, [expenseLimitData, transactions]);

  useEffect(() => {
    if (operationMessage) setToastMessage(operationMessage);
  }, [operationMessage]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSetExpenseLimit = (limitData) => {
    const isUpdate = expenseLimitData !== null;
    setExpenseLimitData(limitData);
    setToastMessage(
      isUpdate
        ? "🔁 Expense limit updated successfully!"
        : "✅ Expense limit set successfully!"
    );
    onExpenseLimit(limitData);
    setShowExpenseLimitModal(false);
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
          <h2 className="text-2xl font-bold text-purple-800">Expense Overview</h2>
          <p className="text-lg text-gray-500 mt-1">
            Monitor your spending patterns and manage your expenses better!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowExpenseLimitModal((prev) => !prev)}
            className="flex items-center justify-center bg-gray-100 text-sm font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
          >
            {showExpenseLimitModal ? "CLOSE EXPENSE LIMIT" : "ADD EXPENSE LIMIT"}
            <LuPlus className="ml-2 text-base" />
          </button>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            <LuPlus className="text-lg" />
            Add Expense
          </button>
        </div>
      </div>

      {showExpenseLimitModal && (
        <div className="mt-6 p-6 border border-purple-300 rounded-2xl bg-purple-100 shadow-md transition-all duration-300 animate-fade-in">
          <ExpenseLimitModal
            onClose={() => setShowExpenseLimitModal(false)}
            onExpenseLimit={handleSetExpenseLimit}
          />
        </div>
      )}

      <div className="mt-10">
        {chartData.length === 0 ? (
          <p className="text-center text-gray-400">No expense data to display.</p>
        ) : (
          <CustomLineChart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
