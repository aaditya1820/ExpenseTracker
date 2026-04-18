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
  "#A084E8",
  "#9376E0",
  "#BA94D1",
  "#D1BBF2",
  "#9F91CC",
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
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
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200 text-xl">
          <p className="font-bold text-gray-800">{item.category}</p>
          <p className="text-green-600 font-bold text-base">
            ₹{item.amount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!processedData.length) {
    return (
      <div className="bg-white w-full h-[300px] flex flex-col items-center justify-center rounded-lg p-4">
        <p className="text-gray-500 mb-2">No income data available</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition">
          + Add Income
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-[400px] p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
          barSize={200}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            tickLine={false}
            tick={{ fill: "#555", fontSize: 14 }}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#555", fontSize: 14 }}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" name="Amount" radius={[6, 6, 0, 0]}>
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
