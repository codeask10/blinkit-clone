import { fetchData } from "./globalApi";
import { URL } from "../../../config";

export const getCartData = async (token, storeId) => {
  return await fetchData(
    `${URL}/api/cart?storeId=${storeId}&orderType=DELIVERY`,
    "GET",
    null,
    token
  );
};

export const updateCartData = async (cartItems, address, token, storeId) => {
  const payload = {
    cart: { items: cartItems },
    orderType: "DELIVERY",
    storeId: storeId,
    address,
  };
  return await fetchData(`${URL}/api/cart`, "POST", payload, token);
};
