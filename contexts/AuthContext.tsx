"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  profilePicture: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now();
    }
    return false;
  });

  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const login = (token: string, userData: User): void => {
    const decodedToken: any = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(userData);
    Cookies.set("token", token);
    Cookies.set("token_exp", (decodedToken.exp * 1000).toString());
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("token_exp");
    router.push(`/`);
  };

  const checkAuthState = async (): Promise<void> => {
    const token = Cookies.get("token");
    const tokenExp = Cookies.get("token_exp");

    if (token && tokenExp && parseInt(tokenExp) > Date.now()) {
      setIsAuthenticated(true);

      try {
        const response = await fetch("/api/auth/user-details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        logout();
      }
    } else {
      if (
        pathname !== `/${locale}` &&
        pathname !== `/${locale}/register` &&
        pathname !== `/${locale}/register` &&
        pathname !== `/${locale}/admin/dashboard` &&
        pathname !== `/${locale}/admin/services` &&
        pathname !== `/${locale}/admin/users`
      ) {
        logout();
      }
    }
  };

  useEffect(() => {
    checkAuthState();
    const interval = setInterval(checkAuthState, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
