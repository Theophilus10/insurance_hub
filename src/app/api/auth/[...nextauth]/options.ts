import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function login(username: string, password: string) {
  // Hardcoded user response
  const hardcodedResponse = {
    // access_token: "hardcoded_access_token",
    username: "obed@gmail.com",
    // Add any other user details you need here
  };

  // Simulate successful login
  if (username === "obed@gmail.com" && password === "password") {
    return Promise.resolve(hardcodedResponse);
  } else {
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
        session.user = token.user;
        session.expires = token.expires;
        // console.log('session',session.user)
      }
      return session;
    },
    // async redirect(url, baseUrl) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async redirect({ url, baseUrl }) {
      // console.log({ url, baseUrl });
      // const session = await getSession();
      // return session && (url === "/" || url === "/login")
      //   ? "/private/dashboard"
      //   : "/login";
      return "/private/dashboard";
    },
  },
};
