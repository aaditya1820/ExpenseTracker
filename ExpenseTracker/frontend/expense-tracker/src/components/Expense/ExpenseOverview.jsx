import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../../components/Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper"; 

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions); 
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Expense Overview</h2>
          <p className="text-lg text-gray-500 mt-1">
            Monitor your spending patterns and manage your expenses better!
          </p>
        </div>
        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition duration-200"
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

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
