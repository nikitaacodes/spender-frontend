import { useEffect, useState } from "react";
import Content from "../components/dashboard/Content";
import Lock from "../components/dashboard/Lock";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // session check
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`,
          { credentials: "include" },
        );
        if (res.ok) setIsAuthenticated(true);
      } finally {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  // fetch dashboard data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStats = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`,
        { credentials: "include" },
      );
      const data = await res.json();
      console.log("DASHBOARD DATA:", data);
      setDashboardData(data);
    };

    fetchStats();
  }, [isAuthenticated]);

  if (checkingSession) return <p>Loading…</p>;

  return (
    <>
      <Content data={dashboardData} />
      {!isAuthenticated && <Lock onUnlock={() => setIsAuthenticated(true)} />}
    </>
  );
};

export default Dashboard;
