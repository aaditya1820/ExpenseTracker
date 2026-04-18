import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#8b5cf6", "#10b981", "#f43f5e"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Net Worth", amount: totalBalance },
    { name: "Inflow", amount: totalIncome },
    { name: "Outflow", amount: totalExpense },
  ];

  return (
    <div className="card h-full flex flex-col group">
      <div className="flex items-center justify-between mb-8">
        <h5 className="text-xl font-black text-white tracking-tight font-display">Financial <span className="text-primary-light">Analytics</span></h5>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      
      <div className="flex-1 flex items-center justify-center py-6">
        <CustomPieChart
          data={balanceData}
          label="Nexus Balance"
          totalAmount={`₹${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
        {balanceData.map((item, index) => (
          <div key={item.name} className="text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.name}</p>
            <p className="text-sm font-bold text-white" style={{ color: COLORS[index] }}>₹{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceOverview;

