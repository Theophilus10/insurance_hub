"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionComponent>{children}</SessionComponent>
    </SessionProvider>
  );
}

const SessionComponent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();
  useLayoutEffect(() => {
    // console.log(window.history.back())
    if (status === "authenticated") {
      // window.history.back();
      router.replace("/private/dashboard");
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);
  return children;
};
