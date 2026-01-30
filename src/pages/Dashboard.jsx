import { useEffect, useState } from "react";
import Content from "../components/dashboard/Content";
import Lock from "../components/dashboard/Lock";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  // 🔹 Improvement 2: auto-unlock if session already exists
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`,
          { credentials: "include" },
        );

        if (res.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("error occured", error);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  // 🔹 Unlock handler
  const handleUnlock = async () => {
    // 🔹 Improvement 1: basic validation
    if (!key || !password) {
      alert("Please enter key and passcode");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/unlock`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ key, password }),
        },
      );

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid key or passcode");
      }
    } catch (error) {
      alert("Unable to connect to server",error);
    }
  };

  // Prevent flash before session check finishes
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-inkblack text-white">
        <p className="opacity-70">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-inkblack text-white">
      {/* Dashboard Content */}
      <div
        className={`transition-all duration-300 ${
          !isAuthenticated ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
        <Content />
      </div>

      {/* Lock Overlay */}
      {!isAuthenticated && (
        <Lock
          keyValue={key}
          password={password}
          onKeyChange={setKey}
          onPasswordChange={setPassword}
          onUnlock={handleUnlock}
        />
      )}
    </div>
  );
};

export default Dashboard;
