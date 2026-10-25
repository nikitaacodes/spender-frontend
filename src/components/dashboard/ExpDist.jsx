import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

const ExpDist = ({ byCategory }) => {
  const pieData = byCategory
    .map((cat) => ({
      name: cat.category,
      value: Number(cat.total),
    }))
    .filter((d) => d.value > 0);
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="my-4 w-full rounded-[20px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:w-[400px]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <i className="fa-solid fa-chart-pie text-lg" aria-hidden="true" />
        </span>
        <span className="font-montserrat text-[20px] font-bold text-gray-800">
          Expense Distribution
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative h-52 w-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
                stroke="none"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-gray-400">Total</span>
            <span className="text-lg font-bold text-gray-800">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="w-full min-w-0">
          {pieData.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {pieData.map((item, index) => {
                const percentage = (item.value / total) * 100;
                return (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center gap-2 py-2 first:pt-0 last:pb-0"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-600">
                      {item.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">
                      ₹{item.value.toLocaleString("en-IN")}
                    </span>
                    <span className="w-10 text-right text-[11px] text-gray-400">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No expense data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpDist;
