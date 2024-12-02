"use client"
import React, { createContext, useState, useEffect } from "react";
import { URL } from "../../../config";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${URL}/api/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': "Bearer 1733118769436670517.zop674d4b315ba35.HNPUX"
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.status === "SUCCESS") {
        setUser(result.data.customer);
      } else {
        console.error("API Error:", result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred while fetching user detail. Please try again.");
    }
  }
  useEffect(() => {
    fetchUserData();
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