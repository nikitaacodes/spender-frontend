import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import Trends from "./Trends";

const Content = ({ data }) => {
  const { monthly, byCategory } = data || {};
  const categoryIcons = {
    food: "/bowl.svg",
    travel: "/travel.svg",
    bill: "/bills.svg",
  };
  const pieData = useMemo(() => {
    if (!Array.isArray(byCategory)) return [];

    return byCategory
      .map((cat) => ({
        name: cat.category,
        value: parseFloat(String(cat.total).replace(/[^0-9.]/g, "")),
      }))
      .filter((d) => Number.isFinite(d.value) && d.value > 0);
  }, [byCategory]);

  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

  const [trendRange, setTrendRange] = useState("daily");
  const [trendData, setTrendData] = useState([]);
  useEffect(() => {
    const fetchTrends = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/trends?range=${trendRange}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        setTrendData([]);
        return;
      }

      const data = await res.json();
      setTrendData(data);
    };

    fetchTrends();
  }, [trendRange]);

  return (
    <div className="">
      {/* if side col here */}

      <div className="bg-gray-200  flex flex-col">
        {/* hello xyz */}
        <div>
          <p className="px-10 py-5 text-[22px] font-montserrat font-bold text-black">
            Hello xyz!
          </p>
        </div>

        <div className="px-10 bg-white">
          {/* page name  */}
          <div className="flex justify-between py-2">
            <p className=" text-[18px] font-bold font-montserrat text-gray-800">
              {" "}
              Overview
            </p>
            <p> Short options </p>
          </div>

          {/* expense totoal boxes */}
          <div className=" ">
            <div className=" flex flex-wrap gap-5">
              {/* expense box */}
              <div className=" bg-cyan-600 rounded-2xl">
                <div className=" mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-white border-cyan-600 ">
                  {/* income header */}
                  <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                    {" "}
                    <p> Total Spending</p> <p> option</p>{" "}
                  </div>

                  {/* figures */}
                  <div>
                    {" "}
                    <div className="flex justify-start gap-1 ">
                      <div className="flex flex-row  ">
                        {" "}
                        <span className="pt-1 ">
                          {" "}
                          <img
                            src="/rupee.svg"
                            alt="rupee"
                            className="w-10 h-10"
                          />
                        </span>
                        <div className="items-baseline flex gap-2">
                          <span className="font-montserrat font-semibold text-gray-800 text-[32px]">
                            {" "}
                            {monthly?.total ?? 0}
                          </span>
                          <span
                            className="text-[12px] h-5 px-3 rounded-sm
                     bg-green-100 text-green-600"
                          >
                            {" "}
                            20%{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-montserrat text-gray-800 text-[12px]">
                        increased from last month
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>

              {/* limits box */}
              <div className=" bg-red-500 rounded-2xl">
                <div className=" mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-red-200 border-red-500 ">
                  {/* income header */}
                  <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                    {" "}
                    <p> Limits crossed</p> <p> option</p>{" "}
                  </div>

                  {/* figures */}
                  {/* figures */}
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

                          <span
                            className="text-[12px] h-5 px-3 rounded-sm
          bg-red-300 text-red-600"
                          >
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

            <div> calender</div>
          </div>
        </div>

        {/* top expense cateogry wise */}
        <div className=" py-2 border border-gray-500 rounded-2xl bg-white">
          {/* header */}
          <div className=" flex flex-row justify-between">
            <span className="px-10 text-[22px] text-gray-700 font-montserrat font-semibold">
              Top expenses
            </span>
            <span>view all</span>
          </div>

          {/* category box */}
          <div className="px-2 py-2 border border-gray-300">
            {byCategory?.length > 0 ? (
              byCategory.map((cat) => {
                const icon =
                  categoryIcons[cat.category] || categoryIcons.uncategorized;

                return (
                  <div
                    key={cat.category}
                    className="flex flex-row gap-2 text-gray-600 mb-2"
                  >
                    <img src={icon} alt={cat.category} className="w-10 h-10" />

                    <div className="flex flex-col w-full">
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

        {/* category pie chart */}
        <div className="w-100 py-2 border border-gray-500 rounded-2xl bg-white">
          {/* header */}
          <div className=" flex flex-row justify-between">
            <span className="px-10 text-[22px] text-gray-700 font-montserrat font-semibold">
              Expense Distribution
            </span>
          </div>

          {/* pie chart */}
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
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[22px] font-montserrat font-semibold text-gray-700">
              Expense Trend
            </span>

            <div className="flex gap-2">
              {["daily", "weekly", "monthly"].map((r) => (
                <button
                  key={r}
                  onClick={() => setTrendRange(r)}
                  className={`px-3 py-1 rounded-lg text-sm ${
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
    </div>
  );
};

export default Content;
