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
    const location = window.location.href;

    if (
      (status === "authenticated" && location.endsWith("/")) ||
      location.endsWith("/private")
    ) {
      router.replace("/private/dashboard");
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);
  return children;
};
