import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-xl rounded-2xl border border-blue-50">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{payload[0].name}</p>
          <p className="text-blue-900 font-bold text-lg">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          innerRadius={110}
          stroke="none"
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-15}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12px"
              fontWeight="bold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={15}
              textAnchor="middle"
              fill="#03045e"
              fontSize="24px"
              fontWeight="800"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};
export default CustomPieChart;