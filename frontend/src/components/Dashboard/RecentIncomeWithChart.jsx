import React, { useEffect , useState} from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { LuTrendingUp } from "react-icons/lu";

const COLORS = ["#0077b6", "#0096c7", "#00b4d8", "#48cae4"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  
  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr || []);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card border border-blue-50">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <LuTrendingUp className="text-blue-500" />
          Income Distribution
        </h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome.toLocaleString()}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;