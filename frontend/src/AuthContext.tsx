import React, { createContext, useContext, useState } from "react";
import apiClient from "./config/axios"; // Use the configured Axios instance

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/users/login", {
        email,
        password,
      }); // Use apiClient
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await apiClient.post("/users/register", { username, email, password }); // Use apiClient
      console.log("Registration successful");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
