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
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5 max-w-md w-full mx-auto border border-gray-200">

    <EmojiPickerPopup 
    icon={income.icon}
    onSelect={(selectedIcon)=>handleChange("icon" , selectedIcon)}/>

      <h2 className="text-2xl font-semibold text-center text-purple-700">Add Income</h2>

      {/* Income Source */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Income Source</label>
        <input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Freelance, Salary, etc."
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
        <input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          type="number"
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
        <input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
