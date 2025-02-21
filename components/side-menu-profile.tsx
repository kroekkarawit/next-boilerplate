"use client";
import React from "react";
import { Home, User, Star, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SideMenuProfile: React.FC = () => {
  const { data: session } = useSession();

  // Base menu item always available
  const baseMenuItems = [
    { label: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
  ];

  // Additional items that require a user to be logged in.
  const authMenuItems = session
    ? [
        //{ label: "Profile", icon: <User className="h-5 w-5" />, path: "/profile" },
        {
          label: "My Star",
          icon: <Star className="h-5 w-5" />,
          path: "/my-stars",
        },
        // { label: "Affiliate", icon: <Users className="h-5 w-5" />, path: "/affiliate" },
        {
          label: "Logout",
          icon: <LogOut className="h-5 w-5 text-red-500" />,
          path: "/logout",
        },
      ]
    : [
        {
          label: "Sign In",
          icon: <User className="h-5 w-5" />,
          path: "/signin",
        },
      ];

  const menuItems = [...baseMenuItems, ...authMenuItems];

  return (
    <div className="bg-gradient-to-r from-black to-[#060606] text-gray-100 w-full max-w-xs rounded-xl shadow-lg border border-[#1c1c1c]">
      {/* Header */}
      <div className="p-6 border-b border-[#1c1c1c]">
        <h2 className="text-xl font-semibold text-gray-50 tracking-wide uppercase">
          Menu
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-[#1c1c1c] rounded-lg transition-all duration-150 group"
                href={item.path}
              >
                <span className="group-hover:text-cyan-400">{item.icon}</span>
                <span className="text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenuProfile;
