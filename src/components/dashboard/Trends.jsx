import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Trends = ({ trendRange, setTrendRange, trendData }) => {
  return (
    <div className="w-full rounded-2xl bg-white lg:w-[500px]">
      <div className="px-2 rounded-2xl outline-none">
        <div className="flex flex-col items-start gap-3 px-2 py-4 lg:flex-row lg:items-center lg:justify-between">
          <span className="px-2 text-[22px] font-montserrat font-semibold text-gray-700">
            Expense Trend
          </span>

          <div className="flex w-full gap-2 lg:w-auto lg:gap-3">
            {["daily", "weekly", "monthly"].map((r) => (
              <button
                key={r}
                onClick={() => setTrendRange(r)}
                className={`flex-1 rounded-md px-2 py-1 text-sm lg:flex-none lg:px-3 ${
                  trendRange === r
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {trendData?.length === 0 ? (
          <p className="text-sm text-gray-400 px-2">No data</p>
        ) : (
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
