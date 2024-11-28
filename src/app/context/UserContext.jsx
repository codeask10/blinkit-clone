"use client"
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser[0] || {});
    }
  }, []);


  const login = (newUser) => {
    localStorage.setItem("user", JSON.stringify([newUser]));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }} >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;