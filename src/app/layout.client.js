"use client";
import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import UserProvider from "./context/UserContext";
import Footer from "./components/Footer";
import { CommonContext } from "./context/CommonContext";
import { URL } from "../../config";
import BackToTopButton from "./components/BackToTopButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [common, setCommon] = useState({
    organization: [],
    nav: [],
    navigation: [],
  });

  const fetchData = async (path, key) => {
    try {
      const response = await fetch(`${URL}/api/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.status === "SUCCESS") {
        setCommon((prevCommon) => ({
          ...prevCommon,
          [key]: result.data,
        }));
      } else if (result.status === "ERROR") {
        console.error(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error(`Error fetching ${path} data:`, error);
    }
  };
  useEffect(() => {
    fetchData("organization", "organization");
    fetchData("nav", "nav");
    fetchData("navigation", "navigation");
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CommonContext.Provider value={{ common }}>
          <CartProvider>
            <UserProvider>
              <Navbar />
              {children}
              <BackToTopButton />
              <Footer />
            </UserProvider>
          </CartProvider>
        </CommonContext.Provider>
      </body>
    </html>
  );
}
