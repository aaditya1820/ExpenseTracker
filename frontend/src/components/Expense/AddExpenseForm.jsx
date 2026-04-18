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
    <div className="space-y-5">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          Expense Category
        </label>
        <input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          placeholder="Groceries, Rent, Travel, etc."
          type="text"
          className="input-box"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          Amount
        </label>
        <input
          value={expense.amount}
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
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="input-box"
        />
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="add-btn w-full justify-center"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};
export default AddExpenseForm;