"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/UserContext";

import BalanceUpdater from "@/components/balanceUpdater";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider basePath="/api/auth">
      <UserProvider>
        <BalanceUpdater />
        {children}
        <Toaster />
      </UserProvider>
    </SessionProvider>
  );
}
