import { fetchData } from "./globalApi";
import { URL } from "../../../config";

export const getUserData = async (token) => {
  return await fetchData(`${URL}/api/me`, "GET", null, token);
};

export const changePassword = async (token, id, oldPassword, newPassword) => {
  const payload = {
    customerId: id,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  return await fetchData(`${URL}/api/password`, "POST", payload, token);
};

export const getUserOrder = async (token) => {
  return await fetchData(`${URL}/api/order`, "GET", null, token);
};

export const getWallet = async (token) => {
  return await fetchData(`${URL}/api/wallet`, "GET", null, token);
};
export const getTransaction = async (token) => {
  return await fetchData(`${URL}/api/wallet-transactions`, "GET", null, token);
};
