import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import userContext from "@app/context/userContext";
import FullPageLoader from "./fullPageLoader";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, status } = userContext();
  useEffect(() => {
    // console.log("user", user, status, loading);
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);

  // if (status === "loading") {
  //   return <FullPageLoader />;
  // }

  return user ? children : null;
};

export default PrivateRoute;
