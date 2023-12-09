"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.replace("/private/marine/user_management/users");
};

export default page;
