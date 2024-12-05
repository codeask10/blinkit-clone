"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { URL } from "../../../config";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState([]);
    const address = {
        landmark: "ZopSmart, 24th Main Rd, 22nd Cross Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102, India",
        pincode: "560102",
        city: "Bengaluru",
        state: "Karnataka",
        countryCode: "IN",
        latitude: 12.9088233,
        longitude: 77.6495937
    };

    const getCart = async () => {
        try {
            const response = await fetch(`${URL}/api/cart?storeId=25539&orderType=DELIVERY`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json();
            if (result.status === "SUCCESS" && result.data?.cart?.items) {
                setCart(result.data.cart);
            } else if (result.status === "ERROR") {
                console.error(result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const updateCart = async () => {
        try {
            const response = await fetch(`${URL}/api/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ cart: { items: items }, orderType: "DELIVERY", storeId: "25539", address: address })
            });
            const result = await response.json();
            if (result.status === "SUCCESS") {
                setCart(result.data.cart);
            } else {
                console.error("API Error:", result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("An error occurred while updating the cart. Please try again.");
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            updateCart();
        }
    }, [items]);

    const addToCart = (id) => {
        const existingItem = cart?.items.find((item) => item.product.id === id);
        if (existingItem) {
            let { product, q, t } = existingItem;
            q = parseInt(q) + 1
            const val = ({ q: q.toString(), id: product.id.toString(), t });
            setItems([val]);
        } else {
            setItems([{ id: id.toString(), q: "1", t: Date.now() }]);
        }
    };

    const decreaseQty = (id) => {
        const existingItem = cart?.items.find((item) => item.product.id === id);
        if (existingItem) {
            let { product, q, t } = existingItem;
            q = parseInt(q);
            if (q > 1) {
                q = q - 1;
                const val = ({ q: q.toString(), id: product.id.toString(), t });
                setItems(val);
            } else {
                const val = ({ q: q.toString(), id: product.id.toString(), t });
                setItems(val);
            }
        }
    };

    const getCartItemQty = (itemId) => {

        const item = cart?.items?.find((item) => item.product.id === itemId);
        return item ? parseInt(item.q) : 0;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQty, getCartItemQty }}>
            {children}
        </CartContext.Provider>
    );
};
