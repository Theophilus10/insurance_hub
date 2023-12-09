"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.replace("/private/marine/reporting/pending_policies");
};

export default page;
