"use client";

import React, { useState } from "react";
import {
  BarChart2,
  Users,
  AlertTriangle,
  Truck,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/images/Logo.png";
import logoSmall from "@/public/images/wheel.png";
import { useMenu } from "@/context/menuContext";
import {
  BicycleIcon,
  BrowserBotIcon,
  FileTextIcon,
  MapPinIcon,
  MegaphoneIcon,
  ProhibitedIcon,
  RefreshIcon,
  SettingsGearIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TagIcon,
  UserSingleIcon,
  WalletIcon,
} from "../atoms/Icons";
import Link from "next/link";

interface SidebarItem {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  active?: boolean;
  badge?: number;
  link: string;
  subTitle?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const navigationSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      {
        icon: BrowserBotIcon,
        label: "Dashboard",
        link: "/dashboard",
        subTitle: "Platform overview",
      },
      {
        icon: BarChart2,
        label: "Platform analytics",
        link: "/platform",
        subTitle: "Platform analytics",
      },
    ],
  },
  {
    title: "Sellers",
   
    items: [
      {
        icon: ShieldCheckIcon,
        label: "Verification queue",
        badge: 7,
        link: "/sellers/verification-queue",
        subTitle: "Verification queue",
      },
      { icon: Users, label: "All sellers", link: "/sellers/all-sellers",
        subTitle: "All sellers"
       },
      {
        icon: ProhibitedIcon,
        label: "Suspended & banned",
        link: "/sellers/suspended",
        subTitle: "Suspended & banned",
      },
      {
        icon: TagIcon,
        label: "Subscription plans",
        link: "/sellers/subscription-plans",
        subTitle: "Subscription plans",
      },
    ],
  },
  {
    title: "Orders",
   
    items: [
      {
        icon: ShoppingCartIcon,
        label: "All orders",
        link: "/orders/all-orders",
        subTitle: "All orders",
      },
      {
        icon: AlertTriangle,
        label: "Disputes",
        badge: 3,
        link: "/orders/disputes",
        subTitle: "Disputes",
      },
      {
        icon: Truck,
        label: "Delivery tracking",
        link: "/orders/delivery-tracking",
        subTitle: "Delivery tracking",
      },
      {
        icon: RefreshIcon,
        label: "Returns management",
        link: "/orders/returns-management",
        subTitle: "Returns management",
      },
    ],
  },
  {
    title: "Users",
  
    items: [
      { icon: UserSingleIcon, label: "Buyers", link: "/users/buyers", subTitle: "Buyers" },
      { icon: BicycleIcon, label: "Riders & logistics", link: "/users/riders",
        subTitle: "Riders & logistics"
       },
      { icon: Lock, label: "Admin accounts", link: "/users/admin",
        subTitle: "Admin accounts"
       },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        icon: WalletIcon,
        label: "Payout approvals",
        badge: 5,
        link: "/finance/payout-approvals",
        subTitle: "Payout approvals",
      },
      {
        icon: FileTextIcon,
        label: "Transaction log",
        link: "/finance/transaction-log",
    subTitle: "Transaction log",

      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        icon: MegaphoneIcon,
        label: "Promotions & featured",
        link: "/platform/promotions",
      },
      {
        icon: MapPinIcon,
        label: "Logistics partners",
        link: "/platform/logistics",
      },
      {
        icon: SettingsGearIcon,
        label: "System settings",
        link: "/platform/settings",
      },
    ],
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const { setShowSidebar } = useMenu();
  const { setActive } = useMenu();

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60 2xl:w-96"
      } border-r border-slate-200 bg-white flex flex-col h-screen shrink-0 sticky top-0`}
    >
      {/* Brand Header */}
      {/* <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="font-semibold text-sm text-slate-800 tracking-tight">AutoParts</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <ChevronLeft size={16} />
        </button>
      </div> */}
      <div className="">
        {collapsed && (
          <div className="flex lg:hidden pt-4 rounded-2xl  items-center justify-center shrink-0">
            <X
              size={25}
              className="text-white rounded-full bg-aorange"
              onClick={() => setShowSidebar(false)}
            />
          </div>
        )}
        <div className="flex items-center gap-2 px-4 py-5 ">
          {!collapsed ? (
            <Image src={logo} alt="" className="w-32" />
          ) : (
            <Image src={logoSmall} alt="" className="w-6" />
          )}

          <button
            onClick={onToggle}
            className="ml-auto text-primary transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {navigationSections.map((section, sIdx) => (
          <div key={sIdx}>
            <p className="px-3 text-[11px] font-medium text-[#99A0AE] uppercase tracking-wider mb-1.5">
              {!collapsed ? section.title : section.title[0]}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item, iIdx) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.link;
                const col = isActive ? "#FF7101" : "#525866";
                return (
                  <Link
                    key={iIdx}
                    href={item.link || "#"}
                    onClick={() => setActive(item.subTitle || item.label)}
                    className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 text-[13px] rounded-md transition-colors relative ${
                      isActive
                        ? "bg-[#FFF4EE] text-aorange font-medium border-l-2"
                        : "text-navgray hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={isActive ? "text-aorange" : "text-navgray"}
                      >
                        <IconComponent size={16} color={col} />
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                          isActive
                            ? "bg-orange-600 text-white"
                            : "bg-orange-500 text-white"
                        } ${collapsed ? "absolute -top-1" : "relative"}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
          <img
            src="/avatar.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-800 truncate">
            Alex Reynolds
          </p>
          <p className="text-[10px] text-slate-400 truncate">
            admin@autoparts.ng
          </p>
        </div>
      </div>
    </aside>
  );
}
