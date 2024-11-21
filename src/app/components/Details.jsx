"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageSlider from "./ImageSlider";

const Details = ({ detail }) => {
    // Extract product details
    const variants = detail?.[0]?.value?.variants || [];
    const metaData = detail?.[0]?.value?.metaData || {};

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (variants.length > 0 && !selectedVariant) {
            setSelectedVariant(variants[0]);
        }
    }, [variants, selectedVariant]);

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
    };

    const handleClickCart = (variant) => {
        setCartItems((prevItems) => [...prevItems, variant]);
    }
    console.log(cartItems);
    const {
        images = [],
        fullName: productName = "",
        name: qty = "",
        storeSpecificData = [],
    } = selectedVariant || {};

    const { mrp = 0, discount = 0 } = storeSpecificData[0] || {};
    const discountPrice = mrp - mrp * (discount / 100);

    return (
        <div className="flex flex-col lg:flex-row w-full max-h-screen items-center justify-center">
            {/* Image Section */}
            <div className="w-1/2 h-full flex justify-center items-center relative border-r border-gray-300">
                <ImageSlider images={images} image={images[0]} />

            </div>

            {/* Product Details Section */}
            <div className="w-1/2 h-full flex flex-col gap-2 justify-center items-start px-8 py-4">
                <h1 className="text-xl font-bold">{productName}</h1>
                <button className="text-xl font-medium text-green-700 underline cursor-pointer">
                    View All Similar Products
                </button>

                <div className="text-sm font-medium mt-4">Select Unit</div>
                <div className="flex flex-wrap gap-4">
                    {variants.map((variant, index) => {
                        const isSelected = selectedVariant?.id === variant.id;
                        const { name: variantQty } = variant;
                        const { mrp: variantMrp = 0, discount: variantDiscount = 0 } =
                            variant.storeSpecificData[0] || {};
                        const variantDiscountPrice =
                            variantMrp - (variantMrp * variantDiscount) / 100;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col justify-center items-center gap-2 w-32 h-28 border rounded-md cursor-pointer ${isSelected
                                    ? "border-red-500 bg-red-50"
                                    : "border-blue-500 bg-white"
                                    }`}
                                onClick={() => handleVariantSelect(variant)}
                            >
                                <div>{variantQty}</div>
                                <div className="font-bold">
                                    ₹ {variantDiscountPrice.toFixed(2)}
                                </div>
                                <div className="line-through text-gray-500">
                                    MRP ₹ {variantMrp}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>{qty}</div>
                <div className="w-full flex justify-between mt-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-5 text-xl">
                            ₹ {discountPrice.toFixed(2)}
                            <div>
                                MRP <span className="line-through">₹ {mrp}</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">Inclusive of all taxes</div>
                    </div>
                    <button onClick={() => handleClickCart(selectedVariant)} className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg">
                        Add To Cart
                    </button>
                </div>

                <hr className="w-full my-3" />
                <div className="text-xl my-2 font-bold">Product Details</div>
                <div className="grid grid-cols-2 gap-y-4 w-full max-w-lg">
                    {Object.entries(metaData).map(([label, value], index) => (
                        <div key={index} className="flex flex-col items-start">
                            <span className="font-semibold text-gray-700">{label}</span>
                            <span className="text-gray-500">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Details;
