import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SplashCursor from "../components/SplashCursor.jsx";

const Home = () => {
  return (
    <div className="relative bggradient font-montserrat py-10 px-10 lg:px-20">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#02c8ff85"
      />
      <div className="min-h-screen text-white">
        <div className="flex flex-col">
          <div className="flex mx-auto w-full justify-between items-center gap-1">
            <div className="lg:py-20 md:py-13 mb-16 flex-1">
              <div className="lg:pl-10 pl-4 ">
                <h1 className="lg:text-[48px] text-[36px] font-bold mb-4">
                  Spender
                </h1>
                <p className="w-[50%] lg:text-[22px] text-[18px]">
                  A Telegram-first expense tracker that learns how you think, so
                  you don’t have to categorize every time.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="lg:py-5 py-3">
              <a
                href="https://t.me/spendordev_bot"
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
                  lg:px-8 px-4
                  lg:py-4 py-3
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
            </div>
            <p className="font-bold lg:text-[32px] text-[26px]">
              Stop Tracking Expenses. Start Texting them
            </p>
            <p className="lg:text-[18px] text-[16px]">
              Logs expenses instantly on Telegram and learns how you organize
              money
            </p>
          </div>
        </div>

        <div className="mx-auto  lg:text-center lg:px-20 px-5 lg:py-2 py-1">
          {" "}
          {/* Use cases */}
          <div className="mt-20 mb-16 md:text-start text-left">
            <h2 className="lg:text-2xl text-xl  font-semibold mb-6">
              What Spender helps you do
            </h2>
            <motion.div
              className="space-y-3 "
              initial="hidden"
              whileInView={"visible"}
              variants={{
                hidden: { opacity: 0, y: 0 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
              }}
            >
              <p>• Log expenses instantly from Telegram</p>
              <p>• Avoid thinking while spending</p>
              <p>• Summarize all your junk</p>
              <p>• Review and organize calmly, later</p>
            </motion.div>
          </div>
          {/* How it works */}
          <motion.div
            className=" md:text-end  text-right"
            initial="hidden"
            whileInView={"visible"}
            variants={{
              hidden: { opacity: 0, y: 0 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.2,
              ease: "easeIn",
            }}
          >
            <h2 className="lg:text-2xl text-xl font-semibold mb-6">How it works</h2>
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
          </motion.div>
        </div>

        <div className="text-center">
          <Link to="/dashboard">
            <motion.p
              className="font-medium"
              whileHover={{ scale: 1.01, fontWeight: 550 }}
            >
              View Dashboard
            </motion.p>
          </Link>
          <motion.p className="text-blue-300" whileHover={{ fontWeight: 500 }}>
            Already have Spendor on Telegram?
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Home;
