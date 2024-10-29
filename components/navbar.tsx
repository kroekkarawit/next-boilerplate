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
  DialogFooter,
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Locale } from "@/i18n.config";

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
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  const UserMenu = () => {
    const bgColor = useMemo(
      () => session?.user?.username ? generateColorFromString(session.user.username) : generateColorFromString("default"),
      [session?.user?.username]
    );
    const initials = session?.user?.username ? session.user.username.charAt(0).toUpperCase() : "user";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full p-0 overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-white font-medium">{initials}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const LanguageSwitcher = () => {

    const switchLanguage = (locale: Locale) => {
      const path = pathname.split('/').slice(2).join('/');
      router.push(`/${locale}/${path}`);
    };
  

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => switchLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLanguage('th')}>
            ไทย (Thai)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              My Next.js App
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
            <LanguageSwitcher />
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
                  <Button onClick={() => signIn("google")} className="mt-4">
                    Login with Google
                  </Button>
                </DialogContent>
              </Dialog>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <NavItems />
                  <LanguageSwitcher />
                  {!session ? (
                    <Button onClick={() => signIn("google")}>Login</Button>
                  ) : (
                    <>
                      <p className="text-sm font-medium">{session?.user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session?.user?.email}
                      </p>
                      <Button onClick={() => signOut()}>Log out</Button>
                    </>
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