import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import toast from "react-hot-toast";
import { LuPlus, LuDownload, LuWallet, LuTarget } from "react-icons/lu";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully!!");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadIncomeDetails = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Income Details", 14, 22);
    const tableColumn = ["Source", "Amount", "Date"];
    const tableRows = incomeData.map((income) => [
      income.source,
      `₹ ${income.amount}`,
      new Date(income.date).toLocaleDateString("en-IN", {
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
    doc.save("income-details.pdf");
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  const [showGoalForm, setShowGoalForm] = useState(false);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-blue-50">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-blue-900 tracking-tight flex items-center gap-3">
              <LuWallet className="text-blue-600" />
              Income <span className="text-blue-500">Stream</span>
            </h1>
            <p className="text-blue-400 mt-1.5 font-medium text-lg">
              Monitor and calibrate your financial inflows.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            <button 
              onClick={handleDownloadIncomeDetails}
              className="secondary-btn !py-3 !px-6"
            >
              <LuDownload /> 
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="add-btn !py-3 !px-6 shadow-blue-500/20"
            >
              <LuTarget /> 
              <span>{showGoalForm ? "Close Goal" : "Set Goal"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            showGoalForm={showGoalForm}
            setShowGoalForm={setShowGoalForm}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income entry?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;

