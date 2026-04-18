import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow-md">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
