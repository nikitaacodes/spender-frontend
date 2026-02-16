import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bggradient font-montserrat py-10 px-10 lg:px-20">
      <div className="min-h-screen text-white">
        <div className="flex flex-col">
          <div className="flex mx-auto w-full justify-between items-center gap-1">
            <div className="mb-16 flex-1">
              <div className="pl-10 ">
                <h1 className="text-[48px] font-bold mb-4">Spender</h1>
                <p className="text-[22px]">
                  A Telegram-first expense tracker that learns how you think, so
                  you don’t have to categorize every time.
                </p>
              </div>
            </div>

            <div className="w-4/7 flex flex-col justify-center items-center">
              <img
                src="/mobile.svg"
                alt="Spendo mobile preview"
                className="w-[100px]h-[200px] "
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="py-5">
              <a
                href="https://t.me/SpendoSave_bot"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-8
                  py-4
                  text-base
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)]
                  transition
                  duration-300
                  hover:bg-blue-700
                  hover:shadow-[0_16px_40px_-12px_rgba(37,99,235,0.8)]
                  active:scale-[0.98]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-400
                  focus-visible:ring-offset-2
                "
              >
                Add Spender to Telegram
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>{" "}
            <p className="font-bold text-[32px]">
              Stop Tracking Expenses. Start Texting them
            </p>
            <p className="text-[18px]">
              Logs expenses instantly on Telegram and learns how you organize
              money
            </p>
          </div>
        </div>

        <div className="mx-auto px-20 py-5">
          {" "}
          {/* Use cases */}
          <section className="mt-20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">
              What Spender helps you do
            </h2>
            <div className="space-y-3">
              <p>• Log expenses instantly from Telegram</p>
              <p>• Avoid thinking while spending</p>
              <p>• Summarize all your junk</p>
              <p>• Review and organize calmly, later</p>
            </div>
          </section>
          {/* How it works */}
          <section className="text-end sm:text-center ">
            <h2 className="text-2xl font-semibold mb-6">How it works</h2>
            <ol className="space-y-4">
              <li>
                <span className="font-medium">1.</span> Add expenses in Telegram
              </li>
              <li>
                <span className="font-medium">2.</span> Spender remembers
                patterns
              </li>
              <li>
                <span className="font-medium">3.</span> Categorize once, forever
              </li>
            </ol>
          </section>
        </div>
        <div className="text-center">
          {" "}
          <Link to="/dashboard">
            {" "}
            <p className="font-medium"> View Dashboard</p>{" "}
          </Link>
          <p className="text-blue-300">
            {" "}
            Already have Spendor on Telegram?{" "}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
