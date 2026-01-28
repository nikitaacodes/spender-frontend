import React from 'react'

const Content = () => {
  return (
    <div className="p-8">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="rounded-xl p-6">Total Spent</div>
        <div className="rounded-xl p-6">This Month</div>
        <div className="rounded-xl p-6">Categories</div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="h-64 rounded-xl">Bar Chart</div>
        <div className="h-64 rounded-xl">Pie Chart</div>
      </div>

      {/* Expense List */}
      <div className="rounded-xl p-6">
        <h2 className="mb-4 text-lg font-semibold">Expenses</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Coffee</span>
            <span>₹120</span>
          </li>
          <li className="flex justify-between">
            <span>Food</span>
            <span>₹350</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Content;
