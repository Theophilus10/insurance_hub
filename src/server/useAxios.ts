import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export const API = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use(async (config) => {
//   try {
//     const session = await getSession();

//     if (
//       session?.user?.user?.access_token &&
//       session?.user.expires &&
//       new Date(session.user.user?.expires) > new Date()
//     ) {
//       config.headers[
//         "Authorization"
//       ] = `Bearer ${session?.user?.user?.access_token}`;
//     } else if (session?.user?.user?.refresh_token) {
//       config.headers[
//         "Authorization"
//       ] = `Bearer ${session?.user?.user?.refresh_token}`;
//     }
//   } catch (error) {
//     // Handle the error, if any, when fetching the session
//     console.error("Error fetching session:", error);
//   }

//   return config;
// });

// export default API;
