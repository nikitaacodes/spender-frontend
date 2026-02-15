import React, { useEffect, useMemo, useState } from "react";
import Overview from "./Overview";
import TopExp from "./Topexp";
import ExpDist from "./ExpDist";
import Calender from "./Calender";
import Trends from "./Trends";
const Content = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [trendRange, setTrendRange] = useState("daily");
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDashboardData(data));
  }, []);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/dashboard/trends?range=${trendRange}`,
      { credentials: "include" },
    )
      .then((res) => res.json())
      .then((data) =>
        setTrendData(
          data.map((row) => ({
            label: row.label,
            total: Number(row.total),
          })),
        ),
      );
  }, [trendRange]);

  const calendarData = useMemo(() => {
    if (!dashboardData?.dailyTrend) return {};
    const map = {};
    dashboardData.dailyTrend.forEach((row) => {
      map[row.date] = Number(row.total);
    });
    return map;
  }, [dashboardData]);

  return (
    <div className="w-full bg-gray-200 flex flex-col">
      <div className="px-10 py-5">
        <p className="text-[22px] font-montserrat font-bold text-black">
          Hello xyz!
        </p>
      </div>

      <div className="w-full px-10">
        <div className="w-full flex flex-row gap-6">
          <Overview
            monthly={dashboardData?.monthly}
            lastMonth={dashboardData?.lastMonth}
          />

          <Trends
            trendRange={trendRange}
            setTrendRange={setTrendRange}
            trendData={trendData}
          />

          <div className="shrink-0">
            <Calender
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              data={calendarData}
            />
          </div>
        </div>
      </div>

      <div className="px-10 flex  flex-row gap-10">
        <TopExp byCategory={dashboardData?.byCategory || []} />

        <ExpDist byCategory={dashboardData?.byCategory || []} />
      </div>
    </div>
  );
};

export default Content;
