import React from 'react';


const History = () => {
  return (
    <div className="row-start-2 col-start-2 overflow-y-auto p-6 bg-offWhite flex flex-col gap-6">
        {/* <Portfolio /> */}
        <div className="space-y-6">
        {/* Page Title and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
            <h2 className="text-2xl font-bold text-darkGreen">Your Portfolio History</h2>
            <p className="text-sm text-gray-600 mt-1">
                Explore all your previously generated plans, their performance, and projected outcomes.
            </p>
            </div>
            <div className="flex gap-4 flex-wrap">
            <select className="border border-gray-300 rounded-md px-4 py-2 text-sm text-darkGreen">
                <option>Risk Appetite</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 text-sm text-darkGreen">
                <option>Goal Type</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 text-sm text-darkGreen">
                <option>Sort By</option>
            </select>
            </div>
        </div>

        <div className="flex flex-wrap gap-6">
        {[1, 2, 3].map((_, i) => (
            <div
            key={i}
            className="bg-white w-full sm:w-[48%] lg:w-[32%] rounded-xl shadow-sm p-6 flex flex-col gap-6"
            >
            {/* Left Section: Plan Info */}
            <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg text-darkGreen">Retirement plan</h3>
                <p className="text-xs text-gray-500">July 19, 2025</p>
                <ul className="text-sm text-gray-700 space-y-1">
                <li>Goal: Retirement</li>
                <li>Investment: £10,000</li>
                <li>Risk Appetite: Moderate</li>
                <li>Forecasted Value: £13,800 by 2030</li>
                <li>Portfolio Score: 745/1000</li>
                </ul>
                <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>Risk Match: 10/10</li>
                <li>Downside Protection: 5.3/10</li>
                <li>Risk-adjusted return: 5.1/10</li>
                <li>Simulated CAGR: 6.8% (5 years)</li>
                </ul>
                <div className="flex gap-4 pt-4 items-center justify-center flex-wrap">
                <button className="bg-lightGreen text-white px-4 py-2 rounded-full text-sm font-semibold">View</button>
                <button className="bg-green-200 text-darkGreen px-4 py-2 rounded-full text-sm font-semibold">Relive</button>
                <button className="bg-red-200 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">Delete</button>
                </div>
            </div>
            </div>
        ))}
        </div>

            {/* Middle Section: Donut Chart Placeholder */}
            {/* <div className="w-full lg:w-[200px] flex flex-col items-center justify-center">
                <h4 className="text-sm text-gray-600 mb-2">Asset Allocation</h4>
                <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">Chart</span>
                </div>
                <ul className="text-xs text-gray-600 mt-2">
                <li><span className="inline-block w-2 h-2 rounded-full bg-darkGreen mr-1"></span> ETFs</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span> Stocks</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-green-200 mr-1"></span> FX</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-pink-300 mr-1"></span> Crypto</li>
                <li><span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span> Cash</li>
                </ul>
            </div> */}

            {/* Right Section: Performance Graph Placeholder */}
            {/* <div className="flex-1">
                <h4 className="text-sm text-gray-600 mb-2">Performance Chart <span className="text-green-600 font-semibold ml-2">+£3,800</span></h4>
                <div className="w-full h-[120px] bg-gradient-to-r from-green-100 to-white rounded-md flex items-center justify-center">
                <span className="text-xs text-gray-500">Line Chart</span>
                </div>
            </div> */}
            
       
        </div>

    </div>
  );
};

export default History;
