import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("Not opened inside Telegram");
      return;
    }

    tg.ready();

    fetch("/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Telegram auth failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("tele_user_id", data.user_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div className="text-white">{/* dashboard UI here */}</div>;
};

export default Dashboard;
