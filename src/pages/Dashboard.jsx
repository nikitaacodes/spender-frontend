import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("Not opened inside Telegram");
      return;
    }

    tg.ready();
    console.log("telegram webapp detected");
    console.log("initdata len:", tg.initData?.length);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/telegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        initData: tg.initData,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Telegram auth failed");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Auth success:", data);

        localStorage.setItem("x-telegram-user", data.user_id);
      })
      .catch((err) => {
        console.error("❌ Telegram auth error:", err);
      });
  }, []);

  return <div className="text-white">{/* dashboard UI here */}</div>;
};

export default Dashboard;
