import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowUpRight, LuArrowDownRight, LuPlus, LuLayoutDashboard } from "react-icons/lu";
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
      <div className="space-y-10">
        {}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-blue-50">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-5xl font-bold text-[#023e8a] tracking-tight flex items-center gap-3">
              Hello, {user?.fullName?.split(' ')[0] || 'User'}
              <span className="hidden sm:inline">👋</span>
            </h1>
            <p className="text-blue-400 mt-1.5 font-medium text-lg">
              Your financial health at a glance.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            <button 
              onClick={() => navigate("/income")}
              className="add-btn !bg-blue-50 !text-blue-600 hover:!bg-blue-100 shadow-none border border-blue-100"
            >
              <LuPlus /> 
              <span>Income</span>
            </button>
            <button 
              onClick={() => navigate("/expense")}
              className="add-btn shadow-blue-500/20"
            >
              <LuPlus /> 
              <span>Expense</span>
            </button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            type="balance"
          />
          <InfoCard
            icon={<LuArrowUpRight />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            type="income"
          />
          <InfoCard
            icon={<LuArrowDownRight />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            type="expense"
          />
        </div>

        {}
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

        {}
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



