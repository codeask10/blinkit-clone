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
import { fetchData } from "./api/globalApi";

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

  const fetchCommonData = async () => {
    try {
      const organizationData = await fetchData(`${URL}/api/organization`);
      const navData = await fetchData(`${URL}/api/nav`);
      const navigationData = await fetchData(`${URL}/api/navigation`);

      setCommon({
        organization: organizationData.data,
        nav: navData.data,
        navigation: navigationData.data,
      });
    } catch (error) {
      console.error("Error fetching common data:", error);
      alert("An error occurred while fetching common data.");
    }
  };

  useEffect(() => {
    fetchCommonData();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CommonContext.Provider value={{ common }}>
          <UserProvider>
            <CartProvider>
              <Navbar />
              {children}
              <BackToTopButton />
              <Footer />
            </CartProvider>
          </UserProvider>
        </CommonContext.Provider>
      </body>
    </html>
  );
}
