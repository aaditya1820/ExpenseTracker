import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { LuChartBar } from "react-icons/lu";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1 border border-blue-50">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <LuChartBar className="text-blue-500" />
          Monthly Expenses
        </h5>
      </div>
      <div className="min-h-[300px]">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;