"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "../app/context/UserContext";

import { LanguageProvider } from "./language-provider";

import BalanceUpdater from "@/components/balanceUpdater";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider basePath="/api/auth">
      <LanguageProvider>
        <UserProvider>
          <BalanceUpdater />
          {children}
          <Toaster />
        </UserProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
