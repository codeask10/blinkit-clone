import React, { useContext } from "react";
import Image from "next/image";
import { CartContext } from "../context/CartContext";
import { getCartItemQty, handleDecreaseQty, handleIncreaseQty } from "../utils/cart";

const Cart = ({ open, setOpen }) => {
    const { cart, updateQty, removeFromCart } = useContext(CartContext);

    // Calculate bill details
    const totalPrice = cart?.reduce((acc, item) => acc + item.mrp * item.qty, 0);
    const totalDiscount = cart?.reduce((acc, item) => acc + item.discount * item.qty, 0);
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
                className={`fixed right-0 top-0 z-50 bg-gray-100 h-full w-1/4 px-4 transition-transform transform ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-3 font-bold text-gray-600">
                    <h2 className="text-lg">Cart</h2>
                    <button onClick={() => setOpen(false)} className="text-lg cursor-pointer">
                        Close
                    </button>
                </div>

                <div className="overflow-y-auto h-5/6 pb-4"> {/* Adjust height */}
                    {/* Cart Items */}
                    {cart?.length === 0 ? (
                        <p className="text-center py-auto">Your cart is empty!</p>
                    ) : (
                        cart?.map((item) => {
                            const mrp = parseInt(
                                item?.variants?.storeSpecificData?.[0]?.mrp || "0",
                                10
                            );
                            const discount = parseInt(
                                item?.variants?.storeSpecificData?.[0]?.discount || "0",
                                10
                            );
                            const discount_price = mrp - mrp * (discount / 100);
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b border-gray-300 py-2"
                                >
                                    {/* Item Details */}
                                    <div className="flex items-center flex-1 gap-1">
                                        <Image
                                            src={item?.variants?.images?.[0] || "/placeholder.jpg"}
                                            alt={item?.variants?.fullName || "Product Image"}
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 rounded-md mr-4 object-cover"
                                        />
                                        <div className="flex flex-col gap-1 text-sm font-base">
                                            <div className="font-bold">{item?.variants?.fullName || "Product Name"}</div>
                                            <div>{item?.variants?.name}</div>
                                            <div className="flex gap-4">
                                                <div>{discount_price}</div>
                                                <div className="line-through">MRP ₹ {mrp}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                        <button
                                            onClick={() =>
                                                handleDecreaseQty(item?.id, cart, updateQty, removeFromCart)
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="text-md font-bold">
                                            {getCartItemQty(item?.id, cart)}
                                        </span>
                                        <button
                                            onClick={() => handleIncreaseQty(item?.id, cart, updateQty)}
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
                        <div className="text-xl font-bold my-1">Bill Details </div>
                        <div className="flex text-sm justify-between ">
                            <span>Price</span>
                            <span>₹ {totalPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex text-sm justify-between ">
                            <span>Price Discount</span>
                            <span>₹ {totalDiscount?.toFixed(2)}</span>
                        </div>
                        <div className="flex text-sm justify-between ">
                            <span>Delivery Charges</span>
                            <span>₹ 0.00</span>
                        </div>
                        <div className="flex text-sm justify-between ">
                            <span>Sub Total</span>
                            <span>₹ {subTotal?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold my-1 ">
                            <span>Grand Total</span>
                            <span>₹ {subTotal?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="fixed bottom-0 left-0 w-full bg-white p-3 border-t border-gray-300">
                    <div className="flex justify-between text-black font-bold">
                        <span>Total:</span>
                        <span>₹ {subTotal?.toFixed(2)}</span>
                    </div>
                    <button className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                        Login
                    </button>
                </div>
            </div>

        </>
    );
};

export default Cart;
