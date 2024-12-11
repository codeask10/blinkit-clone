"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaRupeeSign, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import Select from "./Select";


const Card = ({ item }) => {
    const { addToCart, decreaseQty, getCartItemQty } = useContext(CartContext);
    const [selectedVariant, setSelectedVariant] = useState(item?.variants?.[0]);

    const id = selectedVariant?.id || "";
    const company_name = item?.brand?.name || "";
    const slug = item?.slug || "";
    const item_name = selectedVariant?.fullName || "No Name Available";
    const url = selectedVariant?.images?.[0] || "/placeholder.png";
    const qty = selectedVariant?.name || "N/A";
    const mrp = parseInt(selectedVariant?.storeSpecificData?.[0]?.mrp || "0", 10);
    const discount = parseInt(selectedVariant?.storeSpecificData?.[0]?.discount || "0", 10);
    const discount_price = mrp - discount;

    return (
        <>
            <div className="flex flex-col w-full max-w-[180px] mx-auto mt-3 ">
                {/* Image Container */}
                <div className="h-[160px] w-[160px] border border-gray-200 rounded-lg relative flex justify-center ">
                    <Link href={`/products/${slug}`}>
                        <Image
                            src={url}
                            alt={item_name}
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ objectPosition: "cover", width: "100%", height: "90%", padding: "0.2rem" }}
                        />
                    </Link>
                    {getCartItemQty(id) ? (
                        <div className="absolute bottom-[0.65rem] right-[0.50rem] flex items-center gap-2 bg-red-500 text-white p-1 rounded-md text-lg">
                            <button onClick={() => {
                                decreaseQty(id)
                            }}>
                                <FaMinus />
                            </button>
                            <span>{getCartItemQty(id)}</span>
                            <button onClick={() => addToCart(id)}>
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="absolute bottom-[0.65rem] right-[0.50rem] bg-red-500 text-white p-2 rounded-md text-lg"
                            onClick={() => addToCart(id)}
                        >
                            <FaPlus />
                        </button>
                    )}
                </div>

                {/* List of Details */}
                <div className="flex flex-col mt-2 h-[60px]">
                    <span className="font-bold text-md text-gray-700 truncate">{company_name}</span>
                    <span className="text-md text-gray-600 truncate">{item_name}</span>
                </div>
                {
                    item.variants.length > 1 ? <Select variants={item.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} /> : <div className="text-md font-base my-1">{qty}</div>
                }
                {/* Price Container */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center font-bold text-lg text-black">
                        <FaRupeeSign /> {discount_price.toFixed(2)}
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
