import React from "react";
import Image from "next/image";
import brandImageUrl from "@/app/assets/img.webp";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="w-full fixed h-24 flex items-center border-b border-gray-300 bg-white">
      {/* Logo Section */}
      <div className="hidden lg:flex w-2/12 h-full justify-center items-center border-r border-gray-300">
        <Image src={brandImageUrl} width={120} height={130} alt="Brand Logo" />
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex justify-between items-center px-4 lg:px-8">
        {/* Address Section */}
        <div className="flex flex-col">
          <span className="text-lg font-bold">Delivery in 8 minutes</span>
          <div className="flex items-center">
            <span>ZopSmart Parangi Palaya, Sector 2</span>
            <IoMdArrowDropdown className="text-xl ml-1" />
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
        <div className="text-lg font-medium">Login</div>

        {/* Cart Button */}
        <div className="hidden lg:flex">
          <button className="bg-green-700 text-white font-bold py-4 px-4 rounded-lg flex items-center">
            <MdOutlineShoppingCart className="w-5 h-5 mr-2" />
            <span>My Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
