import axios from "axios";
import { getSession } from "next-auth/react";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Add any additional headers as needed
  },
});

API.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();

    if (
      session?.user?.user?.access_token &&
      session?.user.expires &&
      new Date(session.user.user?.expires) > new Date()
    ) {
      config.headers[
        "Authorization"
      ] = `Bearer ${session?.user?.user?.access_token}`;
    } else if (session?.user?.user?.refresh_token) {
      config.headers[
        "Authorization"
      ] = `Bearer ${session?.user?.user?.refresh_token}`;
    }
  } catch (error) {
    // Handle the error, if any, when fetching the session
    console.error("Error fetching session:", error);
  }

  return config;
});

export default API;
