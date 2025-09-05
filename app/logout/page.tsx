'use client';

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false });
      const resolvedParams = await params;

      router.push(`/${resolvedParams.locale}`);
    };

    handleLogout();
  }, [router, params]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#000010] overflow-hidden">
      <p className="z-10 text-md font-light text-white tracking-wide">
        Logout...
      </p>
    </div>
  );
}