"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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
  login: (token: string, user: User) => Promise<void>;
  logout: () => void;
  checkAuthState: () => Promise<void>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const login = useCallback(
    async (token: string, userData: User): Promise<void> => {
      console.log("Login function called");
      try {
        const decodedToken: any = jwtDecode(token);
        setIsAuthenticated(true);
        setUser(userData);
        Cookies.set("token", token);
        Cookies.set("token_exp", (decodedToken.exp * 1000).toString());
        console.log("Authentication state updated");
        router.push(`/${locale}/services`);
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    [router, locale]
  );

  const logout = useCallback((): void => {
    console.log("Logout function called");
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("token_exp");
    router.push(`/${locale}`);
  }, [router, locale]);

  const checkAuthState = useCallback(async (): Promise<void> => {
    console.log("Checking auth state...");
    const token = Cookies.get("token");
    const tokenExp = Cookies.get("token_exp");

    if (token && tokenExp && parseInt(tokenExp) > Date.now()) {
      console.log("Token is valid and not expired");
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
      setIsAuthenticated(false);
      setUser(null);

      const publicPaths = [
        `/${locale}`,
        `/${locale}/login`,
        `/${locale}/register`,
        `/${locale}/reset-password`,
      ];
      const adminPaths = [
        `/${locale}/admin/dashboard`,
        `/${locale}/admin/services`,
        `/${locale}/admin/users`,
      ];

      if (!publicPaths.includes(pathname) && !adminPaths.includes(pathname)) {
        router.push(`/${locale}/login`);
      }
    }
  }, [logout, router, locale, pathname]);

  useEffect(() => {
    console.log("AuthProvider mounted");
    checkAuthState();
    const interval = setInterval(checkAuthState, 1000 * 60);
    return () => {
      console.log("AuthProvider unmounted");
      clearInterval(interval);
    };
  }, [checkAuthState]);

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
