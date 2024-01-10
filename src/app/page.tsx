"use client";
import { useEffect, useLayoutEffect, useState } from "react";

import userContext from "@app/context/userContext";
import FullPageLoader from "@app/components/layout/fullPageLoader";

export default function Home() {
  const { status } = userContext();

  return status === "loading" ? <FullPageLoader /> : null;
}
