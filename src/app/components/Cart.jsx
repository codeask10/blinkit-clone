"use client"
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { CartContext } from "../context/CartContext";
import Login from "./Login";
// import { getCartItemQty, handleDecreaseQty, handleIncreaseQty } from "../utils/cart";

const Cart = ({ open, setOpen }) => {
    const { cart, addToCart, decreaseQty } = useContext(CartContext);
    const { items = [] } = cart || {};

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Check for user login status on component mount
    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsUserLoggedIn(!!user);
    }, []);
    // Calculate bill details
    const totalPrice = items?.reduce((acc, item) => acc + item.mrp * item.q, 0);
    const totalDiscount = items?.reduce((acc, item) => acc + item.discount * item.q, 0);
    const subTotal = totalPrice - totalDiscount;

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Cart */}
            <div
                className={`fixed right-0 top-0 z-50 bg-gray-100 h-full w-[350px] px-4 transition-transform transform ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-3 font-bold text-gray-600">
                    <h2 className="text-lg">Cart</h2>
                    <button onClick={() => setOpen(false)} className="text-lg cursor-pointer">
                        Close
                    </button>
                </div>

                {/* Cart Items */}
                <div className="overflow-y-auto h-5/6 pb-4">
                    {items?.length === 0 ? (
                        <p className="text-center py-auto">Your cart is empty!</p>
                    ) : (
                        items?.map((item) => {
                            const {
                                id,
                                mrp,
                                discount,
                                q: quantity,
                                product,
                            } = item;
                            const finalPrice = mrp - discount;

                            return (
                                <div
                                    key={id}
                                    className="flex items-center justify-between border-b border-gray-300 py-2"
                                >
                                    {/* Item Details */}
                                    <div className="flex items-center flex-1 gap-1">
                                        <Image
                                            src={product?.images?.[0] || "/placeholder.jpg"}
                                            alt={product?.name || "Product Image"}
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 rounded-md object-cover"
                                        />
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div>{product.fullName}</div>
                                            <div className="font-bold">
                                                {product?.name || "Product Name"}
                                            </div>
                                            <div className="flex gap-4">
                                                <div>₹ {finalPrice?.toFixed(2)}</div>
                                                <div className="line-through">₹ {mrp.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                        <button
                                            onClick={() => { decreaseQty(id) }}
                                        >
                                            -
                                        </button>
                                        <span className="text-md font-bold">{quantity}</span>
                                        <button
                                            onClick={() => { addToCart(id) }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}


                    {/* Bill Details */}
                    <div className="my-2 p-2 bg-white rounded-md">
                        <div className="text-xl font-bold my-1">Bill Details</div>
                        <div className="flex text-sm justify-between">
                            <span>Price</span>
                            <span>₹ {totalPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex text-sm justify-between">
                            <span>Discount</span>
                            <span>₹ {totalDiscount?.toFixed(2)}</span>
                        </div>
                        <div className="flex text-sm justify-between">
                            <span>Delivery Charges</span>
                            <span>₹ 0.00</span>
                        </div>
                        <div className="flex text-sm justify-between">
                            <span>Sub Total</span>
                            <span>₹ {subTotal?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold my-1">
                            <span>Grand Total</span>
                            <span>₹ {subTotal?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="fixed bottom-0 left-0 w-full bg-white p-3 border-t border-gray-300">
                    <div className="flex justify-between text-black font-bold">
                        <span>Total:</span>
                        <span>₹ {subTotal.toFixed(2)}</span>
                    </div>
                    {!isUserLoggedIn && <button onClick={() => setLoginModalOpen(!isLoginModalOpen)} className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                        Login
                    </button>}
                    {isUserLoggedIn && <button className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                        Checkout
                    </button>
                    }
                </div>
            </div>
            {isLoginModalOpen && <Login setLoginModalOpen={setLoginModalOpen} />}
        </>
    );
};

export default Cart;
