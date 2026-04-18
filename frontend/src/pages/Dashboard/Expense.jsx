import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import toast from "react-hot-toast";
import { LuPlus, LuDownload, LuReceipt, LuTarget } from "react-icons/lu";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [showLimitForm, setShowLimitForm] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than zero!");
      return;
    }
    if (!date) {
      toast.error("Date is required!");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully!!");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Details", 14, 22);
    const tableColumn = ["Category", "Amount", "Date"];
    const tableRows = expenseData.map((expense) => [
      expense.category,
      `₹ ${expense.amount}`,
      new Date(expense.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("expense-details.pdf");
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-blue-50">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-blue-900 tracking-tight flex items-center gap-3">
              <LuReceipt className="text-blue-600" />
              Expense <span className="text-blue-500">Tracker</span>
            </h1>
            <p className="text-blue-400 mt-1.5 font-medium text-lg">
              Analyze and manage your spending habits.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            <button 
              onClick={handleDownloadExpenseDetails}
              className="secondary-btn !py-3 !px-6"
            >
              <LuDownload /> 
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowLimitForm(!showLimitForm)}
              className="add-btn !py-3 !px-6 shadow-blue-500/20"
            >
              <LuTarget /> 
              <span>{showLimitForm ? "Close Limit" : "Set Limit"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
            showLimitForm={showLimitForm}
            setShowLimitForm={setShowLimitForm}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense entry?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;