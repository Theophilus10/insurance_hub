import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import "./styles.css";
import { cn } from "@app/lib/utils";
import "iconify-icon";
import Nprogressprovider from "@app/providers/Nprogress";
import NextAuthProvider from "@app/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{ maxWidth: "100%" }}
          toastOptions={{
            // Define default options
            className: "truncate pr-4 text-sm",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 4000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 6000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        <NextAuthProvider>
          <Nprogressprovider>{children}</Nprogressprovider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
