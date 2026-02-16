import { useEffect, useState } from "react";
import Content from "../components/dashboard/Content";
import Lock from "../components/dashboard/Lock";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const [keyValue, setKeyValue] = useState("");
  const [password, setPassword] = useState("");

  const handleUnlock = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ key: keyValue, password }),
    });

    if (res.ok) {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
        credentials: "include",
      });
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) setIsAuthenticated(true);
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDashboardData(data));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Lock
        keyValue={keyValue}
        password={password}
        onKeyChange={setKeyValue}
        onPasswordChange={setPassword}
        onUnlock={handleUnlock}
      />
    );
  }

  return <Content data={dashboardData}  />;
};

export default Dashboard;
