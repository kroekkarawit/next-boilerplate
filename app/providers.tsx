"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/modalContext";

import BalanceUpdater from "./components/balanceUpdater";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

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
