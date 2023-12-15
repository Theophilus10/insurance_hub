import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import "./styles.css";
import { cn } from "@app/lib/utils";
import "iconify-icon";
import Nprogressprovider from "@app/providers/Nprogress";
import NextAuthProvider from "@app/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INSURANCE HUB",
  description: "Created by Ecfatum Limited",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("w-screen h-screen overflow-hidden", inter.className)}
      >
        <Nprogressprovider>
          <NextAuthProvider >{children}</NextAuthProvider>
        </Nprogressprovider>
      </body>
    </html>
  );
}
