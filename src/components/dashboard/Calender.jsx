import React from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatColor(amount, average) {
  if (!amount) return "#f8fafc";
  if (amount <= average) return "#fde8e8";

  const intensity = Math.min((amount - average) / Math.max(average, 1), 1);
  const greenBlue = Math.floor(245 - intensity * 140);

  return `rgb(255, ${greenBlue}, ${greenBlue})`;
}

const Calender = ({ year, month, data }) => {
  const date = new Date(year, month, 1);
  const startDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const values = Object.values(data || {}).map(Number);
  const averageExpense =
    values.length > 0
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0;

  const cells = [];

  // empty cells before month start
  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`e-${i}`} />);
  }

  // actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const amount = Number(data?.[key] ?? 0);
    const isAboveAverage = amount > averageExpense;

    cells.push(
      <div
        key={key}
        className="flex items-center justify-center rounded-full text-xs font-medium"
        style={{
          backgroundColor: getHeatColor(amount, averageExpense),
          width: 40,
          height: 40,
          color: isAboveAverage ? "#991b1b" : "#334155",
        }}
        title={`₹${amount}`}
      >
        {day}
      </div>,
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 w-[320px]">
      <div className="text-center font-semibold mb-3">
        {new Date(year, month).toLocaleString("default", { month: "long" })}
      </div>

      <div className=" grid grid-cols-7 text-xs text-gray-400 mb-2">
        {days.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{cells}</div>
    </div>
  );
};

export default Calender;
