import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };
  return (
    <div className="space-y-5">
      <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          Income Source
        </label>
        <input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Freelance, Salary, etc."
          type="text"
          className="input-box"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          Amount
        </label>
        <input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          type="number"
          placeholder="Enter amount"
          className="input-box"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          Date
        </label>
        <input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="input-box"
        />
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="add-btn w-full justify-center"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};
export default AddIncomeForm;