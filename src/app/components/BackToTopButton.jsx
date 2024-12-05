"use client";
import React, { useState, useEffect } from "react";
import { RiArrowDropUpLine } from "react-icons/ri";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
          aria-label="Back to top"
        >
          <RiArrowDropUpLine className="h-12 w-12" />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
