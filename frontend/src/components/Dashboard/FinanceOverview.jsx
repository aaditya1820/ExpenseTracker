import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#0077b6", "#00b4d8", "#ff4d6d"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card h-full flex flex-col group border border-blue-50">
      <div className="flex items-center justify-between mb-8">
        <h5 className="text-xl font-bold text-blue-900 tracking-tight font-display">Finance <span className="text-blue-500">Analytics</span></h5>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      </div>
      
      <div className="flex-1 flex items-center justify-center py-6">
        <CustomPieChart
          data={balanceData}
          label="Current Balance"
          totalAmount={`₹${totalBalance.toLocaleString()}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-blue-50">
        {balanceData.map((item, index) => (
          <div key={item.name} className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.name}</p>
            <p className="text-sm font-bold text-blue-900" style={{ color: COLORS[index] }}>₹{item.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceOverview;

