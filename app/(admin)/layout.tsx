"use client"

import Sidebar from "@/components/layout/sidebar";
import TopHeader from "@/components/layout/topHeader";
import { useMenu } from "@/context/menuContext";
import { MenuProvider } from "@/context/menuProvider";
import { useState } from "react";

 function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const{showSidebar} = useMenu()

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      
        {/* Sidebar */}
        <div
          className={`block absolute top-0 z-20 transition-all duration-300 lg:left-0 lg:relative ${
            showSidebar
              ? "left-0 bg-agray/50 w-full fixed lg:bg-transparent lg:w-auto lg:relative"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar collapsed={open} onToggle={() => setOpen(!open)} />
        </div>

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="p-5 space-y-6 overflow-y-auto">

          {children}
        </main>
      </div>
    </div>
  );
}

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MenuProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </MenuProvider>
  );
};

export default UserLayout