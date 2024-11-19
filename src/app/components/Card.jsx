"use client";
import React from "react";
import { FaPlus, FaRupeeSign } from "react-icons/fa";
import Image from "next/image";

const truncateText = (text, length) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

const Card = ({ item }) => {
    const company_name = item?.brand?.name || "";
    const item_name = item?.variants?.[0]?.fullName || "No Name Available";
    const url = item?.variants?.[0]?.images?.[0] || "/placeholder.png"; // Provide a placeholder URL
    const qty = item?.variants?.[0]?.name || "N/A";
    const mrp = parseInt(item?.variants?.[0]?.storeSpecificData?.[0]?.mrp || "0", 10);
    const discount = parseInt(item?.variants?.[0]?.storeSpecificData?.[0]?.discount || "0", 10);
    const discount_price = mrp - (mrp * (discount / 100));
    return (
        <>

            <div className="flex flex-col h-[250px] md:h-[300px] w-[200px] box-border mt-5">
                {/* Image Container */}
                <div className="h-[180px] w-[90%] border border-gray-400 rounded-lg relative flex justify-center mx-auto">
                    <Image
                        className="object-cover w-[130px]"
                        src={url}
                        alt={item_name}
                        width="0"
                        height="0"
                        sizes="100vw"
                    />
                    <button className="absolute bottom-[0.75rem] right-[1rem] bg-red-500 text-white p-2 rounded-md text-lg">
                        <FaPlus />
                    </button>
                </div>

                {/* List of Details */}
                <ul className="mt-2 tracking-wide list-none px-0">
                    <li className="pb-1">{company_name}</li>
                    <li className="pb-1">{truncateText(item_name, 16)}</li>
                </ul>
                <div className="text-md font-base my-1">{qty}</div>
                {/* Price Container */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center font-bold text-lg text-black">
                        <FaRupeeSign /> {discount_price}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm line-through">
                        (<FaRupeeSign /> {mrp})
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
