"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { getUserData } from "../api/userApi";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      if (token) {
        const data = await getUserData(token);
        setUser(data.data.customer);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [token]);

  const login = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newUser.accessToken);
    setIsLogin(true);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
    setToken("");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setToken(userData.accessToken);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (isLogin && token) {
      fetchUser();
    }
  }, [fetchUser, isLogin, token]);

  return (
    <UserContext.Provider value={{ user, isLogin, token, isLoginModalOpen, setLoginModalOpen, login, logout, }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
