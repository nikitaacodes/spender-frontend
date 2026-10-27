import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Calendar as CalendarIcon,
} from "lucide-react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Calculates visual style (background, text color, borders, shadow) for a date circle
 * based on expense amount and the active range [minExpense, maxExpense].
 */
export function getExpenseHeatStyle(amount, minExpense, maxExpense, customCap = null) {
  if (!amount || amount <= 0) {
    return {
      backgroundColor: "#f8fafc",
      color: "#94a3b8",
      borderColor: "#f1f5f9",
      boxShadow: "none",
      isExpense: false,
      intensity: 0,
      textColorClass: "text-slate-400 font-normal",
    };
  }

  const effectiveMin = minExpense > 0 ? minExpense : 0;
  const effectiveMax = customCap && customCap > 0 ? customCap : Math.max(maxExpense, effectiveMin + 1);

  let ratio = 0.5;
  if (effectiveMax > effectiveMin) {
    ratio = Math.min(Math.max((amount - effectiveMin) / (effectiveMax - effectiveMin), 0), 1);
  } else if (amount >= effectiveMax) {
    ratio = 1;
  }

  // Non-linear power curve (0.65) ensures that smaller variations (e.g. 5 vs 10)
  // are visibly distinct even when large outliers exist.
  const curved = Math.pow(ratio, 0.65);
  // Intensity ranges from 0.15 (soft light pink) to 1.0 (deep crimson)
  const intensity = 0.15 + curved * 0.85;

  // Interpolate RGB from soft light rose (254, 226, 226) -> #fee2e2
  // to deep vibrant red (220, 38, 38) -> #dc2626
  const r = Math.round(254 - (254 - 220) * curved);
  const g = Math.round(226 - (226 - 38) * curved);
  const b = Math.round(226 - (226 - 38) * curved);

  const isDarkBg = intensity >= 0.52;
  const textColor = isDarkBg ? "#ffffff" : "#991b1b";

  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    color: textColor,
    borderColor: isDarkBg ? "transparent" : "rgba(239, 68, 68, 0.28)",
    boxShadow:
      intensity >= 0.8
        ? "0 3px 10px rgba(220, 38, 38, 0.35)"
        : intensity >= 0.5
          ? "0 2px 6px rgba(220, 38, 38, 0.2)"
          : "none",
    isExpense: true,
    intensity,
    curved,
    ratio,
    textColorClass: isDarkBg ? "text-white font-bold" : "text-red-900 font-semibold",
  };
}

