const Overview = ({ monthly }) => {
  return (
    <div className="py-1 px-6 rounded-2xl h-60 bg-white flex flex-col gap-5 shrink-0">
      <div className="flex justify-between py-2">
        <p className="bg-white text-[18px] font-bold font-montserrat text-gray-800">
          Overview
        </p>
        <p> Short options </p>
      </div>

      <div className="flex gap-6">

        {/* Spending Box */}
        <div className="h-25 bg-cyan-600 rounded-2xl">
          <div className="mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-white border-cyan-600">
            <div className="flex justify-between font-montserrat text-gray-800">
              <p>Total Spending</p>
              <p>option</p>
            </div>

            <div>
              <div className="flex gap-1">
                <img src="/rupee.svg" className="w-10 h-10" />
                <div className="items-baseline flex gap-2">
                  <span className="font-semibold text-[32px]">
                    {monthly?.total ?? 0}
                  </span>
                  <span className="text-[12px] px-3 bg-green-100 text-green-600 rounded-sm">
                    20%
                  </span>
                </div>
              </div>
              <p className="text-[12px] text-gray-800">
                increased from last month
              </p>
            </div>
          </div>
        </div>

        {/* Limit Box */}
        <div className="h-25 bg-red-500 rounded-2xl">
          <div className="mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-red-200 border-red-500">
            <div className="flex justify-between font-montserrat text-gray-800">
              <p>Limits crossed</p>
              <p>option</p>
            </div>

            <div>
              <div className="flex gap-1">
                <img src="/rupee.svg" className="w-10 h-10" />
                <div className="items-baseline flex gap-2">
                  <span className="font-semibold text-[32px]">
                    900
                  </span>
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
