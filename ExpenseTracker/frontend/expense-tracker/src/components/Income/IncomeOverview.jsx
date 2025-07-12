import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Income Overview</h2>
          <p className="text-xl text-gray-500 mt-0.5">
            Track your earnings over time and analyze your income trends!
          </p>
        </div>
        <button
          onClick={() => {
            console.log("Add Income clicked");
            onAddIncome();
          }}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
