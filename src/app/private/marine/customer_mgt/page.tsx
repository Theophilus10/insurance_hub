"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.replace("/private/marine/customer_mgt/customers");
};

export default page;
