import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5 max-w-md w-full mx-auto border border-gray-200">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <h2 className="text-2xl font-semibold text-center text-purple-600">
        Add Expense
      </h2>

      {/* Expense Category */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Expense Category
        </label>
        <input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          placeholder="Groceries, Rent, Travel, etc."
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Amount
        </label>
        <input
          value={expense.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          type="number"
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Date
        </label>
        <input
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-all duration-300 shadow-md"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
