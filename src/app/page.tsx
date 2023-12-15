// "use client";
// import { useEffect, useLayoutEffect } from "react";

// import userContext from "@app/context/userContext";
// import { useRouter } from "next/navigation";
// import FullPageLoader from "@app/components/layout/fullPageLoader";

// export default function Home() {
//   const { status } = userContext();
//   const router = useRouter();

//   useLayoutEffect(() => {
//     if (status === "authenticated") {
//       router.replace("/private/dashboard");
//     } else {
//       router.replace("/login");
//     }
//   }, [status, router]);

//   return status === "loading" ? (
//     <FullPageLoader />
//   ) : null;
// }


"use client";
import { useEffect, useLayoutEffect } from "react";

import userContext from "@app/context/userContext";
import { useRouter } from "next/navigation";
import FullPageLoader from "@app/components/layout/fullPageLoader";

export default function Home() {
  const { status } = userContext();
  const router = useRouter();

  useLayoutEffect(() => {
    const handleDocumentReady = () => {
      if (status === "authenticated") {
        router.replace("/private/dashboard");
      } else {
        router.replace("/login");
      }
    };

    if (document.readyState === "complete") {
      handleDocumentReady();
    } else {
      // Show FullPageLoader if the document is not ready
      return () => {
        document.addEventListener("readystatechange", handleDocumentReady);
      };
    }
  }, [status, router]);

  return status === "loading" ? (
    <FullPageLoader />
  ) : null;
}
