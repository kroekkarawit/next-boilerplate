"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { generateColorFromString } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../i18n/index"

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
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const navItems = [
    { name: t('navbar.navigation.home'), href: "/" },
    { name: t('navbar.navigation.about'), href: "/about" },
    { name: t('navbar.navigation.services'), href: "/services" },
    { name: t('navbar.navigation.contact'), href: "/contact" },
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
          ? generateColorFromString(session.user.username, "dark")
          : generateColorFromString("default", "dark"),
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
            className="relative h-8 w-8 rounded-full p-0 overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-white font-medium">{initials}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gradient-to-br from-[#0b0b0b] to-[#1c1c1c] text-gray-300 border border-[#1c1c1c] rounded-lg shadow-lg hover:bg-gray-700" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>{t('navbar.auth.profile')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>{t('navbar.auth.logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5 text-gray-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => changeLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('th')}>
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
          <Link href="/" className="flex items-center">
            {/* <Image
              src="/images/logo.png"
              width={160}
              height={52}
              alt="Logo"
              className="h-12 w-auto md:h-16"
              priority
            /> */}
            <p className="text-2xl font-bold text-white font-mono">Next Boilerplate</p>

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
                  <Button>{t('navbar.auth.login')}</Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle>{t('navbar.auth.login')}</DialogTitle>
                    <DialogDescription>
                      {t('navbar.auth.loginDescription')}
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={() => signIn("google")} className="mt-4">
                    {t('navbar.auth.loginWithGoogle')}
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex justify-end items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-[#0b0b0b] text-gray-300 border border-[#1c1c1c] shadow-md">
                <SheetHeader>
                  <SheetTitle className="text-white">{t('navbar.menu.title')}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-4 space-y-4">
                  <div className="flex flex-row space-x-2 justify-between items-center">
                    <NavItems />
                    <LanguageSwitcher />
                  </div>
                  {!session ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gray-700 hover:bg-gray-600">
                          {t('navbar.auth.login')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#1c1c1c] text-white border border-gray-700">
                        <DialogHeader>
                          <DialogTitle>{t('navbar.auth.login')}</DialogTitle>
                          <DialogDescription>{t('navbar.auth.loginDescription')}</DialogDescription>
                        </DialogHeader>
                        <Button onClick={() => signIn("google")} className="mt-4 bg-gray-700 hover:bg-gray-600">
                          {t('navbar.auth.loginWithGoogle')}
                        </Button>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button onClick={() => signOut()} className="bg-red-600 hover:bg-red-500">
                      {t('navbar.auth.logout')}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            {session && <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
}