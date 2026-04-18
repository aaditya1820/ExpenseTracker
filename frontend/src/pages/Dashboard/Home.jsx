import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuSprout, LuArrowUpRight, LuArrowDownRight, LuPlus } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpences from "../../components/Dashboard/Last30DaysExpences";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        setDashboardData(res.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {user?.fullName?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Your CashSprout overview is ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/income")}
              className="add-btn bg-white text-blue-600 border-gray-200 hover:bg-gray-50"
            >
              <LuPlus /> 
              <span>Add Income</span>
            </button>
            <button 
              onClick={() => navigate("/expense")}
              className="add-btn bg-blue-600 text-white border-transparent hover:bg-blue-700"
            >
              <LuPlus /> 
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-white border-gray-100"
          />
          <InfoCard
            icon={<LuArrowUpRight />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-white border-gray-100"
          />
          <InfoCard
            icon={<LuArrowDownRight />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-white border-gray-100"
          />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />
          
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpences
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10">
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};



export default Home;


