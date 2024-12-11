import { fetchData } from "./globalApi";
import { URL } from "../../../config";

export const loginUser = async (email, password, remember) => {
  const url = `${URL}/api/login`;
  const body = { username: email, password, remember };
  return await fetchData(url, "POST", body);
};

export const registerUser = async (name, lastName, email, password) => {
  const url = `${URL}/api/register`;
  const body = { name, lastName, email, password };
  return await fetchData(url, "POST", body);
};
