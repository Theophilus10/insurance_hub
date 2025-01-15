import { UserLoginResponse } from "@app/types/AuthResponse";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface LoggedInUserData {
  email: string;
  password: string;
}

async function login(
  email: string,
  password: string
): Promise<LoggedInUserData> {
  try {
    const response = await axios.post<LoggedInUserData>(
      "http://localhost:4000/users/sign_in",
      {
        user: { email, password },
      }
    );

    if (!response.data) {
      throw new Error("Empty response");
    }

    return response.data;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    // signOut: "/login",
    // error: "/login",
    // verifyRequest: "",
    // newUser: "",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string>) {
        const { email, password } = credentials;
        try {
          const user = await login(email, password);
          return user;
        } catch (err) {
          // console.log("Error:", err);
          return null;
        }
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token = { ...token, user };
        token.user = user;
        console.log("JWT Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
        session.expires = token.expires;
      }
      return session;
    },
    // async redirect(url, baseUrl) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    // async redirect({ url, baseUrl }) {
    //   return "/private/dashboard";
    // },
  },
};
