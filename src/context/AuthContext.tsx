import Api from "@app/server/useAxios";
import { User } from "@app/types/severTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const initAuth = async () => {
      if (session?.user) {
        try {
          setLoading(true);
          const res = await Api.get("/auth/user");
          console.log("user", res);
          setUser({ ...res.data });
        } catch (err) {
          console.log("Error", err);
        } finally {
          setLoading(false);
        }
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (username: string, password: string) => {
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
      setUser({ ...data });

      if (response.ok && data.access_token) {
        return Promise.resolve({ ...data, username });
      } else {
        return Promise.resolve(null);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return Promise.resolve(null);
    }
  };

  const handleLogout = () => {
    setUser(null);

    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
