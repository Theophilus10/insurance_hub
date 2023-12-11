"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.replace("/private/general/institution_mgt/institutions");
};

export default page;
