import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api.js";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  // check if user already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (error) {
        console.error("Auth check failed:", error.message);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      await api.post("/users/login", { username, password });
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
