import React from "react";

const TopExp = ({ byCategory }) => {
  const categoryIcons = {
    food: "/bowl.svg",
    travel: "/travel.svg",
    bill: "/bills.svg",
    shopping: "/shopping.svg",
    uncategorized: "/default.svg",
  };

  return (
    <div className="py-2 px-10 rounded-2xl h-80 bg-white">
      {/* header sec */}
      <div className="py-1 flex flex-row justify-between">
        <span className=" text-[22px] text-gray-700 font-montserrat font-semibold">
          Top expenses
        </span>
        <span>view all</span>
      </div>

      <div className="w-50 px-2 py-2 border border-gray-300">
        {byCategory.length > 0 ? (
          byCategory.map((cat) => {
            const icon =
              categoryIcons[cat.category] || categoryIcons.uncategorized;

            return (
              <div
                key={cat.category}
                className="flex flex-row gap-2 text-gray-600 mb-2"
              >
                <img src={icon} className="w-10 h-10" />
                <div className="flex flex-col">
                  <div className="font-montserrat font-semibold text-gray-500 capitalize">
                    {cat.category}
                  </div>

                  <div className="flex flex-row justify-between">
                    <span className="font-montserrat font-semibold text-gray-600">
                      ₹{Number(cat.total).toLocaleString()}
                    </span>
                    <span className="text-green-600 text-sm">↑</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400 px-2">
            No categorized expenses yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TopExp;
