import React from "react";

const TopExp = ({ byCategory }) => {
  const categoryIcons = {
    food: "/bowl.svg",
    fuel: "/fuel.svg",
    travel: "/travel.svg",
    bill: "/bills.svg",
    internet: "/internet.svg",
    shopping: "/shopping.svg",
    rent: "/rent.svg",
    medical: "/medical.svg",
    uncategorized: "/default.svg",
  };
  const categoryBackgrounds = {
    food: "bg-orange-50",
    fuel: "bg-blue-50",
    travel: "bg-violet-50",
    bill: "bg-rose-50",
    internet: "bg-cyan-50",
    shopping: "bg-emerald-50",
    rent: "bg-amber-50",
    medical: "bg-red-50",
    uncategorized: "bg-slate-50",
  };
  const categoryAliases = {
    food: ["food", "meal", "restaurant", "grocery", "groceries"],
    fuel: ["fuel", "petrol", "diesel", "gas"],
    travel: ["travel", "transport", "taxi", "cab", "flight", "train"],
    internet: ["internet", "wifi", "broadband"],
    shopping: ["shopping", "shop", "purchase"],
    rent: ["rent", "lease", "landlord"],
    medical: [
      "medical",
      "clinic",
      "doctor",
      "hospital",
      "pharmacy",
      "medicine",
      "health",
    ],
    bill: ["bill", "utility", "utilities"],
  };

  const resolveCategoryKey = (category) => {
    const normalized = String(category ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, " ");
    const words = new Set(normalized.split(" ").filter(Boolean));

    return (
      Object.entries(categoryAliases).find(([, aliases]) =>
        aliases.some((alias) => words.has(alias)),
      )?.[0] || "uncategorized"
    );
  };

  return (
    <div className="w-full max-w-full min-w-0 rounded-[20px] bg-white p-5 shadow-sm lg:max-w-[38%] lg:min-w-[90%] lg:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat text-[20px] font-semibold text-slate-900">
          Top expenses
        </h2>
        {/* <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          View all
          <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
        </button> */}
      </div>

      <div className="mt-4">
        {byCategory.length > 0 ? (
          byCategory.map((cat) => {
            const categoryKey = resolveCategoryKey(cat.category);
            const icon = categoryIcons[categoryKey];
            const iconBackground = categoryBackgrounds[categoryKey];
            const currentTotal = Number(cat.total ?? 0);
            const previousTotal = Number(cat.previous_total ?? 0);
            const isIncrease = currentTotal >= previousTotal;

            return (
              <div
                key={cat.category}
                className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0 last:pb-0 first:pt-1"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
                >
                  <img
                    src={icon}
                    alt={`${cat.category} category`}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <div className="min-w-0 flex flex-1 flex-col gap-1">
                  <div className="truncate font-montserrat text-sm font-medium capitalize text-slate-500">
                    {cat.category}
                  </div>
                  <span className="font-montserrat text-base font-semibold text-slate-900">
                    ₹{currentTotal.toLocaleString()}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isIncrease ? "text-red-600" : "text-green-600"
                  }`}
                  aria-label={isIncrease ? "Increased" : "Decreased"}
                >
                  {isIncrease ? "↑" : "↓"}
                </span>
              </div>
            );
          })
        ) : (
          <p className="py-3 text-sm text-slate-400">
            No categorized expenses yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TopExp;
