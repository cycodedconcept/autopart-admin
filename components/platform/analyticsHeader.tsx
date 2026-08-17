import React, { useState } from 'react';

const AnalyticsHeader: React.FC = () => {
  // State to track the currently selected day/time pill range
  const [activeRange, setActiveRange] = useState<string>('50d');

  const ranges = [
    { label: '7d', value: '7d' },
    { label: '50d', value: '50d' },
    { label: '90d', value: '90d' },
    { label: '1y', value: '1y' }
  ];

  return (
    <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 ">
      {/* Platform Text Left Element */}
      <div className=''>
        <h1 className="text-lg font-medium text-dark  tracking-tight">Platform Analytics</h1>
        <p className="text-sm text-navgray mt-0.5">Overview of marketplace performance</p>
      </div>

      {/* Days Pill Picker & Actions Right Element */}
      <div className="flex items-center gap-3 self-stretch sm:self-auto">
        {/* Days Pill Selector Grid */}
        <div className="flex p-1 gap-4">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => setActiveRange(range.value)}
              className={`px-3 py-1 text-sm cursor-pointer font-medium rounded-full transition-all duration-200 border border-lightborder ${
                activeRange === range.value
                  ? 'bg-aorange text-white '
                  : 'text-navgray bg-white hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Action Export Button */}
        {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm">
          {/* Simple Tray Download Icon Wireframe 
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export</span>
        </button> */}
      </div>
    </section>
  );
};

export default AnalyticsHeader;
