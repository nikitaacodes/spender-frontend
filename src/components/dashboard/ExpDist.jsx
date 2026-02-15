import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

const ExpDist = ({ byCategory }) => {
  const pieData = byCategory
    .map((cat) => ({
      name: cat.category,
      value: Number(cat.total),
    }))
    .filter((d) => d.value > 0);

  return (
    <div className="my-4 w-100 px-10 py-2 rounded-2xl h-70 bg-white">
      <div className=" flex flex-row justify-between">
        <span className="py-1 text-[22px] text-gray-700 font-montserrat font-semibold">
          Expense Distribution
        </span>
      </div>

      <div className="px-5 py-2 border border-gray-300">
        <div className="w-50 h-50">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpDist;
