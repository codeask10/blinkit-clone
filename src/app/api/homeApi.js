import { fetchData } from "./globalApi";
import { URL } from "../../../config";

export const getHomeData = async () => {
  return await fetchData(`${URL}/api/layout/home`);
};
