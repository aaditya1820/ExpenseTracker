import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuTrendingUp, LuPlus, LuLayoutDashboard } from "react-icons/lu";
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
      <div className="space-y-10 pb-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <LuLayoutDashboard size={12} />
              Command Center
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter leading-tight font-display">
              Greetings, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">{user?.fullName?.split(' ')[0] || 'Nexus'}</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg font-medium max-w-md">
              Your financial nexus is synchronized and performing at optimal capacity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 relative z-10">
            <button 
              onClick={() => navigate("/income")}
              className="add-btn group"
            >
              <LuPlus className="group-hover:rotate-90 transition-transform duration-300" /> 
              <span>Register Income</span>
            </button>
            <button 
              onClick={() => navigate("/expense")}
              className="add-btn add-btn-fill group"
            >
              <LuPlus className="group-hover:rotate-90 transition-transform duration-300" /> 
              <span>Log Expense</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="stats-gradient-1"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Net Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="stats-gradient-2"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Outflow"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="stats-gradient-3"
          />
        </div>

        {/* Analytics & Activity Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
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

        {/* Deep Data Lists */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
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

