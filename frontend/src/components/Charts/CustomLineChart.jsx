import React from "react";
import {
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment";

// Distinct colors for categories
const distinctColors = [
  "#A084E8", "#9376E0", "#BA94D1", "#D1BBF2", "#9F91CC",
  "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
  "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
  "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
];

// ✅ Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white p-4 shadow-lg rounded-xl border border-purple-300 text-sm space-y-1 w-[220px]">
        <div className="flex items-center justify-between">
          <p className="font-bold text-purple-700">{item.category}</p>
          {item.color && (
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}
        </div>

        {/* ✅ Full formatted date */}
        {item.date && (
          <p className="text-gray-500 text-xs">
            {moment(item.date).format("Do MMM YYYY")}
          </p>
        )}

        <p className="text-purple-900 font-bold text-base">
          ₹ {Number(item.amount).toLocaleString()}
        </p>

        {item.type && (
          <p className="text-xs text-gray-600 capitalize">Type: {item.type}</p>
        )}
      </div>
    );
  }

  return null;
};


const CustomLineChart = ({ data = [] }) => {
  const processedData = data.map((item, index) => {
    const parsedDate = moment(item.date, [
      "YYYY-MM-DD",
      "DD-MM-YYYY",
      "DD MMM YYYY",
      "Do MMM YYYY",
    ]);

    return {
      ...item,
      category: item.category || item.source,
      amount: Number(item.amount) || 0,
      color: distinctColors[index % distinctColors.length],
      date: parsedDate.isValid() ? parsedDate.toISOString() : item.date,
    };
  });

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />

          {/* ✅ X-Axis with Full Date */}
          <XAxis
            dataKey="date"
            stroke="#6B21A8"
            tick={{ fill: "#6B21A8" }}
            tickFormatter={(dateStr) => moment(dateStr).format("DD MMM YYYY")}
          />

          <YAxis
            stroke="#6B21A8"
            tick={{ fill: "#6B21A8" }}
            tickFormatter={(val) =>  `₹${val}`}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8B5CF6"
            fill="url(#purpleGradient)"
            strokeWidth={6}
            legendType="none"
            dot={{ stroke: "#8B5CF6", strokeWidth: 2, r: 4, fill: "#DDD6FE" }}
            activeDot={{
              r: 6,
              stroke: "#6D28D9",
              fill: "#8B5CF6",
              strokeWidth: 3,
            }}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6D28D9"
            strokeWidth={6}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
