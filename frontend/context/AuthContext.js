import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { api } from "../api/api";

// Create the authentication context with an undefined initial value
const AuthContext = createContext(undefined);

const AuthProvider = ({ children, isAuthPage }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await api.get("/api/auth/me");
      if (response) {
        setAuthState({ isAuthenticated: true, user: response });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  const login = async (data, isSignUp = false) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      if (isSignUp) {
        const response = await api.post("/api/auth/register", payload, true);
        if (response?.token) {
          router.push("/login");
        }
      }else{
      const response = await api.post("/api/auth/login", payload, true);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        fetchUserInfo();
        setAuthState({ isAuthenticated: true, user: response.user });
        router.push("/movies");
      }
    }
    } catch (error) {
      console.log("error", error?.response?.data?.error?.message);
    }
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    router.push("/login");
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthPage) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, isAuthPage]);

  return (
    <AuthContext.Provider
      value={{ ...authState, login, fetchUserInfo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export { AuthProvider, AuthContext, useAuth };
