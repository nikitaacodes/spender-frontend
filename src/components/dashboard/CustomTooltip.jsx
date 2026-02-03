import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value, percent } = payload[0];

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4  shadow-md">
      <span className="pr-2 font-montserrat font-semibold text-gray-800 capitalize">
        {name}
      </span>

      <span className="font-montserrat text-sm text-gray-600">
        ₹{Number(value).toLocaleString()}
      </span>

      <p className=" text-center font-montserrat text-xs text-gray-400">
        {(percent * 100).toFixed(1)}%
      </p>
    </div>
  );
};

export default CustomTooltip;
