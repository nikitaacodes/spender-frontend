import { useState } from "react";
import Content from "../components/dashboard/Content";
import Lock from "../components/dashboard/Lock";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");

  const handleUnlock = () => {
    // TEMP — later this will call /auth/login
    setIsAuthenticated(true);
  };

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-inkblack text-white">
      <div
        className={`transition-all duration-300 ${
          !isAuthenticated ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
        <Content />
      </div>

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
