import React, { useEffect, useMemo, useState } from "react";
import Overview from "./Overview";
import TopExp from "./Topexp";
import ExpDist from "./ExpDist";
import Calender from "./Calender";
import Trends from "./Trends";
const Content = ({ onLogout, userName }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [trendRange, setTrendRange] = useState("daily");
  const [trendData, setTrendData] = useState([]);
  const rawBackendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const backendBaseUrl =
    typeof window !== "undefined"
      ? window.location.hostname === "127.0.0.1"
        ? rawBackendUrl.replace("localhost", "127.0.0.1")
        : rawBackendUrl.replace("127.0.0.1", "localhost")
      : rawBackendUrl;

  const handleUnauthorized = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(`${backendBaseUrl}/dashboard/stats`, {
          credentials: "include",
        });

        if (res.status === 401) {
          await handleUnauthorized();
          return;
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    void loadStats();
  }, []);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const res = await fetch(
          `${backendBaseUrl}/dashboard/trends?range=${trendRange}`,
          { credentials: "include" },
        );

        if (res.status === 401) {
          await handleUnauthorized();
          return;
        }

        const data = await res.json();
        setTrendData(
          data.map((row) => ({
            label: row.label,
            total: Number(row.total),
          })),
        );
      } catch (error) {
        console.error("Failed to load dashboard trends:", error);
      }
    };

    void loadTrends();
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
      <div className="flex items-center justify-between gap-4 px-10 py-5">
        <p className="text-[22px] font-montserrat font-bold text-black">
          Hello {userName || "there"} !
        </p>

        {onLogout ? (
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Log out
          </button>
        ) : null}
      </div>

      <div className="w-full px-10">
        <div className="w-full flex flex-row gap-6 ">
          <Overview
            monthly={dashboardData?.monthly}
            lastMonth={dashboardData?.lastMonthRes}
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