const Calender = ({
  year: propYear,
  month: propMonth,
  data = {},
  defaultRangeCap = null,
}) => {
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => {
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }, [today]);

  const [activeDate, setActiveDate] = useState(() => {
    const y = typeof propYear === "number" ? propYear : today.getFullYear();
    const m = typeof propMonth === "number" ? propMonth : today.getMonth();
    return new Date(y, m, 1);
  });

  const [customCap, setCustomCap] = useState(defaultRangeCap);
  const [showRangeControls, setShowRangeControls] = useState(false);
  const [hoveredDateInfo, setHoveredDateInfo] = useState(null);

  const currentYear = activeDate.getFullYear();
  const currentMonth = activeDate.getMonth();

  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Calculate monthly stats and dynamic range
  const { minExpense, maxExpense, averageExpense, totalMonthExpense, positiveDaysCount } =
    useMemo(() => {
      const positiveAmounts = [];
      let total = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const amount = Number(data?.[key] ?? 0);
        if (amount > 0) {
          positiveAmounts.push(amount);
          total += amount;
        }
      }

      const count = positiveAmounts.length;
      return {
        minExpense: count > 0 ? Math.min(...positiveAmounts) : 0,
        maxExpense: count > 0 ? Math.max(...positiveAmounts) : 0,
        averageExpense: count > 0 ? total / count : 0,
        totalMonthExpense: total,
        positiveDaysCount: count,
      };
    }, [data, currentYear, currentMonth, daysInMonth]);

  const activeMaxRange = customCap && customCap > 0 ? customCap : maxExpense;

  const handlePrevMonth = () => {
    setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setHoveredDateInfo(null);
  };

  const handleNextMonth = () => {
    setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setHoveredDateInfo(null);
  };

  const handleJumpToToday = () => {
    setActiveDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setHoveredDateInfo(null);
  };

  const isCurrentMonthView =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const monthName = activeDate.toLocaleString("default", { month: "long" });

  // Preset range caps for quick selection
  const RANGE_PRESETS = [
    { label: "Auto", value: null },
    { label: "₹500", value: 500 },
    { label: "₹1,000", value: 1000 },
    { label: "₹2,500", value: 2500 },
    { label: "₹5,000", value: 5000 },
  ];

  return (
    <div className="w-full max-w-[340px] rounded-[22px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <CalendarIcon className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-montserrat text-base font-bold text-gray-800 leading-tight">
              {monthName} {currentYear}
            </h3>
            <p className="text-[11px] text-gray-400">
              {positiveDaysCount > 0
                ? `${positiveDaysCount} active ${positiveDaysCount === 1 ? "day" : "days"} • ₹${totalMonthExpense.toLocaleString("en-IN")}`
                : "No expenses recorded"}
            </p>
          </div>
        </div>

        {/* Navigation & Range Toggle */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowRangeControls((prev) => !prev)}
            title="Configure Expense Range"
            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
              showRangeControls || customCap
                ? "border-red-300 bg-red-50 text-red-600"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={handlePrevMonth}
            title="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            title="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Range Configuration Panel */}
      {showRangeControls && (
        <div className="mb-3 rounded-xl border border-red-100 bg-red-50/60 p-3 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Expense Range Threshold</span>
            {customCap && (
              <button
                type="button"
                onClick={() => setCustomCap(null)}
                className="flex items-center gap-1 text-[11px] font-medium text-red-600 hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mb-2">
            Set max scale cap to control redness intensity across dates:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {RANGE_PRESETS.map((preset) => {
              const isSelected =
                preset.value === null ? customCap === null : customCap === preset.value;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCustomCap(preset.value)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                    isSelected
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-red-100 hover:bg-red-100/50"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2 text-center text-[11px] font-semibold text-gray-400">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5 place-items-center">
        {/* Empty cells before month start */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 w-9" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const amount = Number(data?.[key] ?? 0);
          const isToday = key === todayKey;

          const heatStyle = getExpenseHeatStyle(amount, minExpense, maxExpense, customCap);

          return (
            <div
              key={key}
              onMouseEnter={() =>
                setHoveredDateInfo({
                  key,
                  day,
                  amount,
                  isToday,
                  dateObj: new Date(currentYear, currentMonth, day),
                  heatStyle,
                })
              }
              onMouseLeave={() => setHoveredDateInfo(null)}
              className="relative flex items-center justify-center"
            >
              <div
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-all duration-150 hover:scale-110 hover:z-10 ${
                  isToday ? "ring-2 ring-blue-500 ring-offset-2" : ""
                }`}
                style={{
                  backgroundColor: heatStyle.backgroundColor,
                  color: heatStyle.color,
                  border: heatStyle.borderColor,
                  boxShadow: heatStyle.boxShadow,
                }}
              >
                {day}
              </div>

              {/* Indicator dot for today if not already highlighted */}
              {isToday && (
                <span className="pointer-events-none absolute -bottom-1 h-1 w-1 rounded-full bg-blue-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Hover Info Card / Tooltip */}
      <div className="mt-3 min-h-[46px] rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 text-xs transition">
        {hoveredDateInfo ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                <span>
                  {hoveredDateInfo.dateObj.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {hoveredDateInfo.isToday && (
                  <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-700">
                    Today
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                {hoveredDateInfo.amount > 0 ? (
                  hoveredDateInfo.amount === maxExpense ? (
                    <span className="text-red-600 font-medium">🔥 Highest day</span>
                  ) : hoveredDateInfo.amount > averageExpense ? (
                    <span className="text-orange-600 font-medium">Above average</span>
                  ) : (
                    <span className="text-emerald-600 font-medium">Moderate spending</span>
                  )
                ) : (
                  "No expense recorded"
                )}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">
                ₹{hoveredDateInfo.amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px]">Hover a date circle to see details</span>
            {!isCurrentMonthView && (
              <button
                type="button"
                onClick={handleJumpToToday}
                className="text-[11px] font-medium text-blue-600 hover:underline"
              >
                Jump to Today
              </button>
            )}
          </div>
        )}
      </div>

      {/* Visual Range Legend */}
      <div className="mt-3 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
          <span>Range Scale:</span>
          <span className="font-medium text-gray-700">
            {minExpense > 0
              ? `₹${minExpense.toLocaleString("en-IN")} — ₹${activeMaxRange.toLocaleString("en-IN")}`
              : "₹0"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-medium text-gray-400">None</span>
          <div className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-full border border-gray-200 bg-[#f8fafc]"
              title="₹0 (No expense)"
            />
            <span
              className="h-3 w-3 rounded-full bg-[#fee2e2] border border-red-200"
              title={`Low expense (~₹${minExpense.toLocaleString("en-IN")})`}
            />
            <span
              className="h-3 w-3 rounded-full bg-[#fca5a5]"
              title="Moderate expense"
            />
            <span
              className="h-3 w-3 rounded-full bg-[#f87171]"
              title="High expense"
            />
            <span
              className="h-3 w-3 rounded-full bg-[#dc2626]"
              title={`Peak expense (~₹${activeMaxRange.toLocaleString("en-IN")})`}
            />
          </div>
          <span className="text-[10px] font-medium text-red-600">Peak</span>
        </div>
      </div>
    </div>
  );
};

export default Calender;
