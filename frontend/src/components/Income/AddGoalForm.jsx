import React, { useState, useEffect } from "react";

function AddGoalForm({ onIncomeGoal, initialData }) {
  const [incomeGoal, setIncomeGoal] = useState({
    incomeGoal: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (initialData) {
      setIncomeGoal({
        incomeGoal: initialData.incomeGoal || "",
        month: initialData.month || new Date().getMonth() + 1,
        year: initialData.year || new Date().getFullYear(),
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setIncomeGoal((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4 text-blue-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1 mb-1">Income Goal (₹)</label>
          <input
            min={1}
            type="number"
            value={incomeGoal.incomeGoal}
            onChange={({ target }) => handleChange("incomeGoal", target.value)}
            placeholder="e.g. 50000"
            className="input-box !mt-0 !mb-0"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1 mb-1">Month (1-12)</label>
          <input
            min={1}
            max={12}
            type="number"
            value={incomeGoal.month}
            onChange={({ target }) => handleChange("month", target.value)}
            className="input-box !mt-0 !mb-0"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1 mb-1">Year</label>
          <input
            type="number"
            value={incomeGoal.year}
            onChange={({ target }) => handleChange("year", target.value)}
            className="input-box !mt-0 !mb-0"
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={() => onIncomeGoal(incomeGoal)}
          className="add-btn !py-2.5"
        >
          {initialData ? "Update Goal" : "Save Goal"}
        </button>
      </div>
    </div>
  );
}
export default AddGoalForm;