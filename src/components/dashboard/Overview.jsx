import { useState } from "react";

const WaveBackground = ({ variant }) => {
  const isBlue = variant === "blue";
  const id = isBlue ? "spending-wave" : "limit-wave";
  const colors = isBlue
    ? ["#8ddcf5", "#58c7e9", "#3F91AB"]
    : ["#f5aebf", "#ee8fa8", "#9C0D0D"];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[42%] w-full"
      preserveAspectRatio="none"
      viewBox="0 0 600 180"
    >
      <defs>
        <linearGradient id={`${id}-one`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={colors[0]} stopOpacity="0" />
          <stop offset="0.42" stopColor={colors[0]} stopOpacity="0.2" />
          <stop offset="1" stopColor={colors[0]} stopOpacity="0.48" />
        </linearGradient>
        <linearGradient id={`${id}-two`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={colors[1]} stopOpacity="0" />
          <stop offset="0.38" stopColor={colors[1]} stopOpacity="0.16" />
          <stop offset="1" stopColor={colors[1]} stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id={`${id}-three`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={colors[2]} stopOpacity="0" />
          <stop offset="0.45" stopColor={colors[2]} stopOpacity="0.14" />
          <stop offset="1" stopColor={colors[2]} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M0 88 C70 58 112 112 184 86 S300 67 368 91 S490 112 600 72 V180 H0 Z"
        fill={`url(#${id}-one)`}
      />
      <path
        d="M0 116 C76 92 126 132 204 108 S326 92 398 116 S510 136 600 102 V180 H0 Z"
        fill={`url(#${id}-two)`}
      />
      <path
        d="M0 142 C62 122 130 148 212 132 S338 122 420 143 S530 156 600 132 V180 H0 Z"
        fill={`url(#${id}-three)`}
      />
    </svg>
  );
};

const Overview = ({ monthly, lastMonth, backendBaseUrl, onLimitUpdated }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false);
  const [limitInput, setLimitInput] = useState("");
  const [isSavingLimit, setIsSavingLimit] = useState(false);
  const [limitError, setLimitError] = useState("");
  const current = Number(monthly?.total ?? 0);
  const previous = Number(lastMonth?.total ?? 0);
  const limit = Number(monthly?.limit ?? 0);
  const limitCrossed = Boolean(monthly?.limitCrossed);
  const diff = current - previous;
  const percentChange =
    previous === 0
      ? current === 0
        ? 0
        : 100
      : Math.abs((diff / previous) * 100);
  const isIncrease = diff >= 0;

  const openLimitDialog = () => {
    setLimitInput(limit > 0 ? String(limit) : "");
    setLimitError("");
    setOpenMenu(null);
    setIsLimitDialogOpen(true);
  };

  const saveLimit = async (event) => {
    event.preventDefault();
    const amount = Number(limitInput);

    if (!Number.isFinite(amount) || amount <= 0) {
      setLimitError("Enter a limit greater than zero.");
      return;
    }

    setIsSavingLimit(true);
    setLimitError("");

    try {
      const response = await fetch(`${backendBaseUrl}/limit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update limit");
      }

      onLimitUpdated?.(Number(data.monthly_limit ?? amount));
      setIsLimitDialogOpen(false);
    } catch (error) {
      setLimitError(error.message || "Failed to update limit.");
    } finally {
      setIsSavingLimit(false);
    }
  };

  return (
    <div className="p-2 flex flex-col  w-full rounded-2xl bg-white  lg:w-auto  lg:gap-1 lg:px-6">
        <div className=" bg-white text-sm font-bold font-montserrat text-gray-800 lg:text-[18px]">
          Overview
        </div>
        <div className=" h-auto flex flex-row gap-5">
          {/* Spending Box */}
          <div className="min-w-0 flex-1 rounded-2xl lg:h-auto lg:w-auto lg:flex-none">
            <div className="relative mt-2 py-4 flex flex-col gap-5 overflow-hidden rounded-2xl border-2 bg-cyan-50 px-2 lg:px-3">
              <WaveBackground variant="blue" />
              <div className="relative z-10 px-1 flex justify-between font-montserrat  text-gray-800 lg:min-w-55">
                <p className=" text-[16px] font-medium">Total Spending</p>
                <button
                  type="button"
                  aria-label="Open spending options"
                  aria-expanded={openMenu === "spending"}
                  onClick={() =>
                    setOpenMenu((menu) =>
                      menu === "spending" ? null : "spending",
                    )
                  }
                  className="h-5 w-5 rounded-full text-gray-700 hover:bg-gray-100 lg:h-6 lg:w-6"
                >
                  <i className="fa-solid fa-ellipsis-vertical font-black" />
                </button>
                {openMenu === "spending" && (
                  <div className="absolute right-0 top-7 z-10 w-44 rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg">
                    <button
                      type="button"
                      onClick={openLimitDialog}
                      className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
                    >
                      Set monthly limit
                    </button>
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <div className=" flex gap-1">
                  <img
                    src="/rupee.svg"
                    alt="rupee"
                    className="mt-1 h-6 w-6 lg:mt-2 lg:h-10 lg:w-10"
                  />
                  <div className="items-baseline  flex gap-2">
                    <span className="text-xl font-semibold lg:text-[36px]">
                      {monthly?.total ?? 0}
                    </span>
                    <span
                      className={`rounded-sm px-1 text-[10px] lg:px-3 lg:text-[12px] ${
                        isIncrease
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {percentChange}%
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-800 lg:text-[12px]">
                  {isIncrease ? "increased" : "decreased"} from last month
                </p>
              </div>
            </div>
          </div>

          {/* Limit Box */}
          <div className="min-w-0 flex-1 rounded-2xl lg:h-auto lg:w-auto lg:flex-none">
            <div className="py-5 relative mt-2 flex flex-col gap-1 overflow-hidden rounded-2xl bg-red-200 px-2 lg:px-3">
              <WaveBackground variant="pink" />
              <div className="relative z-10 py-1 px-1 flex justify-between font-montserrat text-gray-800 lg:min-w-55">
                <p className="text-[16px] font-medium">
                  {limitCrossed ? "Limit crossed" : "Within limit"}
                </p>
                <button
                  type="button"
                  aria-label="Open limit options"
                  aria-expanded={openMenu === "limit"}
                  onClick={() =>
                    setOpenMenu((menu) => (menu === "limit" ? null : "limit"))
                  }
                  className="h-5 w-5 rounded-full text-gray-700 hover:bg-red-100 lg:h-6 lg:w-6"
                >
                  <i className="fa-solid fa-ellipsis-vertical font-black" />
                </button>
                {openMenu === "limit" && (
                  <div className="absolute right-0 top-7 z-10 w-44 rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg">
                    <button
                      type="button"
                      onClick={openLimitDialog}
                      className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
                    >
                      Edit monthly limit
                    </button>
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <div className="flex gap-1">
                  <img
                    src="/rupee.svg"
                    alt="rupee"
                    className="mt-1 h-6 w-6 lg:mt-2 lg:h-10 lg:w-10"
                  />
                  <div className="items-baseline flex gap-2">
                    <span className="text-xl font-semibold lg:text-[36px]">
                      {limit}
                    </span>
                    <span
                      className={`rounded-sm px-1 text-[10px] lg:px-3 lg:text-[12px] ${
                        limitCrossed
                          ? "bg-red-300 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {limitCrossed ? "crossed" : "safe"}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-800 lg:text-[12px]">
                  {limitCrossed
                    ? `Current spending: ₹${current}`
                    : `Average limit: ₹${limit}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      

      {isLimitDialogOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 p-4">
          <form
            onSubmit={saveLimit}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly limit
              </h2>
              <button
                type="button"
                aria-label="Close monthly limit dialog"
                onClick={() => setIsLimitDialogOpen(false)}
                className="h-7 w-7 rounded-full text-xl text-gray-500 hover:bg-gray-100"
              >
                &times;
              </button>
            </div>
            <label
              className="block text-sm text-gray-600"
              htmlFor="monthly-limit"
            >
              Amount
            </label>
            <input
              id="monthly-limit"
              type="number"
              min="0.01"
              step="0.01"
              value={limitInput}
              onChange={(event) => setLimitInput(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-600"
              autoFocus
            />
            {limitError && (
              <p className="mt-2 text-sm text-red-600">{limitError}</p>
            )}
            <button
              type="submit"
              disabled={isSavingLimit}
              className="mt-4 w-full rounded-lg bg-cyan-600 px-3 py-2 font-semibold text-white hover:bg-cyan-700 disabled:opacity-60"
            >
              {isSavingLimit ? "Saving..." : "Save limit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Overview;
