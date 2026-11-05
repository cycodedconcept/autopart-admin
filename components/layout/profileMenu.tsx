"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const LINKS = [
  // { href: "#", label: "Profile" },
  // { href: "#", label: "Billing" },
  { href: "/settings", label: "Settings" },
];

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("auth-storage")
    router.replace("/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-background"
      >
        <Avatar name={user?.fullName || ""} size="sm" />
        {/* <span className="hidden sm:inline text-sm font-medium text-dark-gray">
          {COMPANY.admin.shortName}
        </span> */}
        <ChevronDown size={16} className="text-agray" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-30 w-48 rounded-xl border border-alight-gray-border bg-white py-1.5 shadow-lg"
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={close}
              className="block px-4 py-2 text-sm text-dark-gray hover:bg-background"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-1 border-t border-alight-gray-border" />
          <button
          onClick={handleSignOut}
            role="menuitem"
            className="block cursor-pointer px-4 py-2 text-sm font-medium text-ared hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
