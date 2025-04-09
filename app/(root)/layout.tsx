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
    <>
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/robot.png" alt="Logo" width={30} height={30} />
          <h3>InterviewPrep</h3>
        </Link>
      </div>
      <div className="root-layout mt-[0]">
        <nav>
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
    </>
  );
};

export default RootLayout;
