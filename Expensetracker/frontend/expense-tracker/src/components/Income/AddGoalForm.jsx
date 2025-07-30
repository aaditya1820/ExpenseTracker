import React, { useState } from "react";

function AddGoalForm({ onIncomeGoal }) {
  const [incomeGoal, setIncomeGoal] = useState({
    incomeGoal: "",
    month: "",
    year: "",
  });

  const handleChange = (key, value) => {
    setIncomeGoal((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-5 text-gray-700 w-[75vw] sm:w-full">
      <div className="flex flex-col">
        <label className="text-sm mb-1 font-medium">Income Goal</label>
        <input
          min={1}
          type="number"
          value={incomeGoal.incomeGoal}
          onChange={({ target }) => handleChange("incomeGoal", target.value)}
          placeholder="50,000"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 font-medium">Month</label>
        <input
          min={1}
          type="number"
          value={incomeGoal.month}
          onChange={({ target }) => handleChange("month", target.value)}
          placeholder="In Numbers of 1 to 12"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 font-medium">Year</label>
        <input
          type="number"
          value={incomeGoal.year}
          onChange={({ target }) => handleChange("year", target.value)}
          placeholder="e.g., 2025"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onIncomeGoal(incomeGoal)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Income Goal
        </button>
      </div>
    </div>
  );
}

export default AddGoalForm;
