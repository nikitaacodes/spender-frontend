import { useCallback, useEffect, useRef, useState } from "react";
import Content from "../components/dashboard/Content";
import Lock from "../components/dashboard/Lock";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const [keyValue, setKeyValue] = useState("");
  const [password, setPassword] = useState("");
  const [sessionUser, setSessionUser] = useState(null);

  const sessionVerifiedRef = useRef(false);

  const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const backendBaseUrl = typeof window !== "undefined"
    ? (window.location.hostname === "127.0.0.1"
      ? rawBackendUrl.replace("localhost", "127.0.0.1")
      : rawBackendUrl.replace("127.0.0.1", "localhost"))
    : rawBackendUrl;

  const [error, setError] = useState(null);

  const clearCredentials = useCallback(() => {
    setKeyValue("");
    setPassword("");
  }, []);

  const verifySession = useCallback(async () => {
    try {
      const res = await fetch(`${backendBaseUrl}/auth/session`, {
        credentials: "include",
      });

      if (!res.ok) {
        setIsAuthenticated(false);
        setSessionUser(null);

        if (sessionVerifiedRef.current) {
          setSessionExpired(true);
        }
        return;
      }

      const data = await res.json();
      sessionVerifiedRef.current = true;
      setIsAuthenticated(true);
      setSessionExpired(false);
      setSessionUser(data.user_id);
    } catch (err) {
      console.error("Session verification error:", err);
      setIsAuthenticated(false);
      setSessionUser(null);
    } finally {
      setIsCheckingSession(false);
    }
  }, [backendBaseUrl]);

  const handleUnlock = useCallback(async () => {
    setIsUnlocking(true);
    setError(null);

    try {
      const res = await fetch(`${backendBaseUrl}/auth/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key: keyValue, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionVerifiedRef.current = true;
        setIsAuthenticated(true);
        setSessionExpired(false);
        setSessionUser(data.user_id);
        clearCredentials();
      } else {
        setError(data.error || "Invalid key or passcode");
      }
    } catch (err) {
      console.error("Unlock error:", err);
      setError("Failed to connect to authentication server");
    } finally {
      setIsUnlocking(false);
    }
  }, [backendBaseUrl, clearCredentials, keyValue, password]);

  const handleLogout = useCallback(
    async ({ expired = false } = {}) => {
      try {
        await fetch(`${backendBaseUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } finally {
        setIsAuthenticated(false);
        setSessionExpired(expired);
        clearCredentials();
        setSessionUser(null);
        setError(null);
      }
    },
    [backendBaseUrl, clearCredentials],
  );

  useEffect(() => {
    void verifySession();
  }, [verifySession]);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      void verifySession();
    }, 60000);

    return () => globalThis.clearInterval(intervalId);
  }, [isAuthenticated, verifySession]);

  const handleSessionExpiredLogout = useCallback(async () => {
    await handleLogout({ expired: true });
  }, [handleLogout]);

  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-inkblack text-white">
        <p className="text-lg font-medium text-white/80">
          Checking dashboard session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Lock
        keyValue={keyValue}
        password={password}
        onKeyChange={setKeyValue}
        onPasswordChange={setPassword}
        onUnlock={handleUnlock}
        isSubmitting={isUnlocking}
        sessionExpired={sessionExpired}
        error={error}
      />
    );
  }

  return (
    <Content onLogout={handleSessionExpiredLogout} userName={sessionUser} />
  );
};

export default Dashboard;
