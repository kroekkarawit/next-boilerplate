'use client';

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage({ params }: { params: { locale: string } }) {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false });
      router.push(`/${params.locale}`);
    };

    handleLogout();
  }, [router, params.locale]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#000010] overflow-hidden">
      <p className="z-10 text-md font-light text-white tracking-wide">
        Logout...
      </p>
    </div>
  );
}