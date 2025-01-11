"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { generateColorFromString } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, X, User, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const NavItems = () => (
    <div className="space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  const UserMenu = () => {
    const bgColor = useMemo(
      () =>
        session?.user?.username
          ? generateColorFromString(session.user.username)
          : generateColorFromString("default"),
      [session?.user?.username]
    );
    const initials = session?.user?.username
      ? session.user.username.charAt(0).toUpperCase()
      : "U";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-white font-medium">{initials}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const LanguageSwitcher = () => {
    const switchLanguage = (locale: string) => {
      const path = pathname.split("/").slice(2).join("/");
      router.push(`/${locale}/${path}`);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5 text-gray-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => switchLanguage("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLanguage("th")}>
            ไทย (Thai)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Interact-X
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
            <LanguageSwitcher />
            {session ? (
              <UserMenu />
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Login</Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                      You can login with social.
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={() => signIn("google")} className="mt-4">
                    Login with Google
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-4 space-y-4">
                  <div className="flex flex-row space-x-2 justify-between	 items-center">
                    <NavItems />
                    <LanguageSwitcher />
                  </div>

                  {!session ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Login</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800">
                        <DialogHeader>
                          <DialogTitle>Login</DialogTitle>
                          <DialogDescription>
                            You can login with social.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          onClick={() => signIn("google")}
                          className="mt-4"
                        >
                          Login with Google
                        </Button>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button onClick={() => signOut()}>Log out</Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
