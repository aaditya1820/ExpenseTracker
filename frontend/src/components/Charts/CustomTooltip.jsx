import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload;

    return (
      <div className="bg-white shadow-lg rounded-xl px-4 py-2 border border-purple-300">
        {category && (
          <p className="text-xs font-semibold text-purple-700 mb-1 capitalize">
            {category}
          </p>
        )}
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="font-semibold text-purple-800">
            ₹{amount.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
