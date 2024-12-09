"use client";

import React, { useState, useEffect, useContext } from "react";
import ImageSlider from "./ImageSlider";
import { CartContext } from "../context/CartContext";

const Details = ({ detail }) => {
    const { addToCart, decreaseQty, getCartItemQty } = useContext(CartContext);

    const variants = detail?.[0]?.value?.variants || [];
    const metaData = detail?.[0]?.value?.metaData || {};

    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        if (variants.length > 0 && !selectedVariant) {
            setSelectedVariant(variants[0]);
        }
    }, [variants, selectedVariant]);

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
    };

    const {
        images = [],
        fullName: productName = "",
        name: qty = "",
        storeSpecificData = [],
    } = selectedVariant || {};

    const { mrp = 0, discount = 0 } = storeSpecificData[0] || {};
    const discountPrice = mrp - mrp * (discount / 100);

    return (
        <div className="flex flex-col lg:flex-row w-full max-h-screen items-center justify-center overflow-hidden">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center relative border-b lg:border-b-0 lg:border-r border-gray-300">
                <ImageSlider images={images} image={images[0]} />
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:w-1/2 h-full flex flex-col gap-4 justify-center items-start px-6 py-6 lg:px-8 lg:py-4">
                <h1 className="text-lg lg:text-xl font-bold">{productName}</h1>
                <button className="text-sm lg:text-lg font-medium text-green-700 underline cursor-pointer">
                    View All Similar Products
                </button>

                <div className="text-sm lg:text-base font-medium mt-4">Select Unit</div>
                <div className="flex flex-wrap gap-4">
                    {variants.map((variant, index) => {
                        const isSelected = selectedVariant?.id === variant.id;
                        const { name: variantQtyName } = variant;
                        const { mrp: variantMrp = 0, discount: variantDiscount = 0 } =
                            variant.storeSpecificData[0] || {};
                        const variantDiscountPrice =
                            variantMrp - (variantMrp * variantDiscount) / 100;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col justify-center items-center gap-2 w-24 lg:w-32 h-24 lg:h-28 border rounded-md cursor-pointer ${isSelected
                                    ? "border-red-500 bg-red-50"
                                    : "border-blue-500 bg-white"
                                    }`}
                                onClick={() => handleVariantSelect(variant)}
                            >
                                <div className="text-sm lg:text-base">{variantQtyName}</div>
                                <div className="font-bold text-sm lg:text-base">
                                    ₹ {variantDiscountPrice.toFixed(2)}
                                </div>
                                <div className="line-through text-gray-500 text-xs lg:text-sm">
                                    MRP ₹ {variantMrp}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full flex justify-between mt-4 items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap gap-5 text-base lg:text-xl">
                            ₹ {discountPrice.toFixed(2)}
                            <div className="text-sm lg:text-base">
                                MRP <span className="line-through">₹ {mrp}</span>
                            </div>
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">
                            Inclusive of all taxes
                        </div>
                    </div>

                    {getCartItemQty(selectedVariant?.id) > 0 ? (
                        <div className="flex items-center gap-2 lg:gap-4 bg-red-700 text-white font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-lg">
                            <button
                                onClick={() => decreaseQty(selectedVariant?.id)}
                                className="text-lg lg:text-xl"
                            >
                                -
                            </button>
                            <span className="text-base lg:text-lg font-bold">
                                {getCartItemQty(selectedVariant?.id)}
                            </span>
                            <button
                                onClick={() => addToCart(selectedVariant?.id)}
                                className="text-lg lg:text-xl"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(selectedVariant?.id)}
                            className="bg-red-700 text-white font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-lg text-sm lg:text-base"
                        >
                            Add To Cart
                        </button>
                    )}
                </div>

                <hr className="w-full my-3" />
                <div className="text-lg lg:text-xl my-2 font-bold">Product Details</div>
                <div className="grid grid-cols-2 gap-y-4 w-full">
                    {Object.entries(metaData).map(([label, value], index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start text-sm lg:text-base"
                        >
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
