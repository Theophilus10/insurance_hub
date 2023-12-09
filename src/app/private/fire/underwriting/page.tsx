"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.replace("/private/marine/underwriting/single_transit_policies");
};

export default page;
