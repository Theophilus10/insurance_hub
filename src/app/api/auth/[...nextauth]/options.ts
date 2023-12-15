import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

async function login(username: string, password: string) {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();
    // console.log("data", data);

    if (response.ok && data.access_token) {
      return Promise.resolve({ ...data, username });
    } else {
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return Promise.resolve(null);
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    // signOut: "/login",
    // error: "",
    // verifyRequest: "",
    // newUser: "",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const { username, password } = credentials;
        try {
          const user = await login(username, password);
          return user;
        } catch (err) {
          console.log("Error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
        session.expires = token.expires;
        // console.log('session',session.user)
      }
      return session;
    },
    // async redirect(url: string, baseUrl: string) {
    //   return url.startsWith(baseUrl + "/login") ? "/private/dasboard" : url;
    // },
    // async redirect(url: string, baseUrl: string) {
    //   return url.startsWith(baseUrl + "/login") ? "/private" : url;
    // },
  },
};
