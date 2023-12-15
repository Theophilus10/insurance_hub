'use client'
import axios from "axios";
import { useSession } from "next-auth/react";

axios.defaults.baseURL = process.env.NEXTAUTH_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

const Api = axios.create();

Api.interceptors.request.use(async (config) => {
  const { data: session } = useSession();

  

  if (session?.user.access_token) {
    config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
  }

  return config;
});



// Api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // ... (your existing error handling logic)

//     return Promise.reject(error);
//   }
// );

export default Api;
