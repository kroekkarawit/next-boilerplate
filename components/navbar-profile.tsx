"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ChevronDown, Home, User, Star, ChevronLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  title: string;
}

const NavbarProfile: React.FC<NavbarProps> = ({ title }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const { data: session } = useSession();

  // Base menu always available (for everyone)
  let menuItems = [
    { label: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
  ];

  // If user is logged in, add additional menu items.
  if (session) {
    menuItems = menuItems.concat([
      // {
      //   label: "Profile",
      //   icon: <User className="h-5 w-5" />,
      //   path: "/profile",
      // },
      {
        label: "My Stars",
        icon: <Star className="h-5 w-5" />,
        path: "/my-stars",
      },
      // {
      //   label: "Affiliate",
      //   icon: <Users className="h-5 w-5" />,
      //   path: "/affiliate",
      // },
    ]);
  }

  return (
    <header className="bg-gradient-to-r from-black to-[#060606] px-6 py-4 flex items-center justify-between border-b border-[#1c1c1c] shadow-md">
      <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] hover:bg-gray-800 text-gray-300 rounded-lg transition-all duration-200"
          onClick={() => router.push("./")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] hover:bg-gray-800 text-gray-300 rounded-lg transition-all duration-200">
                <span className="text-sm font-medium">Menu</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gradient-to-br from-[#0b0b0b] to-[#1c1c1c] text-gray-300 border border-[#1c1c1c] rounded-lg shadow-lg">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-150 ${
                    currentPath === item.path ? "bg-gray-700 text-white" : ""
                  }`}
                  onSelect={() => router.push(item.path)}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] hover:bg-gray-800 text-gray-300 rounded-lg transition-all duration-200"
            onClick={() => signIn("google")}
          >
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default NavbarProfile;
