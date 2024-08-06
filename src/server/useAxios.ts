// import axios from "axios";
// import { getSession } from "next-auth/react";

// const url = process.env.NEXT_PUBLIC_BASE_URL;

// const API = axios.create({
//   baseURL: url,
//   // withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Set up a request interceptor to attach the token if available
// API.interceptors.request.use(
//   async (config) => {
//     try {
//       // Get session on each request
//       const session = await getSession();
//       const token = session?.user?.token;
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Failed to get session:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up a request interceptor to attach the token if available
API.interceptors.request.use(
  async (config) => {
    try {
      // Get session on each request
      const session = await getSession();
      const token = session?.user?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get session:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up a response interceptor to handle 401 errors and specific error messages
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401
      // error.response.data?.message === "Signature has expired"
    ) {
      console.log(
        "401 error detected with 'Signature has expired', logging out..."
      );

      // Store the current path
      // const pathname = usePathname();
      // const router = useRouter();
      // console.log("Current path:", pathname);

      // Log the user out and redirect
      await signOut({ redirect: false });

      // Redirect to the login page with a callback URL
      // router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
    return Promise.reject(error);
  }
);

export default API;
