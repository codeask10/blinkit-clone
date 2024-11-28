"use client";

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load the cart data from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCart(parsedCart?.items || []); // Set cart items if present
        }
    }, []);

    // Update localStorage whenever the cart changes
    useEffect(() => {
        if (cart.length > 0) {
            const cartData = { items: cart }; // Store cart as an object with `items`
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }, [cart]);

    // Function to add a product to the cart
    const addToCart = (variants, qty = 1) => {
        const { id, storeSpecificData } = variants;
        const mrp = storeSpecificData?.[0]?.mrp || 0;
        const discount = storeSpecificData?.[0]?.discount || 0;
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === id);

            if (existingItemIndex > -1) {
                // If item already exists, update the quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].qty += qty;
                return updatedCart;
            } else {
                // Add the new item to the cart
                return [...prevCart, { id, mrp, discount, variants, qty }];
            }
        });
    };

    // Function to update quantity of a cart item
    const updateQty = (id, qty) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.max(1, qty) } // Ensure qty is at least 1
                    : item
            )
        );
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id); // Remove item by ID

            // If the cart is empty after removal, delete it from localStorage
            if (updatedCart.length === 0) {
                localStorage.removeItem("cart");
            } else {
                // Otherwise, update localStorage with the remaining items
                localStorage.setItem("cart", JSON.stringify({ items: updatedCart }));
            }

            return updatedCart;
        });
    };

    // Function to clear the entire cart
    const clearCart = () => {
        setCart([]); // Reset cart to an empty array
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
