"use client";
import { User } from "next-auth";
// import Api from "@app/app/api/axios/useAxios";
import { useSession } from "next-auth/react";
// import React, { useEffect } from "react";

const useUser = () => {
  const { data: session, status } = useSession();
  const user = session?.user.user as User;

  // console.log('user here',user)

  return { user, status };
};

export default useUser;
