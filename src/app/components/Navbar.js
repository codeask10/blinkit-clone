"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Cart from "./Cart";
import Login from "./Login";
import UserDetails from "./UserDetails";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { CommonContext } from "../context/CommonContext";
import BrandLogo from "../assets/img.webp";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { isLogin } = useContext(UserContext);
  const { common } = useContext(CommonContext);
  const { logo } = common?.organization;

  const [isOpen, setOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <>
      <Cart className="relative" open={isOpen} setOpen={setOpen} />
      <div className="w-full fixed top-0 z-10 h-24 flex border-b border-gray-300 bg-white">
        {/* Logo Section */}
        <div className="hidden lg:flex w-2/12 h-full justify-center items-center border-r border-gray-300">
          <Link href="/">
            <Image
              src={logo || BrandLogo}
              width={120}
              height={100}
              alt="Brand Logo"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex justify-between items-center px-4 md:px-6">
          {/* Location (Always Visible) */}
          <div className="flex flex-col items-start">
            <span className="text-sm md:text-base font-bold">
              Delivery in 8 minutes
            </span>
            <div className="flex items-center text-xs md:text-sm">
              <span>ZopSmart Parangi Palaya, Sector 2</span>
              <IoMdArrowDropdown className="text-lg ml-1" />
            </div>
          </div>

          {/* Search Input */}
          <div className="hidden lg:block flex-1 max-w-[768px] mx-4">
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="Search Eggs..."
              />
            </div>
          </div>

          {/* Login Section */}
          {!isLogin ? (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-sm md:text-lg font-medium cursor-pointer"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                ref={buttonRef}
                type="button"
                className="flex items-center"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="h-6 w-6 md:h-8 md:w-8 text-gray-700" />
                <span className="ml-2 hidden md:block">Account</span>
              </button>
              {isDropdownVisible && (
                <UserDetails
                  toggleDropdown={toggleDropdown}
                  modalRef={modalRef}
                />
              )}
            </div>
          )}

          {/* Cart Button (Responsive) */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="bg-green-700 text-white font-bold py-2 px-3 rounded-lg relative flex items-center text-sm md:text-base"
          >
            {cart?.items?.length > 0 ? (
              <div className="flex items-center">
                <MdOutlineShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart?.items?.length}
                </div>
              </div>
            ) : (
              <>
                <MdOutlineShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <span className="hidden md:block">My Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
      {isLoginModalOpen && <Login setLoginModalOpen={setLoginModalOpen} />}
    </>
  );
};

export default Navbar;
