'use client';

import { useMenu } from '@/context/menuContext';
import { RefreshCw, Download, Bell, Info } from 'lucide-react';

export default function TopHeader() {
  const handleExport = () => {
    // Implement your file export action logic here
    console.log('Exporting overview ledger...');
  };

  const handleSync = () => {
    // Implement state revalidation logic here
    console.log('Revalidating application metrics...');
  };

  const {active} = useMenu();

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200">
      {/* Platform Meta Info */}
      <div>
        <h1 className="text-lg font-bold text-[#0E121B] tracking-tight">{active}</h1>
        <p className="text-xs text-navgray mt-0.5 flex items-center gap-1.5">
          <span>Tuesday, 28 July 2026</span>
          <span className="w-1 h-1 rounded-full bg-navgray"></span>
          <span>Last updated 2 mins ago</span>
        </p>
      </div>

      {/* Global Interface Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={handleSync}
          className="p-2 border border-[#E1E4EA] rounded-md hover:bg-slate-50 text-navgray transition-colors"
          title="Refresh Data"
        >
          <RefreshCw size={15} />
        </button>
        <button 
          // onClick={handleSync}
          className="p-2 border border-[#E1E4EA] rounded-md hover:bg-slate-50 text-navgray transition-colors relative"
          title=""
        >
          <span className="absolute w-2 h-2 top-1 rounded-full bg-aorange"></span>
          <Bell size={15} />
        </button>
        
        <button 
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0E121B] hover:bg-slate-800 text-white rounded-md text-xs font-medium shadow-sm transition-colors"
        >
          <Download size={14} />
          <span>Export report</span>
        </button>
      </div>
    </div>
  );
}
