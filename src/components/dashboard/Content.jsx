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
    import.meta.env.VITE_BACKEND_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
      ? "https://spender-uxgr.vercel.app"
      : "http://localhost:8000");
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

  const handleLimitUpdated = (amount) => {
    setDashboardData((currentData) =>
      currentData
        ? {
            ...currentData,
            monthly: { ...currentData.monthly, limit: amount },
          }
        : currentData,
    );
  };

  return (
    <div className="relative w-full bg-gray-200 flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-5 lg:px-10">
        {/* hello heading */}
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

      <div className="flex w-full flex-col gap-5 px-4 lg:flex-row lg:px-10">
        {/* 1st row */}
        <div className="flex w-full flex-col gap-5 lg:w-fit">
          <div className="w-full lg:w-fit">
            <Overview
              monthly={dashboardData?.monthly}
              lastMonth={dashboardData?.lastMonthRes}
              backendBaseUrl={backendBaseUrl}
              onLimitUpdated={handleLimitUpdated}
            />
          </div>
          <div className="w-full max-w-[590px] min-w-0 lg:min-w-[40%]">
            <TopExp byCategory={dashboardData?.byCategory || []} />
          </div>
        </div>
        <div className="w-full lg:w-fit">
          {/* 2nd row */}
          <div className="flex w-full flex-col gap-5 lg:w-fit">
            <Trends
              trendRange={trendRange}
              setTrendRange={setTrendRange}
              trendData={trendData}
            />
          </div>

          <div className="w-full lg:w-auto">
            <ExpDist byCategory={dashboardData?.byCategory || []} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <div className="w-full shrink-0 lg:w-auto">
            <Calender
              year={new Date().getFullYear()}
              month={new Date().getMonth()}
              data={calendarData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
