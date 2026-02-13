import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Trends = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-400">No data</p>;
  }
  return (
    <div className="h-40 outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
  );
};

export default Trends;
