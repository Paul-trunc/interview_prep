"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/lib/auth.action";
import { useRouter } from "next/navigation";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const response = await signOut();
      if (response.success) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">InterviewPrep</h2>
        </Link>
        <button
          onClick={handleSignOut}
          className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md"
          disabled={isLoggingOut} // Disable button during sign-out process
        >
          {isLoggingOut ? "Logging out..." : "Sign Out"}
        </button>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
