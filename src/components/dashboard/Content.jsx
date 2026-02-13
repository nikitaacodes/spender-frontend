import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import Trends from "./Trends";
import Calender from "./Calender";

const Content = ({ data }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [trendRange, setTrendRange] = useState("daily");
  const [trendData, setTrendData] = useState([]);

  /* ---------- FETCH DASHBOARD STATS ---------- */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`,
          { credentials: "include" }
        );

        if (!res.ok) return;

        const result = await res.json();
        setDashboardData(result);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };

    fetchDashboard();
  }, []);

  /* ---------- FETCH TRENDS ---------- */
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/trends?range=${trendRange}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          setTrendData([]);
          return;
        }

        const result = await res.json();

        const formatted = result.map((row) => ({
          label: row.label,
          total: Number(row.total),
        }));

        setTrendData(formatted);
      } catch (err) {
        console.error("Trend fetch failed:", err);
        setTrendData([]);
      }
    };

    fetchTrends();
  }, [trendRange]);

  /* ---------- REAL DATA ---------- */
  const monthly = dashboardData?.monthly;
  const byCategory = dashboardData?.byCategory || [];

  const categoryIcons = {
    food: "/bowl.svg",
    travel: "/travel.svg",
    bill: "/bills.svg",
    shopping: "/shopping.svg",
    uncategorized: "/default.svg",
  };

  const pieData = useMemo(() => {
    if (!Array.isArray(byCategory)) return [];

    return byCategory
      .map((cat) => ({
        name: cat.category,
        value: Number(cat.total),
      }))
      .filter((d) => Number.isFinite(d.value) && d.value > 0);
  }, [byCategory]);

  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

  const calendarData = useMemo(() => {
    if (!dashboardData?.dailyTrend) return {};

    const map = {};
    dashboardData.dailyTrend.forEach((row) => {
      map[row.date] = Number(row.total);
    });

    return map;
  }, [dashboardData]);

  return (
    <div className="">
      <div className="bg-gray-200  flex flex-col">

        <div className="px-10 py-5 ">
          <p className="text-[22px] font-montserrat font-bold text-black">
            Hello xyz!
          </p>
        </div>

        <div className="w-full  px-10">
          <div className="w-full flex flex-row gap-6">

            {/* OVERVIEW */}
            <div className="py-1 px-6 rounded-2xl h-60 bg-white flex flex-col gap-5">
              <div className="flex justify-between py-2">
                <p className="bg-white text-[18px] font-bold font-montserrat text-gray-800">
                  Overview
                </p>
                <p> Short options </p>
              </div>

              <div className="flex gap-6">
                <div className="h-25 bg-cyan-600 rounded-2xl">
                  <div className="mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-white border-cyan-600">
                    <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                      <p> Total Spending</p> <p> option</p>
                    </div>

                    <div>
                      <div className="flex justify-start gap-1 ">
                        <div className="flex flex-row">
                          <span className="pt-1 ">
                            <img
                              src="/rupee.svg"
                              alt="rupee"
                              className="w-10 h-10"
                            />
                          </span>
                          <div className="items-baseline flex gap-2">
                            <span className="font-montserrat font-semibold text-gray-800 text-[32px]">
                              {monthly?.total ?? 0}
                            </span>
                            <span className="text-[12px] h-5 px-3 rounded-sm bg-green-100 text-green-600">
                              20%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-montserrat text-gray-800 text-[12px]">
                          increased from last month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LIMIT BOX untouched */}
                <div className="h-25 bg-red-500 rounded-2xl">
                  <div className="mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-red-200 border-red-500">
                    <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                      <p> Limits crossed</p> <p> option</p>
                    </div>

                    <div>
                      <div className="flex justify-start gap-1">
                        <div className="flex flex-row">
                          <span className="pt-1">
                            <img
                              src="/rupee.svg"
                              alt="rupee"
                              className="w-10 h-10"
                            />
                          </span>
                          <div className="items-baseline flex gap-2">
                            <span className="font-montserrat font-semibold text-gray-800 text-[32px]">
                              900
                            </span>
                            <span className="text-[12px] h-5 px-3 rounded-sm bg-red-300 text-red-600">
                              9%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-montserrat text-gray-800 text-[12px]">
                          increased from last month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TREND */}
            <div className="bg-white rounded-2xl">
              <div className="px-2 rounded-2xl outline-none">
                <div className="px-2 flex justify-between items-center py-4">
                  <span className="px-2 text-[22px] font-montserrat font-semibold text-gray-700">
                    Expense Trend
                  </span>

                  <div className="flex gap-3">
                    {["daily", "weekly", "monthly"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setTrendRange(r)}
                        className={`px-3 py-1 rounded-md text-sm ${
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

                <Trends data={trendData} />
              </div>
            </div>

            {/* CALENDAR */}
            <Calender
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              data={calendarData}
            />
          </div>
        </div>

        {/* CATEGORY SECTION — EXACTLY AS YOU WROTE */}
        <div className="py-2 border border-gray-500 rounded-2xl bg-white">
          <div className="flex flex-row justify-between">
            <span className="px-10 text-[22px] text-gray-700 font-montserrat font-semibold">
              Top expenses
            </span>
            <span>view all</span>
          </div>

          <div className="w-50 px-2 py-2 border border-gray-300">
            {byCategory?.length > 0 ? (
              byCategory.map((cat) => {
                const icon =
                  categoryIcons[cat.category] ||
                  categoryIcons.uncategorized;

                return (
                  <div
                    key={cat.category}
                    className="flex flex-row gap-2 text-gray-600 mb-2"
                  >
                    <img src={icon} alt={cat.category} className="w-10 h-10" />
                    <div className="flex flex-col ">
                      <div className="font-montserrat font-semibold text-gray-500 capitalize">
                        {cat.category}
                      </div>

                      <div className="flex flex-row justify-between">
                        <span className="font-montserrat font-semibold text-gray-600">
                          ₹{Number(cat.total).toLocaleString()}
                        </span>
                        <span className="text-green-600 text-sm">↑</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 px-2">
                No categorized expenses yet
              </p>
            )}
          </div>
        </div>

        {/* PIE CHART — EXACTLY SAME */}
        <div className="w-100 py-2 border border-gray-500 rounded-2xl bg-white">
          <div className="flex flex-row justify-between">
            <span className="px-10 text-[22px] text-gray-700 font-montserrat font-semibold">
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

      </div>
    </div>
  );
};

export default Content;
