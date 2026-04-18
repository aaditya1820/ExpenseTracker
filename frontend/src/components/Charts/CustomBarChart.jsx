import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const distinctColors = [
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4",
  "#90e0ef",
  "#ade8f4",
  "#023e8a",
  "#03045e",
];

const IncomeBarChart = ({ data = [] }) => {
  const processedData = data.map((item, index) => ({
    ...item,
    category: item.category || `${item.source}`,
    amount: Number(item.amount) || 0,
    color: distinctColors[index % distinctColors.length],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-xl rounded-2xl border border-blue-50">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{item.category}</p>
          <p className="text-blue-900 font-bold text-lg">
            ₹{item.amount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!processedData.length) {
    return (
      <div className="w-full h-[300px] flex flex-col items-center justify-center">
        <p className="text-slate-400 font-medium">No income data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar 
            dataKey="amount" 
            radius={[8, 8, 0, 0]}
            barSize={40}
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;