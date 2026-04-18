import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#7c3aed", "#10b981", "#f43f5e"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ];

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-bold text-slate-900">Financial Overview</h5>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`₹${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default FinanceOverview;
