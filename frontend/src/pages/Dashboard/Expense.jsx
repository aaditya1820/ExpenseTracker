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
import { toast } from "react-toastify"; 
import { LuPlus, LuDownload } from "react-icons/lu";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

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
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
      if (response.data) {
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
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
      expense.category || expense.source,
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
      <div className="space-y-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Expense <span className="text-purple-600">Log</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Track and optimize your capital outflow.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <button 
              onClick={handleDownloadExpenseDetails}
              className="secondary-btn whitespace-nowrap"
            >
              <LuDownload /> 
              <span>Export Records</span>
            </button>
            <button 
              onClick={() => setOpenAddExpenseModal(true)}
              className="add-btn whitespace-nowrap"
            >
              <LuPlus /> 
              <span>New Expense</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
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
