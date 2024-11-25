"use client";
import React, { useContext } from "react";
import { FaPlus, FaRupeeSign, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import { getCartItemQty, handleAddToCart, handleDecreaseQty, handleIncreaseQty } from "../utils/cart";

const truncateText = (text, length) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

const Card = ({ item }) => {
    const { cart, addToCart, updateQty, removeFromCart } = useContext(CartContext);

    const id = item?.variants?.[0]?.id || "";
    const company_name = item?.brand?.name || "";
    const slug = item?.slug || "";
    const item_name = item?.variants?.[0]?.fullName || "No Name Available";
    const url = item?.variants?.[0]?.images?.[0] || "/placeholder.png"; // Provide a placeholder URL
    const qty = item?.variants?.[0]?.name || "N/A";
    const mrp = parseInt(
        item?.variants?.[0]?.storeSpecificData?.[0]?.mrp || "0",
        10
    );
    const discount = parseInt(
        item?.variants?.[0]?.storeSpecificData?.[0]?.discount || "0",
        10
    );
    const discount_price = mrp - mrp * (discount / 100);

    return (
        <>
            <div className="flex flex-col h-[250px] md:h-[300px] w-[200px] box-border mt-5">
                {/* Image Container */}
                <div className="h-[180px] w-[90%] border border-gray-400 rounded-lg relative flex justify-center mx-auto">
                    <Link href={`/products/${slug}`}>
                        <Image
                            className="object-cover w-[130px] h-full p-2"
                            src={url}
                            alt={item_name}
                            width="0"
                            height="0"
                            sizes="100vw"
                        />
                    </Link>
                    {getCartItemQty(id, cart) ? (
                        <div className="absolute bottom-[0.75rem] right-[1rem] flex items-center gap-2 bg-red-500 text-white p-2 rounded-md text-lg">
                            <button onClick={() => {
                                handleDecreaseQty(id, cart, updateQty, removeFromCart)
                            }}>
                                <FaMinus />
                            </button>
                            <span>{getCartItemQty(id, cart)}</span>
                            <button onClick={() => { handleIncreaseQty(id, cart, updateQty) }}>
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="absolute bottom-[0.75rem] right-[1rem] bg-red-500 text-white p-2 rounded-md text-lg"
                            onClick={() => { handleAddToCart(item?.variants?.[0], addToCart) }}
                        >
                            <FaPlus />
                        </button>
                    )}
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
