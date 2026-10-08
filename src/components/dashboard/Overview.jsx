const Overview = ({ monthly, lastMonth }) => {
  const current = Number(monthly?.total ?? 0);
  const previous = Number(lastMonth?.total ?? 0);
  const diff = current - previous;
  const percentChange =
    previous === 0
      ? current === 0
        ? 0
        : 100
      : Math.abs((diff / previous) * 100);
  const isIncrease = diff >= 0;

  return (
    <div className="py-1 px-6 rounded-2xl h-60 bg-white flex flex-col gap-5 shrink-0">
      <div className="flex justify-between py-2">
        <p className="bg-white text-[18px] font-bold font-montserrat text-gray-800">
          Overview
        </p>
        <p>
          {" "}
          
        </p>
      </div>

      <div className="flex gap-6">
        {/* Spending Box */}
        <div className="h-25 bg-cyan-600 rounded-2xl">
          <div className="mt-2 py-3 px-3 flex flex-col gap-1 rounded-2xl border-2 bg-white border-cyan-600">
            <div className="flex min-w-55 justify-between font-montserrat text-gray-800">
              <p>Total Spending</p>
              <p> <i className="fa-solid fa-ellipsis-vertical font-black"></i></p>
            </div>

            <div className="">
              <div className=" flex gap-1">
                <img src="/rupee.svg" alt="rupee" className=" w-10 h-10 mt-2" />
                <div className="items-baseline  flex gap-2">
                  <span className="font-semibold   text-[36px]">
                    {monthly?.total ?? 0}
                  </span>
                  <span
                    className={`text-[12px] px-3 rounded-sm ${
                      isIncrease
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {percentChange}%
                  </span>
                </div>
              </div>
              <p className="text-[12px] text-gray-800">
                {isIncrease ? "increased" : "decreased"} from last month
              </p>
            </div>
          </div>
        </div>

        {/* Limit Box */}
        <div className="h-25 bg-red-500 rounded-2xl">
          <div className="bg-red-200 mt-2 py-3 px-3 flex flex-col gap-1 rounded-2xl border-2 border-red-500">
            <div className="flex min-w-55 justify-between font-montserrat text-gray-800">
              <p>Limits crossed</p>
              <p> <i className="fa-solid fa-ellipsis-vertical font-black"></i></p>
            </div>

            <div>
              <div className="flex gap-1">
                <img src="/rupee.svg" alt="rupee" className="w-10 h-10 mt-2" />
                <div className="items-baseline flex gap-2">
                  <span className="font-semibold text-[36px]">900</span>
                  <span className="text-[12px] px-3 bg-red-300 text-red-600 rounded-sm">
                    9%
                  </span>
                </div>
              </div>

              <p className="text-[12px] text-gray-800">
                increased from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
