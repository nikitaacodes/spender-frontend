import React from "react";

const Content = ({ data }) => {
  const { monthly, byCategory } = data || {};
  return (
    <div className="">
      {/* if side col here */}

      <div className="bg-gray-200  flex flex-col">
        {/* hello xyz */}
        <div>
          <p className="px-10 py-5 text-[22px] font-montserrat font-bold text-black">
            Hello xyz!
          </p>
        </div>

        <div className="px-10 bg-white">
          {/* page name  */}
          <div className="flex justify-between py-2">
            <p className=" text-[18px] font-bold font-montserrat text-gray-800">
              {" "}
              Overview
            </p>
            <p> Short options </p>
          </div>

          {/* expense totoal boxes */}
          <div className=" ">
            <div className=" flex flex-wrap gap-5">
              {/* expense box */}
              <div className=" bg-cyan-600 rounded-2xl">
                <div className=" mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-white border-cyan-600 ">
                  {/* income header */}
                  <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                    {" "}
                    <p> Total Spending</p> <p> option</p>{" "}
                  </div>

                  {/* figures */}
                  <div>
                    {" "}
                    <div className="flex justify-start gap-2 items-baseline">
                      <p className="font-montserrat font-semibold text-gray-800 text-[32px]">
                        {" "}
                        ${monthly?.count ?? 0}
                      </p>
                      <div
                        className="text-[12px] h-5 px-3 rounded-sm
                     bg-green-100 text-green-600"
                      >
                        {" "}
                        20%{" "}
                      </div>
                    </div>
                    <div>
                      <p className="font-montserrat text-gray-800 text-[12px]">
                        increased from last month
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
              {/* income box */}
              <div className=" bg-green-500 rounded-2xl">
                <div className=" mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-white border-green-500 ">
                  {/* income header */}
                  <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                    {" "}
                    <p> Total Income</p> <p> option</p>{" "}
                  </div>

                  {/* figures */}
                  <div>
                    {" "}
                    <div className="flex justify-start gap-2 items-baseline">
                      <p className="font-montserrat font-semibold text-gray-800 text-[32px]">
                        {" "}
                        ${monthly?.total ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="font-montserrat text-gray-800 text-[12px]">
                        increased from last month
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
              {/* limits box */}
              <div className=" bg-red-500 rounded-2xl">
                <div className=" mt-2 py-3 px-3 flex flex-col gap-3 rounded-2xl border-2 bg-red-200 border-red-500 ">
                  {/* income header */}
                  <div className="flex justify-between gap-15 font-montserrat text-gray-800 font-normal">
                    {" "}
                    <p> Limits crossed</p> <p> option</p>{" "}
                  </div>

                  {/* figures */}
                  <div>
                    {" "}
                    <div className="flex justify-start gap-2 items-baseline">
                      <p className="font-montserrat font-semibold text-gray-800 text-[32px]">
                        {" "}
                        $900
                      </p>
                      <div
                        className="text-[12px] h-5 px-3 rounded-sm
                     bg-red-300 text-red-600"
                      >
                        {" "}
                        9%{" "}
                      </div>
                    </div>
                    <div>
                      <p className="font-montserrat text-gray-800 text-[12px]">
                        increased from last month
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div> calender</div>
            <div> graph </div>
          </div>
        </div>

        {/* top expense cateogry wise */}
        <div className=" py-2 border border-gray-500 rounded-2xl bg-white">
          {/* header */}
          <div className=" flex flex-row justify-between">
            <span className="px-10 text-[22px] text-gray-700 font-montserrat font-semibold">
              Top expenses
            </span>
            <span>view all</span>
          </div>

          {/* category box */}
          <div className="px-2 py-2 border border-gray-300">
            {byCategory?.length > 0 ? (
              byCategory.map((cat) => (
                <div
                  key={cat.category}
                  className="flex flex-row gap-2 text-gray-600 mb-2"
                >
                  <i>icon</i>

                  <div className="flex flex-col w-full">
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
              ))
            ) : (
              <p className="text-sm text-gray-400 px-2">
                No categorized expenses yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
