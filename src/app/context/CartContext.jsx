"use client";

import React, { createContext, useState, useEffect, useCallback, useContext } from "react";

import { getCartData, updateCartData } from "../api/cartApi";
import { UserContext } from "./UserContext";
import { CommonContext } from "./CommonContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { common } = useContext(CommonContext);
    const storeId = common?.organization?.defaultStoreId;
    const { token } = useContext(UserContext);
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState([]);
    const address = {
        landmark: "ZopSmart, 24th Main Rd, 22nd Cross Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102, India",
        pincode: "560102",
        city: "Bengaluru",
        state: "Karnataka",
        countryCode: "IN",
        latitude: 12.9088233,
        longitude: 77.6495937,
    };

    const fetchCart = useCallback(async () => {
        if (!token || !storeId) return;
        try {
            const result = await getCartData(token, storeId);
            setCart(result.data.cart);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }, [token, storeId]);

    const updateCart = useCallback(async () => {
        try {
            const result = await updateCartData(items, address, token, storeId);
            setCart(result.data.cart);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    }, [items, token, storeId]);

    useEffect(() => {
        if (token) {
            fetchCart();
        }
        else {
            setCart(null);
            setItems([]);
        }
    }, [fetchCart, token]);

    useEffect(() => {
        if (items.length > 0) updateCart();
    }, [items, updateCart]);

    const addToCart = (id) => {
        const existingItem = cart?.items.find((item) => item.product.id === id);
        if (existingItem) {
            const { product, q, t } = existingItem;
            setItems([{ id: product.id.toString(), q: (parseInt(q) + 1).toString(), t }]);
        } else {
            setItems([{ id: id.toString(), q: "1", t: Date.now() }]);
        }
    };

    const decreaseQty = (id) => {
        const existingItem = cart?.items.find((item) => item.product.id === id);
        if (existingItem) {
            const { product, q, t } = existingItem;
            if (parseInt(q) > 1) {
                setItems([{ id: product.id.toString(), q: (parseInt(q) - 1).toString(), t }]);
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
